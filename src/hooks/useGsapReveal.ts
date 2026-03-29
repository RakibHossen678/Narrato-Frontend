import { RefObject, useEffect } from "react";
import gsap from "gsap";

export const useGsapReveal = (ref: RefObject<HTMLElement | null>): void => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.fromTo(
      ref.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, [ref]);
};
