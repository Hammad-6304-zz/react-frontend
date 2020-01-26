import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DISHES from '../Shared/dishes'
import Dishes from '../redux/dishes'
import Leaders from '../redux/leaders'
import LEADERS from '../Shared/leaders'
import PROMOTIONS from '../Shared/promotions'
import Promotions from '../redux/promotions'
import COMMENTS from '../Shared/comments'
import { connect } from 'react-redux';
import { fetchDishes, fetchPromos, fetchComments, fetchLeaders } from '../redux/actionCreaters';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset("feedback")),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders())
})
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchComments();
        this.props.fetchLeaders();
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={DISHES.filter((dish) => dish.featured)[0]}
                    dishesIsLoading={Dishes.isLoading}
                    dishesErrMess={Dishes.errMess}
                    promosIsLoading={Promotions.isLoading}
                    promosErrMess={Promotions.errMess}
                    promotion={PROMOTIONS.filter((promo) => promo.featured)[0]}
                    leader={LEADERS.filter((leader) => leader.featured)[0]}
                    leadersIsLoading={Leaders.loading}
                    leadersErrMess={Leaders.errMess}

                />
            );
        }
        const DishWithId = ({ match }) => {
            console.log(match.params)
            return <DishDetail dish={DISHES.filter((dish) => dish.id === parseInt(match.params.dishId))[0]}
                comments={COMMENTS.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
                isLoading={Dishes.isLoading}
                errMess={Dishes.errMess} />
        }
        return (
            <React.Fragment>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess} />} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.loading} errMess={this.props.leaders.errMess} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </React.Fragment>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));