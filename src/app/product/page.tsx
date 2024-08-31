"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: "Bag", price: 50, quantity: 1 },
    { id: 2, name: "Oven", price: 200, quantity: 1 },
    { id: 3, name: "Watch", price: 100, quantity: 1 },
    { id: 4, name: "Clothes", price: 75, quantity: 1 },
  ]);

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeProduct = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const getSubTotal = () => {
    return getTotalAmount();
  };

  const getSalesTax = () => {
    const taxRate = 0.05; // 5% sales tax
    return getSubTotal() * taxRate;
  };

  const getGrandTotal = () => {
    return getSubTotal() + getSalesTax();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-black">
      <div className="bg-white p-6 max-w-lg w-full rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Your Cart ({cart.length} items)
        </h1>

        <ul className="mb-4">
          {cart.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span>
              <div className="flex items-center">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-2"
                >
                  <span className="font-bold">-</span>
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-2"
                >
                  <span className="font-bold">+</span>
                </button>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <div>Subtotal: ${getSubTotal().toFixed(2)}</div>
          <div>Sales Tax (5%): ${getSalesTax().toFixed(2)}</div>
          <div className="font-bold text-lg">
            Grand Total: ${getGrandTotal().toFixed(2)}
          </div>
        </div>
        <button className="bg-slate-900 text-white w-full py-2 mt-4 rounded hover:bg-slate-800">
          Checkout
        </button>
      </div>
    </div>
  );
}
