
import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from './service/UserDataService';

class Welcome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // id: this.props.match.params.id,
            username:'',
            password:'',
            Categoriesh: [],
        }

         this.onSubmit = this.onSubmit.bind(this)
         this.refreshforverify = this.refreshforverify.bind(this)
        // this.validate = this.validate.bind(this)

    }
    // componentDidMount() {
    //     this.refreshforverify();
    // }
    refreshforverify(username, values) {
        UserDataService.verifyUser(username)//HARDCODED
            .then(
                response => {
                    if(response.data===null){
                        this.props.history.push(`/`);
                        alert("The username or password you entered isn't connected to an account");
                    }
                    else{   
                    this.setState({ Categoriesh: response.data });
                    // console.log(response.data);
                    // console.log(this.state.Categories);
                    // console.log(this.state.Categories.username);
                    // console.log(this.state.Categories.password);
                    // console.log(values.password);
                    if(this.state.Categoriesh.password===values.password){
                        // console.log("happy");
                        this.props.history.push(`/homemain/${this.state.Categoriesh.username}`);
                    }
                }
                }
            )
    }
    onSubmit(values){
        
        // this.props.history.push(`/home`)
        // console.log(values.username);
        this.refreshforverify(values.username, values);
        // setTimeout(console.log(this.state.Categories), 3000);
        // this.setState({username: values.username})
        // var name = this.state.username;
        // console.log(this.state.username);
        // console.log(values.password);
    }
    registerUserClicked(){
        this.props.history.push(`/users`)
    }
    loginUserClicked(){
        this.props.history.push(`/home`)
    }
    
    componentDidMount() {
    }

    // validate(values) {
    //     let errors = {}
    //     if (!values.username) {
    //         errors.description = 'Enter a username'
    //     } else if (values.description.length < 3) {
    //         errors.description = 'Enter atleast 3 Characters in Description'
    //     }

    //     return errors;

    // }

    render() { 
        let { username, password } = this.state
        return (
            <div className="border mx-5 py-5">
                <h3 className="d-flex justify-content-center">Login</h3>
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
                                    <fieldset className="form-group">
                                        <p>Password</p>
                                        <Field className="form-control" type="password" name="password" required/>
                                    </fieldset>
                                    
                                    {/* edits */}

                                    
                                    {/* edits */}
                                    <button className="btn btn-success mb-4" type="submit" >login</button>
                                    
                                    {/* <button className="btn btn-primary" onClick={() => this.registerUserClicked()}>Register</button> */}
                                </Form>
                            )
                        }
                    </Formik>

                    <p>Register for new user</p>
                    <button className="btn btn-primary" onClick={() => this.registerUserClicked()}>Register</button>

                </div>
            </div>
        );
    }
}
export default Welcome;