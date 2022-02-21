import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification, getImageFromString, user_role, kFormatter } from "../../Helpers";
import decodeHtml from "decode-html";
import HTMLReactParser from "html-react-parser";
import RightSidebar from "./RightSidebar";
import nodeTimeAgo from "node-time-ago";

const Detail = () => {
   // bool
   const [showShareButton, setShowShareButton] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});

   // number
   const [likes_content, setLikes_content] = useState(0);
   const [share_content, setShare_content] = useState(0);

   const likeContent = (slug) => {
      const formData = {
         slug: slug,
      };

      post("/blog/likecontent", formData)
         .then((res) => {
            const { data } = res;
            if (data) setLikes_content((prev) => prev + 1);
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
         });
   };

   const getDetailContent = (slug) => {
      const formData = {
         slug: slug,
      };

      post("/blog/getdetailcontent", formData)
         .then((res) => {
            const { data } = res;
            setDetailContent(data);
            document.title = data.title;
            setLikes_content(parseInt(data.likes));
            setShare_content(parseInt(data.share));
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
         });
   };

   useEffect(() => {
      getDetailContent(segment[2]);

      (function () {
         var d = document,
            s = d.createElement("script");
         s.src = "https://nftaceh.disqus.com/embed.js";
         s.setAttribute("data-timestamp", +new Date());
         (d.head || d.body).appendChild(s);
      })();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Container fluid={false} className="article_page pt-100 mb-100">
            <Row className="main">
               <Col lg={8} md={8} sm={12}>
                  <div className="article_wrap mt-0">
                     <div className="content">
                        {(() => {
                           if (getImageFromString(decodeHtml(`${detailContent.content}`))) {
                              return (
                                 <img
                                    className="mb-30 img-fluid w-full img_article"
                                    alt={detailContent.title}
                                    src={getImageFromString(decodeHtml(`${detailContent.content}`))}
                                    loading="lazy"
                                 />
                              );
                           }
                        })()}
                        <h1 className="mb-40">{detailContent.title}</h1>
                        <div className="blog-author-detail d-flex justify-content-between align-items-center">
                           <div className="author-meta d-flex justify-content-start align-items-center">
                              <div className="user">
                                 <img
                                    src={`/assets/images/${detailContent.avatar}`}
                                    alt={detailContent.display_name}
                                    className="avatar avatar-sm rounded-circle w-full"
                                    loading="lazy"
                                 />
                              </div>
                              <div className="meta pl-20">
                                 <p className="name color_brand">{detailContent.display_name}</p>
                                 <p className="author-post">{user_role(detailContent.role)}</p>
                              </div>
                           </div>
                           <span className="font-semibold text-gray">{detailContent.tgl_posting}</span>
                        </div>
                        <div className="inner">{HTMLReactParser(decodeHtml(`${detailContent.content}`))}</div>
                        <div className="space-y-20">
                           <div className="hr" />
                           <div className="d-flex justify-content-between flex-wrap">
                              <div className="reaction">
                                 <a
                                    href="#"
                                    className="likes space-x-3"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       likeContent(segment[2]);
                                    }}
                                 >
                                    <i className="ri-heart-3-fill" />
                                    <span className="txt_sm">{kFormatter(likes_content)}</span>
                                 </a>
                                 <span className="views space-x-3">
                                    <i className="ri-eye-line" />
                                    <span>{detailContent.views} Views</span>
                                 </span>
                                 <span className="share space-x-3">
                                    <i className="ri-share-line" />
                                    <span>{kFormatter(share_content)} Share</span>
                                 </span>
                                 <span className="time space-x-3">
                                    <i className="ri-time-line" />
                                    <span>{nodeTimeAgo(detailContent.uploaded)}</span>
                                 </span>
                              </div>
                              <div className="share">
                                 <div className="icon">
                                    <a
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault();
                                          setShowShareButton((prev) => !prev);
                                       }}
                                    >
                                       <i className="ri-share-line" />
                                    </a>
                                 </div>
                                 <div className={"dropdown__popup" + (showShareButton ? " visible" : "")}>
                                    <ul className="space-y-10">
                                       <li>
                                          <a href={`/blog/share?to=facebook&source=${segment[2]}`} target="_blank">
                                             <i className="ri-facebook-line" />
                                          </a>
                                       </li>
                                       <li>
                                       <a href={`/blog/share?to=twitter&source=${segment[2]}`} target="_blank">
                                             <i className="ri-twitter-line" />
                                          </a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div id="disqus_thread" />
                  </div>
               </Col>
               <RightSidebar />
            </Row>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<Detail />, document.getElementById("root"));
