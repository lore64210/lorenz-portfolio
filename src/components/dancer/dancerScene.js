import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { PixelateShader } from "./pixelateShader";

const MODEL_URL = "/static/models/meshy-lore.glb";
const DANCES_URL = "/static/data/winston-dances.json";
const DEG = Math.PI / 180;
const TRANSITION_SECONDS = 0.45;
// Temporary switch: set to true to restore the pixelation post-process.
const ENABLE_PIXELATION = false;

/** Contract rig used by Winston's Paradigm -> actual Meshy/Mixamo bones. */
const BONE_MAP = {
    Hips: "mixamorig:Hips",
    Spine: "mixamorig:Spine",
    Chest: "mixamorig:Spine2",
    Neck: "mixamorig:Neck",
    Head: "mixamorig:Head",
    "Shoulder.L": "mixamorig:LeftShoulder",
    "UpperArm.L": "mixamorig:LeftArm",
    "LowerArm.L": "mixamorig:LeftForeArm",
    "Hand.L": "mixamorig:LeftHand",
    "Shoulder.R": "mixamorig:RightShoulder",
    "UpperArm.R": "mixamorig:RightArm",
    "LowerArm.R": "mixamorig:RightForeArm",
    "Hand.R": "mixamorig:RightHand",
    "UpperLeg.L": "mixamorig:LeftUpLeg",
    "LowerLeg.L": "mixamorig:LeftLeg",
    "Foot.L": "mixamorig:LeftFoot",
    "UpperLeg.R": "mixamorig:RightUpLeg",
    "LowerLeg.R": "mixamorig:RightLeg",
    "Foot.R": "mixamorig:RightFoot",
};

/** Which dance each placement starts on, so the page does not move in lockstep. */
const START_SEQUENCE = {
    hero: 0,
    about: 0,
    aboutPage: 0,
    contact: 4,
};

/**
 * glTF nodes are sanitized by three (`mixamorig:Hips` -> `mixamorigHips`), and
 * Mixamo appends a counter when a name already exists. Normalize both forms.
 */
function normalizeBoneName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/^mixamorig\d*/, "");
}

function prepareModel(scene) {
    scene.traverse((object) => {
        if (object.isSkinnedMesh) object.frustumCulled = false;
        if (!object.isMesh) return;

        const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

        for (const material of materials) {
            if (!material) continue;

            // Meshy exports the albedo a second time as emissive with factor 1.
            // Under real lighting that doubles the base colour.
            if (typeof material.emissiveIntensity === "number") {
                material.emissiveIntensity = 0;
            }
            if (material.emissive) {
                material.emissive.setRGB(0, 0, 0);
            }

            // The base color texture is pre-smoothed at build time to remove
            // the baked light specks from the suit; doing it at runtime was
            // blocking the main thread for seconds.


            // The suit uses a metallic-roughness texture that produces small
            // specular reflections from the rim lights. Force a fully matte
            // material so the dark fabric reads as cloth instead of wet vinyl.
            if ("metalness" in material) {
                material.metalness = 0;
                material.metalnessMap = null;
            }
            if ("roughness" in material) {
                material.roughness = 0.95;
                material.roughnessMap = null;
            }

            // The GLB declares a specular colour factor of 2. Clamp it so the
            // rough fabric does not sparkle.
            if ("specularIntensity" in material) {
                material.specularIntensity = 0;
            }
            if (material.specularColor) {
                material.specularColor.setRGB(1, 1, 1);
            }

            // Soften the normal map a little; it still gives the cloth some
            // shape without turning every bump into a highlight.
            if (material.normalScale) {
                material.normalScale.set(0.6, 0.6);
            }

            material.needsUpdate = true;
        }
    });
}

let gltfPromise = null;
let dancesPromise = null;

function loadModel() {
    if (!gltfPromise) {
        gltfPromise = new GLTFLoader()
            .loadAsync(MODEL_URL)
            .then((gltf) => {
                prepareModel(gltf.scene);
                return gltf;
            })
            .catch((error) => {
                gltfPromise = null;
                throw error;
            });
    }
    return gltfPromise;
}

function loadDances() {
    if (!dancesPromise) {
        dancesPromise = fetch(DANCES_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Could not load dance data (${response.status})`
                    );
                }
                return response.json();
            })
            .catch((error) => {
                dancesPromise = null;
                throw error;
            });
    }
    return dancesPromise;
}

/**
 * Capture the imported bind pose and the retarget bindings. Poses are applied
 * with the same formula as the game / MeshLookModel:
 *
 *     localRotation = parentRestWorld⁻¹ · poseRotation · restWorld
 */
function buildRig(model) {
    model.updateMatrixWorld(true);

    const rootInverse = model
        .getWorldQuaternion(new THREE.Quaternion())
        .invert();
    const entries = [];
    const byNormalized = new Map();

    model.traverse((object) => {
        if (!object.isBone) return;

        const world = object
            .getWorldQuaternion(new THREE.Quaternion())
            .premultiply(rootInverse);
        const parentWorld = object.parent
            ? object
                  .parent.getWorldQuaternion(new THREE.Quaternion())
                  .premultiply(rootInverse)
            : new THREE.Quaternion();

        const entry = {
            bone: object,
            restLocal: object.quaternion.clone(),
            restWorld: world,
            parentRestWorldInv: parentWorld.clone().invert(),
            restPosition: object.position.clone(),
        };

        entries.push(entry);
        byNormalized.set(normalizeBoneName(object.name), entry);
    });

    const binding = [];
    for (const [contract, source] of Object.entries(BONE_MAP)) {
        const entry = byNormalized.get(normalizeBoneName(source));
        if (entry) binding.push([contract, entry]);
    }

    return { entries, binding };
}

const euler = new THREE.Euler();
const delta = new THREE.Quaternion();
const rootQuaternion = new THREE.Quaternion();
const offset = new THREE.Vector3();
const worldPosition = new THREE.Vector3();
const transitionQuaternion = new THREE.Quaternion();

function applyPose(model, rig, pose, blend = null) {
    for (const entry of rig.entries) {
        entry.bone.quaternion.copy(entry.restLocal);
        entry.bone.position.copy(entry.restPosition);
    }

    if (!pose) {
        model.updateMatrixWorld(true);
        return;
    }

    let hips = null;

    for (const [contract, entry] of rig.binding) {
        const joint = pose[contract];
        if (!joint) continue;

        delta.setFromEuler(
            euler.set(
                (joint.x ?? 0) * DEG,
                (joint.y ?? 0) * DEG,
                (joint.z ?? 0) * DEG,
                "XYZ"
            )
        );

        entry.bone.quaternion
            .copy(entry.parentRestWorldInv)
            .multiply(delta)
            .multiply(entry.restWorld);

        if (
            contract === "Hips" &&
            (joint.px !== undefined ||
                joint.py !== undefined ||
                joint.pz !== undefined)
        ) {
            hips = {
                entry,
                px: joint.px ?? 0,
                py: joint.py ?? 0,
                pz: joint.pz ?? 0,
            };
        }
    }

    model.updateMatrixWorld(true);

    if (hips) {
        // Root motion is authored in metres. Convert into the bone parent's
        // local space (the Meshy export carries a 0.01 armature scale).
        model.getWorldQuaternion(rootQuaternion);
        offset
            .set(hips.px, hips.py, hips.pz)
            .applyQuaternion(rootQuaternion);

        const parent = hips.entry.bone.parent;
        if (parent) {
            hips.entry.bone.getWorldPosition(worldPosition).add(offset);
            hips.entry.bone.position.copy(
                parent.worldToLocal(worldPosition)
            );
            model.updateMatrixWorld(true);
        }
    }

    if (blend) {
        const t = blend.t;

        for (let i = 0; i < rig.entries.length; i++) {
            const entry = rig.entries[i];

            // Shortest-path quaternion blend: unlike Euler interpolation this
            // cannot swing an arm through the body when a clip flips sign.
            transitionQuaternion.slerpQuaternions(
                blend.quaternions[i],
                entry.bone.quaternion,
                t
            );
            entry.bone.quaternion.copy(transitionQuaternion);
            entry.bone.position.lerpVectors(
                blend.positions[i],
                entry.bone.position,
                t
            );
        }

        model.updateMatrixWorld(true);
    }
}

/**
 * Creates the renderer, scene and playback for one placement of the dancer.
 * Returns an idempotent cleanup function.
 */
export async function createDancer({
    host,
    canvas,
    variant = "hero",
    signal,
    onReady,
    onError,
}) {
    let gltf;
    let dances;

    try {
        [gltf, dances] = await Promise.all([loadModel(), loadDances()]);
    } catch (error) {
        onError?.(error);
        return () => {};
    }

    if (signal?.aborted || !host || !canvas) return () => {};

    const aboutDances = [
        "CITY_DANCE_AFRO",
        "CITY_DANCE_RIVERDANCE",
        "CITY_DANCE_HYPE",
    ]
        .map((id) =>
            dances.sequences.find((sequence) => sequence.id === id)
        )
        .filter(Boolean);

    const placementSequences =
        variant === "hero"
            ? dances.hero
            : variant === "contact"
              ? dances.resting && [dances.resting]
              : variant === "about"
                ? dances.greetings
                : variant === "aboutPage"
                  ? aboutDances
                  : null;

    const sequences = placementSequences ?? dances.sequences;
    if (!sequences?.length) {
        onError?.(new Error("Dance data is empty"));
        return () => {};
    }

    const isSingleSequence = sequences.length === 1;
    const isResting = variant === "contact" && !!dances.resting;

    const model = cloneSkeleton(gltf.scene);
    model.traverse((object) => {
        if (object.isSkinnedMesh) object.frustumCulled = false;
    });

    const rig = buildRig(model);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    const dancer = new THREE.Group();

    dancer.add(model);
    scene.add(dancer);

    scene.add(new THREE.HemisphereLight(0xfff4e8, 0x0b1020, 1.1));
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffe2c4, 2.6);
    keyLight.position.set(3.2, 5.5, 4.2);
    scene.add(keyLight);

    // Soft warm/cool rims. Saturated red/blue lights read as chromatic
    // fringing on the dark suit, so keep them subtle.
    const redLight = new THREE.DirectionalLight(0xffb38a, 0.9);
    redLight.position.set(-3.5, 2.6, -3.5);
    scene.add(redLight);

    const blueLight = new THREE.DirectionalLight(0x9bc8ff, 1);
    blueLight.position.set(3.5, 2.6, -3.5);
    scene.add(blueLight);

    const backRim = new THREE.DirectionalLight(0xd9ecff, 1);
    backRim.position.set(0, 2.8, -4);
    scene.add(backRim);

    // `?capture=1` is a maintenance hook for exporting transparent poster
    // frames from the canvas. It has no effect on normal page loads.
    const captureMode = new URLSearchParams(window.location.search).has(
        "capture"
    );
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: captureMode,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.12;

    const usePostProcessing = ENABLE_PIXELATION;
    let composer = null;
    let renderPass = null;
    let pixelatePass = null;
    let outputPass = null;

    if (usePostProcessing) {
        composer = new EffectComposer(renderer);
        renderPass = new RenderPass(scene, camera);
        pixelatePass = new ShaderPass(PixelateShader);
        pixelatePass.uniforms.uPixelSize.value = 3;
        pixelatePass.uniforms.uVignette.value = 0.12;
        outputPass = new OutputPass();

        composer.addPass(renderPass);
        composer.addPass(pixelatePass);
        composer.addPass(outputPass);
    }

    const renderFrame = () => {
        if (composer) composer.render();
        else renderer.render(scene, camera);
    };

    const startSequence =
        START_SEQUENCE[variant] ?? 0;
    const phase = (startSequence + 1) * 1.7;

    let sequenceIndex = startSequence % sequences.length;
    let cycleIndex = 0;
    let frameIndex = 0;
    let elapsed = 0;

    model.updateMatrixWorld(true);
    const footEntries = rig.binding.filter(
        ([contract]) => contract === "Foot.L" || contract === "Foot.R"
    );
    const restFootY = footEntries.length
        ? Math.min(
              ...footEntries.map(([, entry]) =>
                  entry.bone.getWorldPosition(new THREE.Vector3()).y
              )
          )
        : 0;
    const footPosition = new THREE.Vector3();

    let clock = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let dragging = false;
    let dragPointerId = null;
    let dragLastX = 0;
    let dragYaw = 0;
    let groundOffset = 0;
    let groundInitialized = false;

    let transitionRequested = false;
    let transitionTime = 0;
    let transitionStartQuaternions = null;
    let transitionStartPositions = null;

    let ready = false;
    let running = false;
    let raf = 0;
    let lastTime = 0;
    let visible = true;

    const motionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );
    let reduced = motionQuery.matches;

    function markReady() {
        if (ready) return;
        ready = true;
        onReady?.();
    }

    function resize() {
        const rect = host.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const ratio = 3;

        renderer.setPixelRatio(ratio);
        renderer.setSize(width, height, false);
        if (composer) {
            composer.setPixelRatio(ratio);
            composer.setSize(width, height);
        }

        camera.aspect = width / height;

        // Standing placements frame the whole body; the contact section is a
        // horizontal lying-down loop and needs a wider, lower box.
        const framing = isResting
            ? {
                  fitWidth: 1.8,
                  fitHeight: 1.1,
                  eyeY: 0.5,
                  targetY: 0.05,
              }
            : {
                  fitWidth: 1.65,
                  fitHeight: 2.0,
                  eyeY: 1.0,
                  targetY: 0.92,
              };

        const halfFov = (camera.fov * DEG) / 2;
        const distance =
            Math.max(
                framing.fitHeight / 2 / Math.tan(halfFov),
                framing.fitWidth /
                    2 /
                    (Math.tan(halfFov) * camera.aspect)
            ) * 1.03;

        camera.position.set(0, framing.eyeY, distance);
        camera.lookAt(0, framing.targetY, 0);
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld(true);

        if (pixelatePass) {
            pixelatePass.uniforms.uResolution.value = new THREE.Vector2(
                width * ratio,
                height * ratio
            );
            pixelatePass.uniforms.uPixelRatio.value = ratio;
            // Keep the blocks visually similar on every placement: taller
            // canvas means a slightly larger cell, so the face stays hidden
            // while the body keeps a readable silhouette.
            pixelatePass.uniforms.uPixelSize.value = Math.max(
                2.5,
                height * 0.006
            );
        }
    }

    function advance(dt) {
        elapsed += dt;
        let guard = 0;

        while (guard++ < 512) {
            const sequence = sequences[sequenceIndex];
            const frame = sequence.frames[frameIndex];
            if (elapsed < frame.duration) break;

            elapsed -= frame.duration;
            frameIndex += 1;

            if (frameIndex >= sequence.frames.length) {
                frameIndex = 0;
                cycleIndex += 1;

                if (cycleIndex >= (sequence.cycles ?? 1)) {
                    cycleIndex = 0;

                    // Single-sequence placements loop seamlessly; multi-
                    // sequence placements advance to the next clip. Poses are
                    // crossfaded with quaternion slerp in update().
                    if (!isSingleSequence) {
                        sequenceIndex =
                            (sequenceIndex + 1) % sequences.length;
                        transitionRequested = true;
                    }
                }
            }

            if (elapsed <= 0) break;
        }
    }

    function update(dt) {
        clock += dt;

        const ease = 1 - Math.exp(-dt * 4);
        smoothX += (pointerX - smoothX) * ease;
        smoothY += (pointerY - smoothY) * ease;

        if (!reduced) {
            dancer.rotation.y =
                dragYaw +
                Math.sin(clock * 0.36 + phase) * 0.055 +
                smoothX * 0.12;
            dancer.rotation.x = smoothY * 0.018;
        } else {
            dancer.rotation.y = dragYaw + 0.04;
            dancer.rotation.x = 0;
        }

        // Keep the skeleton matrices in sync with this frame's sway/ground
        // offset before measuring the feet.
        dancer.updateMatrixWorld(true);

        if (!reduced) advance(dt);

        if (transitionRequested) {
            transitionRequested = false;
            transitionStartQuaternions = rig.entries.map((entry) =>
                entry.bone.quaternion.clone()
            );
            transitionStartPositions = rig.entries.map((entry) =>
                entry.bone.position.clone()
            );
            transitionTime = 0;
        }

        const sequence = sequences[sequenceIndex];
        const pose = reduced
            ? dances.idle?.frames?.[0]?.joints ?? sequence.frames[0].joints
            : sequence.frames[frameIndex].joints;

        const transitioning = transitionStartQuaternions !== null;
        const rawTransition = transitioning
            ? Math.min(1, transitionTime)
            : 1;
        const blendT =
            rawTransition * rawTransition * (3 - 2 * rawTransition);

        applyPose(
            model,
            rig,
            pose,
            transitioning
                ? {
                      quaternions: transitionStartQuaternions,
                      positions: transitionStartPositions,
                      t: blendT,
                  }
                : null
        );

        if (transitioning) {
            transitionTime += dt / TRANSITION_SECONDS;

            if (transitionTime >= 1) {
                transitionStartQuaternions = null;
                transitionStartPositions = null;
                transitionTime = 0;
            }
        }

        if (footEntries.length) {
            const footY = Math.min(
                ...footEntries.map(([, entry]) =>
                    entry.bone.getWorldPosition(footPosition).y
                )
            );

            // The source clips carry a Hips py drop computed for the game's
            // base rig. On this Meshy skeleton that can push the soles below
            // the floor (up to ~10 cm in CHICKEN_DANCE / SNAKE_DANCE), which
            // reads as the whole character bobbing. Lift the model just enough
            // to keep the lowest foot on the ground plane.
            const relativeFootY = footY - dancer.position.y;
            const targetGround = Math.max(0, restFootY - relativeFootY);
            if (!groundInitialized) {
                groundOffset = targetGround;
                groundInitialized = true;
            } else {
                groundOffset +=
                    (targetGround - groundOffset) *
                    (1 - Math.exp(-dt * 18));
            }
            dancer.position.y = groundOffset;
        }
    }

    function loop(time) {
        raf = 0;
        if (!running) return;

        const dt = lastTime
            ? Math.min((time - lastTime) / 1000, 0.08)
            : 0;
        lastTime = time;

        update(dt);
        renderFrame();
        markReady();

        raf = requestAnimationFrame(loop);
    }

    function start() {
        if (running || reduced) return;
        running = true;
        lastTime = 0;
        raf = requestAnimationFrame(loop);
    }

    function stop() {
        running = false;
        lastTime = 0;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
    }

    function onPointerDown(event) {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        dragging = true;
        dragPointerId = event.pointerId;
        dragLastX = event.clientX;
        pointerX = 0;
        pointerY = 0;
        smoothX = 0;
        smoothY = 0;
        host.classList.add("is-dragging");

        try {
            host.setPointerCapture?.(event.pointerId);
        } catch {
            // Capture is best-effort; the drag still works inside the stage.
        }
    }

    function onPointerUp(event) {
        if (
            !dragging ||
            (dragPointerId !== null && event.pointerId !== dragPointerId)
        ) {
            return;
        }

        dragging = false;
        dragPointerId = null;
        host.classList.remove("is-dragging");

        try {
            if (host.hasPointerCapture?.(event.pointerId)) {
                host.releasePointerCapture(event.pointerId);
            }
        } catch {
            // Pointer may already be gone.
        }
    }

    function onLostPointerCapture() {
        if (!dragging) return;
        dragging = false;
        dragPointerId = null;
        host.classList.remove("is-dragging");
    }

    function onPointerMove(event) {
        if (dragging && event.pointerId === dragPointerId) {
            const dx = event.clientX - dragLastX;
            dragLastX = event.clientX;
            dragYaw += (dx / Math.max(host.clientWidth, 1)) * Math.PI * 2;

            // Reduced-motion scenes do not run a loop; repaint on drag.
            if (!running) {
                update(0);
                renderFrame();
            }
            return;
        }

        if (reduced) return;
        const rect = host.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }

    function onPointerLeave() {
        if (dragging) return;
        pointerX = 0;
        pointerY = 0;
    }

    function onMotionChange() {
        reduced = motionQuery.matches;
        if (reduced) {
            stop();
            update(0);
            renderFrame();
        } else if (visible) {
            start();
        }
    }

    function onVisibilityChange() {
        if (document.hidden) stop();
        else if (visible) start();
    }

    function onContextLost(event) {
        event.preventDefault();
        stop();
    }

    function onContextRestored() {
        if (visible) start();
    }

    const resizeObserver = new ResizeObserver(() => {
        resize();
        if (ready && !running) {
            update(0);
            renderFrame();
        }
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !document.hidden) start();
            else stop();
        },
        { rootMargin: "160px", threshold: 0 }
    );
    intersectionObserver.observe(host);

    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointercancel", onPointerUp);
    host.addEventListener("lostpointercapture", onLostPointerCapture);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", onMotionChange);
    } else {
        motionQuery.addListener(onMotionChange);
    }

    resize();
    update(0);
    renderFrame();
    markReady();

    if (!reduced && !captureMode) start();

    let destroyed = false;

    return function destroy() {
        if (destroyed) return;
        destroyed = true;

        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();

        host.removeEventListener("pointerdown", onPointerDown);
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerup", onPointerUp);
        host.removeEventListener("pointercancel", onPointerUp);
        host.removeEventListener("lostpointercapture", onLostPointerCapture);
        host.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);

        if (typeof motionQuery.removeEventListener === "function") {
            motionQuery.removeEventListener("change", onMotionChange);
        } else {
            motionQuery.removeListener(onMotionChange);
        }

        scene.remove(dancer);
        dancer.remove(model);

        renderPass?.dispose?.();
        pixelatePass?.dispose?.();
        outputPass?.dispose?.();
        composer?.dispose();

        renderer.dispose();
        try {
            renderer.forceContextLoss();
        } catch {
            // Context may already be gone.
        }
    };
}
