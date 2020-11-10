import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class JokesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '',
            setup: '',
            punchline: '',
            like: '',
            dislike: '',
        }
    }

    handleChangeInputType = async event => {
        const type = event.target.value
        this.setState({ type })
    }

    handleChangeInputSetup = async event => {
        const setup = event.target.value
        this.setState({ setup })
    }

    handleChangeInputPunchline = async event => {
        const punchline = event.target.value
        this.setState({ punchline })
    }
    handleChangeInputLike = async event => {
        const like = event.target.value
        this.setState({ like })
    }
    handleChangeInputDislike = async event => {
        const dislike = event.target.value
        this.setState({ dislike })
    }

    handleIncludeJoke = async () => {
        const { type, setup, punchline, like, dislike } = this.state
        const payload = { type, setup, punchline, like, dislike }
        await api.insertJoke(payload).then(_res => {
            window.alert('Joke inserted successfully')
            this.setState({
                type: '',
                setup: '',
                punchline: '',
                like: '',
                dislike: '',
            })
        })
    }

    render() {
        const { type, setup, punchline, like, dislike } = this.state
        return (
            <Wrapper>
                <Title>Create Joke</Title>

                <Label>Type: </Label>
                <InputText
                    type="text"
                    value={type}
                    onChange={this.handleChangeInputType}
                />

                <Label>Setup: </Label>
                <InputText
                    type="text"
                    value={setup}
                    onChange={this.handleChangeInputSetup}
                />

                <Label>Punchline: </Label>
                <InputText
                    type="text"
                    value={punchline}
                    onChange={this.handleChangeInputPunchline}
                />

                <Label>Like: </Label>
                <InputText
                    type="text"
                    value={like}
                    onChange={this.handleChangeInputLike}
                />

                <Label>Dislike: </Label>
                <InputText
                    type="text"
                    value={dislike}
                    onChange={this.handleChangeInputDislike}
                />

                <Button onClick={this.handleIncludeJoke}>Add Joke</Button>
                <CancelButton href={'/jokes/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}
JokesInsert.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(JokesInsert);