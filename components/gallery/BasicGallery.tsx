// Next
import Image from "next/image";

// Types
import { GalleryData } from "../../shared/interfaces";

// Styles
import styles from "@/styles/components/gallery/BasicGallery.module.scss";

export default function BasicGallery({ gallery }: { gallery: GalleryData[] }) {
  return (
    <>
      {gallery.map((image) => (
        <Image
          className={styles.gallery}
          key={image.title}
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
          placeholder="blur"
          blurDataURL={image.url}
        />
      ))}
    </>
  );
}
