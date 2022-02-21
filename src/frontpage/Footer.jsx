import React from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
   return (
      <Container fluid={false}>
         <Row>
            <Col lg={6} className="space-y-20">
               <div className="footer__logo">
                  <a href="/">
                     <img src='/assets/images/logo.svg' alt="logo" loading="lazy" />
                  </a>
               </div>
               <p className="footer__text">NFT Aceh is the Community of Aceh Province of Indonesia</p>
               <div>
                  <ul className="footer__social space-x-10 mb-40">
                     <li>
                        <a href="#">
                           <i className="ri-facebook-line" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <i className="ri-messenger-line" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <i className="ri-whatsapp-line" />
                        </a>
                     </li>
                     <li>
                        <a href="#">
                           <i className="ri-youtube-line" />
                        </a>
                     </li>
                  </ul>
               </div>
               <p className="copyright">
                  Disclamer : Trading bitcoin and cryptocurrencies carries a high level of risk, before deciding to trade cryptocurrencies you should
                  carefully consider your investment objectives, level of experience and risk appetite. NFT Aceh does not force users to make
                  transactions. All decisions with your digital money assets are your own and do not depend on any party.
               </p>
            </Col>
            <Col lg={2} className="col-6">
               <h6 className="footer__title">NFT Aceh</h6>
               <ul className="footer__list">
                  <li>
                     <a href="/">Home</a>
                  </li>
                  <li>
                     <a href="/about">About Us</a>
                  </li>
                  <li>
                     <a href="/contact">Contact Us</a>
                  </li>
                  <li>
                     <a href="/donation">Donation</a>
                  </li>
               </ul>
            </Col>
            <Col lg={2} className="col-6">
               <h6 className="footer__title">Assets</h6>
               <ul className="footer__list">
                  <li>
                     <a href="index.php?creators"> Creators </a>
                  </li>
                  <li>
                     <a href="index.php?creators"> Explorer NFTs </a>
                  </li>
                  <li>
                     <a href="index.php?blogs"> Blogs </a>
                  </li>
               </ul>
            </Col>
            <Col lg={2} className="col-6">
               <h6 className="footer__title">Helps</h6>
               <ul className="footer__list">
                  <li>
                     <a href="/faq">FAQ</a>
                  </li>
                  <li>
                     <a href="/helpcenter">Helps Center</a>
                  </li>
                  <li>
                     <a href="/terms">Terms and Conditions</a>
                  </li>
                  <li>
                     <a href="/privacypolicy">Privacy Policy</a>
                  </li>
               </ul>
            </Col>
         </Row>
         <p className="copyright text-center">Copyright © {new Date().getFullYear()}. Created with love by NFT Aceh Community.</p>
      </Container>
   );
};
ReactDOM.render(<Footer />, document.getElementById("root_footer"));
