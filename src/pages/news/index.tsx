import Hero from "@/components/Hero";
import { Helmet } from "react-helmet";
import NewsSection from "@/components/NewsSection";
import Photography from "@/components/Photography";
import Publishers from "@/components/PublishersSection";
import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api/news";
import CreateImage from "@/practice/createImage";

function News() {
  const [allNews, setAllNews] = useState<News[]>([]);

  useEffect(() => {
    async function loadData() {
      const news = await getAllNews();
      setAllNews(news.data);
    }

    loadData();
  }, [setAllNews]);

  return (
    <>
      {/* <Helmet>
        <title>Blogify | News</title>
      </Helmet>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {allNews.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })}
      </div> */}

      <CreateImage />
    </>
  );
}

export default News;
