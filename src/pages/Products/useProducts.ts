import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@hooks/index"
import { actGetProductsByCategory, productsCleanUp } from "@store/products/productsSlice";

export const useProducts = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        dispatch(actGetProductsByCategory(category as string))

        return () => {
            dispatch(productsCleanUp())
        }
    }, [dispatch, category]);
    return {
        loading,
        products,
        error
    }
};