import React from "react";
import { useCart } from "../Context/CartContext";

const CartTotal = () => {
  const { getCartAmount } = useCart();
  const currency = "₹";
  const delivery_fee = 20;
  const cartTotal = getCartAmount();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <p>Cart Total</p>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {cartTotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fees</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {cartTotal === 0 ? 0 : cartTotal + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
