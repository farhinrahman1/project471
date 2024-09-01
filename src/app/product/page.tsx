"use client";

import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ShoppingCart, Heart, Store, Menu } from "lucide-react"; // Icons for Shop, Wishlist, Cart, and Menu

const Page = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartOpen = () => {
    console.log("Cart Sheet is opened!");
  };

  const handleReturnToShop = () => {
    console.log("Returning to shop...");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-100 border-b p-4 flex justify-between items-center">
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
            <button className="flex items-center" onClick={handleCartOpen}>
              <ShoppingCart className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent position={"bottom" as "bottom"}>
            <div className="p-4 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-semibold">Your Cart is Empty</p>
              <button
                className="btn mt-4 bg-slate-900 rounded-md px-4 p-2 text-white"
                onClick={handleReturnToShop}
              >
                Return to Shop
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-grow bg-slate-900">
        <h1 className="text-white text-center text-3xl font-bold p-4">
          Product Page
        </h1>
      </div>

      <div className="flex justify-around bg-gray-100 py-2 border-t">
        <button className="flex flex-col items-center">
          <Store className="h-6 w-6" />
          <span className="text-xs">Shop</span>
        </button>

        <button className="flex flex-col items-center">
          <Heart className="h-6 w-6" />
          <span className="text-xs">Wishlist</span>
        </button>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex flex-col items-center"
              onClick={handleCartOpen}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xs">Cart</span>
            </button>
          </SheetTrigger>
          <SheetContent position="bottom">
            <div className="p-4 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-semibold">Your Cart is Empty</p>
              <button
                className="btn mt-4 bg-slate-900 px-4 p-2 rounded-md text-white"
                onClick={handleReturnToShop}
              >
                Return to Shop
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Page;
