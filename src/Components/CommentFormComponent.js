import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {connect} from 'react-redux';
import {postComment} from '../redux/actionCreaters'

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;
class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.submitHandle= this.submitHandle.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    submitHandle(values){
        this.props.dispatch(postComment(this.props.dishId,values.name,values.rating,values.comment));
        this.toggleModal();
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <LocalForm onSubmit={this.submitHandle}>
                                            <Row className="form-group">
                                                <Label htmlFor="rating">Rating</Label>
                                                <Control.select id="rating" model=".rating" name="rating"
                                                    className="form-control">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Control.select>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="name">Your Name</Label>
                                                <Control.text model=".name" id="name" name="name"
                                                    className="form-control"
                                                    validators={{
                                                        minLength:minLength(3),
                                                        maxLength:maxLength(15)
                                                    }} />
                                                <Errors model=".name" show="touched"
                                                className="text-danger"
                                                messages={{
                                                    minLength:"The name should be greater than 3 characters",
                                                    maxLength:"The name should be less than 15 characters"
                                                }}></Errors>
                                            </Row>
                                            <Row className="form-group">
                                                <Label htmlFor="comment">Comment</Label>
                                                <Control.textarea model=".comment" id="comment" name="comment"
                                                    rows="6"
                                                    className="form-control" />
                                            </Row>
                                            <Row>
                                                <Button type="submit" color="primary">Submit</Button>
                                            </Row>
                                        </LocalForm>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                <Button outline color="dark" onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span>
                    <span>Submit Comment</span>
                </Button>
            </React.Fragment>
        )
    }
}
export default connect()(CommentForm);