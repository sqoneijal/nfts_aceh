import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { get, notification } from "../../Helpers";
import { ReactNotifications } from "react-notifications-component";

const TopMember = () => {
   // bool
   const [isLoadingDaftarTopMember, setIsLoadingDaftarTopMember] = useState(false);

   // array
   const [daftarTopMember, setDaftarTopMember] = useState([]);

   const getTopMember = () => {
      setIsLoadingDaftarTopMember(true);
      get("/home/topmember")
         .then((res) => {
            const { data } = res;
            setDaftarTopMember(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarTopMember(false);
         })
         .then(() => {
            new Swiper(".swiper_artists", {
               // Optional parameters
               loop: true,
               slidesPerView: 3,
               spaceBetween: 10,

               breakpoints: {
                  // when window width is >= 320px
                  320: {
                     slidesPerView: 1,
                  },
                  // when window width is >= 480px
                  768: {
                     slidesPerView: 2,
                  },
                  1000: {
                     slidesPerView: 4,
                  },
               },

               // Navigation arrows
               navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
               },
            });
         });
   };

   useEffect(() => {
      getTopMember();

      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Container fluid={false}>
            <div className="space-y-30">
               <div className="section_head">
                  <h2 className="section__title">Top Members</h2>
               </div>
               <div className="section_body swiper_artists">
                  <div className="swiper-wrapper position-relative">
                     {isLoadingDaftarTopMember ? (
                        <p>Loading...</p>
                     ) : (
                        daftarTopMember.map((data, key) => {
                           return (
                              <div className="swiper-slide" key={key}>
                                 <div className="creator_item creator_card rounded_border space-x-10">
                                    <div className="avatars space-x-10">
                                       <div className="media">
                                          <div className="badge">
                                             <img src="/assets/images/Badge.svg" alt="badge" loading="lazy" />
                                          </div>
                                          <a href="Profile.html">
                                             <img src={`/assets/images/${data.avatar}`} alt={data.display_name} className="avatar avatar-md" />
                                          </a>
                                       </div>
                                       <div>
                                          <a href="Profile.html">
                                             <p className="avatars_name color_black">{data.display_name}</p>
                                          </a>
                                          <span className="price color_green">{Math.random().toFixed(2)} ETH</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           );
                        })
                     )}
                  </div>
                  <div className="swiper-pagination" />
                  <div className="swiper-button-prev" />
                  <div className="swiper-button-next" />
               </div>
            </div>
         </Container>
      </React.Fragment>
   );
};
export default TopMember;
