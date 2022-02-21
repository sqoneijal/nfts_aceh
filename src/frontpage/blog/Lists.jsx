import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, getImageFromString, notification } from "../../Helpers";
import HTMLReactParser from "html-react-parser";
import decodeHtml from "decode-html";

const Lists = () => {
   // bool
   const [isLoadingDaftarBlog, setIsLoadingDaftarBlog] = useState(true);
   const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
   const [showLoadmoreButton, setShowLoadmoreButton] = useState(true);

   // array
   const [daftarBlog, setDaftarBlog] = useState([]);

   // number
   const [page, setPage] = useState(0);

   const getDaftarBlog = (page = 0) => {
      if (page > 0) setIsLoadingLoadMore(true);
      else setIsLoadingDaftarBlog(true);

      get(`/blog/getdata?page=${page}`)
         .then((res) => {
            const { data } = res;
            if (data.length > 5) setShowLoadmoreButton(true);
            else setShowLoadmoreButton(false);

            setDaftarBlog((prev) => prev.concat(data));
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
            setIsLoadingLoadMore(false);
         });
   };

   useEffect(() => {
      getDaftarBlog();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <main className="mt-100 mb-100">
            <Container fluid={false}>
               <div className="main">
                  <Row>
                     <Col lg={12} sm={12} className="pr-5 pr-sm-0 pl-sm-0">
                        <Container fluid={false}>
                           <Row>
                              {(() => {
                                 if (isLoadingDaftarBlog) {
                                    let render_placeholder = [];
                                    for (let i = 0; i < 3; i++) {
                                       render_placeholder.push(
                                          <Col lg={4} md={4} sm={12} key={i}>
                                             <div className="blog has_style_grid">
                                                <Row className="align-items-center">
                                                   <Col xs={12} className="col-row">
                                                      <div className="blog-img placeholder" style={{ height: 200 }} />
                                                   </Col>
                                                   <Col xs={12} className="col-row">
                                                      <div className="blog-wrap">
                                                         <h3 className="blog-title placeholder" style={{ height: 20 }} />
                                                         <p className="blog-excerpt placeholder" style={{ height: 100 }} />
                                                         <div
                                                            className="blog-author-detail d-flex justify-content-between align-items-center placeholder"
                                                            style={{ height: 40 }}
                                                         />
                                                      </div>
                                                   </Col>
                                                </Row>
                                             </div>
                                          </Col>
                                       );
                                    }
                                    return render_placeholder;
                                 } else {
                                    let render_content = [];
                                    daftarBlog.map((data, key) => {
                                       render_content.push(
                                          <Col lg={4} md={4} sm={12} key={key}>
                                             <div className="blog has_style_grid">
                                                <Row className="align-items-center">
                                                   <Col xs={12} className="col-row">
                                                      <div className="blog-img">
                                                         <div className="meta absolute">
                                                            <a href="#" className="comments meta-info mobile">
                                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                  <path fill="none" d="M0 0h24v24H0z" />
                                                                  <path d="M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z" />
                                                               </svg>{" "}
                                                               {data.likes}
                                                            </a>
                                                            <span className="views-counter meta-info mobile comments">
                                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                  <path fill="none" d="M0 0h24v24H0z" />
                                                                  <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                                               </svg>{" "}
                                                               {data.views}
                                                            </span>
                                                            <div className="min-read meta-info" title="3 Min Read">
                                                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                                  <path fill="none" d="M0 0h24v24H0z" />
                                                                  <path d="M13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755zM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                               </svg>{" "}
                                                               {data.share}
                                                            </div>
                                                         </div>
                                                         {(() => {
                                                            if (getImageFromString(decodeHtml(`${data.content}`))) {
                                                               return (
                                                                  <img
                                                                     src={getImageFromString(decodeHtml(`${data.content}`))}
                                                                     alt={data.title}
                                                                     loading="lazy"
                                                                  />
                                                               );
                                                            }
                                                         })()}
                                                      </div>
                                                   </Col>
                                                   <Col xs={12} className="col-row">
                                                      <div className="blog-wrap">
                                                         <h3 className="blog-title">
                                                            <a href={`/blog/${data.slug}`}>{data.title}</a>
                                                         </h3>
                                                         <p className="blog-excerpt">
                                                            {HTMLReactParser(
                                                               decodeHtml(`${data.content}`)
                                                                  .toString()
                                                                  .replace(/(<([^>]+)>)/gi, "")
                                                            )}
                                                         </p>
                                                         <div className="blog-author-detail d-flex justify-content-between align-items-center">
                                                            <div className="c-customer-review-meta d-flex justify-content-start align-items-center">
                                                               <div className="user">
                                                                  <img
                                                                     src={`/assets/images/${data.avatar}`}
                                                                     alt={data.display_name}
                                                                     className="avatar avatar-sm rounded-circle"
                                                                     loading="lazy"
                                                                  />
                                                               </div>
                                                               <div className="meta pl-20">
                                                                  <p className="name">{data.display_name}</p>
                                                                  <p className="author-post">Verified writer</p>
                                                               </div>
                                                            </div>
                                                            <span className="font-semibold text-gray">{data.tgl_posting}</span>
                                                         </div>
                                                      </div>
                                                   </Col>
                                                </Row>
                                             </div>
                                          </Col>
                                       );
                                    });
                                    return render_content;
                                 }
                              })()}
                           </Row>
                           {showLoadmoreButton ? (
                              <div className="d-flex justify-content-center pt-30">
                                 <a
                                    href="#"
                                    className="btn btn-sm btn-white"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       getDaftarBlog(page);
                                    }}
                                 >
                                    <i className="ri-restart-line" />
                                    {isLoadingLoadMore ? "Loading..." : `View more blogs`}
                                 </a>
                              </div>
                           ) : (
                              <></>
                           )}
                        </Container>
                     </Col>
                  </Row>
               </div>
            </Container>
         </main>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));
