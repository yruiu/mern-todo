import React, {useState, useContext, useCallback} from 'react';
import './MainPage.css'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.js";

function MainPage() {
    const [text, setText]=useState('');
    const {userId}=useContext(AuthContext)
    const [todos, setTodos]=useState([])

    const getTodo=async ()=>{
        try {
            await axios.get('https://mern-todos-for.herokuapp.com/api/todo',{
                headers: {
                    "Content-Type": "application/json"
                },
                params: {userId}
            })
                .then((res)=>setTodos(res.data))
        } catch (e){console.log(e)}
    }
    getTodo()
    const createTodo=async ()=>{
        if(!text)return null
        try {

            await axios.post('https://mern-todos-for.herokuapp.com/api/todo/add', {
                text,
                userId
            }, {headers: {'Content-Type': 'application/json'}}).then((response)=>{setTodos([...todos], response.data); setText('')})
        } catch (e){console.log(e)}
    }
    const removeTodos=useCallback(async (id)=>{
        try {
            await axios.delete(`https://mern-todos-for.herokuapp.com/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(()=>getTodo())
        } catch (e){console.log(e)}
    }, [getTodo])
    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://mern-todos-for.herokuapp.com/api/todo/complete/${id}`,{id},{
                headers: {'Content-Type': 'application/json'}
            })
                .then((res)=>{
                    console.log(res)
                    setTodos([...todos]);
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }

    },[getTodo, todos])
    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://mern-todos-for.herokuapp.com/api/todo/important/${id}`,{id},{
                headers: {'Content-Type': 'application/json'}
            })
                .then((res)=>{
                    console.log(res)
                    setTodos([...todos]);
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }

    },[getTodo, todos])
    return (
        <div className={"container"}>
            <div className="main-page">
                <h4>Add task</h4>
                <form className={"form form-login"} onSubmit={e=> e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" value={text} onChange={e=>setText(e.target.value)} id={"text"} name={'input'} className={"validate"}/>
                            <label htmlFor="input">Task</label>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={createTodo} className={'btn waves-effect waves-light blue'}>Add</button>
                    </div>
                </form>

                <h3>Active todo:</h3>
                <div className="todos">
                    {
                        todos.map((todo, index)=>{
                            let cls=['row flex todos-item']
                            if(todo.completed){
                                cls.push('completed')
                            }
                            if(todo.important){
                                cls.push('important')
                            }
                            return(
                                <div className={cls.join(' ')} key={index}>
                                    <div className="col todos-num">{index+1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="todos-buttons col">
                                        <i className="material-icons blue-text" onClick={()=>completedTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text" onClick={()=>importantTodo(todo._id)}>warning</i>
                                        <i onClick={()=>removeTodos(todo._id)} className="material-icons red-text">delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
//rsf
export default MainPage;