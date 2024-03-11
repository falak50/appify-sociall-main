import CommentOne from "./CommentOne";


const Comment = ({allComment,setAllComment}) => {
    console.log('allComment ',allComment);
    return (
        <div>
         {allComment &&
          allComment?.map(comment =>{
            return <CommentOne
            key={comment.commentId}
            comment={comment}
            ></CommentOne>
          })
         }
        </div>
    );
};

export default Comment;

