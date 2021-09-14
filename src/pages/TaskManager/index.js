import React,{useState,useContext} from 'react'
import {Row,Col} from 'react-bootstrap'
import {SiAddthis} from 'react-icons/si'
import {FaTasks} from 'react-icons/fa'
import {Modal} from 'react-bootstrap'
import AddTask from './AddTask'
import EditTask from './EditTask'
import ShowTasks from './ShowTasks'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import PrefixContext from '../../context/PrefixContext'

function TaskManager() {

    const AuthContextData = useContext(AuthContext)
    const PrefixContextData = useContext(PrefixContext)
    const defaultValidation = {
        validationStatus: null,
        validationStatusClass: null,
        validationStatusMessage: null,
        title:[],
        desc:[],
        taskstatus:[],
    }
    const [validation,setValidation] = useState(defaultValidation);
    const [data, setData] = useState({})
    const [showModal, setShowModal] = useState(null)
    const handleShow = (targetName) => {
        setValidation(defaultValidation)
        setShowModal(targetName)
    };
    const handleClose = () =>{
        if(validation.validationStatus !== 'LOADING'){
            setShowModal(null)
        }
    };
    const syncData = (newData) =>{
        if (validation.validationStatusClass === 'warning') return;
        if( validation.validationStatus !== 'LOADING')
        {
            setValidation({
                validationStatus: 'LOADING',
                validationStatusClass:'',
                validationStatusMessage: '',
                validationStatusLocation: '',
                title:null,
                desc:null,
                taskstatus:null,
            });
            axios.post(PrefixContextData.prefixUrl + 'data/tasks/sync', newData)
            .then(response => {
                if(response.status === 200){
                    console.log('Data Synced Successfully')
                }
                setValidation({
                    validationStatus: '',
                    validationStatusClass:'',
                    validationStatusMessage: '',
                    validationStatusLocation: '',
                    title:null,
                    desc:null,
                    taskstatus:null,
                });
            })
            .catch(error => {
                if(error.response !== undefined && error.response.data !== undefined){
                    if(error.response.status === 401){
                        AuthContextData.logout()
                    }
                    else{
                        alert('Please refresh the page. Data Sync Failed')
                    }
                }
                else{
                    alert('Please refresh the page. Data Sync Failed')
                }
                setValidation({
                    validationStatus: '',
                    validationStatusClass:'',
                    validationStatusMessage: '',
                    validationStatusLocation: '',
                    title:null,
                    desc:null,
                    taskstatus:null,
                });
            });
        }
    }

    return (<>
        <section className="page-heading-margin bg-secondary">
            <Row className="m-0 w-100">
                <Col md="12" className="text-center">
                    <div className="w-85 mx-auto mt-lg-4 d-md-flex justify-content-between">
                        <span className="d-flex align-items-center">
                            <FaTasks className="text-dark"/>
                            <h5 className="my-auto mx-3">Task Manager</h5>
                        </span>
                        <div className="d-flex justify-content-end">
                        <p onClick={()=>handleShow('ADD')} className="mt-4 mt-md-0 d-inline-flex align-items-center border border-primary mb-0 py-2 px-4 btn-primary cursor-pointer">
                            <SiAddthis />
                            <span className="px-2">Add Tasks</span>
                        </p>
                        </div>
                    </div>
                </Col>
            </Row>
            <ShowTasks data={data} setData={setData} validation={validation} setValidation={setValidation} syncData={syncData} handleShow={handleShow}/>
        </section>
        <Modal show={(showModal === null) ? false : true} size="lg" onHide={handleClose}>
            <Modal.Body className="px-4">
                {(showModal === 'ADD') && <AddTask validation={validation} setValidation={setValidation} data={data} setData={setData} handleClose={handleClose}/> }
                {(showModal !== null && showModal.split('-')[0] === 'EDIT') && <EditTask validation={validation} setValidation={setValidation} data={data} setData={setData} handleClose={handleClose} syncData={syncData} showModal={showModal}/> }
            </Modal.Body>
      </Modal>
    </>)
}

export default TaskManager
