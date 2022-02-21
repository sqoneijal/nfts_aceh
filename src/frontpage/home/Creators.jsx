import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { get, notification } from "../../Helpers";
import { ReactNotifications } from "react-notifications-component";

const Creators = () => {
   // bool
   const [isLoadingDaftarCreators, setIsLoadingDaftarCreators] = useState(false);
   const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
   const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
   const [isLoadingDaftarKategori, setIsLoadingDaftarKategori] = useState(false);

   // array
   const [daftarCreators, setDaftarCreators] = useState([]);
   const [daftarKategori, setDaftarKategori] = useState([]);

   // number
   const [page, setPage] = useState(0);

   const getDaftarKategori = () => {
      setIsLoadingDaftarKategori(true);
      get("/home/getdaftarkategori")
         .then((res) => {
            const { data } = res;
            setDaftarKategori(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarKategori(false);
         });
   };

   const getDaftarCreators = (page = 0) => {
      if (page > 0) setIsLoadingLoadMore(true);
      else setIsLoadingDaftarCreators(true);

      get(`/home/getdaftarcreators?page=${page}`)
         .then((res) => {
            const { data } = res;
            if (data.length > 7) setShowLoadMoreButton(true);
            else setShowLoadMoreButton(false);

            if (page > 0) setDaftarCreators((prev) => prev.concat(data));
            else setDaftarCreators(data);
            setPage(page + 1);
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
      getDaftarKategori();
      getDaftarCreators();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="mt-100">
            <Container fluid={false}>
               <div className="section__head">
                  <div className="d-md-flex sm:space-y-20 space-x-20 justify-content-between align-items-center">
                     <h2 className="section__title text-center">{`Explore Creators & NFTs`}</h2>
                     <ul className="menu_categories space-x-20">
                        {isLoadingDaftarKategori ? (
                           <li>Loading...</li>
                        ) : (
                           daftarKategori.map((data, key) => {
                              return (
                                 <li key={key}>
                                    <a href="#" className="color_brand">
                                       <i className={data.icon} /> <span>{data.nama}</span>
                                    </a>
                                 </li>
                              );
                           })
                        )}
                     </ul>
                  </div>
               </div>
               <Row>
                  {(() => {
                     if (isLoadingDaftarCreators) {
                        let render_placeholder = [];
                        for (let i = 0; i < 4; i++) {
                           render_placeholder.push(
                              <Col xl={3} lg={4} md={6} sm={6} key={i}>
                                 <div className="card__item four">
                                    <div className="card_body space-y-10">
                                       <div className="creators space-x-10 placeholder" style={{ height: 20 }} />
                                       <div className="card_head placeholder" />
                                       <h6 className="card_title placeholder" style={{ height: 20 }} />
                                       <div className="card_footer d-block space-y-10 placeholder" style={{ height: 20 }} />
                                    </div>
                                 </div>
                              </Col>
                           );
                        }
                        return render_placeholder;
                     }
                  })()}
                  {daftarCreators.map((data, key) => {
                     return (
                        <Col xl={3} lg={4} md={6} sm={6} key={key}>
                           <div className="card__item four">
                              <div className="card_body space-y-10">
                                 <div className="creators space-x-10">
                                    <div className="avatars space-x-3">
                                       <a href={`/creators/detail/${data.id}`}>
                                          <img src={`/assets/images/${data.avatar}`} alt="Avatar" className="avatar avatar-sm" />
                                       </a>
                                       <a href={`/creators/detail/${data.id}`}>
                                          <p className="avatars_name txt_xs">{data.display_name}</p>
                                       </a>
                                    </div>
                                 </div>
                                 <div className="card_head">
                                    <a href={`/itemdetail/${data.id_nft}`}>
                                       <img src={data.image} alt={data.title} loading="lazy" />
                                    </a>
                                    <a href="#" className="likes space-x-3">
                                       <i className="ri-heart-3-fill"></i>
                                       <span className="txt_sm">{(Math.random() * 10).toFixed(2)}k</span>
                                    </a>
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
                  })}
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
                        <i className="ri-restart-line" /> {isLoadingLoadMore ? "Loading..." : `View more Creators & NFTs`}
                     </a>
                  </div>
               ) : (
                  ""
               )}
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Creators;
