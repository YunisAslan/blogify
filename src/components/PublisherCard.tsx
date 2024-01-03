import { Link } from "react-router-dom";

interface PublisherCardProps {
  publisher: Publisher;
}

function PublisherCard({ publisher }: PublisherCardProps) {
  return (
    <Link to={`/publishers/${publisher._id}`} className="px-4 group">
      <div className="w-full h-80 overflow-hidden">
        <img
          src={`http://localhost:6001/uploads/${publisher.profileImg?.filename}`}
          alt={publisher.name}
          className="w-full h-full object-cover transition-all ease-easeInOutQuart duration-300 group-hover:scale-110"
        />
      </div>

      <div className="">
        <h2 className="text-xl my-3 uppercase font-oswald">
          {publisher.username}
        </h2>

        <p className="text-lg font-roboto line-clamp-3">
          {publisher.description}
        </p>
      </div>
    </Link>
  );
}

export default PublisherCard;
