import axios from "axios";
import { Store } from "react-notifications-component";

export const post = (url, form = [], config = {}) => {
   let formData = new FormData();

   if (typeof user !== "undefined") formData.append("user_modified", user.username);
   Object.keys(form).map((data) => {
      formData.append(data, form[data]);
   });

   window.Pace.restart();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return axios.post(url, formData, config);
};

export const get = (url) => {
   window.Pace.restart();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return axios.get(url);
};

export const notification = (status, msg_response, duration = 2000) => {
   Store.addNotification({
      title: status ? "Succeed" : "Warning",
      message: msg_response,
      type: status ? "success" : "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: {
         duration: duration,
         onScreen: true,
      },
   });
};

export const is_json = (string) => {
   try {
      JSON.parse(string);
   } catch (e) {
      return false;
   }
   return true;
};

export const isset = (content = {}, obj) => {
   if (typeof content[obj] !== "undefined") {
      return content[obj];
   } else {
      return "";
   }
};

export var tgl_indo = (string) => {
   if (typeof string !== "undefined" && string !== null) {
      var bulanIndo = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

      var tanggal = string.split("-")[2];
      var bulan = string.split("-")[1];
      var tahun = string.split("-")[0];

      if (typeof tanggal !== "undefined" && typeof bulanIndo[Math.abs(bulan)] !== "undefined" && typeof tahun !== "undefined") {
         return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
      } else {
         return "-";
      }
   } else {
      return "-";
   }
};

export const serialize = (obj) => {
   let str = [];
   for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   }
   return str.join("&");
};

export const nama_hari = (tanggal) => {
   const hari = new Date(tanggal).getDay();

   const config = {
      0: "Minggu",
      1: "Senin",
      2: "Selasa",
      3: "Rabu",
      4: "Kamis",
      5: "Jumat",
      6: "Sabtu",
   };
   return config[hari];
};

export const rupiah = (jumlah) => {
   let formatter = new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
   });
   return formatter.format(parseFloat(jumlah));
};

export const getImageFromString = (string) => {
   const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
   const images = [];
   let img;
   while ((img = imgRex.exec(string))) {
      images.push(img[1]);
   }

   if (images.length > 0) return images[0];
   else return "";
};

export const user_role = (key) => {
   const config = {
      1: "Administrator",
      2: "Member",
   };
   return config[key];
};

export const kFormatter = (num) => {
   return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" : Math.sign(num) * Math.abs(num);
};
