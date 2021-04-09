import React, { Component } from 'react';
import PlanDataService from './service/PlanDataService';
import { Badge, Navbar, Nav,Dropdown } from 'react-bootstrap';
import Badges from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class CreatePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            placeOfStay: '',
            modeOfTravel:'',
            modeOfStay:'',
            days:'',
            startDt:'',
            activities:'',
            participants:'',
            cost:'',
            tempnot:0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        let Plan = {
            username: this.state.name,
            placeOfStay: this.state.placeOfStay,
            modeOfTravel: this.state.modeOfTravel,
            modeOfStay: this.state.modeOfStay,
            days: this.state.days,
            startDt: this.state.startDt,
            activities: this.state.activities,
            participants: this.state.participants,
            slots: this.state.participants,
            cost: this.state.cost,
        }
        // console.log(Plan);
        PlanDataService.postPlan(Plan);
        alert("Plan Added");
        this.props.history.push(`/homemain/${this.state.name}`);
        window.location.reload(false);
        event.preventDefault();
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
                    <Nav.Link onClick={() => this.CreatePlanClicked(this.state.name)}><h5 className="text-light">Create Travel Plan</h5></Nav.Link>
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
            <div className="create pt-4">
            <div className="container mt-5 px-5 pt-5">
                {/* <button className="btn btn-warning mb-3" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button> */}
                <h1>Create Your Travel Plan</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" value={this.state.name} onChange={this.handleChange} disabled/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Place of stay:</label>
                        <div class="col-sm-10">
                        <input type="text" name="placeOfStay" readonly class="form-control" onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Mode of travel:</label>
                        <div class="col-sm-10">
                        <input type="text" name="modeOfTravel" readonly class="form-control" onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Mode of stay:</label>
                        <div class="col-sm-10">
                        <input type="text" name="modeOfStay" readonly class="form-control" onChange={this.handleChange} required/>
                        </div>
                        
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Number of days:</label>
                        <div class="col-sm-10">
                        <input type="text" name="days" readonly class="form-control" onChange={this.handleChange} required/>           
                        </div>                       
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Start date:</label>
                        <div class="col-sm-10">
                        <input type="date" name="startDt" readonly class="form-control" onChange={this.handleChange} required/>
                        </div>                       
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Activities:</label>
                        <div class="col-sm-10">
                        <input type="text" name="activities" readonly class="form-control" onChange={this.handleChange} required/>           
                        </div>                       
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">No of participants:</label>
                        <div class="col-sm-10">
                        <input type="text" name="participants" readonly class="form-control" onChange={this.handleChange} required/>           
                        </div>                       
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Cost:</label>
                        <div class="col-sm-10">
                        <input type="number" name="cost" readonly class="form-control" onChange={this.handleChange} required/>           
                        </div>                       
                    </div>
                      
                    <input class="btn btn-primary mb-5" type="submit" value="Submit" />
                </form>
            </div>
            </div>
            </>
        );
    }
}
 
export default CreatePlan;