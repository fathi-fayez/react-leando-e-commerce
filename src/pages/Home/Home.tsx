import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SwiperComponent } from "@components/common/index";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import { actGetProductsByCategory, productsCleanUp } from "@store/products/productsSlice";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import WhyChooseUs from "@components/WhyChooseUs/WhyChooseUs";

const Home = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.categories);

    useEffect(() => {
        // Fetch categories first if not already loaded
        if (categories.length === 0) {
            dispatch(actGetCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        // Fetch products from a random category when categories are available
        if (categories.length > 0) {
            // Generate random index between 0 and 5, but not exceeding categories length
            const maxIndex = Math.min(5, categories.length - 1);
            const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
            const selectedCategory = categories[randomIndex];
            // Use prefix or title as the category identifier for the API
            const categoryIdentifier = (selectedCategory as any).slug || (selectedCategory as any).name || selectedCategory.prefix || selectedCategory.title;
            dispatch(actGetProductsByCategory(categoryIdentifier));
        }

        return () => {
            dispatch(productsCleanUp());
        };
    }, [dispatch, categories]);

    // Limit products to show in swiper (e.g., first 10)
    const displayProducts = products.slice(0, 10);

    return (
        <>
            <section className="bg-gray-100 py-40 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Discount up to 50%</h1>
                <p className="text-gray-600 mb-6">Best selling products with best prices</p>
                <Link to="/categories" className="bg-black text-white px-6 py-3 rounded cursor-pointer">Shop now</Link>
            </section>

            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
                <Loading loading={loading} error={error}>
                    <SwiperComponent products={displayProducts} slidesPerView={4} />
                </Loading>
            </section>

            <WhyChooseUs />
        </>
    )
}
export default Home
