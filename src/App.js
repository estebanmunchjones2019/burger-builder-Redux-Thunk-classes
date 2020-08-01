import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Chekout');
});

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})



class App extends Component {

  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
   
    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
