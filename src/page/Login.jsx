
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
/* eslint-disable */
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isNavitage,setIsNavitage] = useState(false);
  const [isSwap,setIsSwap] = useState(false);
  
  const onSubmit = (data) => {
  // console.log(data);
    
    let oldUsers = JSON.parse(localStorage.getItem('users')) ?? [] ;

    const user = oldUsers?.find((x)=>{
        return (x.email === data.email )
       });
    
    if(!user){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect email!",
          footer: 'try again'
        });
        return;
    }
    if(user?.password!==data.password){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password ",
        footer: 'try again'
      });
      return;
    }
   
    console.log('user info ',);
    // alert(`login suuccessfull . Welcome : ${user.name}`)
    

    localStorage.setItem('logUser',JSON.stringify(user));

    setIsNavitage(true);

    Swal.fire({
      position: "center",
      icon: "success",
      title: `Login suuccessfull . Welcome  ${user.name}.`,
      showConfirmButton: false,
      timer: 1300
    });
    
  };

  if(isNavitage){
    return <Navigate to="/"  replace></Navigate>
  }
  if(isSwap){
    return <Navigate to="/registration"  replace></Navigate>
  }

    return (
        <section className="_social_login_wrapper _layout_main_wrapper">
        <div className="_shape_one">
          <img src="assets/images/shape1.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape.svg" alt="" className="_dark_shape" />
        </div>
        <div className="_shape_two">
          <img src="assets/images/shape2.svg" alt="" className="_shape_img" />
          <img
            src="assets/images/dark_shape1.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_shape_three">
          <img src="assets/images/shape3.svg" alt="" className="_shape_img" />
          <img
            src="assets/images/dark_shape2.svg"
            alt=""
            className="_dark_shape _dark_shape_opacity"
          />
        </div>
        <div className="_social_login_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_login_left">
                  <div className="_social_login_left_image">
                    <img
                      src="assets/images/login.png"
                      alt="Image"
                      className="_left_img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_login_content">
                  <div className="_social_login_left_logo _mar_b28">
                    <img
                      src="assets/images/logo.svg"
                      alt="Image"
                      className="_left_logo"
                    />
                  </div>
                  <p className="_social_login_content_para _mar_b8">Welcome back</p>
                  <h4 className="_social_login_content_title _titl4 _mar_b50">
                    Login to your account
                  </h4>
                  <button
                    type="button"
                    className="_social_login_content_btn _mar_b40"
                  >
                    <img
                      src="assets/images/google.svg"
                      alt="Image"
                      className="_google_img"
                    />{" "}
                    <span>Or sign-in with google</span>
                  </button>
                  <div className="_social_login_content_bottom_txt _mar_b40">
                    {" "}
                    <span>Or</span>
                  </div>
                {/* --------------  form start  */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    maxWidth: "28rem",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    borderRadius: "0.375rem",
                    padding: "2rem 2rem 2.5rem",
                    marginBottom: "1rem",
                  }}
                >
               
                  <div
                    style={{
                      marginBottom: "1rem",
                      display: "",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      style={{
                        color: "#4a5568",
                        backgroundColor: "#ffffff",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      style={{
                        flex: "1",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem 0.75rem",
                        color: "#4a5568",
                        backgroundColor: "#ffffff",
                        lineHeight: "1.25",
                        outline: "none",
                        transition:
                          "box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out",
                      }}
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "#e53e3e",
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                        }}
                      >
                        This field is required
                      </p>
                    )}
                  </div>
                  <div
  style={{
    marginBottom: "1rem",
    display: "",
    alignItems: "center",
    gap: "0.5rem",
  }}
>
  <label
    style={{
      color: "#4a5568",
      backgroundColor: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    }}
    htmlFor="password"
  >
    Password:
  </label>
  <input
    style={{
      flex: "1",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      padding: "0.5rem 0.75rem",
      color: "#4a5568",
      backgroundColor: "#ffffff",
      lineHeight: "1.25",
      outline: "none",
      transition:
        "box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out",
    }}
    id="password"
    type="password"
    placeholder="Password"
    {...register("password", {
      required: true,
      minLength: 4,
    })}
  />
  {errors.password && errors.password.type === "required" && (
    <p
      style={{
        color: "#e53e3e",
        fontSize: "0.75rem",
        fontStyle: "italic",
      }}
    >
      This field is required
    </p>
  )}
  {errors.password && errors.password.type === "minLength" && (
    <p
      style={{
        color: "#e53e3e",
        fontSize: "0.75rem",
        fontStyle: "italic",
      }}
    >
      Password must be at least 4 characters long
    </p>
  )}
</div>
          

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#3b82f6",
                        hoverBackgroundColor: "#2563eb",
                        color: "#ffffff",
                        fontWeight: "bold",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        outline: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out",
                      }}
                      type="submit"
                    >
                     Login
                    </button>
                  </div>
                </form>

                {/* -------------------- from end  */}
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_bottom_txt">
                        <p className="_social_login_bottom_txt_para">
                          Dont have an account? <a href="#0"
                          onClick={()=>setIsSwap(true)}
                          >Create New Account</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    );
};

export default Login;