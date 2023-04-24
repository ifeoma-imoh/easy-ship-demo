import React from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";

import NavBar from "@/components/Nav";

import CartItems from "@/components/CartItems";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import CheckoutShippingMethods from "@/components/CheckoutShippingMethods";

function Cart() {
  const { items } = useCart();
  const [products, setProducts] = React.useState([]);

  const [contact, setContact] = React.useState(null);
  const [shippingRates, setShippingRates] = React.useState([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    React.useState(null);

  const router = useRouter();

  React.useEffect(() => {
    setProducts(items);
  }, [items]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const rateRes = await fetch("/api/rates", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: formData, products }),
    });
    const rates = await rateRes.json();
    setContact(formData);
    setShippingRates(rates);
    setSelectedDeliveryMethod(rates[0]);
  };

  const onCheckout = async () => {
    const shipRes = await fetch("/api/ship", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact,
        products,
        courier_id: selectedDeliveryMethod.courier_id,
      }),
    });
    const shipment = await shipRes.json();
    console.log(shipment);
    if (shipment.error) {
      router.push({
        pathname: "/error",
        query: {
          message: shipment.error.message,
          code: shipment.error.message,
        },
      });
    }
  };

  return (
    <div className="bg-white">
      <NavBar></NavBar>

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <CartItems />

          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            {/* Checkout form */}
            <CheckoutForm onSubmit={onSubmit} />
            {/* Shipping method */}
            {shippingRates.length > 0 && (
              <CheckoutShippingMethods
                shippingRates={shippingRates}
                selectedDeliveryMethod={selectedDeliveryMethod}
                setSelectedDeliveryMethod={setSelectedDeliveryMethod}
              />
            )}
            {/* Order summary */}
            {selectedDeliveryMethod && (
              <CheckoutOrderSummary
                selectedDeliveryMethod={selectedDeliveryMethod}
                onCheckout={onCheckout}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;
