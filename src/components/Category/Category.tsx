import { Link } from "react-router-dom";


export interface CategoryItem {
  slug: string;
  name: string;
  url: string;
}

interface CategoryCardProps {
  item: CategoryItem;
}

const CategoryCard = ({ item }: CategoryCardProps) => {


  return (
    <div className="pb-5 select-none">
      <Link
        to={`/products/${item.slug}`}
      >
        <div className="w-full h-[250px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center
          group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300">
              {item.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <button

          className="py-3 px-9 w-full border border-gray-300 rounded-full
            block mx-auto hover:bg-gray-50 transition-colors font-medium"
          style={{ textTransform: "none" }}
        >
          <Link
            to={`/products/${item.slug}`}
          >
            Browse {item.name}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
