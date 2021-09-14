import React,{useEffect,useContext} from 'react'
import axios from 'axios';
import {v4 as uuid} from 'uuid'
import AuthContext from '../../context/AuthContext';
import PrefixContext from '../../context/PrefixContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {FaEdit, FaTrashAlt} from 'react-icons/fa'


function ShowTasks({data,setData,validation,setValidation,syncData,handleShow}) {
    
    const AuthContextData = useContext(AuthContext)
    const PrefixContextData = useContext(PrefixContext)
    const fetchData = () =>{
        axios.get(PrefixContextData.prefixUrl + 'data/tasks',)
            .then(response => {
                if(response.status === 200){
                    setData(response.data)
                }
            })
            .catch(error => {
                if(error.response !== undefined && error.response.data !== undefined){
                    if(error.response.status === 401){
                        AuthContextData.logout()
                    }
                    else{
                        setValidation({
                            validationStatus: true,
                            validationStatusClass:'danger',
                            validationStatusMessage: error.response.data.errorMessage,
                            validationStatusLocation: 'DEFAULT',
                            title: null,
                            desc: null,
                            taskstatus: null,

                        });
                    }
                }
                else{
                    setValidation({
                        validationStatus: true,
                        validationStatusClass:'danger',
                        validationStatusMessage: error.message,
                        validationStatusLocation: 'DEFAULT',
                        title: null,
                        desc: null,
                        taskstatus: null,
                    });
                }
            });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    const editBtnHandler = (taskstatus,target) =>{
        handleShow('EDIT-'+taskstatus+'-'+target._id)
    }
    
    const deleteBtnHandler = (taskstatus,target) =>{
        let index = data[taskstatus].findIndex(el => el._id === target._id)
        let newData = JSON.parse(JSON.stringify(data))
        newData[taskstatus].splice(index,1)
        setData(newData)
        syncData(newData);
    }

    const getElementToShow = (taskstatus,element) =>{
        return <>
            <div className="draggable-item  bg-secondary">
                <div className="item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 style={{flexGrow:1}}>{element.title}</h6>
                        <div className="d-flex h-100 manageIconWrapper">
                            <div className="px-3 py-2 cursor-pointer editIcon" onClick={()=>editBtnHandler(taskstatus,element)}>
                                <FaEdit/>
                            </div>
                            <div className="px-3 py-2 cursor-pointer deleteIcon" onClick={()=>deleteBtnHandler(taskstatus,element)}>
                                <FaTrashAlt/>
                            </div>
                        </div>
                    </div>
                    <p className="small my-3">{element.desc}</p>
                </div>
            </div>
        </>
    }

    const onDragEnd = (result) =>{
        const {source, destination} = result;
        if (!destination) {
            return;
        }
        // Changing index of task (reordering) || Changing status of tasks
        else if (source.droppableId === destination.droppableId || source.droppableId !== destination.droppableId) {
            let newData = JSON.parse(JSON.stringify(data));
            let [removed] = newData[source.droppableId].splice(source.index, 1);
            newData[destination.droppableId].splice(destination.index, 0, removed);
            setData(newData);
            syncData(newData)
        }
    }

    return (
        <>
        <div className="d-lg-flex justify-content-between w-85">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todo">
                    {(provided, snapshot) => (
                        <div className="mt-4 column bg-white todo" ref={provided.innerRef} {...provided.droppableProps}>
                            <h5 className="py-2 px-2">To Do</h5>
                            <div className="column-container">
                                {data.todo !== undefined && data.todo.map((el, index) => (
                                    <Draggable
                                        key={uuid()}
                                        draggableId={el._id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                {getElementToShow('todo',el)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="doing">
                    {(provided, snapshot) => (
                        <div className="mt-4 column bg-white doing">
                            <h5 className="py-2 px-2">Doing</h5>
                            <div className="column-container" ref={provided.innerRef} {...provided.droppableProps}>
                                {data.todo !== undefined && data.doing.map((el, index) => (
                                    <Draggable
                                        key={uuid()}
                                        draggableId={el._id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                {getElementToShow('doing',el)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="done">
                    {(provided, snapshot) => (
                        <div className="mt-4 column bg-white done">
                            <h5 className="py-2 px-2">Done</h5>
                            <div className="column-container" ref={provided.innerRef} {...provided.droppableProps}>
                                {data.todo !== undefined && data.done.map((el, index) => (
                                    <Draggable
                                        key={uuid()}
                                        draggableId={el._id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                {getElementToShow('done',el)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        </>
    )
}

export default ShowTasks
