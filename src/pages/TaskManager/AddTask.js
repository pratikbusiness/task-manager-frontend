import React,{useRef,useContext} from 'react'
import axios from 'axios'
import Input from '../../components/Input'
import AuthContext from '../../context/AuthContext'
import PrefixContext from '../../context/PrefixContext'
import {Row,Col,Alert} from 'react-bootstrap'


function AddTask({validation, setValidation, data, setData, handleClose}) {

    const AuthContextData = useContext(AuthContext)
    const PrefixContextData = useContext(PrefixContext)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const taskstatusRef = useRef(null)
    const addTask = (e) =>{
        e.preventDefault();
        if (validation.validationStatusClass === 'warning') return;
        if( validation.validationStatus !== 'LOADING')
        {
            let newTask = {
                title:titleRef.current.value,
                desc:descRef.current.value,
                taskstatus:taskstatusRef.current.value
            }
            setValidation({
                validationStatus: 'LOADING',
                validationStatusClass:'warning',
                validationStatusMessage: 'Please wait updating ...',
                validationStatusLocation: 'ADD',
                title:null,
                desc:null,
                taskstatus:null,
            });
            axios.post(PrefixContextData.prefixUrl + 'data/tasks/add', newTask)
            .then(response => {
                if(response.status === 200){
                    setValidation({
                        validationStatus: true,
                        validationStatusClass:'success',
                        validationStatusMessage: response.data.successMessage,
                        validationStatusLocation: 'ADD',
                        title:null,
                        desc:null,
                        taskstatus:null
                    });
                    if(response.data.successMessageDetails !== undefined && response.data.successMessageDetails !== null && response.data.successMessageDetails.savedDataset !== undefined)
                    {
                        descRef.current.value = null
                        titleRef.current.value = null
                        setData(response.data.successMessageDetails.savedDataset)
                    }
                }
            })
            .catch(error => {
                if(error.response !== undefined && error.response.data !== undefined){
                    if(error.response.status === 401){
                        AuthContextData.logout()
                    }
                    else{
                        let errorDetails = {};
                        error.response.data.errorMessageDetails.forEach((e)=>{
                            errorDetails[e.param] = e.msg;
                        })
                        setValidation({
                            validationStatus: true,
                            validationStatusClass:'danger',
                            validationStatusMessage: error.response.data.errorMessage,
                            validationStatusLocation: 'ADD',
                            title:(errorDetails.title !== undefined) ? errorDetails.title : null,
                            desc:(errorDetails.desc !== undefined) ? errorDetails.desc : null,
                            taskstatus:(errorDetails.taskstatus !== undefined) ? errorDetails.taskstatus : null,

                        });
                    }
                }
                else{
                    setValidation({
                        validationStatus: true,
                        validationStatusClass:'danger',
                        validationStatusMessage: error.message,
                        validationStatusLocation: 'ADD'
                    });
                }
            });
        }
    }

    return (
        <>
            <h5 className="mb-4 mt-2">Add Tasks</h5>
            <form onSubmit={addTask}>
                {(validation.validationStatus !== null && validation.validationStatusLocation ==='ADD' && validation.validationStatus !== undefined)  && <div className="text-center">
                    <Alert className="d-inline-block" variant={validation.validationStatusClass}>&nbsp;&nbsp;{validation.validationStatusMessage}</Alert>
                </div>}
                <Row>
                    <Col md="3" className="text-left d-none d-md-flex align-items-center">
                        <label>Title</label>
                    </Col>
                    <Col md="9">
                        <Input type="text" name="title" initRef={titleRef} validationError={validation.title} placeholder='Enter Title Here'/>
                    </Col>
                </Row>
                <Row>
                    <Col md="3" className="text-left d-none d-md-flex align-items-center">
                        <label>Description</label>
                    </Col>
                    <Col md="9">
                        <Input type="text" name="desc" initRef={descRef} validationError={validation.desc} placeholder='Enter Description Here'/>
                    </Col>
                </Row>
                <Row>
                    <Col md="3" className="text-left d-none d-md-flex align-items-center">
                        <label>Task Status</label>
                    </Col>
                    <Col md="9">
                        <div className="inputcomponent">
                            <div className="inputgroup">
                                <select className="select w-100" defaultValue="" name="taskstatus" ref={taskstatusRef}>
                                    <option hidden={true}>Select Status</option>
                                    <option value="todo">To Do</option>
                                    <option value="doing">Doing</option>
                                    <option value="done">Done</option>
                                </select>
                                <div className="validationError">{validation.taskstatus}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </form>
            <div className="d-flex align-items-center justify-content-end mt-5" style={{marginLeft:'auto'}}>
                <p className="mb-0 mx-5 py-2 px-4  cursor-pointer" onClick={handleClose}>Cancel</p>
                <button onClick={addTask} className="d-block btn btn-primary">Submit</button>
            </div>
        </>
    )
}

export default AddTask
