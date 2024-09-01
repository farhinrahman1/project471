"use client";

import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ShoppingCart, Heart, Store, Menu } from "lucide-react";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartOpen = () => {
    console.log("Cart Sheet is opened!");
  };

  const handleReturnToShop = () => {
    console.log("Returning to shop...");
  };

  const handleAddToCart = (item) => {
    console.log("Adding to cart...", item);
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: updatedItems[index].quantity + 1,
      };
      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].quantity === 1) {
        updatedItems.splice(index, 1);
      } else {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };
      }
      return updatedItems;
    });
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white border-b p-3 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center">
              <Menu className="h-6 w-6" />
              <span className="ml-2">Menu</span>
            </button>
          </SheetTrigger>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="relative flex items-center"
              onClick={handleCartOpen}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent position="bottom">
            <div className="p-4 text-center">
              {cartItemCount === 0 ? (
                <p className="text-lg font-semibold">Your Cart is Empty</p>
              ) : (
                <div>
                  <p className="text-2xl font-semibold flex flex-row">
                    Your Cart
                  </p>
                  <ul className="mt-4 space-y-4">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col gap-4 border-b border-gray-200 pb-4"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-4 flex-1">
                            <img
                              src="https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_960_720.png" // Replace with actual image URL
                              alt={item.name}
                              className="h-20 w-[42%] object-cover rounded-md"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-sm font-semibold">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-700">
                                ID: {item.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center  gap-2">
                            <button
                              className="bg-gray-200 p-[4%] rounded-md"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="bg-gray-200 p-[4%] rounded-md"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                            <p className="font-semibold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 text-left">
                    <p className="font-semibold">
                      Subtotal: ${subtotal.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="btn mt-4 bg-slate-900 px-4 p-2 rounded-md text-white w-40"
                    onClick={() => console.log("Proceed to checkout")}
                  >
                    Checkout
                  </button>
                </div>
              )}
              <button
                className="btn mt-4 bg-white font-bold border border-black hover:bg-slate-200 px-4 p-2 rounded-md text-black w-40"
                onClick={handleReturnToShop}
              >
                Return to Shop
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-grow bg-slate-900">
        <div className="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12">
          <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_960_720.png" // Replace with your image URL
              alt="Long Chair"
              className="h-48 object-cover bg-black rounded-lg"
            />
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">Blue T-shirt</span>
                  <p className="text-xs text-gray-700">ID: 23432252</p>
                </div>
                <span className="font-bold text-red-600">$25.99</span>
              </div>
              <button
                className="hover:bg-sky-700 text-gray-50 bg-sky-800 p-2 rounded-md"
                onClick={() =>
                  handleAddToCart({
                    id: "23432252",
                    name: "Blue T-shirt",
                    price: 25.99,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
