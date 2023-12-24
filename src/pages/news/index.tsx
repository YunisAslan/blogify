import Hero from "@/components/Hero";
import { Helmet } from "react-helmet";
import NewsSection from "@/components/NewsSection";
import Photography from "@/components/Photography";
import Publishers from "@/components/PublishersSection";

function News() {
  return (
    <>
      <Helmet>
        <title>Blogify | News</title>
      </Helmet>

      {/* <Hero /> */}

      <NewsSection />
      {/* <Photography /> */}
      {/* <Publishers /> */}
    </>
  );
}

export default News;
