import HeaderMenuIcon from "./headerMenuIcon";
import { useCallback, useRef, useState } from "react";
import MobileHeaderDialog from "./mobileHeaderDialog";

export default function MobileHeader({ dict, lang }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ref = useRef();
    const handleModalOpen = useCallback(() => {
        ref.current.showModal();
    }, []);
    const handleModalClose = useCallback(() => {
        ref.current.close();
        setIsMenuOpen(false);
    }, []);
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">Lorenzo Lopez</h1>
                <HeaderMenuIcon
                    handleModalOpen={handleModalOpen}
                    handleModalClose={handleModalClose}
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />
                <MobileHeaderDialog
                    handleClose={handleModalClose}
                    ref={ref}
                    dict={dict}
                    lang={lang}
                />
            </div>
        </header>
    );
}
