import React, { Component } from 'react';
import './ShowProfile.css';
import { Badge, Navbar, Nav,Dropdown,  } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlanDataService from './service/PlanDataService';
import PlanNotificationService from './service/PlanNotificationService';

class ShowProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            name: this.props.match.params.name,
            friend: this.props.match.params.friend,
            friendPlan:[],
            tempnot:0,
            participants:0,
            planNotTemp:0
        }
        this.refreshPlan = this.refreshPlan.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.refreshPlan();
    }

    refreshPlan(){
        PlanDataService.retrieveUserPlan(this.state.friend)
         .then(
             response=>{
                 this.setState({friendPlan:response.data})
             }
         )
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
          })
    }

    sendConnectionRequest(ids, name, numbers){
        let PlanNotification = {
            sender:this.state.name,
            receiver:name,
            planId:ids,
            participants:this.state.participants
        }
        
        if (PlanNotification.participants==0) {
            alert("Cannot send request for zero partcipants");
        } else {
                this.setState({planNotTemp:ids})
                PlanNotificationService.sendPlanRequest(PlanNotification);
                alert("Request Send");
            }
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
                <Navbar.Brand href="#home" className="mb-2">Bon Voyage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Home</Nav.Link>
                    <Nav.Link onClick={() => this.CreatePlanClicked(this.state.name)}>Create Travel Plan</Nav.Link>
                    <Nav.Link onClick={() => this.yourPlan(this.state.name)}>Your Plans</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push(`/friend/${this.state.name}`)}><h5 className="text-light">Friends</h5></Nav.Link>
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
            <div className="container">

                <div id="cards_landscape_wrap-2">
            <div class="row mt-5">
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a>
                        <div class="card-flyer">
                            <div class="text-box">
                                <div class="image-box">
                                    <img src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg" alt="" />
                                </div>
                                <div class="text-container">
                                    <h6>{this.state.friend}</h6>
                                    {/* <p>{this.state.user.email}</p>
                                    <p>{this.state.user.phone}</p> */}
                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> */}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                </div>
                </div>
                {this.state.friendPlan.map(
                user =>
                <div class="col-md-6">
				<div class="media blog-media">
				  <a><img class="d-flex" src="https://i.picsum.photos/id/406/250/380.jpg?grayscale&hmac=g0rpcuDfLepEMU008-qnAF87LKYMjwUEJk9xGlEwkPE" alt="Generic placeholder image" /></a>
				  <div class="circle">
				  	{/* <h5 class="day">14 sep</h5>
				  	<span class="month">sep</span> */}
                      <h5 class="day">{user.startDt}</h5>
				  </div>
				  <div class="media-body">
				    <a href=""><h5 class="mt-0">{user.username}</h5></a>
                    <p>Location: <h5>{user.placeOfStay}</h5></p>
				    Total Participants: {user.participants}. Days: {user.days}. Travel By {user.modeOfTravel}. Stay: {user.modeOfStay}!
				    <ul  className="mt-2">
				    	<li>Cost: {user.cost}</li>
				    	<li>Slots Available: {user.slots}</li>
                        <div className="mt-3">
                        <form>
                                <div class="form-group row pl-3">
                                    <label for="staticEmail">Your participants:</label>
                                    <div class="col-sm-5">
                                    <input type="number" name="participants" readonly className="form-control" min="0" max={user.slots} onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </form>
                            {this.state.planNotTemp===user.id?<p>Request Send</p>:<button className="btn btn-primary mb-3" onClick={()=>this.sendConnectionRequest(user.id, user.username, user.slots)}>Connect</button>}
                        </div>
				    	{/* <li class="text-right"><a href="blog-post-left-sidebar.html">07 comments</a></li> */}
				    </ul>
				  </div>
				</div>
			</div>
            )    
        }
                </div>

            </>
        );
    }
}
 
export default ShowProfile;