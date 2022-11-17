import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Col,  Row } from "react-bootstrap";
import axios from '../api/axios';

import './register.css';



const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const RESET_URL = '/forgot-password';

const Forgotpassword = () => {
  
    const errRef = useRef();
     
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


   



    const [errMsg, setErrMsg] = useState('');

    




    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    

    useEffect(() => {
        setErrMsg('');
    }, [ email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
       
        const v3 = EMAIL_REGEX.test(email);
        if ( !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(RESET_URL,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            alert('Email Sent !! Check your Inbox');


            //clear state and controlled inputs
           
            setEmail('');
            
          
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Not sent');
            } else if (err.response?.status === 410) {
                setErrMsg('Email Taken')
            }else if(err.response?.status === 401){
                setErrMsg("Email Doesn't exist")
            }
            else {
                setErrMsg(' Email not Sent')
            }
            errRef.current.focus();
        }
    }

    return (
        <>

            <div id='register_div'>
                
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 style={{ color: 'white' }} className='center'>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <Row>
                       
                        <Col sm={6}>

                            <label htmlFor="email">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}

                            />
                            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Email Must have <br />
                                <span aria-label="at symbol">@</span> Sign
                            </p>
                        </Col>
                        </Row>
                        
                    <Row>
                        <Col sm={3}>
                            <button disabled={ !validEmail ? true : false} style={{ marginTop: '1rem' }}>Reset Password</button>
                        </Col>
                    </Row>
                </form>
                
            </div>

        </>
    )
}

export default Forgotpassword
