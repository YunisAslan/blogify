import { Helmet } from "react-helmet";
import NewsCard from "@/components/NewsCard";
import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api/news";

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
      <Helmet>
        <title>Blogify | News</title>
      </Helmet>

      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Write, read, subscribe
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {allNews.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })}
      </div>
    </>
  );
}

export default News;
