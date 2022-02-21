import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row, FormGroup, FormControl, Alert } from "react-bootstrap";
import { post, notification } from "../../Helpers";
import { ReactNotifications } from "react-notifications-component";

const Forms = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [statusSubmit, setStatusSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [display_name, setDisplay_name] = useState("");
   const [opensea_url, setOpensea_url] = useState("");
   const [rarible_url, setRarible_url] = useState("");
   const [foundation_url, setFoundation_url] = useState("");
   const [email, setEmail] = useState("");
   const [facebook_username, setFacebook_username] = useState("");
   const [discord_username, setDiscord_username] = useState("");
   const [tiktok_username, setTiktok_username] = useState("");
   const [telegram_number, setTelegram_number] = useState("");
   const [whatsapp_number, setWhatsapp_number] = useState("");
   const [email_notification, setEmail_notification] = useState("");
   const [hidden_contact, setHidden_contact] = useState("");
   const [hidden_social_media, setHidden_social_media] = useState("");
   const [account_private, setAccount_private] = useState("");
   const [twitter_username, setTwitter_username] = useState("");
   const [bio, setBio] = useState("");

   const clearState = () => {
      setErrors({});
      setDisplay_name("");
      setOpensea_url("");
      setRarible_url("");
      setFoundation_url("");
      setEmail("");
      setFacebook_username("");
      setDiscord_username("");
      setTiktok_username("");
      setTelegram_number("");
      setWhatsapp_number("");
      setEmail_notification("");
      setHidden_contact("");
      setHidden_social_media("");
      setAccount_private("");
      setTwitter_username("");
      setBio("");
   };

   const submit = () => {
      const formData = {
         display_name: display_name,
         opensea_url: opensea_url,
         rarible_url: rarible_url,
         foundation_url: foundation_url,
         email: email,
         facebook_username: facebook_username,
         discord_username: discord_username,
         tiktok_username: tiktok_username,
         telegram_number: telegram_number,
         whatsapp_number: whatsapp_number,
         email_notification: email_notification,
         hidden_contact: hidden_contact,
         hidden_social_media: hidden_social_media,
         account_private: account_private,
         twitter_username: twitter_username,
         bio: bio,
      };

      setIsSubmit(true);
      post("/register/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);
            setStatusSubmit(data.status);
            if (data.status) {
               window.scrollTo(0, 0);
               clearState();
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

   useEffect(() => {
      $("#profileImage").click(function () {
         $("#imageUpload").click();
      });

      const fasterPreview = (uploader) => {
         if (uploader.files && uploader.files[0]) {
            $("#profileImage").attr("src", window.URL.createObjectURL(uploader.files[0]));
         }
      };

      $("#imageUpload").change(function () {
         fasterPreview(this);
      });
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="edit_profile register">
            <Container fluid={false}>
               <Row>
                  <Col lg={12} md={12} sm={12}>
                     <div className="right_part space-y-20">
                        <h1 className="color_white">Register new account</h1>
                        <p className="color_white" style={{ color: "white !important" }}>
                           You can set preferred display name, create your profile URL and manage other personal settings.
                        </p>
                        <div className="box edit_box w-full space-y-20">
                           <Row>
                              {statusSubmit ? (
                                 <Alert variant="info">
                                    <h4>Registration Successful</h4>
                                    <p>Please check your email to verify</p>
                                 </Alert>
                              ) : (
                                 ""
                              )}
                              <Col lg={6} className="account-info">
                                 <h3 className="mb-20">🍉 Account info</h3>
                                 <FormGroup className="space-y-10 mb-0">
                                    <div className="space-y-20">
                                       <div className={"space-y-10" + (errors.display_name ? " has-danger" : "")}>
                                          <span className="nameInput">Display name</span>
                                          <FormControl
                                             value={display_name}
                                             onChange={(e) => setDisplay_name(e.target.value)}
                                             type="text"
                                             placeholder="your name"
                                          />
                                          <FormControl.Feedback type="invalid">{errors.display_name}</FormControl.Feedback>
                                       </div>
                                       <div className="space-y-10">
                                          <span className="nameInput">OpenSea Username</span>
                                          <FormControl
                                             value={opensea_url}
                                             onChange={(e) => setOpensea_url(e.target.value)}
                                             type="text"
                                             placeholder="e.g. nftaceh"
                                          />
                                       </div>
                                       <div className="space-y-10">
                                          <span className="nameInput">Rarible Username</span>
                                          <FormControl
                                             value={rarible_url}
                                             onChange={(e) => setRarible_url(e.target.value)}
                                             type="text"
                                             placeholder="e.g. nftaceh"
                                          />
                                       </div>
                                       <div className={"space-y-10" + (errors.email ? " has-danger" : "")}>
                                          <span className="nameInput">Email</span>
                                          <FormControl
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                             type="text"
                                             placeholder="Enter email"
                                          />
                                          <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
                                       </div>
                                       <div className="space-y-10">
                                          <span className="nameInput">Bio</span>
                                          <textarea
                                             value={bio}
                                             onChange={(e) => setBio(e.target.value)}
                                             style={{ minHeight: 110 }}
                                             placeholder="Add your bio"
                                          />
                                       </div>
                                    </div>
                                 </FormGroup>
                              </Col>
                              <Col lg={6} className="social-media">
                                 <h3 className="mb-20">👨 Social media</h3>
                                 <FormGroup className="space-y-10">
                                    <div className="space-y-20">
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-facebook-circle-fill" /> Facebook
                                          </span>
                                          <FormControl
                                             value={facebook_username}
                                             onChange={(e) => setFacebook_username(e.target.value)}
                                             type="text"
                                             placeholder="facebook username"
                                          />
                                       </div>
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-twitter-fill" /> Twitter
                                          </span>
                                          <FormControl
                                             value={twitter_username}
                                             onChange={(e) => setTwitter_username(e.target.value)}
                                             type="text"
                                             placeholder="twitter username"
                                          />
                                       </div>
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-discord-fill" /> Discord
                                          </span>
                                          <FormControl
                                             value={discord_username}
                                             onChange={(e) => setDiscord_username(e.target.value)}
                                             type="text"
                                             placeholder="discord username"
                                          />
                                       </div>
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-tiktok-fill" /> TikTok
                                          </span>
                                          <FormControl
                                             value={tiktok_username}
                                             onChange={(e) => setTiktok_username(e.target.value)}
                                             type="text"
                                             placeholder="tiktok username"
                                          />
                                       </div>
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-telegram-fill" /> Telegram
                                          </span>
                                          <FormControl
                                             value={telegram_number}
                                             onChange={(e) => setTelegram_number(e.target.value)}
                                             type="text"
                                             placeholder="telegram number/username"
                                          />
                                       </div>
                                       <div className="d-flex flex-column">
                                          <span className="nameInput mb-10">
                                             <i className="ri-whatsapp-fill" /> WhatsApp
                                          </span>
                                          <FormControl
                                             value={whatsapp_number}
                                             onChange={(e) => setWhatsapp_number(e.target.value)}
                                             type="text"
                                             placeholder="whatsapp number"
                                          />
                                       </div>
                                    </div>
                                 </FormGroup>
                                 <h3 className="mb-20 mt-40">📮 Notifications</h3>
                                 <ul className="space-y-10">
                                    <li className="d-flex space-x-10 switch_item">
                                       <input type="checkbox" id="switch1" onChange={(e) => setEmail_notification(e.target.checked)} />
                                       <label htmlFor="switch1">Toggle</label>
                                       <span className="color_text">Email Notifications</span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                       <input type="checkbox" id="switch2" onChange={(e) => setHidden_contact(e.target.checked)} />
                                       <label htmlFor="switch2">Toggle</label>
                                       <span className="color_text">Hidden WA/Telegram</span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                       <input type="checkbox" id="switch3" onChange={(e) => setHidden_social_media(e.target.checked)} />
                                       <label htmlFor="switch3">Toggle</label>
                                       <span className="color_text">Hidden Facebook/Twitter/TikTok</span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                       <input type="checkbox" id="switch4" onChange={(e) => setAccount_private(e.target.checked)} />
                                       <label htmlFor="switch4">Toggle</label>
                                       <span className="color_text">Public/Private</span>
                                    </li>
                                 </ul>
                              </Col>
                           </Row>
                           <div className="hr" />
                           <input type="checkbox" id="switch5" />
                           <label htmlFor="switch5">Toggle</label>
                           <span className="color_text">Agree</span>
                           <br />
                           <p className="color_black">
                              Please take a few minutes to read and understand the NFT Aceh Community Terms of Service. To continue, you must agree to
                              the terms of service by ticking the box.
                           </p>
                           <a
                              href="#"
                              className="btn btn-grad"
                              onClick={(e) => {
                                 e.preventDefault();
                                 isSubmit ? null : submit();
                              }}
                           >
                              {isSubmit ? "Loading..." : "Register"}
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
ReactDOM.render(<Forms />, document.getElementById("root"));
