import { useProducts } from "./useProducts";
import ProductCard from "@components/Product/Product";
import { Loading } from "@components/feedback";

const Products = () => {
    const { loading, products, error } = useProducts();

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
