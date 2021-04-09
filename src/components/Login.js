import React, { Component } from 'react';

class Login extends Component {
    state = {  }
    render() { 
        return (<form class="box" action="index.html" method="post">
        <h1>Login</h1>
        <input type="text" name="" placeholder="username" />
        <input type="password" name="" placeholder="password" />
        <input type="submit" name="" value="Login" />
        </form>);
    }
}
 
export default Login;