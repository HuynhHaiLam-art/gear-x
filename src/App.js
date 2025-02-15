import React from "react";
import Header from './components/Header/Header.jsx';
import Home from './pages/HomePage/HomePage.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import MainBanner from "./components/MainBanner/MainBanner.jsx";
import AdSlider from "./components/AdSlider/AdSlider.jsx";
import FlashSaleSlider from "./components/FlashSaleSlider/FlashSaleSlider.jsx";
import NewsSection from "./components/News/NewsSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import pd1 from "./assets/images/pd1.webp"
import pd2 from "./assets/images/pd2.webp"
import pd3 from "./assets/images/pd3.webp"
import pd4 from "./assets/images/pd4.webp"
import TestApi from "./components/TestApi/TestApi.jsx";

const sampleProducts = [
  {
    id: 1,
    name: "Laptop Gaming Gigabyte G5 MF5",
    image: (pd1),
    oldPrice: 29990000,
    newPrice: 18990000,
    sold: 29,
    total: 50,
  },
  {
    id: 2,
    name: "Laptop Gaming Lenovo LOQ",
    image: (pd2),
    oldPrice: 30990000,
    newPrice: 23690000,
    sold: 14,
    total: 40,
  },
  {
    id: 3,
    name: "Laptop Gaming Asus TUF A15",
    image: (pd3),
    oldPrice: 30990000,
    newPrice: 23490000,
    sold: 31,
    total: 50,
  },
  {
    id: 4,
    name: "Laptop Gaming Lenovo LOQ (Best Seller)",
    image: (pd4),
    oldPrice: 35900000,
    newPrice: 26900000,
    sold: 11,
    total: 30,
  },
];

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <MainBanner />
      <AdSlider />
      <TestApi />
      <FlashSaleSlider products={sampleProducts} />
      <Home />
      <NewsSection />
      <Footer />
    </div>
  );
}
export default App;
