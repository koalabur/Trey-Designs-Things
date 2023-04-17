// Next
import Image from "next/image";

// Types
import { GalleryData } from "../../shared/interfaces";

// Import Swiper React components
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/css/navigation";

// Styles
import styles from "@/styles/components/gallery/BasicGallery.module.scss";

export default function BasicGallery({ gallery }: { gallery: GalleryData[] }) {
  return (
    <>
      <Swiper
        modules={[Pagination, Navigation, FreeMode, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        freeMode={true}
        slidesPerView={"auto"}
        spaceBetween={28}
        grabCursor={true}
        pagination={true}
        navigation={true}
      >
        {gallery.map((image) => (
          <SwiperSlide key={image.title} className={styles.gallery}>
            <Image
              className={styles.gallery__item}
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.url}
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
