// Next
import Head from "next/head";

// Custom Hooks
import UseContentful from "@/../hooks/contentful";

// Components
import Intro from "@/../components/intro/DefaultIntro";
import About from "@/../components/about/DefaultAbout";
import Projects from "@/../components/projects/DefaultProjects";

// Types
import { IntroData, AboutData, ProjectsData } from "../../shared/interfaces";

export default function SPA({
  introData,
  aboutData,
  projectsData,
}: {
  introData: IntroData;
  aboutData: AboutData;
  projectsData: ProjectsData;
}) {
  return (
    <>
      <Head>
        <title>Trey Designs Things</title>
        <meta
          name="description"
          content="A multi-disciplinary graphic designer with spanning work in marketing, branding, UI design, and advertising. I enjoy working on new concepts that push the envelope of visual storytelling through thoughtful design."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#fdfdfd" />
        <meta name="theme-color" content="#fdfdfd" />
      </Head>
      <Intro data={introData} />
      <About data={aboutData} />
      <Projects data={projectsData} />
    </>
  );
}

// Rendering contentful data on the server side then passing to components
// React is dumb, has to be done this way for a better UX
// just end me now
export async function getServerSideProps() {
  // Data for <Intro /> component
  const introDataQuery = `
    query introCollectionQuery {
      introCollection {
        items {
          title,
          content,
          mainImage{
            url,
            title
          },
          secondaryImage{
            url,
            title
          },
          otherImage{
            url,
            title
          }
        }
      }
    }
  `;
  const introDataRaw = await UseContentful(introDataQuery);
  const introData: IntroData = Object.assign(
    {},
    ...introDataRaw.data.introCollection.items
  );

  // Data for <About /> component
  const aboutDataQuery = `
    query aboutCollectionQuery {
      aboutCollection {
        items {
          title
          content
        }
      }
    }
  `;
  const aboutDataRaw = await UseContentful(aboutDataQuery);
  const aboutData: AboutData = Object.assign(
    {},
    ...aboutDataRaw.data.aboutCollection.items
  );

  // Data for <Projects /> component
  const projectsDataQuery = `
    query projectsCollectionQuery {
      projectsCollection(limit: 10) {
        items {
          title
          galleryACollection {
            items {
              title
              url
              width
              height
            }
          }
          galleryBCollection {
            items {
              title
              url
              width
              height
            }
          }
          galleryCCollection {
            items {
              title
              url
              width
              height
            }
          }
        }
      }
    }
  `;
  const projectsDataRaw = await UseContentful(projectsDataQuery);
  const projectsData: ProjectsData = Object.assign(
    {},
    ...projectsDataRaw.data.projectsCollection.items
  );

  return {
    props: {
      introData,
      aboutData,
      projectsData,
    },
  };
}
