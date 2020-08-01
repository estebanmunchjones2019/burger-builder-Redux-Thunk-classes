import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    } // only want to update the modal if the show property changes, or the children do (to show the spinner basically). Otherwise,
    //it updates every time I add an ingredient to the burger
    //PureComponent runs checks for every prop or change on state, so it's more expensive

    render() {
        console.log('[Modal.js] render')
        return (
            <React.Fragment>
                <Backdrop 
                show={this.props.show} 
                clicked={this.props.modalClosed}
                //renders null when show: false
                />
                <div className={classes.Modal} 
                style={{ //the modal is always rendered (but translated out of the page and invisible
                    //when not in use)
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;