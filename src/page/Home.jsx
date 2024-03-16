import Container from "../part/Container";
import Navber from "../part/Navber";
import Modal from "../notIncludes/Modal";
import { useEffect, useState } from "react";
import Dailog from "../notIncludes/Dailog";
import { Navigate } from "react-router-dom";


const Home = () => {
  const [isNavitage,setIsNavitage] = useState(false);
   useEffect(()=>{
    const logUser = JSON.parse(localStorage.getItem('logUser'));
    if(!logUser)setIsNavitage(true);
   
   },[])
   if(isNavitage){
    return <Navigate to="/login"  replace></Navigate>
  }
    return (
      <div>
      {/* <Dailog></Dailog> */}
       <Navber></Navber>
       <Container></Container> 
      </div>
    );
};

export default Home;