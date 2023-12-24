import moment from "moment";

interface NewsCardProps {
  item: News;
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <div className="px-4">

      <div className="w-full h-40">
        <img src={item.thumbnailImg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="font-oswald">
        <h2 className="text-3xl mt-2">{item.title}</h2>
        <p className="uppercase text-base">
          {moment(new Date(item.createdAt)).format("LL")}
        </p>

        <p className="pt-2 font-roboto line-clamp-5">
          {item.newsBody}
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
