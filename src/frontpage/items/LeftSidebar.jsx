import React from "react";
import { Col, Row } from "react-bootstrap";

const LeftSidebar = (props) => {
   const { detailProfile } = props;

   return (
      <React.Fragment>
         <Col lg={3} md={7} sm={12} className="order-md-0 order-1 mb-100">
            <div className="profile__sidebar">
               <div className="space-y-40">
                  <div className="space-y-10">
                     <h5>About me</h5>
                     <div className="box space-y-20">
                        <p>{detailProfile.bio}</p>
                        <Row>
                           <Col xs={6}>
                              <span className="txt_sm color_text">Item's</span>
                              <h4>105</h4>
                           </Col>
                        </Row>
                     </div>
                  </div>
                  <div className="space-y-10">
                     <h5>Social Media</h5>
                     <div className="box">
                        <ul className="social_profile space-y-10 overflow-hidden">
                           <li>
                              <a href={`https://opensea.io/${detailProfile.opensea_url}`}>
                                 <i className="ri-external-link-line" />
                                 <span className="color_text">opensea/</span>@{detailProfile.rarible_url}
                              </a>
                           </li>
                           <li>
                              <a href={`https://rarible.com/${detailProfile.rarible_url}/items`}>
                                 <i className="ri-external-link-line" />
                                 <span className="color_text">rarible/</span>@{detailProfile.rarible_url}
                              </a>
                           </li>
                           <li>
                              <a href={`https://web.facebook.com/${detailProfile.facebook_username}`}>
                                 <i className="ri-facebook-line" />
                                 <span className="color_text">facebook/</span>@{detailProfile.facebook_username}
                              </a>
                           </li>
                           <li>
                              <a href={`https://discord.com/${detailProfile.discord_username}`}>
                                 <i className="ri-discord-line" />
                                 <span className="color_text">discord/</span>@{detailProfile.discord_username}
                              </a>
                           </li>
                           <li>
                              <a href={`https://www.tiktok.com/${detailProfile.tiktok_username}`}>
                                 <i className="ri-external-link-line" />
                                 <span className="color_text">tiktok/</span>@{detailProfile.tiktok_username}
                              </a>
                           </li>
                           <li>
                              <a href={`https://www.tiktok.com/${detailProfile.twitter_username}`}>
                                 <i className="ri-twitter-line" />
                                 <span className="color_text">twitter/</span>@{detailProfile.twitter_username}
                              </a>
                           </li>
                           <li>
                              <a href={`https://wa.me/${detailProfile.whatsapp_number}`}>
                                 <i className="ri-whatsapp-line" />
                                 <span className="color_text">whatsapp/</span>
                                 {detailProfile.whatsapp_number}
                              </a>
                           </li>
                           <li>
                              <a href={`https://telegram.me/${detailProfile.telegram_number}`}>
                                 <i className="ri-telegram-line" />
                                 <span className="color_text">telegram/</span>@{detailProfile.telegram_number}
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <p className="text-center txt_sm mt-20 color_text">Since {detailProfile.since}</p>
            </div>
         </Col>
      </React.Fragment>
   );
};
export default LeftSidebar;
