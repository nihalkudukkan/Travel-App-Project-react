import React, { Component } from 'react';
import PlanDataService from './service/PlanDataService';

class MyTravelPlan extends Component {
    constructor(props){
        super(props);
        this.state = {
            MyPlan:[],
            name: this.props.match.params.name,
        }
        this.refreshPlan = this.refreshPlan.bind(this)
    }
    componentDidMount() {
        this.refreshPlan();
    }

    refreshPlan() {
        PlanDataService.retrieveUserPlan(this.state.name)
            .then(
                response => {
                    this.setState({
                        MyPlan: response.data
                    })
                }
            )
    }

    removePlan(id){
        // console.log("Removed");
        PlanDataService.deletePlanId(id);
        alert("Plan Deleted");
    }

    render() { 
        return (
            <div className="container">
                <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
                <h1>Travel Plans of {this.state.name}</h1>
                <table className="table">
                    <thead>
                            <tr>                                
                                {/* <th>Username</th> */}
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
                                            {/* <td>{i.username}</td> */}
                                            <td>{i.placeOfStay}</td>
                                            <td>{i.modeOfTravel}</td>
                                            <td>{i.modeOfStay}</td>
                                            <td>{i.days}</td>
                                            <td>{i.startDt}</td>
                                            <td>{i.activities}</td>
                                            <td>{i.participants}</td>
                                            <td>{i.cost}</td>
                                            <td><button className="btn btn-success">Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.removePlan(i.id)} >Remove</button></td>
                                        </tr>
                                )
                            }
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default MyTravelPlan;