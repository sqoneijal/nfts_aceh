import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { post, notification } from "../../Helpers";
import decodeHtml from "decode-html";

const Forms = (props) => {
   const { openModalForms, setOpenModalForms, pageType, setPageType, setRefreshDatatable, detailContent, setDetailContent } = props;

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [title, setTitle] = useState("Untitled");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update" && openModalForms) {
         setId(detailContent.id);
         setTitle(detailContent.title);
         setTimeout(() => {
            tinymce.activeEditor.setContent(decodeHtml(detailContent.content));
         }, 2000);
      }
      return () => {};
   }, [openModalForms, pageType, detailContent]);

   useEffect(() => {
      if (openModalForms) {
         tinymce.init({
            selector: "#tinymce",
            plugins:
               "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
            menubar: false,
            toolbar:
               "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media link anchor codesample | ltr rtl code",
            height: 600,
            image_caption: true,
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            images_upload_handler: function (blobInfo, success, failure) {
               success("data:" + blobInfo.blob().type + ";base64," + blobInfo.base64());
            },
            image_class_list: [
               { title: "None", value: "" },
               { title: "Responsive", value: "img-responsive img-thumbnail" },
            ],
         });
      }
      return () => {};
   }, [openModalForms]);

   const clearProps = () => {
      setOpenModalForms(false);
      setPageType("insert");
      setId("");
      setTitle("Untitled");
      setErrors({});
      tinymce.activeEditor.setContent("");
      setDetailContent({});
   };

   const submit = () => {
      const formData = {
         pageType: pageType,
         id: id,
         title: title,
         content: tinymce.activeEditor.getContent(),
      };

      setIsSubmit(true);
      post("/admin/blogs/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            if (data.status) {
               setRefreshDatatable(data.status);
               clearProps();
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

   return (
      <React.Fragment>
         <div
            className={"offcanvas offcanvas-end" + (openModalForms ? " show" : "")}
            style={{ visibility: openModalForms ? "visible" : "hidden" }}
            data-bs-scroll={true}
         >
            <div className="offcanvas-header">
               <h5 id="offcanvasRightLabel">{pageType === "insert" ? "Add New" : "Update"} Blogs</h5>
               <button className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={(e) => clearProps()} />
            </div>
            <div className="offcanvas-body">
               <FormGroup className={errors.title || errors.id || errors.user_modified ? "has-danger" : ""}>
                  <FormLabel className="required">Title</FormLabel>
                  <FormControl value={title} onChange={(e) => setTitle(e.target.value)} autoFocus={true} />
                  <FormControl.Feedback type="invalid">{errors.title || errors.id || errors.user_modified}</FormControl.Feedback>
               </FormGroup>
               <FormGroup>
                  <FormLabel className="required">Content</FormLabel>
                  <FormControl as="textarea" id="tinymce" />
               </FormGroup>
               <FormGroup>
                  <Button onClick={() => (isSubmit ? null : submit())} disabled={isSubmit} className="waves-effect">
                     {isSubmit ? "Loading..." : "Submit"}
                  </Button>
               </FormGroup>
            </div>
         </div>
         {openModalForms ? <div className="modal-backdrop fade show" /> : ""}
      </React.Fragment>
   );
};
export default Forms;
