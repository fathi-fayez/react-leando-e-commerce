import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/index"
// import CartItem from "@components/CartItem/CartItem";
import { actGetCartItems } from "@store/cart/cartSlice";
import { LottieHandler } from "@components/feedback/LottieHandler/LottieHandler";
const Cart = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(actGetCartItems());
    }, [dispatch]);
    return (
        <div className="cart-container">
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6">🛍️ My Cart</h1>
                {products.length ? (
                    <div className="bg-white rounded-xl shadow p-4">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{item.title}</h2>
                                        <p className="text-gray-500">
                                            ${item.price} × {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="font-semibold text-lg">${item.total}</div>
                            </div>
                        ))}

                        <div className="text-right mt-4 font-bold text-xl">
                            Total: ${products.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
                        </div>
                    </div>
                ) : (
                    <LottieHandler
                        type="empty"
                        message="No items in your cart"
                    />
                )}
            </div>

        </div>
    );
};

export default Cart;
