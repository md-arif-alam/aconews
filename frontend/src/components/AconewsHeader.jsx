import React, { useState, useEffect } from "react";

// import downArrow from './../assets/downarrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios';
import countries from "./countryName";
import { Link } from "react-router-dom";
// import SearchNews from "./searchNews";
// import Search from "./SearchBar";




function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // const [category, setCategory] = useState("")
  // const [searchTerm, setSearchTerm] = useState("")

  const [theme, setTheme] = useState("light-theme");
  let categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"]
  useEffect(() => {
    document.body.className = theme;
  }, [theme])
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme")
    }
    else {
      setTheme("light-theme")
    }
  }
  return (
    <header className="header">
      <nav className="fixed top-0 left-0 w-full h-auto  z-10 flex items-center justify-around">

        <h3 className="relative md:basis-1/6 text-4xl xs:basis-4/12 z-50 mb-5 mt-5 ml-2  font-extrabold text-blue-700">aconews</h3>


        {/* <Search categery={category} searchTerm={searchTerm} /> */}

        {/* <SearchNews /> */}



        <ul className={active ? "nav-ul z-50 flex gap-4 md:gap-14 xs:gap-12 lg:basis-3/4 md:basis-4/6 md:justify-end active" : " nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li><Link className="no-underline font-semibold  hover:text-blue-500" to="/search" onClick={() => { setActive(!active) }}>Search</Link></li>
          <li><Link className="no-underline font-semibold  hover:text-blue-500" to="/" onClick={() => { setActive(!active) }}>News</Link></li>
          <li className="dropdown-li "><Link className="no-underline font-semibold flex items-center gap-2  hover:text-blue-500" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faChevronDown} /></Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown overflow-y-scroll no-scrollbar" : "dropdown p-2 overflow-y-scroll no-scrollbar"}>
              {categories.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCategoryDropdown(!showCategoryDropdown) }}>

                    <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      {element}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="dropdown-li"><Link className="no-underline font-semibold flex items-center gap-2  hover:text-blue-500" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false) }}>Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faChevronDown} /></Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown overflow-y-scroll no-scrollbar" : "dropdown p-2 overflow-y-scroll no-scrollbar"}>
              {countries.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCountryDropdown(!showCountryDropdown) }}>
                    <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      <img
                        src={element?.png}
                        srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}

                        alt={element?.countryName} />
                      <span>{element?.countryName}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li><Link className="no-underline font-semibold  hover:text-blue-500" to="/about" onClick={() => { setActive(!active) }}>About</Link></li>
          <li>

            <Link className="no-underline font-semibold" to="#" onClick={() => { toggleTheme() }}>
              <button type="button" aria-label="toggle theme">
                {theme === 'dark-theme' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    stroke="#fff"
                  >

                    <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"

                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    stroke="#fff"
                  >

                    <path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z" />
                  </svg>
                )}
              </button>
            </Link>
          </li>
          <li><button className="text-blue-700 hover:text-gray-300 backdrop-filter "><Link className="no-underline font-semibold" to="https://acowale.com/" onClick={() => { setActive(!active) }}>#Explore</Link></button> </li>
        </ul>
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header >
  );
}

export default Header;