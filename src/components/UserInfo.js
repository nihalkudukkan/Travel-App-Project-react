import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from './service/UserDataService';

class UserInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.match.params.name,
            data: [],
            Categories:[]
        }

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.refreshCourses = this.refreshCourses.bind(this)
    }
    registerUserClicked(){
        this.props.history.push(`/`)
    }

    fetchData(){
        UserDataService.verifyUser(this.state.name)
            .then(
                response => this.setState({
                    data: response.data
                })
            )
    }

    componentDidMount() {
        this.refreshCourses();
        this.fetchData();
    }

    refreshCourses() {
        UserDataService.retrieveAllUser()//HARDCODED
            .then(
                response => {
                    this.setState({ Categories: response.data });
                }
            )
    }

    // saveChanges()

    onSubmit(values) {
        let user = {
            username: values.username,
            password: values.password,
            email: values.email,
            phone: values.phone,
        }
        // this.state.Categories.map(
        //     i => {
        //         console.log(i.email)
        //     }
        // )
        // this.saveChanges(values.username);
        // alert('A name was submitted: ');
        console.log(values.email);
        console.log(user.email);

    }

    validate(values) {
        let errors = {}
        if (this.state.data.username) {
            alert("check");
            errors.description = 'Enter a username';
        } else if (values.username.length < 3) {
            alert("check1");
            errors.description = 'Enter atleast 3 Characters in Description'
        }

        return errors;

    }

    render() { 
        let { name } = this.state
        return (
            <div>
                <h3 className="d-flex justify-content-center">Edit Your Profile</h3>
                <div className="container">
                    <Formik
                        initialValues={{ name }}
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
                                        <Field className="form-control" type="text" value={this.state.data.username} disabled name="username" required/>
                                    </fieldset>
                                    
                                    
                                    {/* edits */}

                                    <fieldset className="form-group">
                                        <p>email</p>
                                        <Field className="form-control" type="email" value={this.state.data.email} name="email" required/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <p>Phone Number</p>
                                        <Field className="form-control" type="tel" value={this.state.data.phone} name="phone" pattern="[0-9]{10}" required/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <p>Change Password</p>
                                        <Field className="form-control" type="password"  name="password" required/>
                                    </fieldset>
                                    {/* edits */}
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        );
    }
}
export default UserInfo;