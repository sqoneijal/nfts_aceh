import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Topbar = () => {
   useEffect(() => {
      $("#vertical-menu-btn").on("click", function (e) {
         e.preventDefault();
         $("body").toggleClass("sidebar-enable");
         992 <= $(window).width() ? $("body").toggleClass("vertical-collpsed") : $("body").removeClass("vertical-collpsed");
      });

      $("body,html").click(function (e) {
         var t = $("#vertical-menu-btn");
         t.is(e.target) || 0 !== t.has(e.target).length || e.target.closest("div.vertical-menu") || $("body").removeClass("sidebar-enable");
      });
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="navbar-header">
            <div className="d-flex" style={{ height: 45 }}>
               <div className="navbar-brand-box">
                  <a href="/" className="logo logo-dark">
                     <span className="logo-sm">
                        <img src="/assets/images/logo.svg" alt="SIAKAD" style={{ height: 22, width: "auto" }} loading="lazy" />
                     </span>
                     <span className="logo-lg">
                        <img src="/assets/images/logo.svg" alt="SIAKAD" style={{ height: 20, width: "auto" }} loading="lazy" />
                     </span>
                  </a>
                  <a href="/" className="logo logo-light">
                     <span className="logo-sm">
                        <img src="/assets/images/logo.svg" alt="SIAKAD" style={{ height: 22, width: "auto" }} loading="lazy" />
                     </span>
                     <span className="logo-lg">
                        <img src="/assets/images/logo.svg" alt="SIAKAD" style={{ height: 20, width: "auto" }} loading="lazy" />
                     </span>
                  </a>
               </div>
               <button type="button" className="btn btn-sm px-3 font-size-18 header-item waves-effect" id="vertical-menu-btn">
                  <i className="ri-menu-2-line align-middle" />
               </button>
            </div>
            <div className="d-flex" style={{ height: 45 }}>
               <div className="dropdown d-inline-block user-dropdown">
                  <button
                     type="button"
                     className="btn header-item waves-effect"
                     id="page-header-user-dropdown"
                     data-bs-toggle="dropdown"
                     aria-haspopup="true"
                     aria-expanded="false"
                     style={{ padding: ".1rem .75rem" }}
                  >
                     <img className="rounded-circle header-profile-user" src={`/assets/images/${user.avatar}`} alt={user.display_name} loading="lazy" />
                     <span className="d-none d-xl-inline-block ms-1">{user.display_name}</span>
                     <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                     <a className="dropdown-item" href="/profile">
                        <i className="ri-user-line align-middle me-1" /> Profile
                     </a>
                     <a className="dropdown-item text-danger" href="/login/logout">
                        <i className="ri-shut-down-line align-middle me-1 text-danger" /> Logout
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Topbar />, document.getElementById("page-topbar"));
