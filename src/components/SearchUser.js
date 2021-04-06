import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from './service/UserDataService';
import RequestDataService from './service/RequestDataService';

class SearchUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // id: this.props.match.params.id,
            username:'',
            tempName:'',
            password:'',
            Categoriesh: [],
            name: this.props.match.params.name,
            temp:0,
            connTemp:0
        }

         this.onSubmit = this.onSubmit.bind(this)
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
                         connTemp:0
                        });
                    // this.props.history.push(`/user/${this.state.Categoriesh.username}`);
                    var countKey = Object.keys(response.data).length;
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
    registerUserClicked(){
        this.props.history.push(`/users`)
    }
    loginUserClicked(){
        this.props.history.push(`/home`)
    }
    
    componentDidMount() {
    }

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

    render() { 
        let { username, password } = this.state
        return (
            <div className="container">
            <button className="btn btn-warning" onClick={()=>{this.props.history.push(`/homemain/${this.state.name}`)}}>Go Back</button>
            <div className="border py-5 my-2">
                <h3 className="d-flex justify-content-center">Search for Users</h3>
                <div className="container">
                    <Formik
                        initialValues={{ username, password }}
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
            </div>
            {this.state.temp===1 ? <table className="table">
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
                    </table>:<p>Search for users</p>}
            
            </div>
        );
    }
}
export default SearchUser;