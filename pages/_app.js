import "@/styles/globals.css";
import { CartProvider } from "react-use-cart";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
