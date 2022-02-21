import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FormControl, Col, Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../Helpers";

const Login = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const submit = () => {
      const formData = {
         username: username,
         password: password,
      };

      setIsSubmit(true);
      post("/login/submit", formData)
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
         <div className="edit_profile register login">
            <Container fluid={false}>
               <Row>
                  <Col lg={7} />
                  <Col lg={5}>
                     <div className="right_part space-y-20">
                        <h1 className="color_white">Welcome to NFT Aceh</h1>
                        <p className="color_white" style={{ color: "white !important" }}>
                           Don't have an account yet? <a href="/register">Register</a>
                        </p>
                        <div className="box edit_box w-full space-y-20">
                           <div className="space-y-10">
                              <span className="nameInput">Email</span>
                              <div className={"confirm" + (errors.username ? " has-danger" : "")}>
                                 <FormControl value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter email" autoFocus={true} />
                                 <FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
                              </div>
                           </div>
                           <div className="space-y-10">
                              <span className="nameInput">Password</span>
                              <div className={"confirm" + (errors.password ? " has-danger" : "")}>
                                 <FormControl
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Enter your password"
                                 />
                                 <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
                              </div>
                           </div>
                           <a className="btn btn-white btn-sm color_green">Forgot password?</a>
                           <a
                              href="#"
                              className="btn btn-grad w-full btn-lg"
                              onClick={(e) => {
                                 e.preventDefault();
                                 isSubmit ? null : submit();
                              }}
                           >
                              {isSubmit ? "Loading..." : "Login"}
                           </a>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Login />, document.getElementById("root"));
