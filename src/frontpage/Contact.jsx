import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, notification } from "../Helpers";

const Contact = () => {
   // bool
   const [isLoadingDaftarNegara, setIsLoadingDaftarNegara] = useState(false);

   // array
   const [daftarNegara, setDaftarNegara] = useState([]);

   const getDaftarNegara = () => {
      setIsLoadingDaftarNegara(true);
      get("/contact/getdaftarnegara")
         .then((res) => {
            const { data } = res;
            setDaftarNegara(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarNegara(false);
         });
   };

   useEffect(() => {
      getDaftarNegara();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="mt-0 mb-100">
            <div className="contact">
               <Row>
                  <Col md={4} className="contact__img">
                     <div className="img__wrap">
                        <img src="/assets/images/contact.png" alt="contact us" loading="lazy" />
                     </div>
                  </Col>
                  <div className="col-md-8 contact__content">
                     <div className="container">
                        <div className="content__wrap space-y-20">
                           <div className="space-y-20">
                              <h1 className="text-left">Hi, we are NFTs Aceh.</h1>
                              <p className="contact__desc">
                                 We're here to help and answer any question you might have. <br /> We look forward to hearing from you
                              </p>
                           </div>
                           <div className="box is__big">
                              <div className="space-y-10 mb-0">
                                 <div className="row">
                                    <div className="col-sm-6 space-y-20">
                                       <div className="space-y-10">
                                          <span className="nameInput">Email address</span>
                                          <input type="email" className="form-control" placeholder="contact@gmail.com" />
                                       </div>
                                       <div className="space-y-10">
                                          <span className="nameInput">{isLoadingDaftarNegara ? "Loading..." : "Select Country"}</span>
                                          <select className="form-select custom-select" disabled={isLoadingDaftarNegara}>
                                             <option value="">--select one--</option>
                                             {daftarNegara.map((data, key) => {
                                                return (
                                                   <option value={data.id} key={key}>
                                                      {data.nama}
                                                   </option>
                                                );
                                             })}
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-sm-6 space-y-20 mt-10">
                                       <div className="space-y-10">
                                          <span className="nameInput">Full Name</span>
                                          <input type="text" className="form-control" placeholder="NFTs Name" />
                                       </div>
                                       <div className="space-y-10">
                                          <span className="nameInput">Select a Subject</span>
                                          <select className="form-select custom-select" aria-label="Default select example">
                                             <option>Service Request</option>
                                             <option>NFT items</option>
                                             <option>Wallet</option>
                                             <option>Purchase</option>
                                             <option>Support</option>
                                          </select>
                                       </div>
                                    </div>
                                    <div className="col-12 mt-20">
                                       <div className="space-y-10">
                                          <span className="nameInput">Message</span>
                                          <textarea style={{ minHeight: 110 }} className="mb-0"></textarea>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Row>
            </div>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Contact />, document.getElementById("root"));
