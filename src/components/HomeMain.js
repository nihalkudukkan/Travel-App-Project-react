import React, { Component } from 'react';
import PlanDataService from './service/PlanDataService';
// import UserDataService from './service/UserDataService';
import './HomeMain.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
//import logo from './logo.jpeg'; // with import

class HomeMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Plans: [],
            name: this.props.match.params.name,
        }
        this.refreshCourses = this.refreshCourses.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        PlanDataService.retrieveAllPlan()//HARDCODED
            .then(
                response => {
                    this.setState({ Plans: response.data })
                }
            )
    }
    LogOutUserClicked(){
        this.props.history.push(`/`)
    }
    EditUserClicked(name){
      this.props.history.push(`/userinfo/${name}`);
    }
    CreateUserClicked(){
        this.props.history.push(`/`)
    }
    EditInfoClicked(name){
        this.props.history.push(`/user/${name}`);
    }
    
    render() {
        return (
            <section className="home__main">
            <div className="container">
                
                <div className="container">
                  <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={() => this.EditInfoClicked(this.state.name)}><img src="https://photo620x400.mnstatic.com/c4c05ab1a0cf201dabb21e4c75261a2b/barcolana-regatta.jpg" alt='' width="30px" height="30px" /> </button>
                 
                <button className="btn btn-secondary" onClick={() => this.EditUserClicked(this.state.name)}>   Edit Profile   </button>
                
                <button className="btn btn-primary" onClick={() => this.CreateUserClicked()}>Create Travel Plan</button>
                <button className="btn btn-info" onClick={() => this.CreateUserClicked()}>Your Plans</button>
                <button className="btn btn-warning" onClick={() => this.LogOutUserClicked()}>Log Out</button>
                </div>
                <h1>welcome {this.state.name}</h1>
                
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
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                 
                </div>
            </div>
            {/* <MDBFooter color="blue" className="footer font-small">
            <MDBContainer fluid className="text-center text-md-left">
            <MDBRow>
            <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:  Unicorn Program Batch 6 
        </MDBContainer>
      </div>
    </MDBFooter> */}
            </section>
        )
    }
}
 
export default HomeMain;