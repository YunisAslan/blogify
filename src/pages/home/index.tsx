import Publishers from "@/components/PublishersSection";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import Photography from "@/components/Photography";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

function Home() {
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Blogify</title>
      </Helmet>

      <Hero />

      <NewsSection />
      <Photography />
      <Publishers />
    </>
  );
}

export default Home;
