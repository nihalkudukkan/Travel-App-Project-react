import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from './service/UserDataService';
import RequestDataService from './service/RequestDataService';
import PlanDataService from './service/PlanDataService';
import { Button,Badge, Navbar, Nav, NavDropdown,Dropdown, FormControl } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class SearchUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // id: this.props.match.params.id,
            username:'',
            placeOfStay:'',
            tempName:'',
            password:'',
            Categoriesh: [],
            Plans:[],
            name: this.props.match.params.name,
            temp:0,
            connTemp:0,
            temp1:0,
            connTemp1:0,
            tempnot:0
        }

         this.onSubmit = this.onSubmit.bind(this)
         this.onSubmitPlan = this.onSubmitPlan.bind(this)
         this.refreshforverify = this.refreshforverify.bind(this)
        // this.validate = this.validate.bind(this)

    }
    componentDidMount() {
    }
    refreshforverify(username) {
        // console.log(username);
        UserDataService.verifyUser(username)//HARDCODED
            .then(
                response => {
                    if(response.data===null){
                        alert("No user exist with this username");
                    }
                    else{   
                    this.setState({
                         Categoriesh: response.data,
                         temp:1,
                         temp1:0,
                         connTemp:0
                        });
                        console.log(this.state.Categoriesh);
                    // this.props.history.push(`/user/${this.state.Categoriesh.username}`);
                    // var countKey = Object.keys(response.data).length;
                    // console.log(countKey);
                }
                }
            )
    }
    refereshforPlan(username) {
        // console.log(username);
        PlanDataService.getByPlan(username)//HARDCODED
            .then(
                response => {
                    if(response.data===null){
                        alert("No user exist with this username");
                    }
                    else{   
                    this.setState({
                        Plans: response.data,
                        temp:0,
                        temp1:1,
                        connTemp1:0
                        });
                        console.log(this.state.Plans);
                    // this.props.history.push(`/user/${this.state.Categoriesh.username}`);
                    // var countKey = Object.keys(response.data).length;
                    // console.log(countKey);
                }
                }
            )
    }
    onSubmit(values){
        
        
        this.refreshforverify(values.username);
        this.setState({
            tempName:values.username
        })
        
    }
    onSubmitPlan(values){
        this.refereshforPlan(values.placeOfStay);
    }
    // registerUserClicked(){
    //     this.props.history.push(`/users`)
    // }
    // loginUserClicked(){
    //     this.props.history.push(`/home`)
    // }

    handleConnect(){
        this.setState({
            connTemp:1
        })
        let req = {
            sender:this.state.name,
            receiver:this.state.tempName
        }
        RequestDataService.postRequest(req);
        // console.log(this.state.tempName);
        // console.log("Connected to: " + this.state.Categoriesh.username);
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
        let { username, placeOfStay } = this.state
        let { tempnot } = this.state
        return (
            <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Travel Application</Navbar.Brand>
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
            <div className="container">
            {/* <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
            <div className="border py-5 my-2">
                <h3 className="d-flex justify-content-center">Search for Users or Plans</h3>
                <div className="container">
                    <Formik
                        initialValues={{ username, placeOfStay }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <p>Username</p>
                                        <Field className="form-control" type="text" name="username" required/>
                                    </fieldset>
                                    {/* edits */}

                                    
                                    {/* edits */}
                                    <button className="btn btn-success mb-4" type="submit" >Search</button>
                                    
                                    
                                </Form>
                            )
                        }
                    </Formik>

                    
                </div>
                <div className="container">
                    <Formik
                        initialValues={{ username, placeOfStay }}
                        onSubmit={this.onSubmitPlan}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <p>Plans</p>
                                        <Field className="form-control" type="text" name="placeOfStay" required/>
                                    </fieldset>
                                    {/* edits */}

                                    
                                    {/* edits */}
                                    <button className="btn btn-success mb-4" type="submit" >Search</button>
                                    
                                    
                                </Form>
                            )
                        }
                    </Formik>

                    
                </div>
            </div>
            {this.state.temp===1 ? <table className="table mb-5">
                        <thead>
                            <tr>
                                
                                <th>Username</th>
                                <th>Phone</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr key={this.state.Categoriesh.id}>
                                <td>{this.state.Categoriesh.username}</td>
                                <td>{this.state.Categoriesh.phone}</td>
                                <td>{this.state.connTemp===0?<button onClick={()=>this.handleConnect()} className="btn btn-success">Connect</button>:<p>Request Send</p>}
                                </td>
                            </tr>
                        </tbody>
                    </table>:<p></p>}
            {this.state.temp1===1 ?
             <table className="table mb-5">
                        {/* <thead>
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
                        </thead> */}
                        {/* <tbody>{
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
                        </tbody> */}
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
                    </table>
                    :<p></p>}
            
            </div>
            </>
        );
    }
}
export default SearchUser;