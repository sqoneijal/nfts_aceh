import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../../Helpers";
import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";

const DetailCreators = () => {
   // bool
   const [isLoadingDetailCreators, setIsLoadingDetailCreators] = useState(false);
   const [isLoadingFollow, setIsLoadingFollow] = useState(false);

   // object
   const [detailCreators, setDetailCreators] = useState({});

   const getDetailCreators = (id) => {
      const formData = {
         id_user: id,
         user_login: user.id,
      };

      setIsLoadingDetailCreators(true);
      post("/creators/getdetailcreators", formData)
         .then((res) => {
            const { data } = res;
            setDetailCreators(data);
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
            setIsLoadingDetailCreators(false);
         });
   };

   useEffect(() => {
      getDetailCreators(segment[3]);
      return () => {};
   }, []);

   const follow = () => {
      const formData = {
         id_user: user.id,
         id_follow: detailCreators.id_creators,
      };

      setIsLoadingFollow(true);
      post("/creators/follow", formData)
         .then((res) => {
            const { data } = res;
            getDetailCreators(segment[3]);
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
            setIsLoadingFollow(false);
         });
   };

   const unfollow = () => {
      const formData = {
         id_user: user.id,
         id_follow: detailCreators.id_creators,
      };

      setIsLoadingFollow(true);
      post("/creators/unfollow", formData)
         .then((res) => {
            const { data } = res;
            getDetailCreators(segment[3]);
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
            setIsLoadingFollow(false);
         });
   };

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="mb-100">
            <div className="hero__profile">
               <div className={"cover" + (isLoadingDetailCreators ? " placeholder" : "")}>
                  <img
                     src={`/assets/images/bg/${isLoadingDetailCreators ? "cover.png" : detailCreators.bg_profile}`}
                     alt="Background profile"
                     loading="lazy"
                  />
               </div>
               <div className="infos">
                  <Container fluid={false}>
                     <Row className="flex-wrap align-items-center justify-content-between sm:space-y-50">
                        <div className="col-md-auto mr-20">
                           <div className="avatars d-flex space-x-20 align-items-center">
                              <div className="avatar_wrap">
                                 <img
                                    className="avatar avatar-lg"
                                    src={`/assets/images/${isLoadingDetailCreators ? "default-avatar.png" : detailCreators.avatar}`}
                                    alt={detailCreators.display_name}
                                    loading="lazy"
                                 />
                              </div>
                              <h5>{detailCreators.display_name}</h5>
                           </div>
                        </div>
                        <div className="col-md-auto">
                           <div className="d-sm-flex flex-wrap align-items-center space-x-20 mb-20_reset d-sm-block">
                              <div className="d-flex flex-wrap align-items-center space-x-20">
                                 <div className="mb-20">
                                    {Object.keys(user).length > 0 && typeof user.id !== "undefined" && user.id !== detailCreators.id_creators ? (
                                       <a
                                          href="#"
                                          className="btn btn-dark btn-sm"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             isLoadingFollow ? null : detailCreators.is_follow === "following" ? unfollow() : follow();
                                          }}
                                       >
                                          {isLoadingFollow ? "Loading..." : detailCreators.is_follow === "following" ? "Following" : "Follow"}
                                       </a>
                                    ) : (
                                       ""
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Row>
                  </Container>
               </div>
            </div>
         </div>
         <div className="container mb-100">
            <div className="row justify-content-center">
               <LeftSidebar detailCreators={detailCreators} />
               <RightContent />
            </div>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<DetailCreators />, document.getElementById("root"));
