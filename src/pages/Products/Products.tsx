import { useState, useEffect } from "react";
import ProductCard from "@components/Product/Product";
import type { ProductItem } from "@components/Product/Product";

const Products = () => {
    const [products, setProducts] = useState<ProductItem[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=10')
            .then(res => res.json())
            .then((data) => {
                setProducts(data.products)
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to Leando E-commerce</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        item={product}
                    />
                ))}
            </div>
        </div>
    )
}
export default Products
