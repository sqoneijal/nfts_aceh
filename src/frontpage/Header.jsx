import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "@lottiefiles/lottie-player";

const Header = () => {
   // bool
   const [isThemeDarkAktive, setIsThemeDarkAktive] = useState(false);
   const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
   const [showDropdownAvatar, setShowDropdownAvatar] = useState(false);

   const handleOpenMobileNav = (old_status) => {
      if (old_status === false) {
         setIsOpenMobileNav(true);
         document.getElementById("header__burger").classList.add("active");
         document.getElementById("header__mobile").classList.add("visible");
      } else {
         setIsOpenMobileNav(false);
         document.getElementById("header__burger").classList.remove("active");
         document.getElementById("header__mobile").classList.remove("visible");
      }
   };

   useEffect(() => {
      const get_theme_save = localStorage.getItem("theme");
      if (get_theme_save) {
         document.body.classList.add(get_theme_save);
         setIsThemeDarkAktive(true);
      } else {
         setIsThemeDarkAktive(false);
      }
      return () => {};
   }, []);

   const handleChangeTheme = (type) => {
      if (type === "light") {
         document.body.classList.remove("is__dark");
         localStorage.setItem("theme", "");
         setIsThemeDarkAktive(false);
      } else {
         document.body.classList.add("is__dark");
         localStorage.setItem("theme", "is__dark");
         setIsThemeDarkAktive(true);
      }
   };

   return (
      <React.Fragment>
         <div className="bg-dark py-10">
            <div className="container">
               <div
                  className="text-center
               d-flex
               justify-content-between
               space-x-10
               align-items-center"
               >
                  <div className="space-x-10 d-flex align-items-center">
                     <lottie-player autoplay speed={2} loop src="/assets/lf30_kqshlcsx.json" style={{ width: 50, height: 50 }} />
                  </div>
                  <div className="mode_switcher space-x-10">
                     <a
                        href="#"
                        className={"light d-flex align-items-center" + (isThemeDarkAktive ? "" : " is_active")}
                        onClick={(e) => {
                           e.preventDefault();
                           handleChangeTheme("light");
                        }}
                     >
                        <i className="ri-sun-fill" /> Light
                     </a>
                     <a
                        href="#"
                        className={"dark d-flex align-items-center" + (isThemeDarkAktive ? " is_active" : "")}
                        onClick={(e) => {
                           e.preventDefault();
                           handleChangeTheme("dark");
                        }}
                     >
                        <i className="ri-moon-fill" /> Dark
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <header className="header__1 js-header" id="header">
            <div className="container">
               <div className="wrapper js-header-wrapper">
                  <div className="header__logo">
                     <a href="/">
                        <img className="header__logo" src="/assets/images/logo.svg" alt="logo" loading="lazy" />
                     </a>
                  </div>
                  <div className="header__menu">
                     <ul className="d-flex space-x-20">
                        <li className="has_popup">
                           <a className="color_black" href="/">
                              Home
                           </a>
                        </li>
                        <li>
                           <a className="color_black" href="/about">
                              About Us
                           </a>
                        </li>
                        <li>
                           <a className="color_black" href="/explorer">
                              Explore
                           </a>
                        </li>
                        <li>
                           <a className="color_black" href="/blog">
                              Blogs
                           </a>
                        </li>
                        <li>
                           <a className="color_black" href="/creators">
                              Creators
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="header__search">
                     <input type="text" placeholder={`Search Creators & NFTs`} />
                     <button className="header__result">
                        <i className="ri-search-line" />
                     </button>
                  </div>
                  {Object.keys(user).length > 0 && typeof user.id !== "undefined" ? (
                     <React.Fragment>
                        <div className="header__avatar">
                           <div
                              className="price"
                              onClick={(e) => {
                                 e.preventDefault();
                                 setShowDropdownAvatar(!showDropdownAvatar);
                              }}
                           >
                              <span onClick={() => setShowDropdownAvatar(!showDropdownAvatar)}>{user.display_name}</span>
                           </div>
                           <img
                              className="avatar"
                              src={`/assets/images/${user.avatar}`}
                              alt="avatar"
                              loading="lazy"
                              onClick={() => setShowDropdownAvatar(!showDropdownAvatar)}
                           />
                           <div className={"avatar_popup space-y-20" + (showDropdownAvatar ? " visible" : "")}>
                              <div className="links space-y-10">
                                 {(() => {
                                    if (user.role === "1") {
                                       return (
                                          <a href="/admin/dashboard">
                                             <i className="ri-landscape-line" /> <span>Admin Panel</span>
                                          </a>
                                       );
                                    }
                                 })()}
                                 <a href="/items">
                                    <i className="ri-landscape-line" /> <span>My items</span>
                                 </a>
                                 <a href="/profile">
                                    <i className="ri-pencil-line" /> <span>Profile</span>
                                 </a>
                                 <a href="/login/logout">
                                    <i className="ri-logout-circle-line" /> <span>Logout</span>
                                 </a>
                              </div>
                           </div>
                        </div>
                        <div className="header__btns">
                           <a className="btn btn-primary btn-sm" href="/upload">
                              Create
                           </a>
                        </div>
                     </React.Fragment>
                  ) : (
                     <div className="header__btns">
                        <a className="btn btn-grad btn-sm" href="/register">
                           <i className="ri-wallet-3-line" />
                           Become Member
                        </a>
                        <a className="btn btn-grad btn-sm" href="/login">
                           Login
                        </a>
                     </div>
                  )}
                  <div
                     className="header__burger js-header-burger"
                     id="header__burger"
                     onClick={(e) => {
                        e.preventDefault();
                        handleOpenMobileNav(isOpenMobileNav);
                     }}
                  />
                  <div className="header__mobile js-header-mobile" id="header__mobile">
                     <div className="header__mobile__menu space-y-40">
                        <ul className="d-flex space-y-20">
                           <li>
                              <a className="color_black" href="/about">
                                 About Us
                              </a>
                           </li>
                           <li>
                              <a className="color_black" href="/explore">
                                 Explore
                              </a>
                           </li>
                           <li>
                              <a className="color_black" href="/creators">
                                 Creators
                              </a>
                           </li>
                        </ul>
                        {Object.keys(user).length > 0 && typeof user.id !== "undefined" ? (
                           <React.Fragment>
                              <div className="space-y-20">
                                 <a className="btn btn-grad btn-sm" href="/upload">
                                    Create
                                 </a>
                              </div>
                           </React.Fragment>
                        ) : (
                           <div className="space-y-20">
                              <div className="header__search in_mobile w-full">
                                 <input type="text" placeholder={`Search Creators & NFTs`} />
                                 <button className="header__result">
                                    <i className="ri-search-line" />
                                 </button>
                              </div>
                              <a className="btn btn-grad btn-sm" href="/register">
                                 Become Member
                              </a>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </React.Fragment>
   );
};
ReactDOM.render(<Header />, document.getElementById("root_header"));
