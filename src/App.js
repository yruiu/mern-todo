import React from "react";
import {BrowserRouter }from "react-router-dom"
import './App.css';
import {useRoutes} from "./routes.js";
import Navbar from "./components/Navbar/Navbar";
import {AuthContext} from "./context/AuthContext.js";
import {useAuth} from "./hooks/auth.hook.js";

function App(){

    const {login, logout, token, userId, isReady}=useAuth()
    const isLogin=!!token
    const routes=useRoutes(isLogin)
    return (
        <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
      <div className="app">
            <BrowserRouter>
                <Navbar/>
                {routes}
            </BrowserRouter>
      </div>
            </AuthContext.Provider>
    );
}

export default App