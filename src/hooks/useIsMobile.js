import { BREAKPOINT_MOBILE } from "@/constants/constants";
import useWindowSize from "./useWindowSize";

export default function useIsMobile() {
    const { width } = useWindowSize();
    return width <= BREAKPOINT_MOBILE;
}
