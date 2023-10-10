import Link from "next/link";
import { forwardRef, useCallback } from "react";
import Accordeon from "../accordeon";

export default forwardRef(function MobileHeaderDialog(
    { handleClose, dict },
    ref
) {
    const handleDialogClose = useCallback(
        (event) => {
            const rect = event.target.getBoundingClientRect();
            if (
                rect.left > event.clientX ||
                rect.right < event.clientX ||
                rect.top > event.clientY ||
                rect.bottom < event.clientY
            ) {
                handleClose?.();
            }
        },
        [handleClose]
    );

    return (
        <dialog className="header-dialog" ref={ref} onClick={handleDialogClose}>
            <div>
                <Link href="/" className="header-nav-item">
                    <h3>{dict.header.home}</h3>
                </Link>
                <Link href="/about-me" className="header-nav-item">
                    <h3>{dict.header["about-me"]}</h3>
                </Link>
                <Accordeon
                    headerClassName="header-nav-item"
                    items={[
                        {
                            show: true,
                            header: <h3>{dict.header.projects}</h3>,
                            content: (
                                <>
                                    <h4 className="header-nav-item">
                                        {dict.projects["portfolio-maker"].title}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.projects["historia-humo"].title}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.projects["organizer"].title}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.projects["planet-shop"].title}
                                    </h4>
                                </>
                            ),
                        },
                        {
                            show: true,
                            header: <h3>{dict.header.playground}</h3>,
                            content: (
                                <>
                                    <h4 className="header-nav-item">
                                        {dict.playground["maze-generator"]}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.playground["balls-ecosystem"]}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.playground["path-finder"]}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.playground["traveling-salesman"]}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.playground["linear-regression"]}
                                    </h4>
                                    <h4 className="header-nav-item">
                                        {dict.playground["terrain"]}
                                    </h4>
                                </>
                            ),
                        },
                    ]}
                />
            </div>
        </dialog>
    );
});
