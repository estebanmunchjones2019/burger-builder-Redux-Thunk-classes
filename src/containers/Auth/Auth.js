import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-auth';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends React.Component {
    state = {
        authForm: {
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
                validationError: 'Please, name can not be letf empty'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '', 
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                validationError: 'Password must be at least 6 characters long'
            }
        },
        
        formIsValid: false ,

        isLogin: true

    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath(); // if the user was building a page and the redirect
            //was planned to /checkout, then the authRedirectPath is set to /
            //to avoid landing in checkout without ingredients
            //this extra check happens when start building a burger, then go to /auth, don't login
            //and go back to /. At that point, authRedirectPath = /checkout,
            //and if I now go back auth, this check sees that I'm not building the burger,
            //but the path is different to /.
        }
    }

    inputChangedHandler = (event, inputIdentifier)  => {
        const updatedFormElement = updateObject(this.state.authForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.authForm[inputIdentifier].validation),
            touched: true
        })
        
        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputIdentifier]:  updatedFormElement
        })
        let formIsValid = true;
        for (let inputElementIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputElementIdentifier].valid && formIsValid;
        }

        this.setState({authForm: updatedAuthForm, formIsValid: formIsValid});
    }

    authHandler = (event) => {
        event.preventDefault();
        const email = this.state.authForm.email.value;
        const password = this.state.authForm.password.value;
        const isLogin = this.state.isLogin
        this.props.onAuth(email, password, isLogin, this.props.history);
    }

   switchAuthMethodHandler = () => {
        this.setState((prevState) => {
            this.setState({isLogin: !prevState.isLogin});
        })
    }



    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let formElements = formElementsArray.map(element => {
            return (
                <Input 
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangedHandler(event, element.id)}
                blured={(event) =>  this.inputChangedHandler(event, element.id)}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                validationError={element.config.validationError}/>
            )
        })
        
        if (this.props.loading) {
            formElements = <Spinner/>;
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.AuthData}>
                {authRedirect}
                {this.props.error? <p>{this.props.error}</p> : null}
                <h3>{this.state.isLogin? 'LOGIN' : 'SIGNUP'}</h3>
                <form onSubmit={this.authHandler}>
                    {formElements}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthMethodHandler}>SWITCH TO {this.state.isLogin? 'SIGN UP' : 'LOGIN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        onAuth: (email, password, isLogin, history) => dispatch(actions.auth(email,password, isLogin, history)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios, true));