import { useEffect } from "react";
import PostOne from './PostOne';
// eslint-disable-next-line react/prop-types
const PostDispaly = ({storedPosts,setStoredPosts}) => {

    useEffect(() => {
      const storedPostsString = localStorage.getItem('posts');
      const parsedStoredPosts = JSON.parse(storedPostsString);
      setStoredPosts(parsedStoredPosts);
      // eslint-disable-next-line react/prop-types
    }, [storedPosts.length] );
    console.log('get post ',storedPosts);
    return (
    <div>
      
        {storedPosts && 
        // eslint-disable-next-line react/prop-types
            storedPosts.map((x)=>{
              return <PostOne
              key={x.postId}
              post={x}
              ></PostOne>

            })
        }
    </div>   
    );
};

export default PostDispaly;

