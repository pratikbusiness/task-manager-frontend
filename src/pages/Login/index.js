import React,{useState,useContext,useEffect} from 'react'
import Input from '../../components/Input/index.js'
import {Row,Col, Container, Alert} from 'react-bootstrap'
import {HiMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {MdError} from 'react-icons/md'
import {HiBadgeCheck} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import PrefixContext from "../../context/PrefixContext.js";
import AuthContext from "../../context/AuthContext.js";
import axios from 'axios'

function Login() {

    const AuthContextData = useContext(AuthContext);
    const PrefixContextData = useContext(PrefixContext);
    const defaultValidation = {
        validationStatus: null,
        validationStatusClass: null,
        validationStatusMessage: null,
        validationStatusLocation: null,
        email:[],
        password:[],
        resend_verification:[],
        forgot_password:[]
    }
    const [validation,setValidation] = useState(defaultValidation);
    const [data, setdata] = useState({
        email:"",
        password:"",
        resend_verification:"",
        forgot_password:""
    })

    const loginUser = async (e) => {
        e.preventDefault();
        if (validation.validationStatusClass === 'warning') return;
        setValidation({
            validationStatus: true,
            validationStatusClass:'warning',
            validationStatusMessage: 'Please wait verifying ...',
            validationStatusLocation:'LOGIN_FORM',
            email:null,
            password:null,
            resend_verification:null,
            forgot_password:null
        });
        await axios.post(PrefixContextData.prefixUrl + 'user/login', data)
        .then(response => {
            if(response.status === 200){
                setValidation({
                    validationStatus: true,
                    validationStatusClass:'success',
                    validationStatusMessage: response.data.successMessage,
                    validationStatusLocation: 'LOGIN_FORM',
                    email:null,
                    password:null
                });
                localStorage.setItem("auth-token", response.data.successMessageDetails.token);
                setTimeout(() => {
                    AuthContextData.setLoggedIn();
                }, 1000);
            }
        })
        .catch(error => {
            if(error.response !== undefined && error.response.data !== undefined && error.response.data.errorMessageDetails !== undefined ){
                let errorDetails = {};
                error.response.data.errorMessageDetails.forEach((e)=>{
                    errorDetails[e.param] = e.msg;
                })
                setValidation({
                    validationStatus: true,
                    validationStatusClass:'danger',
                    validationStatusMessage: error.response.data.errorMessage,
                    validationStatusLocation: 'LOGIN_FORM',
                    email:(errorDetails.email !== undefined) ? errorDetails.email : null,
                    password:(errorDetails.password !== undefined) ? errorDetails.password : null
                });
            }
            else{
                setValidation({
                    validationStatus: true,
                    validationStatusClass:'danger',
                    validationStatusMessage: error.message,
                    validationStatusLocation: 'LOGIN_FORM',
                    email: null,
                    password: null
                });
            }
        });
    }
    
    const onChangeHandler = (e) =>{
        const newData = {
            ...data
        }
        newData[e.target.name]=e.target.value;
        setdata(newData);
    }

    useEffect(() => {
        setValidation(defaultValidation)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <div className="new-section page-heading-margin bg-secondary d-flex">
            <Container className="my-auto">
                <Row>
                    <Col md="8" lg="5" className="mx-auto">
                        <div className="form bg-white p-md-5 p-4 card">
                            <h4 className="text-center mb-4">Login</h4>
                            {(validation.validationStatus === true && validation.validationStatusLocation === 'LOGIN_FORM') && <Alert className="mb-0" variant={validation.validationStatusClass}>
                                {validation.validationStatusClass === 'success' && <HiBadgeCheck/>}
                                {validation.validationStatusClass === 'danger' && <MdError/>}
                                &nbsp;&nbsp; {validation.validationStatusMessage}
                            </Alert>}
                            <form className="contactForm" onSubmit={loginUser}>
                                <Input type="text" name="email" onChangeHandler={onChangeHandler} validationError={validation.email}  placeholder='Email' icon={<HiMail/>}/>
                                <Input type="password" name="password"  onChangeHandler={onChangeHandler} validationError={validation.password}  placeholder='Password' icon={<RiLockPasswordFill/>}/>
                                <div className="text-center">
                                    <button className="btn-primary mt-3" type="submit" title="Send Message">Submit</button>
                                </div>
                            </form>
                            <div className="mt-4">
                                <span className="text-secondary">Don't have an account? 
                                    <Link to="/signup" className="text-primary"> Signup here</Link>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Login
