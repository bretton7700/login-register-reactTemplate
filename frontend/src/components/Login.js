import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import axios from '../api/axios';
// import Ndovucloud from './images/Ndovucloud.png';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const logged_Email =response.data.email;
            console.log(logged_Email)
            localStorage.setItem('userEmail', logged_Email);
            // console.log(JSON.stringify(response));
           
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    

    useEffect(() => {
        localStorage.setItem("persist", true);
    }, [])

    return (
<div className="card">
        <section>
           {/* <img src={Ndovucloud}  className='center'/> */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 style={{color: 'white'}} className='center'>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button style={{marginTop: '1rem'}}>Sign In</button>
                <div className="persistCheck">
                    <input
                
                        type="hidden"
                        id="persist"
                        checked
                        
                    />
                  
                </div>
            </form>
            <p style={{color:'white'}}>
                <span className="line">
                    <Link to="/forgotpassword">Forgot Password</Link>
                </span>
            </p>
            <p style={{color:'white'}}>
                {/* Need an Account?<br /> */}
                <span className="line">
                    <Link to="/register">Sign Up For Free</Link>
                </span>
            </p>
        </section>
        </div>
        

    )
}

export default Login 
