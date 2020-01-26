import React from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseUrls';
import {
    Card, CardImg, CardBody, CardText,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
function DishDetail(props) {
    if (props.isLoading) {
        return (
            <div className="conatiner">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="conatiner">
                <div className="row">
                    <div className="col-12 ">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card>
                                <CardImg width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} />
                                <CardBody>
                                    <CardTitle>{props.dish.name}</CardTitle>
                                    <CardText>{props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Comments</h2>
                        <Stagger in>
                            {props.comments.map((com) => {
                                return (
                                    <Fade in key={com.id}>
                                        <ul  className="list-unstyled">
                                            <li>{com.comment}</li>
                                            <li>-- {com.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(com.date)))}</li>
                                        </ul>
                                    </Fade>
                                )
                            })}
                            <CommentForm dishId={props.dish.id} />
                        </Stagger>
                    </div>
                </div>
            </div>
        );
    }
}
export default DishDetail;