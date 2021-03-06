import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import PlanNotificationService from './service/PlanNotificationService';
import { Badge, Navbar, Nav,Dropdown } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PlanDataService from './service/PlanDataService';

class FriendList extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.match.params.name,
            friends:[],
            connect:[],
            planName:'',
            loadPlans:[],
            planNametemp:0,
            planNotTemp:0,
            participants:0,
            tempnot:0
        }
        this.handleChange = this.handleChange.bind(this)
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

    showPlansClick(name){
        this.setState({planName: name, planNametemp:1})
        PlanDataService.retrieveUserPlan(name)
            .then(
                response=> {
                    this.setState({
                        loadPlans:response.data
                    })
                }
            )
    }
    sendConnectionRequest(ids, name, numbers){
        let PlanNotification = {
            sender:this.state.name,
            receiver:name,
            planId:ids,
            participants:this.state.participants
        }
        
        if (PlanNotification.participants===0) {
            alert("Cannot send request for zero partcipants");
        } else {
            if(PlanNotification.participants > numbers) {
                alert("Cannot send request for partcipants more than required");
            } else {
                this.setState({planNotTemp:ids})
                PlanNotificationService.sendPlanRequest(PlanNotification);
                alert("Request Send");
            }
        }
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
          })
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
            <div className="container my-3">
                {/* <button className="btn btn-warning mb-3" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
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
                                <button className="btn btn-primary mr-2" onClick={()=>{this.props.history.push(`/showprofile/${this.state.name}/${user.connect}`)}}>Show Profile</button>
                                {/* <button className="btn btn-primary" onClick={()=>this.showPlansClick(user.connect)}>Show Plans</button> */}
                            </tr>
                        )
                    }
                    {
                        this.state.connect.map(
                            i =>
                            <tr key={i.id}>
                                <td>{i.name}</td>
                                <button className="btn btn-primary mr-2" onClick={()=>{this.props.history.push(`/showprofile/${this.state.name}/${i.name}`)}}>Show Profile</button>
                                
                            </tr>
                        )
                    }
                </tbody>
                </table>                
            </div>
                    {this.state.loadPlans.map(
                        i=><div className="container"> 
                            <p>{i.id}</p>
                            <p>{i.placeOfStay}</p>
                            <p>{i.startDt}</p>
                            <p>Total Slots: {i.participants}</p>
                            <p>Remaining slots: {i.slots}</p>
                            <p>Cost: {i.cost}</p>
                            <form>
                                <div class="form-group row">
                                    <label for="staticEmail" className="col-sm-2 col-form-label">participants:</label>
                                    <div class="col-sm-10">
                                    <input type="number" name="participants" readonly class="form-control" onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </form>
                            {this.state.planNotTemp===i.id?<p>Request Send</p>:<button className="btn btn-primary mb-3" onClick={()=>this.sendConnectionRequest(i.id, i.username, i.slots)}>Connect</button>}
                        </div>
                    )}
            </>
        );
    }
}
 
export default FriendList;