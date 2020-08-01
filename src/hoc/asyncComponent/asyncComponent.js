import React from 'react';

const asyncComponent = (importComponent) => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() { //anonymous class that waits until it gets the component
            //then loads it into the state, and renders the component passed to it, passing down props
            importComponent()
            .then(cmp => {
                this.setState({component: cmp.default})
            })
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;