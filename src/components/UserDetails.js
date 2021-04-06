import React, { Component } from 'react'
import FriendDataService from './service/FriendDataService';
import PlanDataService from './service/PlanDataService';
import RequestDataService from './service/RequestDataService';
import UserDataService from './service/UserDataService';



class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            id:'',
            message: null,
            name: this.props.match.params.name,
        }
        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        UserDataService.verifyUser(this.state.name) //HARDCODED
            .then(
                response => {
                    //console.log(response);
                    this.setState({ user: response.data })
                    this.setState({id: response.data.id})
                }
            )
    }

    deleteUserClicked() {
        // console.log(this.state.id);
        alert("Profile and Plans deleted");
        UserDataService.deleteUser(this.state.id);
        PlanDataService.deleteUserPlan(this.state.name);
        RequestDataService.deleteRequestByName(this.state.name)
        RequestDataService.deleteRequestByReceiver(this.state.name)
        FriendDataService.deleteFriendByConnect(this.state.name)
        FriendDataService.deleteFriendByName(this.state.name)
        this.props.history.push(`/`);
    }

   

    updateUserClicked(uname) {
        this.props.history.push(`/userinfo/${uname}`)
    }

    render() {
        return (
            <div className="container">
                <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
                <h3>User Details</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <tbody>
                                                         
                            <tr><td>{this.state.name}</td></tr>
                            <tr><td>{this.state.user.email}</td></tr>
                            <tr><td>{this.state.user.phone}</td></tr>
                            
                            <tr><td><button className="btn btn-success" onClick={() => this.updateUserClicked(this.state.name)}>Update</button></td></tr>
                            <tr><td><button className="btn btn-warning" onClick={() => this.deleteUserClicked()}>Delete</button></td></tr>
                                        
                                
                            
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}

export default UserDetails