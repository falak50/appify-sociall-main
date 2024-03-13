import { useEffect, useState } from "react";
import PostOne from './PostOne';
// eslint-disable-next-line react/prop-types
const PostDispaly = ({storedPosts,setStoredPosts,setisDropdown}) => {
  const [logUser,setlogUser] = useState(JSON.parse(localStorage.getItem("logUser"))); 

  
    useEffect(() => {
      const storedPostsString = localStorage.getItem('posts');
      const parsedStoredPosts = JSON.parse(storedPostsString);
      setStoredPosts(parsedStoredPosts);
      // eslint-disable-next-line react/prop-types
    }, [] );
    
    // useEffect(() => {
    //   const storedPostsString = localStorage.getItem('posts');
    //   const parsedStoredPosts = JSON.parse(storedPostsString);
    //   // setStoredPosts(parsedStoredPosts);
    //   // eslint-disable-next-line react/prop-types
    // }, [storedPosts.lenght] );
   // console.log('get post ',storedPosts);

   const handledeletePost = (id)=>{
    console.log('handle delete post --> ',id)
    // console.log('delete -> ',post.postId);
    const postsl = JSON.parse(localStorage.getItem('posts'));
    const updatePostsl = postsl?.filter((x)=>{
     return x.postId !== id
    });
    console.log("update post l -----> ",updatePostsl);
    localStorage.setItem('posts', JSON.stringify(updatePostsl));
    
    setStoredPosts(updatePostsl);
    
  }
    return (
    <div>
      
        {storedPosts && 
        // eslint-disable-next-line react/prop-types
            storedPosts.map((x)=>{
              return <PostOne
              key={x?.postId}
              post={x}
              storedPosts={storedPosts}
              setStoredPosts={setStoredPosts}
              handledeletePost={handledeletePost}
              logUser={logUser}
              setlogUser={setlogUser}
              ></PostOne>

            })
        }
    </div>   
    );
};

export default PostDispaly;

