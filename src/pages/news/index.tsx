import Hero from "@/components/Hero";
import { Helmet } from "react-helmet";
import NewsSection from "@/components/NewsSection"

function News() {
  return (
    <>
      <Helmet>
        <title>Blogify | News</title>
      </Helmet>

      <Hero />

      <NewsSection />
    </>
  );
}

export default News;
