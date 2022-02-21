import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row, FormGroup, FormControl } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, post, notification } from "../../Helpers";

const EditItem = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [isLoadingDaftarKategori, setIsLoadingDaftarKategori] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // array
   const [daftarKategori, setDaftarKategori] = useState([]);

   // string
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [image, setImage] = useState("");
   const [link_place_bid, setLink_place_bid] = useState("");
   const [id_kategori, setId_kategori] = useState("");

   const getDaftarKategori = () => {
      setIsLoadingDaftarKategori(true);
      get("/upload/getdaftarkategori")
         .then((res) => {
            const { data } = res;
            setDaftarKategori(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDaftarKategori(false);
         });
   };

   useEffect(() => {
      getDaftarKategori();
      return () => {};
   }, []);

   const submit = () => {
      const formData = {
         id: segment[2],
         title: title,
         description: description,
         image: image,
         link_place_bid: link_place_bid,
         id_user: user.id,
      };

      setIsSubmit(true);
      post("/upload/updateitem", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               window.open(`/itemdetail/${data.content}`, "_self");
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

   const getDetailEdit = (id) => {
      const formData = {
         id: id,
      };

      post("/upload/getdetailedit", formData)
         .then((res) => {
            const { data } = res;
            setImage(data.image);
            setLink_place_bid(data.link_place_bid);
            setId_kategori(data.id_kategori);
            setTitle(data.title);
            setDescription(data.description);
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
      getDetailEdit(segment[2]);
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="hero__upload">
            <Container fluid={false}>
               <div className="space-y-20">
                  <h2 className="title">Create new item</h2>
               </div>
            </Container>
         </div>
         <Container fluid={false}>
            <div className="box in__upload mb-120">
               <Row>
                  <Col lg={6}>
                     <div className="left__part space-y-40 md:mb-20 upload_file">
                        <div className="space-y-20">
                           <img
                              className="icon"
                              src={image ? image : "/assets/images/upload.svg"}
                              alt="upload"
                              loading="lazy"
                              style={{ width: "70%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                           />
                        </div>
                     </div>
                  </Col>
                  <Col lg={6}>
                     <FormGroup className="space-y-10">
                        <div className="space-y-20">
                           <div className={"space-y-10" + (errors.image || errors.user_modified || errors.id_user ? " has-danger" : "")}>
                              <span className="nameInput">Image URL</span>
                              <FormControl
                                 value={image}
                                 onChange={(e) => setImage(e.target.value)}
                                 type="text"
                                 placeholder="e. g. https://lh3.googleusercontent.com/***"
                                 autoFocus={true}
                              />
                              <FormControl.Feedback type="invalid">{errors.image || errors.user_modified || errors.id_user}</FormControl.Feedback>
                           </div>
                           <div className="space-y-10">
                              <span className="nameInput">
                                 Link Place Bid <span className="color_text">(optional)</span>
                              </span>
                              <FormControl
                                 value={link_place_bid}
                                 onChange={(e) => setLink_place_bid(e.target.value)}
                                 type="text"
                                 placeholder="e. g. https://opensea.io/assets/***"
                              />
                           </div>
                           <div className="space-y-10">
                              <span className="nameInput">
                                 Categories <span className="color_text">(optional)</span>
                              </span>
                              <FormControl
                                 value={id_kategori}
                                 onChange={(e) => setId_kategori(e.target.value)}
                                 as="select"
                                 disabled={isLoadingDaftarKategori}
                              >
                                 <option value="">{isLoadingDaftarKategori ? "Loading..." : "--choose--"}</option>
                                 {daftarKategori.map((data, key) => {
                                    return (
                                       <option key={key} value={data.id}>
                                          {data.nama}
                                       </option>
                                    );
                                 })}
                              </FormControl>
                           </div>
                           <div className={"space-y-10" + (errors.title ? " has-danger" : "")}>
                              <span className="nameInput">Title</span>
                              <FormControl
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 type="text"
                                 placeholder="e. g. `nft aceh design art`"
                              />
                              <FormControl.Feedback type="invalid">{errors.title}</FormControl.Feedback>
                           </div>
                           <div className="space-y-10">
                              <span className="nameInput">
                                 Description <span className="color_text">(optional)</span>
                              </span>
                              <FormControl
                                 value={description}
                                 onChange={(e) => setDescription(e.target.value)}
                                 as="textarea"
                                 rows={3}
                                 placeholder="e. g. `nft aceh design art`"
                              />
                           </div>
                        </div>
                     </FormGroup>
                  </Col>
               </Row>
               <Row className="content justify-content-between mb-20_reset mt-50">
                  <div className="col-md-auto col-12 mb-20">
                     <a
                        href="#"
                        className="btn btn-grad btn_create"
                        onClick={(e) => {
                           e.preventDefault();
                           isSubmit ? null : submit();
                        }}
                     >
                        {isSubmit ? "Loading..." : "Update item"}
                     </a>
                  </div>
               </Row>
            </div>
         </Container>
      </React.Fragment>
   );
};
ReactDOM.render(<EditItem />, document.getElementById("root"));
