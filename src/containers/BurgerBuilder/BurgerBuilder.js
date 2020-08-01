import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    //exported to used isolated from store in tests

    state = {
        purchasing: false,
        // loading: false,
        // error: false
    }

    updatePurchasableState = (updatedIngredients) => {
        const ingredients = updatedIngredients;
        const sum = Object.keys(ingredients)// return ['salad', 'meat'...]
        .map((igKey) => {
            return ingredients[igKey];// return [2,1,3...]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0 ;
    }

   

   

    purchaseHandler = () => { // I could use one method togglePurchaseHandler and toggle the prevState
        if (!this.props.isAuth) {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');   
    }

    componentDidMount() {
        console.log('[BurgerBuilder.js] componentDidMount');
        this.props.initIngredients();
    }

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) { //it returns and object {salad: true, meat: false, ...}
            disabledInfo[key] = disabledInfo[key] <= 0; //if it has true, that ingredient should be disabled
        }
        
        let orderSummary = null;
        let burger = this.props.error ? 
            <p>Could not get ingredients from the server</p>    
            : <Spinner />;
        if ( this.props.ings) {
            orderSummary = <OrderSummary 
                purchaseCancelled={this.purchaseCancelHandler} 
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.price}>
            </OrderSummary>;
            burger = <React.Fragment>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchasableState(this.props.ings)}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuth}/>
        </React.Fragment>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (type) => dispatch(actions.addIngredient(type)),
        onIngredientRemoved: (type) => dispatch(actions.removeIngredient(type)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios, false)); //withErrorHandler return JSX 
//with the Modal (if there's an error) and BurgerBuilder at the same level
//the error managed in store is for stopping the spinner if there's an error.