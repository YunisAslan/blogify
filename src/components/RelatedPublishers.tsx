import { getAllPublishers } from "@/services/api/auth";
import { useAuth } from "@/services/context/AuthContextProvider";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RelatedPublishersProps {
  publisherId: string;
}

function RelatedPublishers({ publisherId }: RelatedPublishersProps) {
  const [account] = useAuth();
  const [slicedPublishers, setSlicedPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    async function loadData() {
      const allPublishers = await getAllPublishers();
      setSlicedPublishers(allPublishers.data.slice(0, 4));
    }

    loadData();
  }, [setSlicedPublishers]);

  return (
    <div>
      <button className="cursor-default my-5 w-full bg-black text-white py-1 text-lg text-center uppercase tracking-wide font-oswald block border border-black">
        Publishers
      </button>

      <div className="flex flex-col">
        {slicedPublishers.map((item) => {
          return (
            item._id !== publisherId &&
            item._id !== account?._id && (
              <div
                key={item._id}
                className="flex items-center gap-x-3 py-3 border-b border-black group"
              >
                <Link to={`/publishers/${item._id}`}>
                  <div className="w-24 h-24 overflow-hidden">
                    <img
                      src={item.profileImg}
                      alt=""
                      className="w-full h-full object-cover transition-all ease-easeInOutQuart duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <div>
                  <Link to={`/publishers/${item._id}`}>
                    <h3 className="font-oswald text-lg my-2.5">
                      {item.username}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-x-2">
                    <Link
                      to="/face"
                      className="inline-block hover:scale-110 transition-all duration-500"
                    >
                      <Facebook className="w-5 h-5" />
                    </Link>

                    <Link
                      to="/face"
                      className="inline-block hover:scale-110 transition-all duration-500"
                    >
                      <Instagram className="w-5 h-5" />
                    </Link>

                    <Link
                      to="/face"
                      className="inline-block hover:scale-110 transition-all duration-500"
                    >
                      <Twitter className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default RelatedPublishers;
