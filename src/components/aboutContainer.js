"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "./header/header";
import ProfilePic from "./profilePic";
import WithAnimation from "./withAnimation";

export default function AboutContainer({ lang, dict }) {
    const [isShowingProfilePic, setIsShowingProfilePic] = useState(true);
    const [disableAnimation, setDisableAnimation] = useState(true);
    const callback = useCallback(
        (value) => {
            setIsShowingProfilePic(value);
            if (disableAnimation) {
                setDisableAnimation(value);
            } else {
                setDisableAnimation(false);
            }
        },
        [disableAnimation]
    );
    return (
        <>
            <Header
                dict={dict}
                lang={lang}
                showProfilePic={!isShowingProfilePic}
                isAboutPage
                disableAnimation={disableAnimation}
            />
            <main className="main">
                <div className="main-bg"></div>
                <div className="main-bg layer-1"></div>
                <div className="main-bg layer-2"></div>
                <div className="main-bg layer-3"></div>
                <div className="about">
                    <ProfilePic
                        className="about-profile-pic"
                        callback={callback}
                        isAboutPage
                    />
                    <WithAnimation>
                        <div className="about-description-container">
                            <h1>Lorenzo Matías López</h1>
                            {dict.about.content.map((c, i) => (
                                <p key={i}>{c}</p>
                            ))}
                        </div>
                    </WithAnimation>
                </div>
            </main>
        </>
    );
}
