import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row, Col, Breadcrumb, BreadcrumbItem
    , Button, Label
} from 'reactstrap';
import { Control, Errors, Form } from 'react-redux-form';
import { postFeedback } from '../redux/actionCreaters';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val)) && val && val.length === 11;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends React.Component {
    handleSubmit = (values) => {
        postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);
        this.props.resetFeedbackForm();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information
                        </h3>
                        
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" href="/" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send Us Your Feedback</h3>
                    </div>

                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={2} htmlFor="firstname">First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" max={3} name="firstname" placeholder="First Name"
                                        className="form-control"
                                        id="firstname"
                                        validators={{
                                            required: required,
                                            maxLength: maxLength(15),
                                            minLength: minLength(3)
                                        }} />
                                    <Errors className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: "This field is required",
                                            maxLength: "lastname should be or less than 15 characters",
                                            minLength: "firstname should be or greater than 3 characters"
                                        }}
                                    ></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="lastname">First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" name="lastname" placeholder="Last Name"
                                        className="form-control"
                                        id="lastname"
                                        validators={{
                                            required: required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: "This field is required",
                                            minLenght: "firstname should be or greater than 3 characters",
                                            maxLength: "lastname should be or less than 15 characters"
                                        }}
                                    ></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="telnum">Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" name="telnum" placeholder="Tel."
                                        className="form-control"
                                        id="telnum"
                                        validators={{
                                            isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            isNumber: "Please enter valid number"
                                        }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="email">Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" name="email" placeholder="Email"
                                        className="form-control"
                                        id="email"
                                        validators={{
                                            required,
                                            validEmail
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            validEmail: "Please enter valid email address"
                                        }}
                                    ></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" placeholder="Last Name"
                                                className="form-check-input" />
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType"
                                        className="form-control" name="contactType">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="message">Message</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" rows="12" name="message"
                                        className="form-control"
                                        id="message" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                </div>
            </div>
        );
    }

}

export default Contact; 