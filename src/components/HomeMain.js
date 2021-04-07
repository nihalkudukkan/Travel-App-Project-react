import React, { Component } from 'react';
import PlanDataService from './service/PlanDataService';
import './HomeMain.css'
import RequestDataService from './service/RequestDataService';
import { Button,Badge, Navbar, Nav, NavDropdown,Form,Dropdown, FormControl } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class HomeMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Plans: [],
            name: this.props.match.params.name,
            temp:0
        }
        this.refreshCourses = this.refreshCourses.bind(this)
        this.refreshNotification = this.refreshNotification.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
        this.refreshNotification();
    }

    refreshCourses() {
        PlanDataService.retrieveAllPlan()//HARDCODED
            .then(
                response => {
                    this.setState({ Plans: response.data })
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
                  this.setState({
                    temp:this.state.req.length
                  })
              }
          )
  }
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
        let { temp } = this.state
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
                <Navbar.Brand href="#home">Bon Voyage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link onClick={() => this.CreatePlanClicked(this.state.name)}>Create Travel Plan</Nav.Link>
                    <Nav.Link onClick={() => this.yourPlan(this.state.name)}>Your Plans</Nav.Link>
                    <Nav.Link onClick={() => this.props.history.push(`/friend/${this.state.name}`)}>Friends</Nav.Link>
                    <Nav.Link onClick={()=>this.searchUser(this.state.name)}>Search</Nav.Link>
                </Nav>
                <Nav className="margin" style={{marginRight:  '5em'}}>
                    <Dropdown>
                    <Dropdown.Toggle bg="dark" variant="dark" id="dropdown-basic">
                    {this.state.temp!==0?
                    <Badges badgeContent={`${temp}`} color="primary">
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
                
                <div className="container">
                  {/* <div className="d-flex justify-content-between mb-4"> */}
                {/* <button className="btn btn-success" onClick={() => this.EditInfoClicked(this.state.name)}><img src="https://photo620x400.mnstatic.com/c4c05ab1a0cf201dabb21e4c75261a2b/barcolana-regatta.jpg" alt='' width="30px" height="30px" /> </button>
                 
                <button className="btn btn-secondary" onClick={() => this.EditUserClicked(this.state.name)}>   Edit Profile   </button>
                
                
                <button className="btn btn-warning" onClick={() => this.props.history.push(`/friend/${this.state.name}`)}>Freinds</button>
                <button className="btn btn-warning" onClick={() => this.LogOutUserClicked()}>Log Out</button>
                </div>
                <div className="d-flex justify-content-around mb-5"><button className="btn btn-primary" onClick={() => this.CreatePlanClicked(this.state.name)}>Create Travel Plan</button>
                <button className="btn btn-info" onClick={() => this.yourPlan(this.state.name)}>Your Plans</button>
                <button onClick={()=>this.notification(this.state.name)} className="btn alert-primary" >Notification ({this.state.temp})</button>
                <button onClick={()=>this.searchUser(this.state.name)} className="btn alert-primary" >Search</button> */}
                {/* </div> */}
                {/* <h1>Welcome {this.state.name}</h1> */}
                
                    {/* <table className="table">
                        <thead>
                            <tr>
                                
                                <th>Username</th>
                                <th>Place of stay</th>
                                <th>Mode of travel</th>
                                <th>Mode of stay</th>
                                <th>Number of days</th>
                                <th>Start date</th>
                                <th>Activities</th>
                                <th>No of participants</th>
                                <th>Cost</th>
                                

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Plans.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.username}</td>
                                            <td>{user.placeOfStay}</td>
                                            <td>{user.modeOfTravel}</td>
                                            <td>{user.modeOfStay}</td>
                                            <td>{user.days}</td>
                                            <td>{user.startDt}</td>
                                            <td>{user.activities}</td>
                                            <td>{user.participants}</td>
                                            <td>{user.cost}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table> */}
                    <section class="home-blog bg-sand">
    <div class="container mt-4">
		<div class="row justify-content-md-center">
			<div class="col-xl-5 col-lg-6 col-md-8">
				<div class="section-title text-center title-ex1">
					<h2>Welcome {this.state.name}</h2>
					<p>let your journey begin</p>
				</div>
			</div>
		</div>
		{/*  section title ends  */}
		<div class="row ">
			{this.state.Plans.map(
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
				    	{/* <li class="text-right"><a href="blog-post-left-sidebar.html">07 comments</a></li> */}
				    </ul>
				  </div>
				</div>
			</div>
            )    
        }
			{/* <div class="col-md-6">
				<div class="media blog-media">
				  <a href="blog-post-left-sidebar.html"><img class="d-flex" src="https://via.placeholder.com/350x380/FFB6C1/000000" alt="Generic placeholder image" /></a>
				  <div class="circle">
  				  	<h5 class="day">12</h5>
  				  	<span class="month">sep</span>
  				  </div>
				  <div class="media-body">
				    <a href=""><h5 class="mt-0">perferendis labore</h5></a>
				    Sodales aliquid, in eget ac cupidatat velit autem numquam ullam ducimus occaecati placeat error.
				    <a href="blog-post-left-sidebar.html" class="post-link">Read More</a>
				    <ul>
				    	<li>by: Admin</li>
				    	<li class="text-right"><a href="blog-post-left-sidebar.html">04 comments</a></li>
				    </ul>
				  </div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="media blog-media">
				  <a href="blog-post-left-sidebar.html"><img class="d-flex" src="https://via.placeholder.com/350x380/FF7F50/000000" alt="Generic placeholder image" /></a>
				  <div class="circle">
  				  	<h5 class="day">09</h5>
  				  	<span class="month">sep</span>
  				  </div>
				  <div class="media-body">
				    <a href=""><h5 class="mt-0">deleniti incdunt magni</h5></a>
				    Sodales aliquid, in eget ac cupidatat velit autem numquam ullam ducimus occaecati placeat error.
				    <a href="blog-post-left-sidebar.html" class="post-link">Read More</a>
				    <ul>
				    	<li>by: Admin</li>
				    	<li class="text-right"><a href="blog-post-left-sidebar.html">10 comments</a></li>
				    </ul>
				  </div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="media blog-media">
				  <a href="blog-post-left-sidebar.html"><img class="d-flex" src="https://via.placeholder.com/350x380/008B8B/000000" alt="Generic placeholder image" /></a>
				  <div class="circle">
  				  	<h5 class="day">04</h5>
  				  	<span class="month">sep</span>
  				  </div>
				  <div class="media-body">
				    <a href=""><h5 class="mt-0">Explicabo magnam </h5></a>
				    Sodales aliquid, in eget ac cupidatat velit autem numquam ullam ducimus occaecati placeat error.
				    <a href="blog-post-left-sidebar.html" class="post-link">Read More</a>
				    <ul>
				    	<li>by: Admin</li>
				    	<li class="text-right"><a href="blog-post-left-sidebar.html">06 comments</a></li>
				    </ul>
				  </div>
				</div>
			</div> */}
		</div>
	</div>
</section>
                </div>
            </div>
            
            </>
        )
    }
}
 
export default HomeMain;