import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component { //this component could be placed in the container folder
    //because manages state, besides wrapping other components
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <React.Fragment>
                    <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
