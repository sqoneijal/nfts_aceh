import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../../Helpers";

const Verify = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [password, setPassword] = useState("");
   const [confirm_password, setConfirm_password] = useState("");

   const submit = (e) => {
      const formData = {
         email: content.email,
         password: password,
         confirm_password: confirm_password,
      };

      setIsSubmit(true);
      post("/register/handleverify", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               window.open("/profile", "_self");
            }
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
            setIsSubmit(false);
         });
   };

   return (
      <React.Fragment>
         <ReactNotifications />
         <Container fluid={false} style={{ marginBottom: 100 }}>
            <div className="hero_newsletter box bg_white">
               <Row className="gx-5 align-items-center">
                  <Col lg={6} className="left__side">
                     <div className="content space-y-20">
                        <h1 className="hero__title">Sign up for The NFT Aceh</h1>
                        <p className="hero__desc">Just one more step to activate your account</p>
                        <FormControl type="text" disabled={true} value={content.email} />
                        <div className="space-y-20">
                           <div className={"space-y-10" + (errors.password ? " has-danger" : "")}>
                              <span className="nameInput">Please enter a new password</span>
                              <FormControl
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 type="password"
                                 placeholder="enter new password"
                                 autoFocus={true}
                              />
                              <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
                           </div>
                           <div className={"space-y-10" + (errors.confirm_password ? " has-danger" : "")}>
                              <span className="nameInput">Confirm new password</span>
                              <FormControl
                                 value={confirm_password}
                                 onChange={(e) => setConfirm_password(e.target.value)}
                                 type="password"
                                 placeholder="confirm new password"
                              />
                              <FormControl.Feedback type="invalid">{errors.confirm_password}</FormControl.Feedback>
                           </div>
                        </div>
                        <div>
                           <a
                              href="#"
                              className="btn btn-grad"
                              onClick={(e) => {
                                 e.preventDefault();
                                 isSubmit ? null : submit();
                              }}
                           >
                              {isSubmit ? "Loading..." : "Submit"}
                           </a>
                        </div>
                     </div>
                  </Col>
                  <Col lg={6} className="right__side">
                     <img className="img-fluid hero__img" src="/assets/images/newsletter.png" alt="newsletter" loading="lazy" />
                  </Col>
               </Row>
            </div>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<Verify />, document.getElementById("root"));
