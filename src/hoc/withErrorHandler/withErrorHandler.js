import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios, isAuthPage) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}) //clean the error when requesting
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                if (isAuthPage) {
                    this.setState({error: error.response.data.error.errors[0]})
                } else {
                    this.setState({error: error}); //getting error in the response
                }
                return Promise.reject(error);
            });
        }
        

        errorConfirmedHandler = () => {
            this.setState({error: null}) //fired clicking the backdrop
        }

        componentWillUnmount() {
            console.log('componentWillUnmount', this.resInterceptor, this.reqInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);// destroy the interceptors upon unmounting
        }


        render() {
            return (
                <React.Fragment>
                    <Modal 
                    show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null} </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        } 
    }
}

export default withErrorHandler;