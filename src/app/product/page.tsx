"use client";

import React, { useState } from "react";
import { IonIcon } from "@ionic/react";

const Page = () => {
  return (
    <div className="text-center md:hidden">
      <button
        className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        <IonIcon name="grid-outline" />
      </button>
    </div>
  );
};
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ShoppingCart, Heart, Store, Menu } from "lucide-react";

const ProductPage = () => {
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
                              src="https://cdn.pixabay.com/photo/2013/07/13/14/07/apparel-162180_960_720.png"
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
      {/* <div className="flex-grow">
        <div
          id="drawer-example"
          className="fixed top-2 left-0 z-40 mt-12 h-screen p-2 bg-white dark:bg-gray-800"
          aria-labelledby="drawer-label"
        >
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Info
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-example"
            aria-controls="drawer-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-1"
                    id="cat-1"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-1"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Sofa
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-2"
                    id="cat-2"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-2"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Tie
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(9)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-3"
                    id="cat-3"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-3"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Shoes
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(21)</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cat-4"
                    id="cat-4"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="cat-4"
                    className="text-gray-600 ml-3 cusror-pointer"
                  >
                    Tshirt
                  </label>
                  <div className="ml-auto text-gray-600 text-sm">(10)</div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Size
              </h3>
              <div className="flex items-center gap-2">
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-xs"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xs"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XS
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-sm"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-sm"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    S
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-m"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-m"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    M
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-l"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-l"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    L
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-xl"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xl"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XL
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Color
              </h3>
              <div className="flex items-center gap-2">
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="red"
                    className="hidden"
                  />
                  <label
                    htmlFor="red"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fc3d57" }}
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="black"
                    className="hidden"
                  />
                  <label
                    htmlFor="black"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#000" }}
                  ></label>
                </div>
                <div className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id="white"
                    className="hidden"
                  />
                  <label
                    htmlFor="white"
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: "#fff" }}
                  ></label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="px-4 py-2 text-sm mt-4 font-medium text-center text-gray-900 bg-slate-200 border border-slate- rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Learn more
            </a>
            <a
              href="#"
              className="inline-flex items-center mt-4 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get access{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div> */}
      <div className="flex-grow">
        <div className="container grid grid-cols-2 gap-6 mt-12 ml-auto">
          <div>
            <img src="/images/product1.jpg" alt="product1" className="w-full" />
            <div className="grid grid-cols-5 gap-4 mt-4">
              <img
                src="/images/product2.jpg"
                alt="product2"
                className="w-full cursor-pointer border border-primary"
              />
              <img
                src="/images/product3.jpg"
                alt="product3"
                className="w-full cursor-pointer border"
              />
              <img
                src="/images/product4.jpg"
                alt="product4"
                className="w-full cursor-pointer border"
              />
              <img
                src="/images/product5.jpg"
                alt="product5"
                className="w-full cursor-pointer border"
              />
              <img
                src="/images/product6.jpg"
                alt="product6"
                className="w-full cursor-pointer border"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
              Italian L Shape Sofa
            </h2>
            <div className="flex items-center mb-4">
              <div className="flex gap-1 text-sm text-yellow-400">
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span>
                  <i className="fa-solid fa-star"></i>
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>

            <div className="flex items-baseline mb-1 space-x-2 mt-4">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-base text-gray-400 line-through">$55.00</p>
            </div>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
