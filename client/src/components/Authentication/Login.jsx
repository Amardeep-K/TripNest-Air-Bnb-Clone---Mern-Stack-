  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../../api/api";
  import { toast } from "react-toastify";
  import { useAuth } from "../../context/AuthContext";
  const Login = () => {
      const navigate = useNavigate();
    
      const { login} = useAuth();
      const [formData, setFormData] = useState({
          email: "",
          password: "",
        });
      
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };

          const handleSubmit = async (e) => {
      e.preventDefault();

    

      try {
        const res = await login(formData);
        console.log("res",res,formData);

        toast.success(res.data.message  || "Login successfully!");

        //    const userRes = await api.get("/authentication/me", {
        //   withCredentials: true,
        // });

        // setUser(userRes.data.user);

        // 
        // setFormData({ username: "", password: "" });
        navigate("/");
      } catch (err) {
        console.error("Error:", err);
        toast.error(err.response?.data?.message || "Something went wrong!");
      }
    };
    return (
      <div>
          <form onSubmit={handleSubmit}>
                  <fieldset className="fieldset bg-white dark:bg-neutral-900 text-black dark:text-white dark:border-base-300 rounded-box  md:w-xs lg:w-sm sm:w-md border p-4">
    <legend className="fieldset-legend dark:text-amber-50 text-black">Login</legend>

    <label className="label">Email</label>
    <input type="email" className="input validator sm:w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300 " placeholder="Email" value={formData.username} name="email"   required   minLength={3} maxLength={30} title="Only letters, numbers or dash" onChange={handleChange} />
    <div className="validator-hint hidden">Enter valid Email</div>

    <label className="label">Password</label>
    <input type="password" name='password' className="input validator sm:w-full text-black dark:text-white bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300" value={formData.password} placeholder="Password"  minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={handleChange}  />
    <p className="validator-hint hidden">
    Must be more than 8 characters, including
    <br/>At least one number
    <br/>At least one lowercase letter
    <br/>At least one uppercase letter
  </p>

    <button type='submit' className="btn btn-neutral mt-4">Login</button>
    
  </fieldset>
  </form>
      </div>
    )
  }

  export default Login
