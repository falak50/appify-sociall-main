import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Comment from "./Comment";
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line react/prop-types
const PostOne = ({post}) => {
  
    const [reactCount,setReactCount] = useState(post?.reactCount);
    const [isReact,setIsReact] = useState(post?.isReact);
    const [shareCount,setShareCount]=useState(post?.shareCount);
    const [commentCount,setCommentCount]=useState(post?.commentCount);
    /// add commet
    const [allComment,setAllComment]=useState(post?.comments)
    const [commentTxt,setCommentTxt]=useState('')
    console.log('all comment -> ',allComment)
    


   const handleShare = ()=>{
    setShareCount(pre=>pre+1);
    const postsl = JSON.parse(localStorage.getItem('posts'));
    const postl = postsl.map((x)=>{
      if(x.postId==post.postId)x.shareCount=x.shareCount+1;
      return x
    });
    // console.log('before ',postl)
    localStorage.setItem('posts', JSON.stringify(postl));
   }
   const handleReact = ()=>{
    console.log('react clcik ');
    
    const postsl = JSON.parse(localStorage.getItem('posts'));
    const postl = postsl.map((x)=>{
      if(x.postId==post.postId){
        if(isReact){
          x.reactCount=reactCount-1;
          x.isReact=false
          setReactCount(pre=>pre-1);
          setIsReact(false);
        }else{
          x.reactCount=reactCount+1;
          x.isReact=true
          setReactCount(pre=>pre+1);
          setIsReact(true);
        }
        
      }
      return x
    });
    // console.log('before ',postl)
    localStorage.setItem('posts', JSON.stringify(postl));
   }

    const handleComentSubmit = (e)=>{
      e.preventDefault();
      if(commentTxt===''){
        alert('empty comment can not allow')
        return ;
      }
      const postsl = JSON.parse(localStorage.getItem('posts'));
      console.log(postsl);
      console.log('handlesubmit click  ',commentTxt);
      const updatePostsl = postsl?.map((x)=>{
        if(x?.postId==post.postId){
           //console.log(x);
           const commentId = uuidv4();
           const newCommnet={
                commentId: commentId,
                CommenterName: 'Falak Ahmed Sakib',
                commenterUserId : '201036', 
                commentReactCount: 0,
                commentText: commentTxt ,
                subComments: []
           }
           x.comments=[...x.comments,newCommnet];
           setAllComment(x.comments)
        }
        return x
      });
     console.log('update post ->',updatePostsl);
     const postsString = JSON.stringify(updatePostsl);
     localStorage.setItem('posts', postsString);
     setCommentTxt('')
    }

   

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
          <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
            <div className="_feed_inner_timeline_post_top">
              <div className="_feed_inner_timeline_post_box">
                <div className="_feed_inner_timeline_post_box_image">
                  <img
                    src="assets/images/post_img.png"
                    alt=""
                    className="_post_img"
                  />

                </div>
                
                <div className="_feed_inner_timeline_post_box_txt">
                  <h4 className="_feed_inner_timeline_post_box_title">
                   {post?.name}
                  </h4>
                  <p className="_feed_inner_timeline_post_box_para">
                    {post?.time} <a href="#0">Public</a>
                  </p>
                </div>
                
              </div>
              {/* <h1>hello</h1> */}
              <div className="_feed_inner_timeline_post_box_dropdown">
                <div className="_feed_timeline_post_dropdown">
                  <a
                    href="#0"
                    className="_feed_timeline_post_dropdown_link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={4}
                      height={17}
                      fill="none"
                      viewBox="0 0 4 17"
                    >
                      <circle cx={2} cy={2} r={2} fill="#C4C4C4" />
                      <circle cx={2} cy={8} r={2} fill="#C4C4C4" />
                      <circle cx={2} cy={15} r={2} fill="#C4C4C4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <h4 className="_feed_inner_timeline_post_title">
              {post?.postText}
            </h4>
            <div className="_feed_inner_timeline_image">
              <img
                src="assets/images/timeline_img.png"
                alt=""
                className="_time_img"
              />
            </div>
          </div>
          <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
            <div className="_feed_inner_timeline_total_reacts_image">
              <img
                src="assets/images/react_img1.png"
                alt="Image"
                className="_react_img1"
              />
              <img
                src="assets/images/react_img2.png"
                alt="Image"
                className="_react_img"
              />
              <img
                src="assets/images/react_img3.png"
                alt="Image"
                className="_react_img _rect_img_mbl_none"
              />
              <img
                src="assets/images/react_img4.png"
                alt="Image"
                className="_react_img _rect_img_mbl_none"
              />
              <img
                src="assets/images/react_img5.png"
                alt="Image"
                className="_react_img _rect_img_mbl_none"
              />
              <p className="_feed_inner_timeline_total_reacts_para">{reactCount}</p>
            </div>
            <div className="_feed_inner_timeline_total_reacts_txt">
              <p className="_feed_inner_timeline_total_reacts_para1">
                <span>{commentCount}</span> Comment
              </p>
              <p className="_feed_inner_timeline_total_reacts_para2">
                <span>{shareCount}</span> Share
              </p>
            </div>
          </div>
          
          <div className="_feed_inner_timeline_reaction">
            <button 
            onClick={handleReact}
            className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active">
              {" "}
              <span className="_feed_inner_timeline_reaction_link">
                {" "}
                <span>
                {isReact ?  <FcLike style={{"fontSize":"2.25rem","lineHeight":"2.5rem"}}/> :
                <FcLikePlaceholder style={{"fontSize":"2.25rem","lineHeight":"2.5rem"}}/>
                } 
                  React
                </span>
              </span>
            </button>
            <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
              {" "}
              <span className="_feed_inner_timeline_reaction_link">
                {" "}
                <span>
                  <svg
                    className="_reaction_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={21}
                    fill="none"
                    viewBox="0 0 21 21"
                  >
                    <path
                      stroke="#000"
                      d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.938 9.313h7.125M10.5 14.063h3.563"
                    />
                  </svg>
                  Comment
                </span>
              </span>
            </button>
            
            <button 
            onClick={handleShare}
            className="_feed_inner_timeline_reaction_share _feed_reaction">
              {" "}
              <span className="_feed_inner_timeline_reaction_link">
                {" "}
                <span>
                  <svg
                    className="_reaction_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={21}
                    fill="none"
                    viewBox="0 0 24 21"
                  >
                    <path
                      stroke="#000"
                      strokeLinejoin="round"
                      d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
                    />
                  </svg>
                  Share
                </span>
              </span>
            </button>
            

          
          </div>

            {/* --------- comment section -------  */}
            {/* --------- comment section -------  */}
            {/* --------- comment section -------  */}
            <div className="_feed_inner_timeline_cooment_area">
            <div className="_feed_inner_comment_box">
              <form onSubmit={handleComentSubmit} className="_feed_inner_comment_box_form">
                <div className="_feed_inner_comment_box_content">
                  <div className="_feed_inner_comment_box_content_image">
                    <img
                      src="assets/images/comment_img.png"
                      alt=""
                      className="_comment_img"
                    />
                  </div>
                  <div className="_feed_inner_comment_box_content_txt">
                    <input
                      className="form-control _comment_textarea"
                      placeholder="Write a comment"
                      id="floatingTextarea2"
                      value={commentTxt}
                      onChange={(e) => setCommentTxt(e.target.value)}
                    />
                  </div>
                  
                </div>
                <div className="_feed_inner_comment_box_icon">
                  <button className="_feed_inner_comment_box_icon_btn">
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
                  
                  <button className="_feed_inner_comment_box_icon_btn">
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
             </div>

          {/* commnet display  */}
          {/* commnet display  */}
          {/* commnet display  */}
          
          <Comment 
          allComment={allComment}
          setAllComment={setAllComment}
          ></Comment>

          {/* commnet display  */}
          {/* commnet display  */}
          {/* commnet display  */}


        </div>
    );
};

export default PostOne;