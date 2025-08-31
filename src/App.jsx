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


// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <Router>
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* ✅ Add Analytics here so it's loaded on every page */}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
