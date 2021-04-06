import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';

class FriendList extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.match.params.name,
            friends:[],
            connect:[]
        }
        this.fetchUserFriends = this.fetchUserFriends.bind(this)
        this.fetchConnectFriends = this.fetchConnectFriends.bind(this)
    }

    componentDidMount(){
        this.fetchUserFriends();
        this.fetchConnectFriends();
    }

    fetchConnectFriends(){
        FriendDataService.getUserConnect(this.state.name)
        .then(
            response => {
                this.setState({ connect: response.data })
            }            
        )
    }

    fetchUserFriends(){
        FriendDataService.getUserFriends(this.state.name)
        .then(
            response => {
                this.setState({ friends: response.data })
            }            
        )
    }

    render() { 
        return (
            <div className="container">
                <button className="btn btn-warning mb-3" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
                <h1>{this.state.name}'s Friends</h1>
                <table className="table">
                <thead>
                    <tr>                                
                        <th>Name</th>                               
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.friends.map(
                            user =>
                            <tr key={user.id}>
                                <td>{user.connect}</td>
                            </tr>
                        )
                    }
                    {
                        this.state.connect.map(
                            i =>
                            <tr key={i.id}>
                                <td>{i.name}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>                
            </div>
        );
    }
}
 
export default FriendList;