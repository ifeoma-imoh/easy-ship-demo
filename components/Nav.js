import React from "react";
import Link from "next/link";

import { useCart } from "react-use-cart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const { totalItems } = useCart();

  const [cartTotal, setCartTotal] = React.useState(0);

  React.useEffect(() => {
    setCartTotal(totalItems);
  }, [totalItems]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                
                <Link
                  href="/"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                >
                  Store
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex items-center">
              <Link href="/cart" className="px-4 relative">
                <span className="absolute right-2 -top-3 bg-indigo-500 text-white w-5 h-5 text-center rounded-full text-sm">
                  {cartTotal}
                </span>
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
