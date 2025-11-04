import { useEffect } from "react";
import CategoryCard from "@components/Category/Category";
import { useAppSelector, useAppDispatch } from "@hooks/index"
import { actGetCategories } from "@store/Categories/categoriesSlice";
import { Loading } from "@components/feedback";

const Categories = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);

    useEffect(() => {
        if (!categories.length) {
            dispatch(actGetCategories())
        }
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Loading loading={loading} error={error}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.slug}
                            item={category}
                        />
                    ))}
                </div>
            </Loading>
        </div>
    )
}
export default Categories 
