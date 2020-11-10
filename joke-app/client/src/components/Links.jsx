import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Thai Joke API
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/jokes/list" className="nav-link">
                                List Joke
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/jokes/create" className="nav-link">
                                Create Joke
                            </Link>
                        </Item>
                        <Item>
                            
                        </Item>
                    </List>
                    <Button
                        onClick={this.onLogoutClick}>
                        Logout
                    </Button>
                </Collapse>
            </React.Fragment>
        )
    }

}
Links.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Links);