import React from "react";
import { Col, Container } from "react-bootstrap";

const Loved = () => {
   return (
      <React.Fragment>
         <Container fluid={false} style={{ marginBottom: 100 }}>
            <div className="logos__wrap">
               <div className="row align-items-center justify-content-between">
                  <Col md={12} className="col-lg-auto">
                     <h3 className="section__title md:mb-20 text-left d-flex justify-content-center">Loved by the community</h3>
                  </Col>
                  <Col md={12} className="col-lg-auto">
                     <div className="d-flex flex-column flex-md-row justify-content-center space-x-20 sm:space-x-0 sm:space-y-20 align-items-center">
                        <img src="/assets/images/1.svg" alt="" loading="lazy" />
                        <img src="/assets/images/2.svg" alt="" loading="lazy" />
                        <img src="/assets/images/3.svg" alt="" loading="lazy" />
                     </div>
                  </Col>
               </div>
            </div>
         </Container>
      </React.Fragment>
   );
};
export default Loved;
