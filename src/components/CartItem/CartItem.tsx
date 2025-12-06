import { memo } from "react";
import type { TProduct } from "@customTypes/product";
import styles from "./style.module.css";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
    styles;

type CartItemProps = TProduct & {
    img: string;
    max: number;
    quantity: number;
    changeQuantityHandler: (id: number, quantity: number) => void;
    removeItemHandler: (id: number) => void;
};

const CartItem = memo(
    ({
        id,
        title,
        img,
        price,
        max,
        quantity,
        changeQuantityHandler,
        removeItemHandler,
    }: CartItemProps) => {
        // render option list
        const renderOptions = Array(max)
            .fill(0)
            .map((_, idx) => {
                const quantity = ++idx;
                return (
                    <option value={quantity} key={quantity}>
                        {quantity}
                    </option>
                );
            });

        const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const quantity = +event.target.value;
            changeQuantityHandler(id, quantity);
        };

        return (
            <div className={cartItem}>
                <div className={product}>
                    <div className={productImg}>
                        <img src={img} alt={title} />
                    </div>
                    <div className={productInfo}>
                        <h2>{title}</h2>
                        <h3>{price.toFixed(2)} EGP</h3>
                        <button
                            style={{ color: "white", width: "100px" }}
                            className="mt-auto"
                            onClick={() => removeItemHandler(id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>

                <div className={cartItemSelection}>
                    <span className="d-block mb-1">Quantity</span>
                    <select name="" id="" value={quantity} onChange={changeQuantity}>
                        {renderOptions}
                    </select>
                </div>
            </div>
        );
    }
);

export default CartItem;