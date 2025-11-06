import { Link } from "react-router";

interface PostCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  id: string;
}

export function PostCard({ image, title, price, category, id }: PostCardProps) {
  return (
    <Link to={`/p/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-green-600 font-bold mb-2">{price}</p>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
      </div>
    </Link>
  );
}
