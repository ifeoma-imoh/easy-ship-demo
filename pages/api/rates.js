import createParcelItems from "@/utils/createParcelItems";
import api from "api";

/**
 *
 * Configure the SDK with our API key.
 *
 */
const productuctionSDK = api("@easyship/v2023.01#xwp13lfv2pii3");
productuctionSDK.auth("prod_/kTgT0YlXEr5X89kB3C6dN+hLu+NerX2Rgh7GsSf93g=");

const sandboxSDK = api("@easyship/v2023.01#xwp13lfv2pii3");
sandboxSDK.auth("sand_xM6Y67SKtHvjQIgp2NDy9z65dR56qOr2ZI5aTEKK6jQ=");

export default async function handler(req, res) {
  /**
   *
   * This API endpoint is expecting an object of objects
   * {
   *   contact: {line1: '...', state: '...'},
   *   products: [{id: 1231, name: 'Cloth'}, {...}, {...}]
   * }
   *
   */

  // console.log(req.body);
  /**
   *
   * Use the SDK to get a list of products
   * from the Easy Ship dashboard
   *
   */
  const {
    data: { products },
  } = await productuctionSDK.products_index();

  /**
   *
   * Use the SDK to get a list of addresses
   * from the Easy Ship dashboard
   *
   */
  const {
    data: { addresses },
  } = await productuctionSDK.addresses_index();

  // console.log(products);

  /**
   *
   * The rates_request endpoint is prone to errors
   * So wrap it in a try and catch block
   *
   */
  try {
    /**
     *
     * Use the SDK to get a the shipping
     * rates from Easy Ship
     *
     * Easy Ship rates endpoint requires 3 primary parameters
     * 1. The origin address
     * 2. The destination address
     * 3. The items you are shipping
     *
     * With this values, it can estimate both the courier that can
     * send the items and how much it might cost.
     *
     */
    const rate = await productuctionSDK.rates_request({
      /**
       *
       * 1. Origin address
       *
       * What address should the courier pick up the item from?
       *
       * Easy ship adderess API sends an array and we can
       * just use the  first one.
       *
       * Since easy ship dashboard does not have a field to fill
       * in the state but the retes API requires a state, I am manually
       * hard-coding the state
       *
       */
      origin_address: { ...addresses[0], state: "England" },
      /**
       *
       * 2. Destination address
       *
       * What address should the corier send the items?
       *
       * Use the contact object from the request's body
       * to fill the destination.
       *
       * The contact object is submitted as a form from the
       * UI by the customer
       *
       */
      destination_address: {
        line_1: req.body.contact.line1,
        state: req.body.contact.state,
        city: req.body.contact.city,
        postal_code: req.body.contact.postCode,
        country_alpha2: req.body.contact.country,
      },
      incoterms: "DDU",
      insurance: { is_insured: false },
      courier_selection: { apply_shipping_rules: true },
      shipping_settings: { units: { weight: "kg", dimensions: "cm" } },

      /**
       *
       * 3. Parcels
       *
       * What are you shipping?
       *
       * Takes an array of objects. The object contains an items array.
       * The items array is an array of objects that describes each item
       *
       *
       */
      parcels: createParcelItems(products, req.body.products),
    });
    res.status(200).json(rate.data.rates);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
