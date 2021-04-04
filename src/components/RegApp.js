import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserInfoChange from './UserInfoChange';
import Home from './Home';
import HomeMain from './HomeMain';
import UserComponent from './UserComponent';
import UserInfo from './UserInfo';
import Welcome from './Welcome';

class RegApp extends Component {
    render() { 
        return (
            <Router>
                <>
                    <h1 className="display-1 d-flex justify-content-center my-3">Travel Application</h1>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/home/:name" exact component={Home}/>
                        <Route path="/users" component={UserComponent} />
                        <Route path="/userinfo/:name" component={UserInfoChange} />
                        <Route path="/homemain/:name" component={HomeMain} />
                    </Switch>
                </>
            </Router>
        )
    }
}
 
export default RegApp;