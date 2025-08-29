import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import JourneyPage from "./pages/Journey";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import Blog from "./pages/Blog";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* ✅ Add Analytics here so it's loaded on every page */}
      <Analytics />
    </Router>
  );
}

export default App;
