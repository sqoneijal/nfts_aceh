import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import ApexCharts from "apexcharts";
import { get, notification } from "../Helpers";

const Dashboard = () => {
   const getTanggalVisitor = () => {
      get("/admin/dashboard/getvisitor")
         .then((res) => {
            const { data } = res;
            const options = {
               series: data.series,
               chart: {
                  height: 750,
                  type: "line",
                  dropShadow: {
                     enabled: true,
                     color: "#000",
                     blur: 10,
                     opacity: 0.2,
                  },
                  toolbar: {
                     show: false,
                  },
               },
               dataLabels: {
                  enabled: true,
               },
               stroke: {
                  curve: "smooth",
               },
               title: {
                  text: "Active visitors for the past 30 days",
                  align: "left",
               },
               grid: {
                  borderColor: "#e7e7e7",
                  row: {
                     colors: ["#f3f3f3", "transparent"],
                     opacity: 0.5,
                  },
               },
               markers: {
                  size: .5,
               },
               xaxis: {
                  categories: data.labels,
               },
               yaxis: {
                  title: {
                     text: "Total",
                  },
                  min: 0,
                  max: Math.max.apply(Math, data.series[0].data)
               },
            };
            new ApexCharts(document.querySelector("#apexchart"), options).render();
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         });
   };

   useEffect(() => {
      getTanggalVisitor();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="page-content">
            <Container fluid={true}>
               <Row>
                  <Col xs={12}>
                     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{document.title}</h4>
                        <div className="page-title-right">
                           <Breadcrumb className="m-0">
                              <Breadcrumb.Item active>Administrator</Breadcrumb.Item>
                              <Breadcrumb.Item active>{document.title}</Breadcrumb.Item>
                           </Breadcrumb>
                        </div>
                     </div>
                  </Col>
                  <Col xs={12}>
                     <Card>
                        <Card.Body>
                           <div id="apexchart" />
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </div>
         <footer className="footer">
            <Container fluid={true}>
               <Row>
                  <Col md={12} sm={12}>
                     <div className="text-sm-end d-none d-sm-block">
                        Crafted with <i className="mdi mdi-heart text-danger" /> by sqone <span id="app_version" />
                     </div>
                  </Col>
               </Row>
            </Container>
         </footer>
      </React.Fragment>
   );
};
ReactDOM.render(<Dashboard />, document.getElementById("root"));