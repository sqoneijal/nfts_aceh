import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../../Helpers";

const RightContent = () => {
   // bool
   const [isLoadingDaftarNFT, setIsLoadingDaftarNFT] = useState(true);
   const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
   const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

   // array
   const [daftarNFT, setDaftarNFT] = useState([]);

   // number
   const [page, setPage] = useState(0);

   const getCreatorsNFT = (page = 0) => {
      const formData = {
         id_creators: segment[3],
      };

      if (page > 0) setIsLoadingLoadMore(true);
      else setIsLoadingDaftarNFT(true);

      post(`/creators/getcreatorsnft?page=${page}`, formData)
         .then((res) => {
            const { data } = res;
            if (data.length > 5) setShowLoadMoreButton(true);
            else setShowLoadMoreButton(false);

            setDaftarNFT((prev) => prev.concat(data));
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
      getCreatorsNFT();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Col lg={9} md={9} sm={12} className="order-md-1 order-0">
            <div className="profile__content">
               <div className="d-flex justify-content-between">
                  <div className="space-x-10">
                     <div className="tab-content">
                        <div className="tab-pane active">
                           <Row className="mb-30_reset">
                              {(() => {
                                 if (isLoadingDaftarNFT) {
                                    let render_placeholder = [];
                                    for (let i = 0; i < 3; i++) {
                                       render_placeholder.push(
                                          <Col xl={4} lg={6} md={6} sm={12} key={i}>
                                             <div className="card__item three">
                                                <div className="card_body space-y-10">
                                                   <div className="card_head placeholder" style={{ height: 150 }} />
                                                   <h6 className="card_title placeholder" style={{ height: 30 }} />
                                                </div>
                                             </div>
                                          </Col>
                                       );
                                    }
                                    return render_placeholder;
                                 } else {
                                    let render_content = [];
                                    daftarNFT.map((data, key) => {
                                       render_content.push(
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
                                                            <i className="ri-auction-line color_white" />
                                                            Place Your Bid
                                                         </a>
                                                      </div>
                                                   </div>
                                                   <h6 className="card_title">
                                                      <a className="color_black" href={`/itemdetail/${data.id_nft}`}>
                                                         {data.title}
                                                      </a>
                                                   </h6>
                                                </div>
                                             </div>
                                          </Col>
                                       );
                                    });
                                    return render_content;
                                 }
                              })()}
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
                           getCreatorsNFT(page);
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
