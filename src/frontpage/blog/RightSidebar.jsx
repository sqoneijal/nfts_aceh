import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, getImageFromString, notification, post } from "../../Helpers";
import decodeHtml from "decode-html";

const RightSidebar = () => {
   // bool
   const [isLoadingDaftarBlog, setIsLoadingDaftarBlog] = useState(false);
   const [isSubmitSubscribe, setIsSubmitSubscribe] = useState(false);

   // array
   const [daftarBlog, setDaftarBlog] = useState([]);

   // number
   const [page, setPage] = useState(0);

   // string
   const [email, setEmail] = useState("");

   const getRecentBlog = (page = 0) => {
      setIsLoadingDaftarBlog(true);
      get(`/blog/getrecentblog?page=${page}&slug=${segment[2]}`)
         .then((res) => {
            const { data } = res;
            setDaftarBlog(data);
            setPage((prev) => prev + 1);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarBlog(false);
         });
   };

   const handleSubscribe = () => {
      const formData = {
         email: email,
      };

      setIsSubmitSubscribe(true);
      post("/blog/subscribe", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
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
            setIsSubmitSubscribe(false);
         });
   };

   useEffect(() => {
      getRecentBlog();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Col lg={4} md={4} sm={12}>
            <aside className="blog_sidebar">
               <div className="widget">
                  <h3 className="widget-title text-dark">Let’s connect</h3>
                  <div className="widget-wrap">
                     <div className="social-widget">
                        <a href="">
                           <div className="social_link facebook">
                              <i className="ri-facebook-box-line"></i>
                           </div>
                        </a>
                        <a href="">
                           <div className="social_link dribbble">
                              <i className="ri-dribbble-line"></i>
                           </div>
                        </a>
                        <a href="">
                           <div className="social_link youtube">
                              <i className="ri-youtube-line"></i>
                           </div>
                        </a>
                        <a href="">
                           <div className="social_link twitter">
                              <i className="ri-twitter-line"></i>
                           </div>
                        </a>
                     </div>
                  </div>
               </div>
               <div className="widget">
                  <h3 className="widget-title text-dark">Recent Blog's</h3>
                  <div className="widget-wrap">
                     <div className="Recent_Articles-widget">
                        <div className="swiper-container sidebar_posts">
                           <div className="swiper-wrapper">
                              <div className="swiper-slide">
                                 {(() => {
                                    if (isLoadingDaftarBlog) {
                                       let render_placeholder = [];
                                       for (let i = 0; i < 4; i++) {
                                          render_placeholder.push(
                                             <article className="item" key={i}>
                                                <a
                                                   href="#"
                                                   className="thumb hover-effect placeholder"
                                                   style={{ width: 40, height: 40, marginRight: 10 }}
                                                />
                                                <div className="info">
                                                   <h4 className="title placeholder" style={{ height: 15, width: "20em" }} />
                                                   <div className="time placeholder" style={{ height: 15, width: "20em" }} />
                                                </div>
                                             </article>
                                          );
                                       }
                                       return render_placeholder;
                                    } else {
                                       let render_content = [];
                                       daftarBlog.map((data, key) => {
                                          render_content.push(
                                             <article className="item" key={key}>
                                                <a href={`/blog/${data.slug}`} className="thumb hover-effect">
                                                   <img src={getImageFromString(decodeHtml(`${data.content}`))} alt={data.title} loading="lazy" />
                                                </a>
                                                <div className="info">
                                                   <h4 className="title">
                                                      <a href={`/blog/${data.slug}`}>{data.title}</a>
                                                   </h4>
                                                   <div className="time">{data.uploaded}</div>
                                                </div>
                                             </article>
                                          );
                                       });
                                       return render_content;
                                    }
                                 })()}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="widget">
                  <h3 className="widget-title">Stay updated</h3>
                  <small className="mb-20">Don’t miss our newest business blog posts. Sign up for the newsletter!</small>
                  <div className="widget-wrap">
                     <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control mt-10 mb-20"
                        placeholder="name@example.com"
                     />
                     <a
                        href="#"
                        className="btn w-100 btn-secondary sweep_letter sweep_top"
                        onClick={(e) => {
                           e.preventDefault();
                           isSubmitSubscribe ? null : handleSubscribe();
                        }}
                     >
                        <div className="inside_item">
                           <span data-hover="Join with us!">{isSubmitSubscribe ? "Loading..." : "Join with us!"}</span>
                        </div>
                     </a>
                  </div>
               </div>
            </aside>
         </Col>
      </React.Fragment>
   );
};
export default RightSidebar;
