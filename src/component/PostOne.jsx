import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Comment from "./Comment";
import { v4 as uuidv4 } from "uuid";
// const logUser = {
//   userId:'thisISuserID',
//   name:'falak',
//   email:'falak170@gmail.com',
//   password:'201115036',
//   reactPostID:[],
// }
// eslint-disable-next-line react/prop-types
const PostOne = ({ post, setStoredPosts, handledeletePost, logUser,setlogUser }) => {
  // const logUser = JSON.parse(localStorage.getItem("logUser"));
  // const [logUser,setlogUser] = useState(JSON.parse(localStorage.getItem("logUser")));
 // console.log(logUser);
  const [reactCount, setReactCount] = useState(false);
  const [isReact, setIsReact] = useState(false);
  const [shareCount, setShareCount] = useState(post?.shareCount);
  const [commentCount, setCommentCount] = useState(0);
  /// add commet
  const [allComment, setAllComment] = useState(post?.comments);
  const [commentTxt, setCommentTxt] = useState("");
  // console.log("all comment -> ", allComment);
  /// dropdwon
  const [isDropdown, setisDropdown] = useState(false);

  useEffect(()=>{
   // console.log('yes in side ')
    const reactPostID = logUser?.reactPostID;
    const updatePostID = reactPostID.filter(x=>{
     // console.log('x',x);
     // console.log('cur postid ',post.postId);
      return post.postId === x;
    });
    // console.log(`post id ${post.postId} `);
    // console.log('updatePostID -> useEE ',updatePostID)
    if(updatePostID.length){
      // console.log('true setIsReact')
      setIsReact(true);
    }else{
      // console.log('false setIsReact')
      setIsReact(false);
    }
  },[])

  const handleShare = () => {
    setShareCount((pre) => pre + 1);
    const postsl = JSON.parse(localStorage.getItem("posts"));
    const postl = postsl.map((x) => {
      if (x.postId == post.postId) x.shareCount = x.shareCount + 1;
      return x;
    });

    // console.log('before ',postl)
    localStorage.setItem("posts", JSON.stringify(postl));
    
  };

  const handleReactUser = (type) => {
    let updateUser;
    if (type) {
    //  console.log("add");
     // console.log("before -->", logUser);
      logUser?.reactPostID.push(post.postId);
      updateUser = logUser;
      // setlogUser(updateUser);
      // localStorage.setItem("logUser", JSON.stringify(updateUser));
      
    } else {
     // console.log("remove click ");
      const reactPostID = logUser?.reactPostID;
      const updatePostID = reactPostID.filter(x=>{
      //  console.log('x',x);
      //  console.log('cur postid ',post.postId);
        return post.postId !== x;
      })
      console.log("helo man hello ");
     console.log("updatePostID asd ", updatePostID);
     updateUser = logUser;
     updateUser.reactPostID=updatePostID;
     //console.log('update user ',updateUser )
    //  setlogUser(updateUser);
     /// TODO :  add local storeage logUer
    //  localStorage.setItem("logUser", JSON.stringify(updateUser));
     
    }

    

    // console.log('outside update user ',updateUser);
    // setlogUser(updateUser);
    localStorage.setItem("logUser", JSON.stringify(updateUser));
    console.log('end ')
    const users=JSON.parse(localStorage.getItem("users"));
    console.log('all user before',users)
    const updateUsers = users.map((x)=>{
        if(x.userId==logUser.userId){
          x.reactPostID=logUser.reactPostID;
        }
        return x;
    });
    console.log('all user id after ',updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
    
     


  };
  const handleReact = () => {
    console.log("react clcik ");

    const postsl = JSON.parse(localStorage.getItem("posts"));
    const postl = postsl.map((x) => {
      if (x.postId == post.postId) {
        if (isReact) {
          x.reactCount = reactCount - 1;
          x.isReact = false;
          setReactCount((pre) => pre - 1);
          setIsReact(false);
          handleReactUser(false);
        } else {
          x.reactCount = reactCount + 1;
          x.isReact = true;
          setReactCount((pre) => pre + 1);
          setIsReact(true);
          handleReactUser(true);
        }
      }
      return x;
    });
    // console.log('before ',postl)
    localStorage.setItem("posts", JSON.stringify(postl));
  };

  const handleComentSubmit = (e) => {
    e.preventDefault();
    if (commentTxt === "") {
      alert("empty comment can not allow");
      return;
    }
    const postsl = JSON.parse(localStorage.getItem("posts"));
   // console.log(postsl);
   // console.log("handlesubmit click  ", commentTxt);
    const updatePostsl = postsl?.map((x) => {
      if (x?.postId == post.postId) {
        //console.log(x);
        const commentId = uuidv4();
        const newCommnet = {
          commentId: commentId,
          CommenterName: logUser.name,
          commenterUserId: logUser.userId,
          commentReactCount: 0,
          commentText: commentTxt,
          subComments: [],
        };
        x.comments = [...x.comments, newCommnet];
        setAllComment(x.comments);
      }
      return x;
    });
   /// console.log("update post ->", updatePostsl);
    const postsString = JSON.stringify(updatePostsl);
    localStorage.setItem("posts", postsString);
    setCommentTxt("");
  };

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
              <button
                href="#0"
                id="_timeline_show_drop_btn"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => setisDropdown(!isDropdown)}
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
              </button>
            </div>
            {/*Dropdown*/}
            <div
              id="_timeline_drop"
              className={
                isDropdown
                  ? "_feed_timeline_dropdown show"
                  : "_feed_timeline_dropdown "
              }
            >
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                        />
                      </svg>
                    </span>
                    Save Post
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={22}
                        fill="none"
                        viewBox="0 0 20 22"
                      >
                        <path
                          fill="#377DFF"
                          fillRule="evenodd"
                          d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Turn On Notification
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                        />
                      </svg>
                    </span>
                    Hide Post
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                        />
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                        />
                      </svg>
                    </span>
                    Edit Post
                  </a>
                </li>
                <li
                  onClick={() => handledeletePost(post?.postId)}
                  className="_feed_timeline_dropdown_item"
                >
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                        />
                      </svg>
                    </span>
                    Delete Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h4 className="_feed_inner_timeline_post_title">{post?.postText}</h4>
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
          className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active"
        >
          {" "}
          <span className="_feed_inner_timeline_reaction_link">
            {" "}
            <span>
              {isReact ? (
                <FcLike style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }} />
              ) : (
                <FcLikePlaceholder
                  style={{ fontSize: "2.25rem", lineHeight: "2.5rem" }}
                />
              )}
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
          className="_feed_inner_timeline_reaction_share _feed_reaction"
        >
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
          <form
            onSubmit={handleComentSubmit}
            className="_feed_inner_comment_box_form"
          >
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

      <Comment allComment={allComment} setAllComment={setAllComment}></Comment>

      {/* commnet display  */}
      {/* commnet display  */}
      {/* commnet display  */}
    </div>
  );
};

export default PostOne;
