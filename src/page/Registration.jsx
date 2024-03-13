import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
const logUser = {
    userId:'thisISuserID',
    name:'falak',
    email:'falak170@gmail.com',
    password:'201115036',
    reactPostID:[],
    reactCoomentID:[]
  }
const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if(data.repeat_password!==data.password){
        alert('Do not match Repeat Password');
       return ;
    }
    let oldUsers = JSON.parse(localStorage.getItem('users')) ?? [] ;

    const isSameEmail = oldUsers?.find((x)=>{
        return x.email === data.email
       });
    console.log("is same email ",isSameEmail);
    if(isSameEmail){
        alert(`${data.email} is already registered`);
        return;
    }

    const userId = uuidv4();
    const user = {
        userId:userId,
        name: data.name,
        email: data.email,
        password:data.password,
        reactPostID:[],
      }
      
      
      console.log('cur user ',user);
        
      const updateData = [user,...oldUsers];
      localStorage.setItem('users',JSON.stringify(updateData));
     
     alert('registation done ')
    
  };
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="assets/images/shape1.svg" alt="" className="_shape_img" />
        <img
          src="assets/images/dark_shape.svg"
          alt=""
          className="_dark_shape"
        />
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
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src="assets/images/registration.png" alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src="assets/images/registration1.png" alt="Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <img
                    src="assets/images/logo.svg"
                    alt="Image"
                    className="_right_logo"
                  />
                </div>
                <p className="_social_registration_content_para _mar_b8">
                  Get Started Now
                </p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                  Registration
                </h4>
                <button
                  type="button"
                  className="_social_registration_content_btn _mar_b40"
                >
                  <img
                    src="assets/images/google.svg"
                    alt="Image"
                    className="_google_img"
                  />{" "}
                  <span>Register with google</span>
                </button>
                <div className="_social_registration_content_bottom_txt _mar_b40">
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
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                      htmlFor="name"
                    >
                      Name:
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
                      id="name"
                      type="text"
                      placeholder="Name"
                      {...register("name", {
                        required: true,
                        pattern: /^[A-Za-z ]+(?: [A-Za-z ]+)?$/,
                      })}
                    />
                    {errors.name && errors.name.type === "required" && (
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
                    {errors.name && errors.name.type === "pattern" && (
                      <p
                        style={{
                          color: "#e53e3e",
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                        }}
                      >
                        Name must contain only letters
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
    Repeat Password: 
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
    id="repeat_password"
    type="password"
    placeholder="Password"
    {...register("repeat_password", {
      required: true,
      minLength: 4,
    })}
  />
  {errors.repeat_password && errors.repeat_password.type === "required" && (
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
  {errors.repeat_password && errors.repeat_password.type === "minLength" && (
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
                      Registration
                    </button>
                  </div>
                </form>

                {/* -------------------- from end  */}
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">
                        Dont have an account?{" "}
                        <a href="#0">Create New Account</a>
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

export default Registration;


