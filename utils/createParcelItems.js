export default function createParcelItems(products, cartProducts) {
  /**
   *
   * Flatten the items in the cart so we can be able
   * to call includes on them
   *
   */
  const cartProductIDs = cartProducts.map((product) => product.id);
  return [
    {
      total_actual_weight: 20,
      items: products
        /**
         *
         * We don't want to send all our products out to the user.
         * We only want to send items they have added in their cart
         *
         * So we filtered the list of products
         * where the IDs of the items in the cart
         * matches the ID of the products
         *
         */
        .filter((product) =>
          cartProductIDs.includes(Number(product.identifier))
        )
        /**
         *
         * Map through the filtered products.
         * "We filtered through the products, not the cart"
         *
         */
        .map((product) => {
          /**
           * Some of the required item field are not available
           * on the Easy Ship products dashboard and API.
           *
           * You have to provide it from your cart.
           *
           * That's why the `productInCart` vairable stores
           * a product from the cart if its id matches the ID of a product from the API.
           * This product then complements the product from the API where the API product is lacking
           * For example: quantity, price, description
           */
          const productInCart = cartProducts.find(
            (p) => p.id == product.identifier
          );
          return {
            dimensions: {
              length: product.length,
              width: product.width,
              height: product.height,
            },
            description: productInCart.color,
            sku: product.identifier,
            hs_code: "6211331000",
            contains_battery_pi966: false,
            contains_battery_pi967: false,
            contains_liquids: false,
            origin_country_alpha2: "GB",
            actual_weight: product.weight,
            declared_currency: "GBP",
            quantity: productInCart.quantity,
            declared_customs_value: productInCart.price,
          };
        }),
    },
  ];
}
