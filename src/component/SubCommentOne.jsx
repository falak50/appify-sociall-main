/* eslint-disable */
const SubCommentOne = ({subComment}) => {

    return (
        <div className="_comment_main">
        <div className="_comment_image">
          <a href="profile.html" className="_comment_image_link">
            <img
              src="assets/images/chat2_img.png"
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
                    {subComment?.subCommenterUserName}
                  </h4>
                </a>
              </div>
            </div>
            <div className="_comment_status">
              <p className="_comment_status_text">
                <span>
                {subComment?.subCommentText}
                </span>
              </p>
            </div>
      
            <div className="_comment_reply">
              <div className="_comment_reply_num">
                {/* <ul className="_comment_reply_list">
                  <li>
                    <span>Like.</span>
                  </li>
                  <li>
                    <span>Reply.</span>
                  </li>
                  <li>
                    <span>Share</span>
                  </li>
                  <li>
                    <span className="_time_link">.21m</span>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>

         
              
         
         </div>
      </div>
    );
};

export default SubCommentOne;