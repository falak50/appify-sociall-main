import Container from "../part/Container";
import Navber from "../part/Navber";
import Modal from "../notIncludes/Modal";
import { useState } from "react";
import Dailog from "../notIncludes/Dailog";


const Home = () => {
  
    return (
      <div>
      {/* <Dailog></Dailog> */}
       <Navber></Navber>
       <Container></Container> 
      </div>
    );
};

export default Home;