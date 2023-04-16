export interface IntroData {
  content: string;
  mainImage: {
    title: string;
    url: string;
  };
  secondaryImage: {
    title: string;
    url: string;
  };
  otherImage: {
    title: string;
    url: string;
  };
  title: string;
}

export interface AboutData {
  title: string;
  content: Array<AboutDataContentArray>;
}

interface AboutDataContentArray {
  title: string;
  body: string;
}

export interface ProjectsData {
  title: string;
  galleryACollection: {
    items: Array<GalleryData>;
  };
  galleryBCollection: {
    items: Array<GalleryData>;
  };
  galleryCCollection: {
    items: Array<GalleryData>;
  };
}

export interface GalleryData {
  title: string;
  url: string;
  width: number;
  height: number;
}
