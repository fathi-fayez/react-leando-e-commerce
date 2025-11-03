import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@components/Product/Product";
import { useAppSelector, useAppDispatch } from "@hooks/index"
import { actGetProductsByCategory, productsCleanUp } from "@store/Products/productsSlice";
import { Loading } from "@components/feedback";

const Products = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        dispatch(actGetProductsByCategory(category as string))

        return () => {
            dispatch(productsCleanUp())
        }
    }, [dispatch, category]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Loading loading={loading} error={error}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 && products.map((product) => (
                        <ProductCard
                            key={product.id}
                            item={product}
                        />
                    ))}
                </div>
            </Loading>
        </div>
    )
}
export default Products
