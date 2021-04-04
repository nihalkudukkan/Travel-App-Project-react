import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from './service/UserDataService';

class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // id: this.props.match.params.id,
            username:'',
            password:''
        }

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)

    }

    componentDidMount() {
    }
    onSubmit(values) {
        // let username = INSTRUCTOR

        let user = {
            username: values.username,
            password: values.password,
            email: values.email,
            phone: values.phone,
        }
        UserDataService.verifyUser(user.username)
            .then(
                response =>{
                    if(response.data===null){
                        UserDataService.verifyEmail(user.email)
                            .then(
                                resp => {
                                    if(resp.data===null){
                                        UserDataService.verifyPhone(user.phone)
                                            .then(
                                                res=>{
                                                    if(res.data===null){
                                                        UserDataService.createUser(user);
                                                        alert('Profile Created');
                                                        this.props.history.push('/');
                                                    } else{alert("This phone number has already registered");}
                                                }
                                            )
                                    }
                                    else {alert("This email has already registered");}
                                }
                            )
                    }
                    else {alert("Account with this username already exist");}
                }
            )

        // UserDataService.createUser(user)
        //         .then(() => this.props.history.push('/'))
    }

    // validate(values) {
    //     let errors = {}
    //     if (!values.username) {
    //         errors.description = 'Enter a username'
    //     } else if (values.username.length < 3) {
    //         errors.description = 'Enter atleast 3 Characters in Description'
    //     }

    //     return errors;

    // }

    render() { 
        let { username, password } = this.state
        return (
            <div>
                <h3 className="d-flex justify-content-center">Register</h3>
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
                                        <Field className="form-control" type="text" name="username" pattern="[A-Za-z]{3,}" required/>
                                        <p className="text-muted">
                                        Atleast 3 Characters required (letters or numbers)
                                        </p>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <p>Password</p>
                                        <Field className="form-control" type="password" name="password" pattern=".{6,}" required/>
                                        <p className="text-muted">
                                        Atleast 6 Characters
                                        </p>
                                    </fieldset>
                                    
                                    {/* edits */}

                                    <fieldset className="form-group">
                                        <p>email</p>
                                        <Field className="form-control" type="email" name="email" required/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <p>Phone Number</p>
                                        <Field className="form-control" type="tel" name="phone" pattern="[0-9]{10}" required/>
                                    </fieldset>
                                    {/* edits */}
                                    <button className="btn btn-success mb-4" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                    <p>Already Registered?</p>
                    <button onClick={()=>{this.props.history.push(`/`)}} className="btn btn-primary mb-5" >Login</button>

                </div>
            </div>
        );
    }
}
export default UserComponent;