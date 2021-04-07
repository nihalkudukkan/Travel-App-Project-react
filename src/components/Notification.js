import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import RequestDataService from './service/RequestDataService';
import { Button,Badge, Navbar, Nav, NavDropdown,Form,Dropdown, FormControl } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.match.params.name,
            req:[],
            tempnot:0
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
                    // console.log(this.state.req.length);
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
    // 
LogOutUserClicked(){
    this.props.history.push(`/`)
}
EditUserClicked(name){
  this.props.history.push(`/userinfo/${name}`);
}
CreatePlanClicked(name){
    this.props.history.push(`/createTravelPlan/${name}`)
}
EditInfoClicked(name){
    this.props.history.push(`/user/${name}`);
}
notification(name){
  // console.log(name);
  this.props.history.push(`/notification/${name}`)
}
yourPlan(name){
  this.props.history.push(`/mytravelplan/${name}`)
}

searchUser(name){
  this.props.history.push(`/searchuser/${name}`)
}
// 

    render() {
        let { tempnot } = this.state
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
                <Navbar.Brand href="#home">Bon Voyage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Home</Nav.Link>
                    <Nav.Link onClick={() => this.CreatePlanClicked(this.state.name)}>Create Travel Plan</Nav.Link>
                    <Nav.Link onClick={() => this.yourPlan(this.state.name)}>Your Plans</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push(`/friend/${this.state.name}`)}>Friends</Nav.Link>
                    <Nav.Link onClick={()=>this.searchUser(this.state.name)}>Search</Nav.Link>
                </Nav>
                <Nav className="margin" style={{marginRight:  '5em'}}>
                    <Dropdown>
                    <Dropdown.Toggle bg="dark" variant="dark" id="dropdown-basic">
                    {this.state.tempnot!==0?
                    <Badges badgeContent={`${tempnot}`} color="primary">
                    <AccountCircleIcon />
                    </Badges>
                    :<AccountCircleIcon />}
                    
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => this.EditInfoClicked(this.state.name)}>View Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.EditUserClicked(this.state.name)}>Edit Profile</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.notification(this.state.name)}>Notification <Badge variant="primary">({this.state.temp})</Badge>{' '}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => this.LogOutUserClicked()} >Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container mt-5">
            <div className="mt-4">
                {/* <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
                <h1>Notifications for You</h1>
                <table className="table mt-3">
                    {/* <thead>
                            <tr>                                
                                <th>From</th>
                                <th>Accept</th>
                                <th>Delete</th>
                            </tr>
                    </thead> */}
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
            </div>
            </>
        );
    }
}
 
export default Notification;