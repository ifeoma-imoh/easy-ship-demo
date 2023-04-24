import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";

function CartItems() {
  const { items, updateItemQuantity } = useCart();
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setProducts(items);
  }, [items]);

  return (
    <section aria-labelledby="cart-heading" className="lg:col-span-7">
      <h2 id="cart-heading" className="sr-only">
        Items in your shopping cart
      </h2>

      {products.length > 0 ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          {products.map((product) => (
            <li key={product.id} className="flex py-6 sm:py-10">
              <div className="flex-shrink-0">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <a className="font-medium text-gray-700 hover:text-gray-800">
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="text-gray-500">{product.color}</p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      £{product.price}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pr-9">
                    <div className="absolute right-0 top-0">
                      <button
                        type="button"
                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          updateItemQuantity(product.id, 0);
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>There are no items in your cart</div>
      )}
    </section>
  );
}

export default CartItems;
