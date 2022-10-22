import React, {useState, useContext} from 'react';
//mS00103333#
import {BrowserRouter, Switch, Route,useHistory, Link} from 'react-router-dom';

import axios from "axios";
import './AuthPage.css'
import {AuthContext} from "../../context/AuthContext.js";
function AuthPage() {
    const history=useHistory();
    const [form, setForm]=useState({
        email: '',
        password: ''
    })
    const changeHandler=(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form)
    }
    const {login}=useContext(AuthContext)
    const registerHandler = async () => {
        try{
            await axios.post('https://mern-todos-for.herokuapp.com/api/auth/registration', {...form}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')

        } catch (e) {
            console.log("error")
        }
    }

    const loginHandler=async ()=>{
        try {
            await axios.post('https://mern-todos-for.herokuapp.com/api/auth/login', {...form}, {
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response => {   login(response.data.token, response.data.userId);})
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <BrowserRouter>
            <Switch>
        <React.Fragment>
            <div className="container">
                <div className="auth-page">
                    <Route path="/login" >
                        <h3>Log in</h3>
                        <form className="form form-login" onSubmit={event => event.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="email"
                                        name="email"
                                        className="validate"
                                        id={'email'}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        type="password"
                                        name="password"
                                        className="validate"
                                        id={'password'}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">password</label>
                                </div>
                            </div>
                            <div className="row">
                                <button
                                    onClick={loginHandler}
                                    className={'wawes-effect wawes-light btn blue'}>
                                    Log in
                                </button>
                                <Link to="/registration" className="btn-outline btn-reg">Don`t have account</Link>
                            </div>
                        </form>
                    </Route>

                    <Route path="/registration">
                        <h3>Sign in</h3>
                        <form className="form form-login" onSubmit={event => event.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        type="email"
                                        name="email"
                                        className="validate"
                                        id={'email'}

                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        type="password"
                                        name="password"
                                        className="validate"
                                        id={'password'}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <button
                                    onClick={registerHandler}
                                    className={'wawes-effect wawes-light btn blue'}>
                                    Sig in
                                </button>
                                <Link to="/login" className="btn-outline btn-reg">have account</Link>
                            </div>
                        </form>
                    </Route>
                </div>
            </div>
        </React.Fragment>
            </Switch>
        </BrowserRouter>
    );
}
//45:29
export default AuthPage;