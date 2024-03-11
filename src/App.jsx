
// import './App.css'
import Container from './part/Container'
import Navber from "./part/Navber"
import './assets/css/bootstrap.min.css'
import './assets/css/common.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
// import SwitchingBtn from './part/SwitchingBtn'
import posts from './Data/data.js'
import { useEffect } from 'react'
function App() {
  //initial date made 
  useEffect(() => {
    
    const storedPostsString = JSON.parse(localStorage.getItem('posts'));
    if(storedPostsString){
      const postsString = JSON.stringify(storedPostsString);
      localStorage.setItem('posts', postsString);
    }else {
      const postsString = JSON.stringify(posts);
      localStorage.setItem('posts', postsString);
    }
   
  }, []);
  //initial date made 


  return (
    <>
      {/* <SwitchingBtn></SwitchingBtn>  */}
     <Navber></Navber>
     <Container></Container>
    </>
  )
}

export default App
