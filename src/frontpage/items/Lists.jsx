import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Row } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../../Helpers";
import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";

const Lists = () => {
   // bool
   const [isLoadingDetailProfile, setIsLoadingDetailProfile] = useState(false);

   // object
   const [detailProfile, setDetailProfile] = useState({});

   const getDetailProfile = (id) => {
      const formData = {
         id_user: id,
      };

      setIsLoadingDetailProfile(true);
      post("/items/getdetailprofile", formData)
         .then((res) => {
            const { data } = res;
            setDetailProfile(data);
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

   useEffect(() => {
      getDetailProfile(user.id);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="mb-100">
            <div className="hero__profile">
               <div className={"cover" + (isLoadingDetailProfile ? " placeholder" : "")}>
                  {isLoadingDetailProfile ? (
                     "-"
                  ) : (
                     <img src={`/assets/images/bg/${detailProfile.bg_profile}`} alt="Profile background" loading="lazy" />
                  )}
               </div>
               <div className="infos">
                  <Container fluid={false}>
                     <Row className="flex-wrap align-items-center justify-content-between sm:space-y-50">
                        <div className="col-md-auto mr-20">
                           <div className="avatars d-flex space-x-20 align-items-center">
                              <div className={"avatar_wrap" + (isLoadingDetailProfile ? " placeholder" : "")}>
                                 {isLoadingDetailProfile ? (
                                    "-"
                                 ) : (
                                    <img className="avatar avatar-lg" src={`/assets/images/${detailProfile.avatar}`} alt="avatar" loading="lazy" />
                                 )}
                              </div>
                              <h5 className={isLoadingDetailProfile ? "placeholder" : ""}>
                                 {isLoadingDetailProfile ? "-" : detailProfile.display_name}
                              </h5>
                           </div>
                        </div>
                     </Row>
                  </Container>
               </div>
            </div>
         </div>
         <Container fluid={false}>
            <Row className="justify-content-center">
               <LeftSidebar detailProfile={detailProfile} />
               <RightContent />
            </Row>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));
