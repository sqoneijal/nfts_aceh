import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { post, notification } from "../../Helpers";

const RightContent = () => {
   // bool
   const [isLoadingDaftarNFT, setIsLoadingDaftarNFT] = useState(false);
   const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
   const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

   // array
   const [daftarNFT, setDaftarNFT] = useState([]);

   // number
   const [page, setPage] = useState(0);

   const getNFTContent = (page = 0) => {
      const formData = {
         id_user: user.id,
      };

      if (page > 0) setIsLoadingLoadMore(true);
      else setIsLoadingDaftarNFT(true);
      post(`/items/getnftcontent?page=${page}`, formData)
         .then((res) => {
            const { data } = res;

            if (data.length > 5) setShowLoadMoreButton(true);
            else setShowLoadMoreButton(false);

            if (page > 0) setDaftarNFT((prev) => prev.concat(data));
            else setDaftarNFT(data);

            setPage((prev) => prev + 1);
         })
         .catch((e) => {
            if (typeof e.response !== "undefined") {
               if (typeof e.response.data.message !== "undefined") {
                  notification(false, e.response.data.message);
               } else {
                  notification(false, e.response.statusText);
               }
            } else {
               notification(false, "Terjadi sesuatu kesalahan.");
            }
         })
         .then(() => {
            setIsLoadingDaftarNFT(false);
            setIsLoadingLoadMore(false);
         });
   };

   useEffect(() => {
      getNFTContent();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <Col lg={9} md={12} sm={12} className="order-md-1 order-0 mb-100">
            <div className="profile__content">
               <div className="d-flex justify-content-between">
                  <div className="space-x-10">
                     <div className="d-flex justify-content-between mb-10">
                        <div className="dropdown d-none d-sm-block">
                           <button
                              className="btn btn-white btn-sm dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                           >
                              Filter
                           </button>
                           <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">
                                 Latest
                              </a>
                              <a className="dropdown-item" href="#">
                                 Oldest
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="tab-content">
                        <div className="tab-pane active">
                           <Row className="mb-30_reset">
                              {isLoadingDaftarNFT
                                 ? "Loading..."
                                 : daftarNFT.map((data, key) => {
                                      return (
                                         <Col xl={4} lg={6} md={6} sm={12} key={key}>
                                            <div className="card__item three">
                                               <div className="card_body space-y-10">
                                                  <div className="card_head">
                                                     <img src={data.image} alt={data.title} loading="lazy" />
                                                     <a href="#" className="likes space-x-3">
                                                        <i className="ri-heart-3-fill" />
                                                        <span className="txt_sm">1.2k</span>
                                                     </a>
                                                     <div className="action">
                                                        <a href={data.link_place_bid} className="btn btn-primary btn-sm btn_auction">
                                                           <i className="ri-auction-line color_white"></i>
                                                           Place Your Bid
                                                        </a>
                                                     </div>
                                                  </div>
                                                  <h6 className="card_title">
                                                     <a className="color_black" href={`/itemdetail/${data.id}`}>
                                                        {data.title}
                                                     </a>
                                                  </h6>
                                               </div>
                                            </div>
                                         </Col>
                                      );
                                   })}
                           </Row>
                        </div>
                     </div>
                  </div>
               </div>
               {showLoadMoreButton ? (
                  <div className="d-flex justify-content-center">
                     <a
                        href="#"
                        className="btn btn-sm btn-white"
                        onClick={(e) => {
                           e.preventDefault();
                           getNFTContent(page);
                        }}
                     >
                        <i className="ri-restart-line" /> {isLoadingLoadMore ? "Loading..." : `View more items`}
                     </a>
                  </div>
               ) : (
                  ""
               )}
            </div>
         </Col>
      </React.Fragment>
   );
};
export default RightContent;
