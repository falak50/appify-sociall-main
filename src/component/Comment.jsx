import CommentOne from "./CommentOne";
/* eslint-disable */

const Comment = ({post,storedPosts, setStoredPosts,allComment,setAllComment,isShowAllcoment}) => {
    // console.log('allComment ',allComment);
    return (
        <div>
         {
          allComment?.map((comment,index) =>{
            if(isShowAllcoment){
              return <CommentOne
            key={comment.commentId}
            post={post}
            comment={comment}
            ></CommentOne>
            }else {
            if(allComment.length-1 === index)
            return <CommentOne
            key={comment.commentId}
            post={post}
            comment={comment}
            ></CommentOne>
            }
          })
         }
        
        </div>
    );
};

export default Comment;

