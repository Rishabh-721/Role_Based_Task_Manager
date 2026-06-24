import React,{useState} from 'react';
import FormInput from '../../05-Utils/FormInput';
import Btn from '../../05-Utils/Btn';
import { useNavigate } from 'react-router-dom';
import API from '../../02-Api/API';

const Signup = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState({name: "", email: "", password: ""});
    const [apiSucess, setApiSucess] = useState(false);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error, [e.target.name]: ""});
      setApiError("");
      setApiSucess(false); 
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      const newError = ({name: "", email: "", password: ""});
      if(form.name.lenght <= 3){
        newError.name = "please provide full name"
      }
      if(!form.name){
        newError.name = "Name is required"
      }
      if(!form.email){
        newError.email = "Email is required "
      }
      if(!form.password){
        newError.password = "Password is required"
      }
      if(form.password.lenght <= 8){
        newError.password = "Password must be atleast 8 latter"
      }

      try {
        setLoading(true);
        const response = await API({method: "POST", endpoint: "auth/signup", data: form});
        const message = response?.data?.message;
        setApiSucess(true);
      } catch (error) {
        const message = error.response?.data?.message;
        setApiError(message);
      }finally{
        setLoading(false)
      }
    }
  return (
    <>
     <h2>Create Account</h2>
     <p>Join Taskiqo and start organizing your work efficiently.</p>
     <form onSubmit={handleSubmit}>

        <FormInput type="text" info="Full Name" name="name" value={form.name} onChange={handleChange}/>
        {error.name && <span className='error'>{error.name}</span>}
        
        <FormInput type="email" info="Email" name="email" value={form.email} onChange={handleChange}/>
        {error.email && <span className='error'>{error.email}</span>}

        <FormInput type="password" info="Password" name="password" value={form.password} onChange={handleChange} />
        {error.password && <span className='error'>{error.password}</span>}

        <Btn type="submit" text="Sign Up" loginText="Signing up..." loading={loading} className="primary-btn" />
        
     </form>

     {apiError && (<span className="apiError">{apiError}</span>)}
     {apiSucess && (<span className='sucess'>Sucess</span>)}

     <div className="auth-switch">
        Wanna Login ?
        <span className="btnToLink" onClick={() => navigate("/")}>
           Login
        </span>
      </div>
    </>
  )
}

export default Signup
