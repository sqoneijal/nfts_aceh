import React from "react";
import ReactDOM from "react-dom";
import Opening from "./home/Opening";
import TopMember from "./home/TopMember";
import Creators from "./home/Creators";
import Collecting from "./home/Collecting";
import Loved from "./home/Loved";

const Home = () => {
   return (
      <React.Fragment>
         <Opening />
         <div className="section__artists mt-100">
            <TopMember />
            <Creators />
            <Collecting />
            <Loved />
         </div>
      </React.Fragment>
   );
};
ReactDOM.render(<Home />, document.getElementById("root"));
