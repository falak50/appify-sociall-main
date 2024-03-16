import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SubCommentOne from "./SubCommentOne";
import { AiFillLike } from "react-icons/ai";
/* eslint-disable */
const CommentOne = ({ post, storedPosts, setStoredPosts, comment }) => {
  // console.log("commentOne ", comment);
  // console.log("commentOne ppost", post);
  const [subCommentTxt, setSubCommentTxt] = useState("");
  const [subCommentsD, setSubCommentsD] = useState([]);
  const [isReact, setIsReact] = useState(false);
  const [reactCount, setReactCount] = useState(0);
  const [logUser, setlogUser] = useState(
    JSON.parse(localStorage.getItem("logUser"))
  );
  const [isShowAllcoment,setIsShowAllComment] =useState(false);
  useEffect(() => {
    const subCommentsl = JSON.parse(localStorage.getItem("subComments"));
    console.log('collect sub',subCommentsl);
    const curSubCommentsl = subCommentsl?.filter((subComment) => {
      return subComment.commentId == comment.commentId;
    });
    console.log('after filter ',curSubCommentsl)
    setSubCommentsD(curSubCommentsl);
  }, []);
 console.log(subCommentsD)
  
  useEffect(()=>{
    const reactUserIds = comment?.reactUserIds ?? [];
    console.log('direct reactUserIds ',reactUserIds);
    const isFound =reactUserIds?.find(id=>{
     return id===logUser?.userId;
    })
    console.log('is found ',isFound);
    if(isFound)setIsReact(true);
    else setIsReact(false);

    setReactCount(reactUserIds?.length);
    
  },[])

  const handleReaction = () => {
    console.log("handle react click ",comment?.commenterUserId);
    const postsl = JSON.parse(localStorage.getItem("posts"));
    console.log(postsl)
    const postl = postsl?.map((x) => { 
      if (x.postId == post?.postId) {
      console.log('x post',x?.comments);
      const comments=x.comments;
      const update=comments.map(com=>{
        if(com?.commentId==comment.commentId){

          com.reactUserIds =com?.reactUserIds ?? [];
          console.log('x - > com ',com.reactUserIds);
        
          if(!isReact){
            com.reactUserIds.push(logUser?.userId);
            setIsReact(true);
            setReactCount(com.reactUserIds?.length);
          }
          else{
             setIsReact(false);
             com.reactUserIds=com.reactUserIds?.filter((id)=>{
               return id!==comment?.commentId;
             })
             setReactCount(0)
          }
          
          // console.log(com.reactUserIds);
        }
        return com;
      })

       }
      
      return x;
    });
    localStorage.setItem("posts", JSON.stringify(postl));
  };
  const handleSubComentSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubComentSubmit clcik", subCommentTxt);
    if (subCommentTxt === "") {
      return;
    }
    const subCommentId = uuidv4();
    const curSubComment = {
      commentId: comment?.commentId,
      subCommentId: subCommentId,
      subCommenterUserId: logUser?.userId,
      subCommenterUserName: logUser?.name,
      subCommentText: subCommentTxt,
      subCommentReactCount: 0,
    };
    //  console.log('curSubComment = ',curSubComment);

    const subComments = JSON.parse(localStorage.getItem("subComments")) ?? [];
    //  console.log('subComs ',subComments);
    const updateData = [...subComments,curSubComment];
    //  console.log('updateData ->',updateData);
    localStorage.setItem("subComments", JSON.stringify(updateData));
    /// todo add dynamic show
    setSubCommentsD(updateData);
    setSubCommentTxt('');
  };

  return (
    <div>
      <div className="_timline_comment_main">
        <div className="_comment_main">
          <div className="_comment_image">
            <a href="profile.html" className="_comment_image_link">
              <img
                src="assets/images/txt_img.png"
                alt=""
                className="_comment_img1"
              />
            </a>
          </div>

          <div className="_comment_area">
            <div className="_comment_details">
              <div className="_comment_details_top">
                <div className="_comment_name">
                  <a href="profile.html ">
                    <h4 className="_comment_name_title">
                      {comment?.CommenterName}
                    </h4>
                  </a>
                </div>
              </div>
              <div className="_comment_status">
                <p className="_comment_status_text">
                  <span>{comment?.commentText} </span>
                </p>
              </div>
              <div className="_total_reactions">
                <div className="_total_react">
                  <span className="_reaction_like">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-thumbs-up"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </span>
                  <span className="_reaction_heart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </span>
                </div>
                <span className="_total">{reactCount}</span>
              </div>
              <div className="_comment_reply">
                <div className="_comment_reply_num">
                  <ul className="_comment_reply_list">
                    <li onClick={handleReaction}>
                      {/* <span>Like.</span> */}
                      {isReact ? (
                        <AiFillLike
                          className="text-xl"
                          style={{ color: "#2596be", fontSize: "1.25rem" }}
                        />
                      ) : (
                        <AiFillLike
                          className="text-xl"
                          style={{ color: "gray", fontSize: "1.25rem" }}
                        />
                      )}
                    </li>
                    <li>
                      <span>Reply.</span>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>

            <div className="_feed_inner_comment_box">
              <form
                onSubmit={handleSubComentSubmit}
                className="_feed_inner_comment_box_form"
              >
                <div className="_feed_inner_comment_box_content">
                  <div className="_feed_inner_comment_box_content_image">
                    <img
                      src="assets/images/chat2_img.png"
                      alt=""
                      className="_comment_img"
                    />
                  </div>
                  <div className="_feed_inner_comment_box_content_txt">
                    <input
                      className="form-control _comment_textarea"
                      placeholder="Write a comment"
                      id="floatingTextarea2"
                      value={subCommentTxt}
                      onChange={(e) => setSubCommentTxt(e.target.value)}
                    />
                  </div>
                </div>

                <div className="_feed_inner_comment_box_icon">
                  <button 
                  type="button"
                  className="_feed_inner_comment_box_icon_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#000"
                        fillOpacity=".46"
                        fillRule="evenodd"
                        d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button 
                  type="button"
                  className="_feed_inner_comment_box_icon_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#000"
                        fillOpacity=".46"
                        fillRule="evenodd"
                        d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            {/* show all subcomment  */}
            {/* show all subcomment  */}
            {/* show all subcomment  */}
            {subCommentsD.length>0 &&    <div className="mx-4 mt-2 md-0">
       <div className="_previous_comment">
                         <button 
                         onClick={()=> setIsShowAllComment(!isShowAllcoment)}
                         type="button" class="_previous_comment_txt">
                          
                          {!isShowAllcoment ? 
                          'View '
                          :
                          'Close '
                          }   All Reply
                          
                         </button>
                       </div>
       </div>
}
            <div className="m-3">
              {isShowAllcoment &&
                subCommentsD?.map((subComment,index) => {

                  if(isShowAllcoment){
                    if(subComment.commentId==comment.commentId){
                  return (
                    <SubCommentOne
                      key={subComment?.subCommentId}
                      subComment={subComment}
                    ></SubCommentOne>
                  );
                    }
                  }else {
                 //   console.log('ok',subCommentsD.length,index+1)
                    if(subCommentsD?.length===index+1){
                 //   console.log('ok')
                   return  (  <SubCommentOne
                      key={subComment.subCommentId}
                      subComment={subComment}
                    ></SubCommentOne>)

                    }
                   

                  }

                })}
            </div>
          </div>
        </div>
      </div>
      {/* <p>one comment done  conmt </p> */}
    </div>
  );
};

export default CommentOne;
