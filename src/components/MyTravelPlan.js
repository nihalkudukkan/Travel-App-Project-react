import React, { Component } from 'react';
import FriendDataService from './service/FriendDataService';
import PlanDataService from './service/PlanDataService';

class MyTravelPlan extends Component {
    constructor(props){
        super(props);
        this.state = {
            MyPlan:[],
            connect:[],
            friends:[],
            alluser:[],
            temp:[],
            // tmp:{activities: "",
            //     cost: 0,
            //     days: "",
            //     id: '',
            //     modeOfStay: "",
            //     modeOfTravel: "",
            //     participants: 3,
            //     placeOfStay: "",
            //     startDt: "",
            //     username: ""},
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
                                                        console.log(res.data);
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

    render() { 
        return (
            <div className="container">
                <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
                <h1>Travel Plans of {this.state.name} and friends</h1>
                <table className="table">
                    <thead>
                            <tr>                                
                                {/* <th>Username</th> */}
                                <th>Name</th>
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
                            
                    </tbody>
                    
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
                </table>
                {/* <button onClick={()=>this.myFunction()}>Try it</button>
                <p id="demo"></p> */}
            </div>
        );
    }
}
 
export default MyTravelPlan;