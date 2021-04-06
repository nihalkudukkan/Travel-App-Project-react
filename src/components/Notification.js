import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import RequestDataService from './service/RequestDataService';

class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.match.params.name,
            req:[],
        }
        this.refreshNotification = this.refreshNotification.bind(this)
    }

    componentDidMount() {
        this.refreshNotification();
    }

    refreshNotification() {
        RequestDataService.getUserFriendReq(this.state.name)
            .then(
                response => {
                    this.setState({
                        req: response.data
                    })
                    // console.log(this.state.req);
                    console.log(this.state.req.length);
                }
            )
    }

    handleAccept(i){
        let Friend = {
            name: this.state.name,
            connect: i.sender
        }
        FriendDataService.postFriend(Friend);
        RequestDataService.deleteRequest(i.id);
        alert("Friend Added");
        window.location.reload(false);
    }

    handleRemove(id){
        RequestDataService.deleteRequest(id);
        alert("Request deleted");
        window.location.reload(false);
    }

    render() {
        return (
            <div className="container">
                <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
                <h1>Notification for {this.state.name}</h1>
                <table className="table">
                    <thead>
                            <tr>                                
                                <th>From</th>
                                <th>Accept</th>
                                <th>Delete</th>
                            </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.req.map(
                                    (i) =>
                                        <tr key={i.id}>
                                            <td>{i.sender}</td>
                                            <td><button className="btn btn-success" onClick={()=> this.handleAccept(i)}>Accept</button></td>
                                            <td><button className="btn btn-warning" onClick={()=> this.handleRemove(i.id)}>Reject</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                </table>
            </div>
        );
    }
}
 
export default Notification;