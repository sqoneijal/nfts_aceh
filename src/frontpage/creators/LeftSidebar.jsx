import React from "react";
import { Col, Row } from "react-bootstrap";

const LeftSidebar = (props) => {
   const { detailCreators } = props;

   return (
      <React.Fragment>
         <Col lg={3} md={7} sm={12} className="order-md-0 order-1">
            <div className="profile__sidebar">
               <div className="space-y-40">
                  <div className="space-y-10">
                     <h5>About me</h5>
                     <div className="box space-y-20">
                        <p>{detailCreators.bio}</p>
                        <Row>
                           <Col xs={6}>
                              <span className="txt_sm color_text">Items</span>
                              <h4>{detailCreators.jumlah_items}</h4>
                           </Col>
                           <Col xs={6}>
                              <span className="txt_sm color_text">Following</span>
                              <h4>{detailCreators.jumlah_follower}</h4>
                           </Col>
                        </Row>
                     </div>
                  </div>
                  <div className="space-y-10">
                     <h5>Follow me</h5>
                     <div className="box">
                        <ul className="social_profile space-y-10 overflow-hidden">
                           {detailCreators.hidden_social_media === "f" ? (
                              <React.Fragment>
                                 <li>
                                    <a href={`https://opensea.io/${detailCreators.opensea_url}`}>
                                       <i className="ri-external-link-line" />
                                       <span className="color_text">opensea/</span>@{detailCreators.rarible_url}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://rarible.com/${detailCreators.rarible_url}/items`}>
                                       <i className="ri-external-link-line" />
                                       <span className="color_text">rarible/</span>@{detailCreators.rarible_url}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://web.facebook.com/${detailCreators.facebook_username}`}>
                                       <i className="ri-facebook-line" />
                                       <span className="color_text">facebook/</span>@{detailCreators.facebook_username}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://discord.com/${detailCreators.discord_username}`}>
                                       <i className="ri-discord-line" />
                                       <span className="color_text">discord/</span>@{detailCreators.discord_username}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://www.tiktok.com/${detailCreators.tiktok_username}`}>
                                       <i className="ri-external-link-line" />
                                       <span className="color_text">tiktok/</span>@{detailCreators.tiktok_username}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://www.tiktok.com/${detailCreators.twitter_username}`}>
                                       <i className="ri-twitter-line" />
                                       <span className="color_text">twitter/</span>@{detailCreators.twitter_username}
                                    </a>
                                 </li>
                              </React.Fragment>
                           ) : (
                              <></>
                           )}
                           {detailCreators.hidden_contact === "f" ? (
                              <React.Fragment>
                                 <li>
                                    <a href={`https://wa.me/${detailCreators.whatsapp_number}`}>
                                       <i className="ri-whatsapp-line" />
                                       <span className="color_text">whatsapp/</span>
                                       {detailCreators.whatsapp_number}
                                    </a>
                                 </li>
                                 <li>
                                    <a href={`https://telegram.me/${detailCreators.telegram_number}`}>
                                       <i className="ri-telegram-line" />
                                       <span className="color_text">telegram/</span>@{detailCreators.telegram_number}
                                    </a>
                                 </li>
                              </React.Fragment>
                           ) : (
                              <></>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
               <p className="text-center txt_sm mt-20 color_text">Since {detailCreators.since}</p>
            </div>
         </Col>
      </React.Fragment>
   );
};
export default LeftSidebar;
