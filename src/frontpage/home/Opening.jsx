import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Opening = () => {
   return (
      <React.Fragment>
         <div className="hero__1">
            <Container fluid={false}>
               <Row className="align-items-center">
                  <Col lg={6}>
                     <div className="hero__left space-y-20">
                        <h1 className="hero__title">Discover digital art and collect NFTs Aceh</h1>
                        <p className="hero__text txt">
                           Aceh's NFTs are a shared community that used by some websites to provide to users best possible experience and share. Every
                           income from the community to help build houses of worship, mosques, schools, and children who have lost their parents in
                           Indonesia.
                        </p>
                        <div className="space-x-20 d-flex flex-column flex-md-row sm:space-y-20">
                           <a className="btn btn-primary" href="/donation">
                              Send your NFT for donation
                           </a>
                           <a className="btn btn-white" href="/creators">
                              View Creators
                           </a>
                        </div>
                     </div>
                  </Col>
                  <Col lg={6}>
                     <img className="img-fluid w-full" src="/assets/images/in_hero1.png" alt="" loading="lazy" />
                  </Col>
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Opening;
