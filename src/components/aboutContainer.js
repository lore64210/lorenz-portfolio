"use client";

import { useState } from "react";
import Header from "./header/header";
import ProfilePic from "./profilePic";
import WithAnimation from "./withAnimation";

export default function AboutContainer({ lang, dict }) {
    const [isShowingProfilePic, setIsShowingProfilePic] = useState(false);
    return (
        <>
            <Header
                dict={dict}
                lang={lang}
                showProfilePic={!isShowingProfilePic}
            />
            <main className="main">
                <div className="main-bg"></div>
                <div className="main-bg layer-1"></div>
                <div className="main-bg layer-2"></div>
                <div className="main-bg layer-3"></div>
                <div className="about">
                    <ProfilePic
                        className="about-profile-pic"
                        callback={setIsShowingProfilePic}
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
