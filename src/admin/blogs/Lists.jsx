import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Breadcrumb, Col, Container, Row, Button, Card, Table } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { post, notification } from "../../Helpers";
import Forms from "./Forms";

let datatable;

const Lists = () => {
   // bool
   const [openModalForms, setOpenModalForms] = useState(false);
   const [refreshDatatable, setRefreshDatatable] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});

   // string
   const [pageType, setPageType] = useState("insert");

   const hapus = (id) => {
      const formData = {
         id: id,
      };

      post("/admin/blogs/hapus", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            setRefreshDatatable(data.status);
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

   useEffect(() => {
      datatable = $("#datatable").DataTable({
         ordering: true,
         processing: true,
         serverSide: true,
         pageLength: 100,
         ajax: {
            url: "/admin/blogs/getdata",
            type: "POST",
            error: (xhr) => {
               if (xhr) notification(false, xhr.statusText);
            },
         },
         createdRow: (row, data) => {
            row.querySelector("#edit").onclick = (e) => {
               e.preventDefault();
               setDetailContent(data.detailContent);
               setOpenModalForms(true);
               setPageType("update");
            };

            row.querySelector("#delete").onclick = (e) => {
               e.preventDefault();
               bootbox.confirm({
                  title: "Konfirmasi",
                  message: "Apakah anda yakin ingin menghapus?",
                  buttons: {
                     confirm: {
                        label: "Iya",
                        className: "btn-success active waves-effect btn-sm",
                     },
                     cancel: {
                        label: "Tidak",
                        className: "btn-danger active waves-effect btn-sm",
                     },
                  },
                  callback: function (result) {
                     if (result) {
                        hapus(data.detailContent.id);
                     }
                  },
               });
            };
         },
         columns: [
            null,
            { class: "text-center" },
            { class: "text-center" },
            { class: "text-center" },
            { class: "text-center" },
            { class: "text-center", orderable: false },
         ],
         drawCallback: () => {
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
               return new bootstrap.Tooltip(e);
            });
         },
      });
      return () => {};
   }, []);

   useEffect(() => {
      if (refreshDatatable) {
         datatable.ajax.reload(false, null);
         setTimeout(() => {
            setRefreshDatatable(false);
         }, 1);
      }
      return () => {};
   }, [refreshDatatable]);

   return (
      <React.Fragment>
         <ReactNotifications />
         <Forms
            openModalForms={openModalForms}
            setOpenModalForms={(e) => setOpenModalForms(e)}
            pageType={pageType}
            setPageType={(e) => setPageType(e)}
            setRefreshDatatable={(e) => setRefreshDatatable(e)}
            detailContent={detailContent}
            setDetailContent={(e) => setDetailContent(e)}
         />
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
               </Row>
               <Row>
                  <Col xs={12}>
                     <Card>
                        <Card.Body>
                           <Table id="datatable" size="sm" bordered striped hover responsive className="mb-0">
                              <thead>
                                 <tr>
                                    <th>TITLE</th>
                                    <th>LIKES</th>
                                    <th>VIEWS</th>
                                    <th>SHARE</th>
                                    <th>UPLOADED</th>
                                    <th style={{ width: "5%" }} />
                                 </tr>
                              </thead>
                           </Table>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </div>
         <footer className="footer">
            <Container fluid={true}>
               <Row>
                  <Col md={6} sm={12}>
                     <Button size="sm" className="waves-effect" onClick={() => setOpenModalForms(true)}>
                        Add New Blog
                     </Button>
                  </Col>
                  <Col md={6} sm={12}>
                     <div className="text-sm-end d-none d-sm-block">
                        Crafted with <i className="mdi mdi-heart text-danger" /> by sqone <span id="app_version"></span>
                     </div>
                  </Col>
               </Row>
            </Container>
         </footer>
      </React.Fragment>
   );
};
ReactDOM.render(<Lists />, document.getElementById("root"));
