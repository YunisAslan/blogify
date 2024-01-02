import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getAllPublishers } from "@/services/api/auth";
import PublisherCard from "@/components/PublisherCard";

function Publishers() {
  const [allPublishers, setAllPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    async function loadData() {
      const publishers = await getAllPublishers();
      setAllPublishers(publishers.data);
    }

    loadData();
  }, [setAllPublishers]);

  return (
    <>
      <Helmet>
        <title>Blogify | Publishers</title>
      </Helmet>

      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Our Publishers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {allPublishers.map((item) => {
          return <PublisherCard publisher={item} key={item._id} />;
        })}
      </div>
    </>
  );
}

export default Publishers;
