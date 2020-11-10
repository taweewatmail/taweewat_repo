import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    margin: 15px 15px 15px 5px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class UpdateJoke extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/jokes/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteJoke extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                'Do tou want to delete the joke permanently?',
            )
        ) {
            api.deleteJokeById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
class JokesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jokes: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllJokes().then(jokes => {
            this.setState({
                jokes: jokes.data.data,
                isLoading: false,
            })
        })
    }
    handleLikeJoke = async () => {
        const { id, type, setup, punchline } = this.state
        const payload = { type, setup, punchline }

        await api.updateJokeById(id, payload).then(res => {
            window.alert(`Joke liked successfully`)
            this.setState({
                type: '',
                setup: '',
                punchline: '',
            })
        })
        window.location.href = `/jokes/list`
    }
    render() {
        const { jokes, isLoading } = this.state
        console.log('TCL: JokesList -> render -> jokes', jokes) 
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Type',
                accessor: 'type',
                filterable: true,
            },
            {
                Header: 'Setup',
                accessor: 'setup',
                filterable: true,
            },
            {
                Header: 'Punchline',
                accessor: 'punchline',
                filterable: true,
            },
            {
                Header: 'Like',
                accessor: 'like',
                filterable: true,
            },
            {
                Header: 'Dislike',
                accessor: 'dislike',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteJoke id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateJoke id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!jokes.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={jokes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}
JokesList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(JokesList);