// React
import { useContext, useEffect } from "react";

// Intersection Obs
import { useInView } from "react-intersection-observer";

// Context
import { AppContext } from "../../context/AppContext";

// Types
import { AboutData } from "../../shared/interfaces";

// React-responsive
import { useMediaQuery } from "react-responsive";

// Import Swiper React components
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/css/navigation";

// Styles
import styles from "@/styles/components/about/DefaultAbout.module.scss";

export default function DefaultAbout({ data }: { data: AboutData }) {
  // When section enters viewport
  const { ref: about, inView: aboutIsVisible } = useInView({
    threshold: 0.4,
  });
  /// Context
  const { setSection } = useContext(AppContext);
  /// Do the thing
  useEffect(() => {
    //@ts-ignore
    aboutIsVisible ? setSection("What-I-Do") : setSection("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aboutIsVisible]);

  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isPhone = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <section className={styles.about} id="What-I-Do" ref={about}>
      <h2 className={styles["about__title"]}>{data.title}</h2>
      <div className={styles["about__divider"]}>
        <div className={styles["about__divider-circle"]}></div>
        <div className={styles["about__divider-line"]}></div>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        navigation={true}
        slidesPerView={isPhone ? 1 : isLaptop ? 2 : 4}
        spaceBetween={80}
        grabCursor={true}
        pagination={true}
        className={styles["about__content"]}
      >
        {data.content.map((content) => (
          <SwiperSlide
            key={content.title}
            className={styles["about__content-item"]}
          >
            <h3 className={styles["about__content-item-title"]}>
              {content.title}
            </h3>
            <p className={styles["about__content-item-body"]}>{content.body}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
