import {React,useState} from 'react'
import api from '../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Register = () => {
    const navigate=useNavigate();
    const {register,user} =useAuth();
    
const [formData, setFormData] = useState({
    username: "",
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

    // const payload = {
    //      username:formData.username,
    // email:formData.email,
    // password:formData.password,    };

    try {
      const res = await register(formData)

      toast.success(res.data.message || "Registered successfully!");
      console.log()
        navigate('/');

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center items-center'>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box  md:w-xs lg:w-md sm:w-md border p-4">
  <legend className="fieldset-legend">Register</legend>
  

  <label className="label">Username</label>
  <input name='username' type="text" className="input validator sm:w-full" placeholder="Username" required  pattern="[A-Za-z][A-Za-z0-9\-]*" minLength={3} maxLength={30} title="Only letters, numbers or dash"  onChange={handleChange} value={formData.username}/>
  <p className="validator-hint hidden">
  Must be 3 to 30 characters
  <br/>containing only letters, numbers or dash
</p>
  <label className="label">Email</label>
  <input name='email' type="email" className="input validator sm:w-full" placeholder="Email" required onChange={handleChange} value={formData.email} />
    <div className="validator-hint hidden">Enter valid email address</div>
  <label className="label">Password</label>
  <input name='password' type="password" className="input validator sm:w-full" placeholder="Password" required minLength={8}
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={handleChange} value={formData.password} />
  <p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br/>At least one number
  <br/>At least one lowercase letter
  <br/>At least one uppercase letter
</p>

  <button type='submit' className="btn btn-neutral mt-4">Register</button>
</fieldset>
</form>

    </div>
  )
}

export default Register