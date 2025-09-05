import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "../src/components/Header";
import JourneyPage from "./pages/Journey";
import Home from "./pages/Home";
import AboutPage from "./pages/Aboutpage";
import Contact from "./pages/Contactpage";
import NotFound from "./pages/Notfound";
import Blog from "./pages/Blog";

// Product Page
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

// Checkout Page
import Checkout from "./pages/Checkout/Checkout";


// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"


// Policy Page
import CancellationPolicy from "./pages/Policy/CancellationPolicy";
import PrivacyPolicy from "./pages/Policy/PrivacyPolicy";
//import RefundPolicy from "./pages/Policy/RefundPolicy";
import ShippingPolicy from "./pages/Policy/ShippingPolicy";
import TermsAndService from "./pages/Policy/TermsAndConditions";

import AdminPage from "./pages/Admin/AdminPage";


function App() {
  return (
    <Router>
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/blog" element={<Blog />} />

        {/*Policy Routes*/}
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* <Route path="/refund-policy" element={<RefundPolicy />} /> */}
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndService />} />

        {/*Not Found Routes*/}
        <Route path="*" element={<NotFound />} />

        {/*Admin Route*/}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      
      {/* ✅ Add Analytics here so it's loaded on every page */}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
