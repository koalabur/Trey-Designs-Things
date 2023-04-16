// React
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

// Types
import { ProjectsData } from "../../shared/interfaces";

// Components
import BasicGallery from "../gallery/BasicGallery";

// Context
import { AppContext } from "../../context/AppContext";

// React Intersection Obs
import { useInView } from "react-intersection-observer";

// Import media query
import { useMediaQuery } from "react-responsive";

// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Styles
import styles from "@/styles/components/projects/DefaultProjects.module.scss";

export default function DefaultProjects({ data }: { data: ProjectsData }) {
  const root = useRef<HTMLDivElement | Element | null>(null);
  const galA = useRef<HTMLDivElement>(null);
  const galB = useRef<HTMLDivElement>(null);
  const galC = useRef<HTMLDivElement>(null);

  const isLaptop = useMediaQuery({ query: "(max-width: 1300px)" });
  const isAlmostMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isPhone = useMediaQuery({ query: "(max-width: 480px)" });

  // Intersection Obs
  const { ref: inViewRef, inView: workIsVisible } = useInView({
    threshold: 0.4,
  });
  /// Use `useCallback` so we don't recreate the function on each render
  /// Allows multiple functions (like intersec obs and gsap) to access the same ref
  const setRootRefs = useCallback(
    (node: Element | null | undefined) => {
      /// Ref's from useRef needs to have the node assigned to `current`
      root.current = node;
      /// Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef]
  );
  /// Context
  const { setSection } = useContext(AppContext);
  /// Update context when section is in/out viewport
  useEffect(() => {
    //@ts-ignore
    workIsVisible ? setSection("Work") : setSection("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workIsVisible]);
  /// GSAP
  useLayoutEffect(() => {
    /// https://greensock.com/react/#context
    /// TLDR: Needed for react cleanup
    let ctx = gsap.context(() => {
      gsap.to(galA.current, {
        xPercent: isMobile
          ? -465
          : isAlmostMobile
            ? -220
            : isLaptop
              ? -170
              : -80,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          scrub: 1,
          pin: false,
          pinSpacing: false,
          start: isMobile ? "top 30%" : "top 35%",
          end: isMobile ? "bottom -=100px" : "bottom",
        },
      });
      gsap.to(galB.current, {
        xPercent: isMobile
          ? -625
          : isAlmostMobile
            ? -320
            : isLaptop
              ? -235
              : -110,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          scrub: 1,
          pin: false,
          pinSpacing: false,
          start: isMobile ? "center 68%" : "center 45%",
          end: isMobile ? "bottom -600px" : "bottom",
        },
      });
      gsap.to(galC.current, {
        xPercent: isMobile
          ? -360
          : isAlmostMobile
            ? -180
            : isLaptop
              ? -140
              : -60,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          scrub: 1,
          pin: false,
          pinSpacing: false,
          start: isMobile ? "center 30%" : "center 20%",
          end: isMobile ? "bottom -500px" : "bottom",
        },
      });
    }, root);
    return () => ctx.revert(); // cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={setRootRefs} className={styles.projects} id="Work">
      <h2 className={styles.projects__title}>{data.title}</h2>
      {!isPhone && (
        <p className={styles.projects__notice}>
          If you are having trouble viewing the elements as they scroll, it is
          recommended to grab the scrollbar with your mouse for a smoother
          experience.
        </p>
      )}
      <div className={styles.projects__row} ref={galA}>
        <BasicGallery gallery={data.galleryACollection.items} />
      </div>
      <div className={styles.projects__row} ref={galB}>
        <BasicGallery gallery={data.galleryBCollection.items} />
      </div>
      <div className={styles.projects__row} ref={galC}>
        <BasicGallery gallery={data.galleryCCollection.items} />
      </div>
    </section>
  );
}
