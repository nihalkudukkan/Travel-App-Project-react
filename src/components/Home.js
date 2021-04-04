import React, { Component } from 'react';
import UserDataService from './service/UserDataService';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Categories: [],
            temp: [],
            name: this.props.match.params.name
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
        // console.log(this.state.name);
        UserDataService.verifyUser(this.state.name)
            .then(
                response => {
                    this.setState({ temp: response.data });
                    console.log(this.state.temp);
                }
            )
    }

    refreshCourses() {
        UserDataService.retrieveAllUser()//HARDCODED
            .then(
                response => {
                    this.setState({ Categories: response.data });
                    // console.log(this.state.Categories);
                }
            )
    }
    LogOutUserClicked(){
        this.props.history.push(`/`)
    }
    render() {
        // const {Categories} = this.props.Categories;
        return (
            <div className="container">
                {this.state.temp===null? <h1>404 content not found</h1> : 
                    <div>
                        <h1>welcome {this.state.name}</h1>
                        <h3>All Users</h3>
                        <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Categories.map(
                                        user =>
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <button className="btn btn-warning" onClick={() => this.LogOutUserClicked()}>Log Out</button>
                    </div>
                </div>}
                
                
            </div>
        )
    }
}
 
export default Home;