import React, { Component } from 'react';
import PlanDataService from './service/PlanDataService';
import './HomeMain.css'
import RequestDataService from './service/RequestDataService';


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
        return (
            <section className="home__main">
            <div className="container">
                
                <div className="container">
                  <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-success" onClick={() => this.EditInfoClicked(this.state.name)}><img src="https://photo620x400.mnstatic.com/c4c05ab1a0cf201dabb21e4c75261a2b/barcolana-regatta.jpg" alt='' width="30px" height="30px" /> </button>
                 
                <button className="btn btn-secondary" onClick={() => this.EditUserClicked(this.state.name)}>   Edit Profile   </button>
                
                
                <button className="btn btn-warning" onClick={() => this.props.history.push(`/friend/${this.state.name}`)}>Freinds</button>
                <button className="btn btn-warning" onClick={() => this.LogOutUserClicked()}>Log Out</button>
                </div>
                <div className="d-flex justify-content-around mb-5"><button className="btn btn-primary" onClick={() => this.CreatePlanClicked(this.state.name)}>Create Travel Plan</button>
                <button className="btn btn-info" onClick={() => this.yourPlan(this.state.name)}>Your Plans</button>
                <button onClick={()=>this.notification(this.state.name)} className="btn alert-primary" >Notification ({this.state.temp})</button>
                <button onClick={()=>this.searchUser(this.state.name)} className="btn alert-primary" >Search</button>
                </div>
                <h1>Welcome {this.state.name}</h1>
                
                    <table className="table">
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
                    </table>
                 
                </div>
            </div>
            
            </section>
        )
    }
}
 
export default HomeMain;