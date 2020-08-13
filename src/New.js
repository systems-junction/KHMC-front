/* eslint-disable react/jsx-indent */
import React from 'react'
import Button from '@material-ui/core/Button';

class New extends React.Component {

    routeChange = () => {
        const path = `details/login`;
        this.props.history.push(path);
    }
    
    render(){
        return (

            <Button 
                color="primary"
                onClick={this.routeChange}
            >
                Login
            </Button>
        )
    }
}

export default New