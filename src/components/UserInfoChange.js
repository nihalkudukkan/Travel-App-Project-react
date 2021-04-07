import React, { Component } from 'react';
import UserDataService from './service/UserDataService';
import { Button,Badge, Navbar, Nav, NavDropdown,Form,Dropdown, FormControl } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class UserInfoChange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: this.props.match.params.name,
            email: '',
            iniemail: '',
            phone:'',
            iniphone:'',
            password:'',
            inipassword:'',
            verpassword:'',
            Categories:[],
            tempnot:0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    refreshCourses() {
        UserDataService.retrieveAllUser()//HARDCODED
            .then(
                response => {
                    this.setState({ Categories: response.data });
                }
            )
    }

    fetchData(){
        UserDataService.verifyUser(this.state.name)
            .then(
                response => this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    iniemail: response.data.email,
                    phone: response.data.phone,
                    iniphone: response.data.phone,
                    inipassword: response.data.password
                })
            )
    }

    componentDidMount() {
        this.refreshCourses();
        this.fetchData();
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
          })
      }
    
    handleSubmit(event) {
        let user = {
            id: this.state.id,
            username: this.state.name,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone
        }

        if (this.state.verpassword!==this.state.inipassword) {
            alert("Entered Old password is wrong")
        } else {
            if (this.state.iniemail===this.state.email) {
                if(this.state.iniphone===this.state.phone) {
                    UserDataService.updateUser(user);
                    alert('Password has changed');
                    this.props.history.push(`/homemain/${this.state.name}`);
                }
                else {
                    UserDataService.verifyPhone(this.state.phone)
                        .then(
                            response => {
                                if (response.data===null) {
                                    UserDataService.updateUser(user);
                                    alert('Profile Updated');
                                    this.props.history.push(`/homemain/${this.state.name}`);
                                } else {
                                    alert("This phone number already exists")
                                }
                            }
                        )
                }
            } else {
                UserDataService.verifyEmail(this.state.email)
                    .then(
                        response => {
                            if (response.data===null) {
                                // UserDataService.updateUser(user);
                                // alert('Profile Updated');
                                // this.props.history.push(`/homemain/${this.state.name}`);
                                if(this.state.iniphone===this.state.phone) {
                                    UserDataService.updateUser(user);
                                    alert('Profile Updated');
                                    this.props.history.push(`/homemain/${this.state.name}`);
                                }
                                else {
                                    UserDataService.verifyPhone(this.state.phone)
                                        .then(
                                            response => {
                                                if (response.data===null) {
                                                    UserDataService.updateUser(user);
                                                    alert('Profile Updated');
                                                    this.props.history.push(`/homemain/${this.state.name}`);
                                                } else {
                                                    alert("This phone number already exists")
                                                }
                                            }
                                        )
                                }
                            } else {
                                alert("This Email has already registered with another profile")
                            }
                        }
                    )
            }
        }
        
        
        event.preventDefault();
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
                <div className="mt-5">
                {/* <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
                <h3 className="d-flex justify-content-center">Edit Your Profile</h3>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" value={this.state.name} onChange={this.handleChange} disabled/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                        <div class="col-sm-10">
                        <input type="email" name="email" readonly class="form-control" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Phone Number:</label>
                        <div class="col-sm-10">
                        <input type="tel" name="phone" readonly class="form-control" value={this.state.phone} pattern="[0-9]{10}" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Old Password:</label>
                        <div class="col-sm-10">
                        <input type="password" name="verpassword" readonly class="form-control" onChange={this.handleChange} />
                        </div>
                        
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Change Password:</label>
                        <div class="col-sm-10">
                        <input type="password" name="password" readonly class="form-control" onChange={this.handleChange} pattern=".{6,}" />
                        <p className="text-muted">
                            Atleast 6 Characters
                        </p>
                        </div>
                        
                    </div>
                      
                    <input class="btn btn-primary" type="submit" value="Submit" />
                </form>
                </div>
            </div>
            </>
          );
    }
}
 
export default UserInfoChange;