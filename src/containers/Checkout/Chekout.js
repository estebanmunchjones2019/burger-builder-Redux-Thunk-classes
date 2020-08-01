import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
   
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/> //Redirected by default
        if (this.props.ings) { //got ingredients?
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null; 
            //did you press order button? go ahead? not? go to '/'
            summary = (
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ings}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                </React.Fragment>
            )
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);