import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import { actGetCartItems, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } from "@store/cart/cartSlice";
import { actPlaceOrder, resetOrderStatus } from "@store/orders/ordersSlice";
import { LottieHandler } from "@components/feedback/LottieHandler/LottieHandler";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.cart);
    const { loading: orderLoading } = useAppSelector((state) => state.orders);

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        dispatch(actGetCartItems());
    }, [dispatch]);

    // Calculate order summary
    const subtotal = products.reduce((acc: number, item: { total: number }) => acc + item.total, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handlePlaceOrder = async () => {
        setShowConfirmModal(false);
        try {
            await dispatch(actPlaceOrder()).unwrap();
            dispatch(clearCart());
            setOrderPlaced(true);
        } catch (err) {
            console.error("Order failed:", err);
        }
    };

    const handleContinueShopping = () => {
        setOrderPlaced(false);
        dispatch(resetOrderStatus());
    };

    // Order success view
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
                    <p className="text-sm text-gray-500 mb-6">Order confirmation has been sent to your email.</p>
                    <button
                        onClick={handleContinueShopping}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

                {loading === "pending" && (
                    <div className="text-center py-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        <p className="mt-2 text-gray-600">Loading your cart...</p>
                    </div>
                )}

                {loading === "failed" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        {error || "Failed to load cart items"}
                    </div>
                )}

                {loading === "succeeded" && products.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow p-4">
                                <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                                    Cart Items ({products.length})
                                </h2>
                                {products.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b py-4 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">
                                                    ${item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => dispatch(decreaseQuantity(item.id))}
                                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="font-semibold text-lg text-gray-800 w-24 text-right">
                                                ${item.total.toFixed(2)}
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                title="Remove item"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow p-4 sticky top-6">
                                <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">
                                            {shipping === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (8%)</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>

                                    {subtotal < 100 && (
                                        <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                                            Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                                        </p>
                                    )}

                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowConfirmModal(true)}
                                    disabled={orderLoading === "pending"}
                                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {orderLoading === "pending" ? (
                                        <>
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        "Proceed to Checkout"
                                    )}
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                ) : loading === "succeeded" && products.length === 0 ? (
                    <LottieHandler
                        type="empty"
                        message="No items in your cart"
                    />
                ) : null}
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
                        <h3 className="text-xl font-bold mb-2">Confirm Your Order</h3>
                        <p className="text-gray-600 mb-4">
                            You are about to place an order for <strong>${total.toFixed(2)}</strong>.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                            <p className="font-medium mb-1">Order includes:</p>
                            <ul className="text-gray-600 space-y-1">
                                {products.map((item: any) => (
                                    <li key={item.id}>• {item.title} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePlaceOrder}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
