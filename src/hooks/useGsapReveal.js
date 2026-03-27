import { useLayoutEffect } from "react";
import gsap from "gsap";

const useGsapReveal = (scopeRef, selector = ".reveal") => {
  useLayoutEffect(() => {
    if (!scopeRef?.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        },
      );
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef, selector]);
};

export default useGsapReveal;
