/**
 * Pixelation pass, adapted from Winston's Paradigm
 * (`UnityProject/Assets/Shaders/PreviewLookFx.shader`, the `pixelate` branch).
 *
 * The cell size is expressed in CSS pixels and scaled by DPR, so the blocks
 * keep the same visual weight on retina and non-retina screens. Alpha is
 * expanded a little around the silhouette so the character keeps a chunky
 * outline instead of losing its edges to transparent blocks.
 */
export const PixelateShader = {
    name: "WinstonPixelateShader",

    uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: null },
        uPixelRatio: { value: 1 },
        uPixelSize: { value: 3 },
        uVignette: { value: 0.12 },
    },

    vertexShader: /* glsl */ `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform vec2 uResolution;
        uniform float uPixelRatio;
        uniform float uPixelSize;
        uniform float uVignette;

        varying vec2 vUv;

        vec4 sampleAt(vec2 uv) {
            return texture2D(tDiffuse, clamp(uv, vec2(0.0), vec2(1.0)));
        }

        float neighborMaxAlpha(vec2 uv, float radiusPx) {
            vec2 texel = 1.0 / uResolution;
            float result = 0.0;

            for (int i = 0; i < 8; i++) {
                float angle = float(i) * 0.785398163;
                vec2 dir = vec2(cos(angle), sin(angle));
                result = max(result, sampleAt(uv + dir * texel * radiusPx * 0.5).a);
                result = max(result, sampleAt(uv + dir * texel * radiusPx).a);
            }

            return result;
        }

        /**
         * Point-sampling one texel per cell turns small texture highlights
         * into random bright dots ("manchitas"). Average a 5x5 patch inside
         * the cell instead; the blocky grid stays, the noise goes away.
         */
        vec4 blockAverage(vec2 center, vec2 cellUv) {
            vec3 color = vec3(0.0);
            float alpha = 0.0;

            for (int y = -2; y <= 2; y++) {
                for (int x = -2; x <= 2; x++) {
                    vec2 offset = vec2(float(x), float(y)) * cellUv * 0.22;
                    vec4 value = sampleAt(center + offset);
                    color += value.rgb * value.a;
                    alpha += value.a;
                }
            }

            if (alpha > 0.0001) {
                color /= alpha;
            } else {
                color = vec3(0.0);
            }

            return vec4(color, alpha / 25.0);
        }

        void main() {
            vec4 src = sampleAt(vUv);
            vec3 color = src.rgb;
            float alpha = src.a;

            float cell = max(2.0, uPixelSize * uPixelRatio);
            vec2 cellUv = vec2(cell) / uResolution;
            vec2 gridUv = (floor(vUv / cellUv) + 0.5) * cellUv;
            vec4 block = blockAverage(gridUv, cellUv);

            // Fill the cells that straddle the silhouette so the character
            // reads as a blocky sprite rather than a smooth cut-out.
            float nearAlpha = max(alpha, neighborMaxAlpha(vUv, cell * 0.65));

            if (nearAlpha > 0.04) {
                color = block.a > 0.02 ? block.rgb : src.rgb;
                alpha = max(alpha, max(block.a, nearAlpha * 0.85));
            }

            if (uVignette > 0.001 && alpha > 0.02 && src.a > 0.05) {
                float vig = 1.0 - smoothstep(0.85, 1.4, length((vUv - 0.5) * 2.0));
                color *= mix(1.0, vig, clamp(uVignette, 0.0, 1.0) * 0.35);
            }

            gl_FragColor = vec4(color, alpha);
        }
    `,
};
