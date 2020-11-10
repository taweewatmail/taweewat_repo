import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { NavBar } from '../components'
import { JokesList, JokesInsert, JokesUpdate } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function home() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/jokes/list" exact component={JokesList} />
                <Route path="/jokes/create" exact component={JokesInsert} />
                <Route
                    path="/jokes/update/:id"
                    exact
                    component={JokesUpdate}
                />
            </Switch>
        </Router>
    )
}
home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(home);