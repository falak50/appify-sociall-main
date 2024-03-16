import { useEffect, useState } from "react";
import PostOne from './PostOne';
import Swal from "sweetalert2";
/* eslint-disable */
const PostDispaly = ({storedPosts,setStoredPosts,setisDropdown}) => {
  const [logUser,setlogUser] = useState(JSON.parse(localStorage.getItem("logUser"))); 

  
    useEffect(() => {
      const storedPostsString = localStorage.getItem('posts');
      const parsedStoredPosts = JSON.parse(storedPostsString);
      setStoredPosts(parsedStoredPosts);
      // eslint-disable-next-line react/prop-types
    }, [] );
    
    

   const handledeletePost = (id)=>{
    console.log('handle delete post --> ',id)
    // console.log('delete -> ',post.postId);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const postsl = JSON.parse(localStorage.getItem('posts'));
        const updatePostsl = postsl?.filter((x)=>{
         return x.postId !== id
        });
        console.log("update post l -----> ",updatePostsl);
        localStorage.setItem('posts', JSON.stringify(updatePostsl));
        
        setStoredPosts(updatePostsl);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your  post is safe :)",
          icon: "error"
        });
      }
    });
    
    
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

