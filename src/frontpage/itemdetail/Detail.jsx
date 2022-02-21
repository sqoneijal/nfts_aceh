import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, notification } from "../../Helpers";

const Detail = () => {
   // bool
   const [isLoadingDetailContent, setIsLoadingDetailContent] = useState(false);
   const [openShareButton, setOpenShareButton] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});

   const getDetailContent = (id) => {
      setIsLoadingDetailContent(true);
      get(`/itemdetail/getdetailcontent/${id}`)
         .then((res) => {
            const { data } = res;
            setDetailContent(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDetailContent(false);
         });
   };

   useEffect(() => {
      getDetailContent(segment[2]);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Container fluid={false} className="mb-100">
            <a href="/" className="btn btn-white btn-sm my-40">
               Back to home
            </a>
            <div className="item_details">
               <Row className="sm:space-y-20">
                  <Col lg={6} sm={12} className={isLoadingDetailContent ? "placeholder" : ""}>
                     {!isLoadingDetailContent ? <img className="item_img" src={detailContent.image} alt={detailContent.title} loading="lazy" /> : ""}
                  </Col>
                  <Col lg={6} sm={12}>
                     <div className="space-y-20">
                        <h3 className={isLoadingDetailContent ? "placeholder" : ""}>{isLoadingDetailContent ? "-" : detailContent.title}</h3>
                        <div className="d-flex justify-content-between">
                           <div className="space-x-10 d-flex align-items-center">
                              <div className="share">
                                 <div className="icon" onClick={() => setOpenShareButton(!openShareButton)}>
                                    <a
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault();
                                          setOpenShareButton(!openShareButton);
                                       }}
                                    >
                                       <i className="ri-share-line" />
                                    </a>
                                 </div>
                                 <div className={"dropdown__popup" + (openShareButton ? " visible" : "")}>
                                    <ul className="space-y-10">
                                       <li>
                                          <a href="">
                                             <i className="ri-facebook-line" />
                                          </a>
                                       </li>
                                       <li>
                                          <a href="">
                                             <i className="ri-twitter-line" />
                                          </a>
                                       </li>
                                       <li>
                                          <a href="">
                                             <i className="ri-whatsapp-line" />
                                          </a>
                                       </li>
                                       <li>
                                          <a href="">
                                             <i className="ri-telegram-line" />
                                          </a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className={"box" + (isLoadingDetailContent ? " placeholder" : "")}>
                           <div className="space-y-20">
                              <div className="tab-content">
                                 <div className="tab-pane active">
                                    <p>{detailContent.description}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="hr2" />
                        <div className="creators">
                           <Row>
                              <Col lg={6} sm={12}>
                                 <div className={"avatars space-x-5" + (isLoadingDetailContent ? " placeholder" : "")}>
                                    {isLoadingDetailContent ? (
                                       "-"
                                    ) : (
                                       <React.Fragment>
                                          <div className="media">
                                             <a href={`/creators/detail/${detailContent.id_user}`}>
                                                <img
                                                   src={`/assets/images/${detailContent.avatar}`}
                                                   alt={detailContent.display_name}
                                                   className="avatar avatar-sm"
                                                   loading="lazy"
                                                />
                                             </a>
                                          </div>
                                          <div>
                                             <a href={`/creators/detail/${detailContent.id_user}`}>
                                                <p className="avatars_name color_black">{detailContent.display_name}</p>
                                             </a>
                                          </div>
                                       </React.Fragment>
                                    )}
                                 </div>
                              </Col>
                           </Row>
                        </div>
                        <div className={"d-flex space-x-20" + (isLoadingDetailContent ? " placeholder" : "")}>
                           {isLoadingDetailContent ? (
                              "-"
                           ) : (
                              <React.Fragment>
                                 <a href={detailContent.link_place_bid} className="btn btn-primary btn-lg">
                                    Buy Now
                                 </a>
                                 {(() => {
                                    if (Object.keys(user).length > 0 && typeof user.id !== "undefined" && detailContent.id_user === user.id) {
                                       return (
                                          <a href={`/upload/${segment[2]}`} className="btn btn-warning btn-lg">
                                             Edit Item
                                          </a>
                                       );
                                    }
                                 })()}
                              </React.Fragment>
                           )}
                        </div>
                     </div>
                  </Col>
               </Row>
            </div>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<Detail />, document.getElementById("root"));
