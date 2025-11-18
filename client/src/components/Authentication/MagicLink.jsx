
  import {React,useState} from 'react'
import api from '../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const MagicLink = () => {
  const [loading,setLoading]=useState(false);

    const navigate=useNavigate();
    const {sendMagicLink,user} =useAuth();
    
const [formData, setFormData] = useState({
   
    email: "",
    username:""
   
  });

  const handleChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
     setLoading(true);
    e.preventDefault();

    // const payload = {
    //      username:formData.username,
    // email:formData.email,
    // password:formData.password,    };

    try {
      const res = await sendMagicLink(formData)

      toast.success(res.data.message || "Registered successfully!");
      console.log()
        navigate('/');

      setFormData({
       
        email: "",
       

      });
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-center items-center'>
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box  md:w-xs lg:w-md sm:w-md border p-4">
  <legend className="fieldset-legend">Login with Email</legend>
  
 <label className="label">Username</label>
  <input name='username' type="text" className="input validator sm:w-full" placeholder="Username" required  pattern="[A-Za-z][A-Za-z0-9\-]*" minLength={3} maxLength={30} title="Only letters, numbers or dash"  onChange={handleChange} value={formData.username}/>
  <p className="validator-hint hidden">
  Must be 3 to 30 characters
  <br/>containing only letters, numbers or dash
</p>
 
  <label className="label">Email</label>
  <input name='email' type="email" className="input validator sm:w-full" placeholder="Email" required onChange={handleChange} value={formData.email} />
    <div className="validator-hint hidden">Enter valid email address</div>
  <button type='submit' className="btn btn-neutral mt-4"> {loading ? "Sending..." : "Proceed"}</button>
</fieldset>
</form>

    </div>
  


  )
}

export default MagicLink