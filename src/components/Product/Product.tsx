import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
}

interface ProductCardProps {
  item: ProductItem;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>(item.thumbnail);

  const discountedPrice = Math.ceil(
    item.price - item.price * (item.discountPercentage / 100)
  );

  const truncatedText = `(${item.title}) ${item.description}`;
  const displayText =
    truncatedText.length <= 70
      ? truncatedText
      : truncatedText.substring(0, 70) + "...";

  const handleChooseOption = () => {
    navigate(`/product/${item.id}`);
  };

  // Generate star rating display
  const renderRating = () => {
    const fullStars = Math.floor(item.rating);
    const hasHalfStar = item.rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-600">
            
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-600">
            
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="pb-5 select-none">
      <div className="relative">
        <img
          src={selectedImage}
          alt={item.title}
          className="w-full h-[300px] object-cover"
        />
      </div>

      <div className="pl-0 font-bold mt-3">{displayText}</div>

      <div className="flex items-center gap-1 text-sm my-2">
        {renderRating()}
      </div>

      <div className="pl-0 mt-2">
        <del className="text-gray-500">${item.price}</del> From{" "}
        <span className="text-red-600 text-xl font-bold">
          ${discountedPrice}
        </span>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {item.images.map((pic, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(pic)}
            className={`rounded-full p-0.5 ${
              selectedImage === pic ? "ring-2 ring-black" : ""
            }`}
          >
            <img
              src={pic}
              alt={`${item.title} variant ${i + 1}`}
              className="w-8 h-8 rounded-full border border-black object-cover"
            />
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={handleChooseOption}
          className="py-3 px-9 w-3/4 border border-gray-300 rounded-full
            block mx-auto mt-5 hover:bg-gray-50 transition-colors"
          style={{ textTransform: "none" }}
        >
          Choose Option
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
