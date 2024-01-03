import { getAllPublishers } from "@/services/api/auth";
import { useEffect, useState } from "react";
import PublisherCard from "./PublisherCard";

function PublishersSection() {
  const [slicedPublishers, setSlicedPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    async function loadData() {
      const publishers = await getAllPublishers();
      setSlicedPublishers(publishers.data.slice(0, 4));
    }

    loadData();
  }, [setSlicedPublishers]);

  return (
    <div className="border-b-2 border-black pb-20">
      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Publishers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {slicedPublishers.length === 0 ? (
          <p className="text-center text-2xl font-bold col-span-12 text-orange-400">
            There is currently no data you are looking for
          </p>
        ) : (
          slicedPublishers.map((publisher) => {
            return <PublisherCard key={publisher._id} publisher={publisher} />;
          })
        )}
      </div>
    </div>
  );
}

export default PublishersSection;
