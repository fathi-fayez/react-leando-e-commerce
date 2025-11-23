import { useEffect } from "react";
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import { SwiperComponent } from "@components/common/index";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import { actGetProductsByCategory, productsCleanUp } from "@store/products/productsSlice";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import WhyChooseUs from "@components/WhyChooseUs/WhyChooseUs";
import Testimonial from "@components/Testimonial/Testimonial";

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

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Welcome to <span className="text-emerald-400">Leando</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto my-8">
                        Where quality meets convenience. We’re more than just an online store —
                        we’re your trusted partner in discovering products that make life better.
                    </p>

                    <Link to="/categories" className="bg-black text-white px-6 py-3 rounded cursor-pointer">Shop now</Link>
                </div>
            </section>


            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
                <Loading loading={loading} error={error}>
                    <SwiperComponent products={displayProducts} slidesPerView={4} />
                </Loading>
            </section>

            <WhyChooseUs />

            <Testimonial />

            {/* CTA */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">Ready to Shop with Confidence?</h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Join thousands who trust Leando every day.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-10 py-4 rounded-full transition-colors"
                    >
                        Start Shopping Now
                        <ArrowRight className="ml-3 w-6 h-6" />
                    </a>
                </div>
            </section>
        </>
    )
}
export default Home
