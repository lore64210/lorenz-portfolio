import { forwardRef, useCallback } from "react";
import HeaderMenu from "./headerMenu";

export default forwardRef(function MobileHeaderDialog(
    { handleClose, dict, lang },
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
            <HeaderMenu dict={dict} lang={lang} />
        </dialog>
    );
});
