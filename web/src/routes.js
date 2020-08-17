import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import SucessMessageRegister from './pages/SucessMessageRegister'
import SucessMessagePassword from './pages/SucessMessagePassword'
import SucessMessageProfile from './pages/SucessMessageProfile';
import PrivateRoute from "./routes/PrivateRoute";

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/forget-password" component={ForgetPassword}/>
                <Route path="/register" component={Register}/>

                <Route path="/success-password" component={SucessMessagePassword}/>
                <Route path="/success-register" component={SucessMessageRegister}/>
                <Route path="/success-profile" component={SucessMessageProfile}/>

                <PrivateRoute path="/main" component={Landing}  />
                <PrivateRoute path="/perfil" component={Perfil} />
                <PrivateRoute path="/study/:page?" component={TeacherList} />
                <PrivateRoute path="/give-classes" component={TeacherForm} />

                <Route path='*'>
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
