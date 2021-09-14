import React,{useState,useContext} from 'react'
import Input from '../../components/Input/index.js'
import {Row,Col, Container, Alert} from 'react-bootstrap'
import {HiMail} from 'react-icons/hi'
import {AiFillPhone} from 'react-icons/ai'
import {RiLockPasswordFill} from 'react-icons/ri'
import {MdError} from 'react-icons/md'
import {HiBadgeCheck} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import axios from 'axios'
import PrefixContext from "../../context/PrefixContext.js";

function Signup() {
    
    const PrefixContextData = useContext(PrefixContext);
    const defaultValidation = {
        validationStatus: null,
        validationStatusClass: null,
        validationStatusMessage: null,
        phone:[],
        email:[],
        password:[]
    }
    const [validation,setValidation] = useState(defaultValidation);
    const [data, setdata] = useState({
        email:"",
        phone:"",
        password:""
    })

    const signupUser = async (e) => {
        e.preventDefault();
        if (validation.validationStatusClass === 'warning') return;
        setValidation({
            validationStatus: true,
            validationStatusClass:'warning',
            validationStatusMessage: 'Please wait registering ...',
            phone:null,
            email:null,
            password:null
        });
        await axios.post(PrefixContextData.prefixUrl + 'user/register', data)
        .then(response => {
            if(response.status === 200){
                setValidation({
                    validationStatus: true,
                    validationStatusClass:'success',
                    validationStatusMessage: response.data.successMessage,
                    phone:null,
                    email:null,
                    password:null
                });
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
                    phone:(errorDetails.phone !== undefined) ? errorDetails.phone : null,
                    email:(errorDetails.email !== undefined) ? errorDetails.email : null,
                    password:(errorDetails.password !== undefined) ? errorDetails.password : null
                });
            }
            else{
                setValidation({
                    validationStatus: true,
                    validationStatusClass:'danger',
                    validationStatusMessage: error.message,
                    phone: null,
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

    return (
        <>
        <div className="new-section page-heading-margin bg-secondary d-flex">
            <Container className="my-auto">
                <Row>
                    <Col md="8" lg="5" className="mx-auto">
                        <div className="form bg-white p-md-5 p-4 card">
                            <h4 className="text-center mb-4">Signup</h4>
                            {validation.validationStatus === true && <Alert className="mb-0" variant={validation.validationStatusClass}>
                                {validation.validationStatusClass === 'success' && <HiBadgeCheck/>}
                                {validation.validationStatusClass === 'danger' && <MdError/>}
                                &nbsp;&nbsp; {validation.validationStatusMessage}
                            </Alert>}
                            <form className="contactForm" onSubmit={signupUser}>
                                <Input type="text" name="email" onChangeHandler={onChangeHandler} validationError={validation.email} placeholder='Email' icon={<HiMail/>}/>
                                <Input type="text" name="phone" onChangeHandler={onChangeHandler} validationError={validation.phone} placeholder='Phone' icon={<AiFillPhone/>}/>
                                <Input type="password" name="password" onChangeHandler={onChangeHandler} validationError={validation.password} placeholder='Password' icon={<RiLockPasswordFill/>}/>
                                <div className="text-center mt-4">
                                    <button className="btn-primary" type="submit" title="Send Message">Submit</button>
                                </div>
                            </form>
                            <div className="mt-3">
                                <span className="text-secondary">Already have an account? 
                                    <Link to="/login" className="text-primary"> Login here</Link>
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

export default Signup