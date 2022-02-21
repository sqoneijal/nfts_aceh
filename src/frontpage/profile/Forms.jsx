import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row, FormGroup, FormControl } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, get, notification } from "../../Helpers";

const Forms = () => {
   // bool
   const [isLoadingDaftarBGImage, setIsLoadingDaftarBGImage] = useState(false);
   const [isLoadingDetailProfile, setIsLoadingDetailProfile] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [daftarBGImage, setDaftarBGImage] = useState([]);

   // object
   const [detailProfile, setDetailProfile] = useState({});
   const [errors, setErrors] = useState({});

   // string
   const [profile_bg_image, setProfile_bg_image] = useState("/assets/images/bg/cover.png");
   const [bg_profile, setBg_profile] = useState("cover.png");
   const [photo_profile, setPhoto_profile] = useState("/assets/images/default-avatar.png");
   const [old_photo_profile, setOld_photo_profile] = useState("");
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

   const getDetailProfile = (id) => {
      const formData = {
         id: id,
      };

      setIsLoadingDetailProfile(true);
      post("/profile/getdetailprofile", formData)
         .then((res) => {
            const { data } = res;
            setDetailProfile(data);
            setProfile_bg_image(`/assets/images/bg/${data.bg_profile}`);
            setPhoto_profile(`/assets/images/${data.avatar}`);
            setBg_profile(data.bg_profile);
            setOld_photo_profile(data.avatar);
            setDisplay_name(data.display_name);
            setOpensea_url(data.opensea_url);
            setRarible_url(data.rarible_url);
            setFoundation_url(data.foundation_url);
            setEmail(data.email);
            setBio(data.bio);
            setFacebook_username(data.facebook_username);
            setTwitter_username(data.twitter_username);
            setDiscord_username(data.discord_username);
            setTiktok_username(data.tiktok_username);
            setTelegram_number(data.telegram_number);
            setWhatsapp_number(data.whatsapp_number);
            setEmail_notification(data.email_notification === "t" ? true : false);
            setHidden_contact(data.hidden_contact === "t" ? true : false);
            setHidden_social_media(data.hidden_social_media === "t" ? true : false);
            setAccount_private(data.account_private === "t" ? true : false);
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
            setIsLoadingDetailProfile(false);
         });
   };

   const getListBGProfile = () => {
      setIsLoadingDaftarBGImage(true);
      get(`/profile/getlistbgprofile`)
         .then((res) => {
            const { data } = res;
            setDaftarBGImage(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarBGImage(false);
         });
   };

   useEffect(() => {
      if (Object.keys(user).length > 0 && typeof user.id !== "undefined") {
         getListBGProfile();
         getDetailProfile(user.id);
      }
      return () => {};
   }, []);

   const changeBGProfile = (bg) => {
      const formData = {
         id: user.id,
         bg: bg,
      };

      post("/profile/changebgprofile", formData)
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
         });
   };

   const uploadBGProfile = (file, old_bg = "") => {
      const formData = {
         id: user.id,
         file: file,
         old_bg: old_bg,
      };

      post("/profile/uploadbgprofile", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response, 5000);
            setProfile_bg_image(data.content);
            setBg_profile(data.bg_profile);
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

   const uploadPhotoProfile = (file, old_file = "") => {
      const formData = {
         id: user.id,
         file: file,
         old_file: old_file,
      };

      post("/profile/uploadphotoprofile", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            setOld_photo_profile(data.avatar);
            setPhoto_profile(data.content);
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

   const submit = () => {
      const formData = {
         id: user.id,
         display_name: display_name,
         opensea_url: opensea_url,
         rarible_url: rarible_url,
         foundation_url: foundation_url,
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
      post("/profile/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
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
         <div className="mb-50">
            <div className="hero__profile">
               <div className="cover">
                  <img src={profile_bg_image} alt="cover" loading="lazy" />
               </div>
            </div>
         </div>
         <Container fluid={false} className="edit_profile" style={{ marginBottom: 100 }}>
            <div className="mb-50">
               <h3 className="mb-30">Choice your Cover image</h3>
               <Row className="profile-img">
                  <Col xs={6} md={2}>
                     <div className="box in__profile d-flex justify-content-center align-items-center">
                        <img className="icon" src="/assets/images/upload-plus.svg" alt="" />
                        <input
                           type="file"
                           accept="image/png, image/jpeg"
                           onChange={(e) => {
                              if (e.target.files.length > 0) uploadBGProfile(e.target.files[0], bg_profile);
                           }}
                        />
                     </div>
                  </Col>
                  {isLoadingDaftarBGImage ? (
                     <Col xs={6} md={2} className="placeholder" />
                  ) : (
                     daftarBGImage.map((data, key) => {
                        return (
                           <Col
                              xs={6}
                              md={2}
                              key={key}
                              onClick={() => {
                                 setProfile_bg_image(`/assets/images/bg/${data.file_name}`);
                                 changeBGProfile(data.file_name);
                                 setBg_profile(data.file_name);
                              }}
                           >
                              <div className={"pro_img" + (data.file_name === bg_profile ? " is_active" : "")}>
                                 <img src={data.thumbnail} alt="image thumbnail" loading="lazy" />
                              </div>
                           </Col>
                        );
                     })
                  )}
               </Row>
            </div>
            <div>
               <div className="avatars space-x-20 mb-30">
                  <div id="profile-container">
                     <img src={photo_profile} alt="Avatar" className="avatar avatar-lg border-0" loading="lazy" />
                  </div>
                  <div className="space-x-10 d-flex">
                     <div id="boxUpload">
                        <a href="#" className="btn btn-dark">
                           Upload New Photo
                        </a>
                        <input
                           id="imageUpload"
                           type="file"
                           name="profile_photo"
                           placeholder="Photo"
                           capture
                           accept="image/png, image/jpeg, image/gif"
                           onChange={(e) => {
                              if (e.target.files.length > 0) uploadPhotoProfile(e.target.files[0], old_photo_profile);
                           }}
                        />
                     </div>
                  </div>
               </div>
               <Col lg={12} className="box edit_box space-y-30">
                  <Row className="sm:space-y-20">
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
                                 <span className="nameInput">OpenSea URL</span>
                                 <FormControl
                                    value={opensea_url}
                                    onChange={(e) => setOpensea_url(e.target.value)}
                                    type="text"
                                    placeholder="https://opensea.io/xxx"
                                 />
                              </div>
                              <div className="space-y-10">
                                 <span className="nameInput">Rarible URL</span>
                                 <FormControl
                                    value={rarible_url}
                                    onChange={(e) => setRarible_url(e.target.value)}
                                    type="text"
                                    placeholder="https://rarible.com/xxx"
                                 />
                              </div>
                              <div className="space-y-10">
                                 <span className="nameInput">Foundation URL</span>
                                 <FormControl
                                    value={foundation_url}
                                    onChange={(e) => setFoundation_url(e.target.value)}
                                    type="text"
                                    placeholder="https://foundation.app/@xxx"
                                 />
                              </div>
                              <div className={"space-y-10" + (errors.email ? " has-danger" : "")}>
                                 <span className="nameInput">Email</span>
                                 <FormControl value={email} type="text" placeholder="Enter email" disabled={true} />
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
                              <input
                                 type="checkbox"
                                 id="switch1"
                                 onChange={(e) => setEmail_notification(e.target.checked)}
                                 checked={email_notification}
                              />
                              <label htmlFor="switch1">Toggle</label>
                              <span className="color_text">Email Notifications</span>
                           </li>
                           <li className="d-flex space-x-10 switch_item">
                              <input type="checkbox" id="switch2" onChange={(e) => setHidden_contact(e.target.checked)} checked={hidden_contact} />
                              <label htmlFor="switch2">Toggle</label>
                              <span className="color_text">Hidden WA/Telegram</span>
                           </li>
                           <li className="d-flex space-x-10 switch_item">
                              <input
                                 type="checkbox"
                                 id="switch3"
                                 onChange={(e) => setHidden_social_media(e.target.checked)}
                                 checked={hidden_social_media}
                              />
                              <label htmlFor="switch3">Toggle</label>
                              <span className="color_text">Hidden Facebook/Twitter/TikTok</span>
                           </li>
                           <li className="d-flex space-x-10 switch_item">
                              <input type="checkbox" id="switch4" onChange={(e) => setAccount_private(e.target.checked)} checked={account_private} />
                              <label htmlFor="switch4">Toggle</label>
                              <span className="color_text">Public/Private</span>
                           </li>
                        </ul>
                     </Col>
                  </Row>
                  <div className="hr" />
                  {/* <p className="color_black">
                     To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message.
                  </p> */}
                  <div>
                     <a
                        href="#"
                        className="btn btn-grad"
                        onClick={(e) => {
                           e.preventDefault();
                           isSubmit ? null : submit();
                        }}
                     >
                        {isSubmit ? "Loading..." : "Update Profile"}
                     </a>
                  </div>
               </Col>
            </div>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<Forms />, document.getElementById("root"));
