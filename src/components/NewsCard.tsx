import moment from "moment";
import { Link } from "react-router-dom";

interface NewsCardProps {
  item: News;
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="px-4">
      <Link className="bg-green-200" to={`/news/${item._id}`}>
        <div className="w-full h-40">
          <img
            src={item.thumbnailImg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="font-oswald">
          <h2 className="text-3xl mt-2">{item.title}</h2>
          <p className="uppercase text-base">
            {moment(new Date(item.createdAt)).format("LL")}
          </p>

          <p className="pt-2 font-roboto line-clamp-5">{item.newsBody}</p>
        </div>
      </Link>
    </div>
  );
}

export default NewsCard;
