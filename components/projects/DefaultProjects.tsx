// React
import { useContext, useEffect } from "react";

// Types
import { ProjectsData } from "../../shared/interfaces";

// Components
import BasicGallery from "../gallery/CarouselGallery";

// Context
import { AppContext } from "../../context/AppContext";

// React Intersection Obs
import { useInView } from "react-intersection-observer";

// Styles
import styles from "@/styles/components/projects/DefaultProjects.module.scss";

export default function DefaultProjects({ data }: { data: ProjectsData }) {

  // Intersection Obs
  const { ref: root, inView: workIsVisible } = useInView({
    threshold: 0.4,
  });
  /// Context
  const { setSection } = useContext(AppContext);
  /// Update context when section is in/out viewport
  useEffect(() => {
    //@ts-ignore
    workIsVisible ? setSection("Work") : setSection("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workIsVisible]);

  return (
    <section ref={root} className={styles.projects} id="Work">
      <h2 className={styles.projects__title}>{data.title}</h2>
      <div className={styles.projects__row}>
        <BasicGallery gallery={data.galleryACollection.items} />
      </div>
      <div className={styles.projects__row}>
        <BasicGallery gallery={data.galleryBCollection.items} />
      </div>
      <div className={styles.projects__row}>
        <BasicGallery gallery={data.galleryCCollection.items} />
      </div>
    </section>
  );
}
