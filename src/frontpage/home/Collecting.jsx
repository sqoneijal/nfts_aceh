import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Collecting = () => {
   return (
      <React.Fragment>
         <div className="call2action">
            <Container fluid={false}>
               <Row className="justify-content-between align-items-center sm:space-y-20">
                  <Col md={6}>
                     <div className="space-y-20">
                        <h1 className="text-white">Start your own collection today</h1>
                        <p className="color_text section__text">
                           NFT Aceh is a shared community used by several creators in Indonesia to provide the best experience for users and
                           enthusiasts of NFT assets.
                        </p>
                        <a href="/explorer" className="btn btn-primary">
                           Start Collecting
                        </a>
                     </div>
                  </Col>
                  <div className="col-md-auto">
                     <img
                        className="img-fluid img__logo"
                        src="/assets/images/Logo_illustrstion.png"
                        alt="Collection"
                        loading="lazy"
                     />
                  </div>
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Collecting;
