import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row, FormControl } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, post, notification } from "../../Helpers";

const Lists = () => {
   // bool
   const [isLoadingDaftarCreators, setIsLoadingDaftarCreators] = useState(false);
   const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
   const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

   // array
   const [daftarCreators, setDaftarCreators] = useState([]);

   // number
   const [page, setPage] = useState(0);

   // string
   const [query_search, setQuery_search] = useState("");

   const getDaftarCreators = (page = 0) => {
      if (page > 0) setIsLoadingLoadMore(true);
      else setIsLoadingDaftarCreators(true);

      get(`/creators/getdaftarcreators?page=${page}&query=${query_search}`)
         .then((res) => {
            const { data } = res;
            if (data.length > 5) {
               setShowLoadMoreButton(true);
            } else {
               setShowLoadMoreButton(false);
            }

            setDaftarCreators((prev) => prev.concat(data));

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
            setIsLoadingDaftarCreators(false);
            setIsLoadingLoadMore(false);
         });
   };

   useEffect(() => {
      getDaftarCreators();
      return () => {};
   }, []);

   const searchCreators = (page = 0) => {
      const formData = {
         query: query_search,
      };

      setIsLoadingDaftarCreators(true);
      post(`/creators/searchcreators?page=${page}`, formData)
         .then((res) => {
            const { data } = res;
            setDaftarCreators(data);
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
            setIsLoadingDaftarCreators(false);
         });
   };

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="section__creators mt-50 mb-100">
            <Container fluid={false}>
               <div className="space-y-30">
                  <div className="section_head">
                     <Row className="justify-content-between align-items-center">
                        <div className="col-lg-auto">
                           <h2 className="section__title">Discover all Creators</h2>
                        </div>
                        <Col lg={4} md={4} sm={12}>
                           <div className="search">
                              <FormControl
                                 value={query_search}
                                 onChange={(e) => {
                                    setQuery_search(e.target.value);
                                 }}
                                 onKeyUp={(e) => {
                                    if (e.keyCode === 13) {
                                       isLoadingDaftarCreators ? null : searchCreators();
                                    }
                                 }}
                                 placeholder="Search"
                                 className="bg_white"
                                 style={{ background: "white !important" }}
                              />
                              <button className="result" onClick={() => (isLoadingDaftarCreators ? null : searchCreators())}>
                                 <i className="ri-search-line" />
                              </button>
                           </div>
                        </Col>
                     </Row>
                  </div>
                  <div className="section__body space-y-20">
                     <Row className="mb-20_reset">
                        {(() => {
                           if (isLoadingDaftarCreators) {
                              let render_placeholder = [];
                              for (let i = 0; i < 3; i++) {
                                 render_placeholder.push(
                                    <Col lg={4} md={4} sm={12} key={i}>
                                       <div className="creator_item creator_card space-y-20 mb-20 placeholder" style={{ height: 150 }} />
                                    </Col>
                                 );
                              }
                              return render_placeholder;
                           } else {
                              let render_list = [];
                              daftarCreators.map((data, key) => {
                                 render_list.push(
                                    <Col lg={4} md={4} sm={12} key={key} title={data.display_name}>
                                       <div className="creator_item creator_card space-y-20 mb-20">
                                          <div className="avatars flex-column space-y-10">
                                             <div className="cover">
                                                <img
                                                   src={`/assets/images/bg/${data.bg_profile}`}
                                                   alt="Background Image"
                                                   className="img-fluid"
                                                   loading="lazy"
                                                />
                                             </div>
                                             <div className="media">
                                                <a href={`/creators/detail/${data.id}`}>
                                                   <img
                                                      src={`/assets/images/${data.avatar}`}
                                                      alt={data.display_name}
                                                      className="avatar avatar-md"
                                                      loading="lazy"
                                                   />
                                                </a>
                                                <div className="text-center">
                                                   <a href={`/creators/detail/${data.id}`}>
                                                      <p className="avatars_name large color_black">{data.display_name}</p>
                                                   </a>
                                                </div>
                                             </div>
                                             <div className="text-center">
                                                <p className="color_black txt_lg">{data.collection}</p>
                                                <p className="color_black txt_sm">Collections</p>
                                             </div>
                                          </div>
                                       </div>
                                    </Col>
                                 );
                              });
                              return render_list;
                           }
                        })()}
                     </Row>
                     {showLoadMoreButton ? (
                        <div className="d-flex justify-content-center">
                           <a
                              href="#"
                              className="btn btn-sm btn-white"
                              onClick={(e) => {
                                 e.preventDefault();
                                 getDaftarCreators(page);
                              }}
                           >
                              <i className="ri-restart-line" /> {isLoadingLoadMore ? "Loading..." : `View more creators`}
                           </a>
                        </div>
                     ) : (
                        ""
                     )}
                  </div>
               </div>
            </Container>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));
