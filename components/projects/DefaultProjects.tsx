// React
import { useContext, useEffect, useLayoutEffect, useRef } from "react";

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
  // const root = useRef<HTMLElement>(null);
  const galA = useRef<HTMLDivElement>(null);
  const galB = useRef<HTMLDivElement>(null);
  const galC = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // When section enters viewport
  const { ref: root, inView: workIsVisible } = useInView({
    threshold: 0.4,
  });
  /// Context
  const { setSection } = useContext(AppContext);
  /// Do the thing
  useEffect(() => {
    //@ts-ignore
    workIsVisible ? setSection("Work") : setSection("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workIsVisible]);

  useLayoutEffect(() => {
    // https://greensock.com/react/#context
    // TLDR: Needed for react cleanup
    let ctx = gsap.context(() => {
      // Put refs in array then loop through all and add the same effects
      const scrollTrig = [galA.current, galB.current, galC.current];
      scrollTrig.forEach((section) => {
        gsap.to([section], {
          translateX: isMobile ? "-550%" : -2700,
          ease: "expo.out",
          stagger: 2,
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            pin: false,
            pinSpacing: false,
            start: isMobile ? "top 65%" : "top 35%",
            end: isMobile ? "bottom -=100px" : "bottom",
          },
        });
      });
    });
    return () => ctx.revert(); // cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={root} className={styles.projects} id="Work">
      <h1 className={styles.projects__title}>{data.title}</h1>
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
