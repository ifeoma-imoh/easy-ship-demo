import createParcelItems from "@/utils/createParcelItems";
import api from "api";

const productuctionSDK = api("@easyship/v2023.01#xwp13lfv2pii3");
productuctionSDK.auth("prod_/kTgT0YlXEr5X89kB3C6dN+hLu+NerX2Rgh7GsSf93g=");

const sandboxSDK = api("@easyship/v2023.01#xwp13lfv2pii3");
sandboxSDK.auth("sand_xM6Y67SKtHvjQIgp2NDy9z65dR56qOr2ZI5aTEKK6jQ=");

export default async function handler(req, res) {
  const {
    data: { products },
  } = await productuctionSDK.products_index();
  const {
    data: { addresses },
  } = await productuctionSDK.addresses_index();

  try {
    const shipment = await productuctionSDK.shipments_create({
      origin_address: { ...addresses[0], state: "England" },
      destination_address: {
        line_1: req.body.contact.line1,
        state: req.body.contact.state,
        city: req.body.contact.city,
        postal_code: req.body.contact.postCode,
        country_alpha2: req.body.contact.country,
        /**
         *
         * Additional contact information
         * so courier knows whot to deliver to
         *
         */
        contact_name: `${req.body.contact.firstName} ${req.body.contact.lastName}`,
        contact_phone: req.body.contact.phone,
        contact_email: req.body.contact.email,
      },
      incoterms: "DDU",
      insurance: { is_insured: false },
      shipping_settings: { units: { weight: "kg", dimensions: "cm" } },
      /**
       *
       * If the rates API gave us a list of shipmnent options
       * The ship API takes our selecion option and uses it
       * to create a shipment.
       *
       * We tell Easy Ship what our selection option is
       * by providing the courier ID for the courier we picked
       *
       */
      courier_selection: {
        selected_courier_id: req.body.courier_id,
        allow_courier_fallback: false,
      },
      parcels: createParcelItems(products, req.body.products),
    });

    // console.log(shipment.data.shipment);
    /**
     *
     * A label finalizes a shipment
     * When we create one, the courier will take some time to generate the label
     * that will be on the parcel
     *
     * Use the shipment ID and the courier ID to create a label by passing them
     * to the labels create endpoint
     *
     */

    const label = await productuctionSDK.labels_create({
      shipments: [
        {
          easyship_shipment_id: shipment.data.shipment.easyship_shipment_id,
          courier_id: shipment.data.shipment.courier.id,
        },
      ],
    });

    res.status(200).json(label);
  } catch (error) {
    /**
     *
     * Since this is a demo,
     * we don't have funds to create a label in our account
     *
     * So we want to handle payment required error as a success because
     * technically it is. It is not the customer's fault because the merchant
     * needs to fund their account
     *
     * So we are handling the error positvely
     * by returning a status 200 with detailed information
     *
     *
     */
    console.log(error);
    if (error.data.error.code === "payment_required") {
      res.status(200).json({
        error: {
          code: "payment_required",
          message:
            "We have created a shipment but you need to top up your accont to create a label",
        },
      });
    } else {
      res.status(500).send(error);
    }
  }
}
