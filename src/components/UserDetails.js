import React, { Component } from 'react';
import './UserDetails.css';
import FriendDataService from './service/FriendDataService';
import PlanDataService from './service/PlanDataService';
import RequestDataService from './service/RequestDataService';
import UserDataService from './service/UserDataService';
import { Badge, Navbar, Nav,Dropdown } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ConnectedPlanService from './service/ConnectedPlanService';



class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            id:'',
            message: null,
            name: this.props.match.params.name,
            tempnot:0
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
        ConnectedPlanService.deleteByReceiver(this.state.name)
        ConnectedPlanService.deleteByConnector(this.state.name)
        this.props.history.push(`/`);
    }

   

    updateUserClicked(uname) {
        this.props.history.push(`/userinfo/${uname}`)
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
                <Navbar.Brand href="#home" className="mb-1">Bon Voyage</Navbar.Brand>
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
                <div className="mt-5">
                {/* <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
                <h3>User Details</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        {/* <tbody>
                                                         
                            <tr><td>{this.state.name}</td></tr>
                            <tr><td>{this.state.user.email}</td></tr>
                            <tr><td>{this.state.user.phone}</td></tr>
                            
                            <tr><td><button className="btn btn-success" onClick={() => this.updateUserClicked(this.state.name)}>Update</button></td></tr>
                            <tr><td><button className="btn btn-warning" onClick={() => this.deleteUserClicked()}>Delete</button></td></tr>
                                        
                                
                            
                        </tbody> */}
                    </table>
                    
                </div>
                </div>
            </div>
            {/*  */}
            <div id="cards_landscape_wrap-2">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg" alt="" />
                                </div>
                                <div class="text-container">
                                    <h6>{this.state.name}</h6>
                                    <p>{this.state.user.email}</p>
                                    <p>{this.state.user.phone}</p>
                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> */}
                                </div>
                                <button className="btn btn-success mr-3 mb-3" onClick={() => this.updateUserClicked(this.state.name)}>Update</button>
                                <button className="btn btn-warning mb-3" onClick={() => this.deleteUserClicked()}>Delete</button>
                            </div>
                        </div>
                    
                </div>
                </div>
                </div>
                </div>
            </>
        )
    }
}

export default UserDetails