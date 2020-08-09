import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';

function Routes() {

    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/forget-password" component={ForgetPassword}/>
            <Route path="/register" component={Register}/>
            <Route path="/main" component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes
