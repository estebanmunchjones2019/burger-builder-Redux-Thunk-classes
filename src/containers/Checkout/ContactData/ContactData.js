import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm  :{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationError: 'Please, name can not be letf empty'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationError: 'Please, street can not be letf empty'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                value: '', 
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                validationError: 'ZipCode must be 5 characters long'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '', 
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationError: 'Please, country can not be letf empty'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '', 
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                validationError: 'Please, email can not be letf empty'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    type: 'text',
                    options: [
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',//the first value is the default of the select input
                valid: true, //added to loop through all elements to check formIsValid,
                //and not return undefined
                validation: {} //added for checkvalidity
            }
        },

        formIsValid: false

    }

    orderHandler = async (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onPurchase(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier)  => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
        let formIsValid = true;
        for (let inputElementIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElementIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:  updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                <h4>Enter your contact details</h4>
                {formElementsArray.map((element) => {
                    return <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        blured={(event) =>  this.inputChangedHandler(event, element.id)}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        validationError={element.config.validationError} />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchase: (orderData, token) => dispatch(actions.purchaseStart(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios, false)));