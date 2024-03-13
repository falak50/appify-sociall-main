
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/common.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import posts from './Data/data.js'
import { useEffect } from 'react'
import Registration from './page/Registration.jsx'
import Login from './page/Login.jsx'
import Home from './page/Home.jsx'
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
      
      <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
