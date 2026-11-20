import { isMobileViewport } from "@/constants/layout";
import useWindowSize from "@/hooks/useWindowSize";

export default function useIsMobile() {
    const { width } = useWindowSize();
    return isMobileViewport(width);
}
