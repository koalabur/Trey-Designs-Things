// Next
import Image from "next/image";

// Types
import { IntroData } from "../../shared/interfaces";

// Styles
import styles from "@/styles/components/intro/DefaultIntro.module.scss";

export default function DefaultLayout({ data }: { data: IntroData }) {
  return (
    <section className={styles.intro}>
      <div className={styles.intro__content}>
        <h1 className={styles["intro__content-title"]}>{data.title}</h1>
        <p className={styles["intro__content-body"]}>{data.content}</p>
      </div>
      <div className={styles.intro__images}>
        <div className={styles["intro__images-circle"]}></div>
        <Image
          className={styles["intro__images-main"]}
          src={data.mainImage.url}
          alt={data.mainImage.title}
          width={443}
          height={484}
          placeholder="blur"
          blurDataURL={data.mainImage.url}
          loading="eager"
        />
        <Image
          className={styles["intro__images-secondary"]}
          src={data.secondaryImage.url}
          alt={data.secondaryImage.title}
          width={180}
          height={180}
        />
        <Image
          className={styles["intro__images-other"]}
          src={data.otherImage.url}
          alt={data.otherImage.title}
          width={262}
          height={306}
        />
      </div>
    </section>
  );
}
