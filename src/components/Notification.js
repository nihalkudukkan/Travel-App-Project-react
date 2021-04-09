import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import RequestDataService from './service/RequestDataService';
import ConnectedPlanService from './service/ConnectedPlanService';
import PlanNotificationService from './service/PlanNotificationService';
import { Badge, Navbar, Nav,Dropdown } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlanDataService from './service/PlanDataService';

class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.match.params.name,
            req:[],
            tempnot:0,
            planOnNotification:[],
            showPlanTemp:0,
            planNotifications:[]
        }
        this.refreshNotification = this.refreshNotification.bind(this)
        this.refreshPlanNotification = this.refreshPlanNotification.bind(this)
    }

    componentDidMount() {
        this.refreshNotification();
        this.refreshPlanNotification();
    }

    refreshPlanNotification() {
        PlanNotificationService.getPlanRequestByReceiverName(this.state.name)
            .then(
                response=> {
                    this.setState({
                        planNotifications:response.data
                    })
                    // console.log(response.data);
                }
            )
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
    showPlanOnNotification(id){
        PlanDataService.retrieveById(id)
            .then(
                response=>{
                    this.setState({
                        planOnNotification:response.data,
                        showPlanTemp:id
                    })
                }
            )
    }
    removePlanNotification(id){
        PlanNotificationService.deletePlanRequestNotification(id);
        alert("Plan Deleted");
        window.location.reload(false);
    }

    acceptPlanNotification(i) {
        PlanDataService.retrieveById(i.planId)
            .then(
                response=>{
                    let Plan = {
                        id:response.data.id,
                        username:response.data.username,
                        placeOfStay:response.data.placeOfStay,
                        modeOfTravel:response.data.modeOfTravel,
                        modeOfStay:response.data.modeOfStay,
                        days:response.data.days,
                        startDt:response.data.startDt,
                        activities:response.data.activities,
                        participants:response.data.participants,
                        slots: (response.data.participants-i.participants),
                        cost: response.data.cost,
                    }
                    // console.log(Plan);
                    PlanDataService.postPlan(Plan);
                    let post = {
                        connected:i.sender,
                        receiver:response.data.username,
                        planId:i.planId,
                        slots:i.participants
                    }
                    // console.log(post);
                    ConnectedPlanService.postRequest(post);
                    PlanNotificationService.deletePlanRequestNotification(i.id);
                    alert("Slots Updated");
                    window.location.reload(false);
                }
            )
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
                                            <td>{i.sender} has requested you to be his friend</td>
                                            <td><button className="btn btn-success" onClick={()=> this.handleAccept(i)}>Accept</button></td>
                                            <td><button className="btn btn-warning" onClick={()=> this.handleRemove(i.id)}>Reject</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    <tbody>
                            {
                                this.state.planNotifications.map(
                                    (i) =>
                                        <tr key={i.id}>
                                            <td>{i.sender} has requested for connecting to your plan</td>
                                            {/* <td>{i.planId}</td> */}
                                            <td>Participants from {i.sender}: {i.participants}</td>
                                            <td><button className="btn btn-success" onClick={()=>this.showPlanOnNotification(i.planId)}>Show Plan</button></td>
                                            <td><button className="btn btn-success" onClick={()=>this.acceptPlanNotification(i)}>Accept</button></td>
                                            <td><button className="btn btn-warning" onClick={()=>this.removePlanNotification(i.id)}>Decline</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                </table>
                {/*  */}
                {this.state.showPlanTemp===0?
                <></>:
                <div class="col-md-6">
				<div class="media blog-media">
				  <a><img class="d-flex" src="https://i.picsum.photos/id/406/250/380.jpg?grayscale&hmac=g0rpcuDfLepEMU008-qnAF87LKYMjwUEJk9xGlEwkPE" alt="Generic placeholder image" /></a>
				  <div class="circle">
				  	{/* <h5 class="day">14 sep</h5>
				  	<span class="month">sep</span> */}
                      <h5 class="day">{this.state.planOnNotification.startDt}</h5>
				  </div>
				  <div class="media-body">
				    <a><h5 class="mt-0">{this.state.planOnNotification.username}</h5></a>
                    <p>Location: <h5>{this.state.planOnNotification.placeOfStay}</h5></p>
				    A Journey of {this.state.planOnNotification.participants} people about {this.state.planOnNotification.days} days which include activities such as {this.state.planOnNotification.activities}. Travel By {this.state.planOnNotification.modeOfTravel} and spend night at {this.state.planOnNotification.modeOfStay}!
				    {/* <a href="blog-post-left-sidebar.html" class="post-link">Read More</a> */}
				    <ul  className="mt-2">
				    	<li>Cost: {this.state.planOnNotification.cost}</li>
                        <li>Slots Available: {this.state.planOnNotification.slots}</li>
                        <div className="mt-3">
                        </div>
				    	{/* <li class="text-right"><a href="blog-post-left-sidebar.html">07 comments</a></li> */}
				    </ul>
				  </div>
				</div>
			</div>
                }
                
                {/*  */}
                </div>
            </div>
            
            </>
        );
    }
}
 
export default Notification;