import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import PlanDataService from './service/PlanDataService';
import { Button,Badge, Navbar, Nav, NavDropdown,Form,Dropdown, FormControl } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class MyTravelPlan extends Component {
    constructor(props){
        super(props);
        this.state = {
            MyPlan:[],
            connect:[],
            friends:[],
            alluser:[],
            temp:[],
            tempnot:0,
            
            tmp:[],
            name: this.props.match.params.name,
        }
        // this.fetchUserFriends = this.fetchUserFriends.bind(this)
        // this.fetchConnectFriends = this.fetchConnectFriends.bind(this)
        this.refreshPlan = this.refreshPlan.bind(this)
    }
    componentDidMount() {
        this.refreshPlan();
    }

    refreshPlan() {
        FriendDataService.getUserConnect(this.state.name)
            .then(
                response => {
                    this.setState({ connect: response.data })
                    // this.state.connect.map(i=> {return console.log(i.name);})
                    this.state.connect.map(i=> (
                        this.setState({alluser:this.state.alluser+i.name + " "})
                    ))
                    FriendDataService.getUserFriends(this.state.name)
                        .then(
                            respons => {
                                this.setState({ friends: respons.data })
                                this.state.friends.map(j=> (
                                    this.setState({alluser:this.state.alluser+j.connect+ " "})
                                ))
                                PlanDataService.retrieveUserPlan(this.state.name)
                                .then(
                                    response => {
                                        this.setState({
                                            MyPlan: response.data,
                                            // temp: this.state.alluser.split(" ")
                                        })
                                        console.log(this.state.temp);
                                        this.state.temp.map(k=>(
                                            PlanDataService.retrieveUserPlan(k)
                                                .then(
                                                    res=>{
                                                        this.setState({tmp:res.data})
                                                        // document.getElementById("demo").innerHTML = this.state.tmp;
                                                        // console.log(res.data);
                                                        // console.log(this.state.tmp);
                                                    }
                                                )
                                            ))
                                    } 
                                );
                            }            
                        )
                }            
            )
    }
    myFunction() {
        document.getElementById("demo").innerHTML = this.state.tmp;
      }
    

    removePlan(id){
        // console.log("Removed");
        PlanDataService.deletePlanId(id);
        alert("Plan Deleted");
        window.location.reload(false);
    }

    editPlan(id){
        this.props.history.push(`/editTravelPlan/${id}`);
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
            <div className="container mt-3">
                {/* <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
                <h1>Travel Plans of {this.state.name}</h1>
                {/* <table className="table">
                    <thead>
                            <tr>                                
                                {/* <th>Username</th> */}
                                {/* <th>Name</th> */}
                                {/* <th>Place of stay</th>
                                <th>Mode of travel</th>
                                <th>Mode of stay</th>
                                <th>Number of days</th>
                                <th>Start date</th>
                                <th>Activities</th>
                                <th>No of participants</th>
                                <th>Cost</th>
                            </tr> */}
                    {/* </thead>
                    <tbody> */}
                            {/* {
                                this.state.MyPlan.map(
                                    i =>
                                        <tr key={i.id}>
                                            <td>{i.username}</td>
                                            <td>{i.placeOfStay}</td>
                                            <td>{i.modeOfTravel}</td>
                                            <td>{i.modeOfStay}</td>
                                            <td>{i.days}</td>
                                            <td>{i.startDt}</td>
                                            <td>{i.activities}</td>
                                            <td>{i.participants}</td>
                                            <td>{i.cost}</td>
                                            <td><button className="btn btn-success" onClick={() => this.editPlan(i.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.removePlan(i.id)} >Remove</button></td>
                                        </tr>
                                )
                            }
                            
                    </tbody> */}
                    
                    {/* <tbody>
                            {
                                this.state.tmp.map(
                                    i =>
                                        <tr key={i.id}>
                                            <td>{i.username}</td>
                                            <td>{i.placeOfStay}</td>
                                            <td>{i.modeOfTravel}</td>
                                            <td>{i.modeOfStay}</td>
                                            <td>{i.days}</td>
                                            <td>{i.startDt}</td>
                                            <td>{i.activities}</td>
                                            <td>{i.participants}</td>
                                            <td>{i.cost}</td>
                                        </tr>
                                )
                            }
                            
                    </tbody> */}
                {/* </table> */}
                {this.state.MyPlan.map(
                user =>
                <div class="col-md-6">
				<div class="media blog-media">
				  <a href="blog-post-left-sidebar.html"><img class="d-flex" src="https://i.picsum.photos/id/406/250/380.jpg?grayscale&hmac=g0rpcuDfLepEMU008-qnAF87LKYMjwUEJk9xGlEwkPE" alt="Generic placeholder image" /></a>
				  <div class="circle">
				  	{/* <h5 class="day">14 sep</h5>
				  	<span class="month">sep</span> */}
                      <h5 class="day">{user.startDt}</h5>
				  </div>
				  <div class="media-body">
				    <a href=""><h5 class="mt-0">{user.username}</h5></a>
                    <p>Location: <h5>{user.placeOfStay}</h5></p>
				    A Journey of {user.participants} people about {user.days} days which include activities such as {user.activities}. Travel By {user.modeOfTravel} and spend night at {user.modeOfStay}!
				    {/* <a href="blog-post-left-sidebar.html" class="post-link">Read More</a> */}
				    <ul  className="mt-2">
				    	<li>Cost: {user.cost}</li>
                        <div className="mt-3">
                        <button className="btn btn-success mr-3" onClick={() => this.editPlan(user.id)}>Update</button>
                        <button className="btn btn-warning" onClick={() => this.removePlan(user.id)} >Remove</button>
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
 
export default MyTravelPlan;