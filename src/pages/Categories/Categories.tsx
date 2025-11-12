import CategoryCard from "@components/Category/Category";
import { Loading } from "@components/feedback";
import { useCategories } from "./useCategories";


const Categories = () => {
    const { categories, loading, error } = useCategories();
    
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
