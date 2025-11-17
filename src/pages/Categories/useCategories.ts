import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/index"
import { actGetCategories } from "@store/categories/categoriesSlice";
export const useCategories = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);

    useEffect(() => {
        if (!categories.length) {
            dispatch(actGetCategories())
        }
    }, [dispatch]);
    return {
        categories,
        loading,
        error
    }
}