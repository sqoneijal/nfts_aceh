import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import { get, post, notification } from "../Helpers";
import HTMLReactParser from "html-react-parser";
import decodeHtml from "decode-html";

const About = () => {
   // bool
   const [isLoadingDetailContent, setIsLoadingDetailContent] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [detailContent, setDetailContent] = useState({});

   const submit = () => {
      const formData = {
         content: tinymce.activeEditor.getContent(),
      };

      setIsSubmit(true);
      post("/about/submit", formData)
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
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   const getAbout = () => {
      setIsLoadingDetailContent(true);
      get("/about/getdata")
         .then((res) => {
            const { data } = res;
            setDetailContent(data);
         })
         .catch((e) => {
            if (typeof e.response.data.message !== "undefined") {
               notification(false, e.response.data.message);
            } else {
               notification(false, e.response.statusText);
            }
         })
         .then(() => {
            setIsLoadingDetailContent(false);
            if (user.role === "1") {
               tinymce.init({
                  selector: "#tinymce",
                  inline: true,
                  menubar: false,
                  powerpaste_word_import: "clean",
                  powerpaste_html_import: "clean",
                  plugins: [
                     "advlist autolink lists link image charmap print preview anchor",
                     "searchreplace visualblocks code fullscreen",
                     "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                     "undo redo | formatselect | " +
                     "bold italic backcolor | alignleft aligncenter " +
                     "alignright alignjustify | bullist numlist outdent indent | " +
                     "removeformat | saveButton",
                  setup: function (editor) {
                     editor.ui.registry.addButton("saveButton", {
                        text: isSubmit ? "Loading..." : "Save",
                        onAction: function () {
                           submit();
                        },
                     });
                  },
               });
            }
         });
   };

   useEffect(() => {
      getAbout();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <ReactNotifications />
         <div className="hero_privacy">
            <div className="container">
               <div className="d-flex jusitify-content-center align-items-center space-x-10">
                  <h1 className="text-left">About Us</h1>
                  <i className="ri-file-text-fill privacy__icon" />
               </div>
            </div>
         </div>
         <div className="privacy__page" style={{ marginBottom: 100 }}>
            <Container fluid={false}>
               <div className="box space-y-30" style={{ padding: "60px 30px" }}>
                  <div className="space-y-20" id="tinymce">
                     {HTMLReactParser(decodeHtml(`${detailContent.content}`))}
                  </div>
               </div>
            </Container>
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<About />, document.getElementById("root"));
