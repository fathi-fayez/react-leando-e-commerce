import { useState, useEffect } from "react";
import CategoryCard from "@components/Category/Category";
import type { CategoryItem } from "@components/Category/Category";
import { useAppSelector, useAppDispatch } from "@hooks/index"
import { actGetCategories } from "@store/Categories/categoriesSlice";

const Categories = () => {
    const dispatch = useAppDispatch();
    const {categories, loading, error} = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(actGetCategories())
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Shop by Category</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.slug}
                        item={category}
                    />
                ))}
            </div>
        </div>
    )
}
export default Categories
