import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import { isAuthenticated } from './services/token';

const PrivateRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={props => isAuthenticated() ? 
      ( <Component {...props} /> ) : ( <Redirect to={{ pathname: "/", state: { from: props.location } }} /> ) } />
);

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/forget-password" component={ForgetPassword}/>
                <Route path="/register" component={Register}/>

                <PrivateRoute path="/main" component={Landing}  />
                <PrivateRoute path="/perfil" component={Perfil} />
                <PrivateRoute path="/study" component={TeacherList} />
                <PrivateRoute path="/give-classes" component={TeacherForm} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
