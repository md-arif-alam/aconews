import { Children, useState } from "react";
import "./App.css";


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import News from "./components/News";

import Headlines from "./components/AconewsHeadlines";
import CountryNews from "./components/CountryNews";
import Header from "./components/AconewsHeader";
import Footer from "./components/AconewsFooter";
import SearchNews from "./components/searchNews";
import About from "./components/About";

function App() {

  return (
    <div className="w-full font-display">
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<News />} />
          <Route path="search" element={<SearchNews />} />
          <Route path="about" element={<About />} />
          <Route path="/top-headlines/:category" element={<Headlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;