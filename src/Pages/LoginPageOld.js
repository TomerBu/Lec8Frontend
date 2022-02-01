import React from 'react'
import Input from '../Components/Input'
import ButtonWithProgress from '../Components/ButtonWithProgress'
import { useNavigate } from 'react-router-dom'
//useState
export class LoginPageOld extends React.Component {
    //props
    state = {
        username: '',
        password: '',
        apiError: undefined,
        pendingApiCall: false
    }

    onClickLogin = () => {
        this.setState({ pendingApiCall: true })
        const body = {
            username: this.state.username,
            password: this.state.password
        }

        //axios expects {username: "TomerBu", password: "123456!Paar" }
        this.props.actions.postLogin(body)
            .then(response => {
                this.setState({ pendingApiCall: false })
                //navigate to "/"
                //store the user name and password -> for future requests
                //
            })
            .catch(e => {
                if (e.response) {
                    this.setState({
                        apiError: e.response.data.message,
                        pendingApiCall: false
                    })
                }
            })
    }

    onChangeUserName = (event) => {
        const value = event.target.value
        this.setState({
            username: value,
            apiError: undefined
        })
    }

    onChangePassword = (event) => {
        const value = event.target.value
        this.setState({
            password: value,
            apiError: undefined
        })
    }

    render() {
        
        //auto called when the state changed
        let disableSubmit = false
        if (this.state.username === '') {
            disableSubmit = true
        }
        if (this.state.password === '') {
            disableSubmit = true
        }
        return (
            <div className="container">
                <h1 className="text-center">Login</h1>

                <div className="col-12 mb-3">
                    <Input
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                        label='User Name'
                        placeholder='Your User Name'
                    />
                </div>

                <div className="col-12 mb-3">
                    <Input
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        label='Password'
                        placeholder='Your Password'
                        type='password'
                    />
                </div>

                <div className='text-center'>
                    {
                        this.state.apiError &&
                        (
                            <div className='col-12 mb-3'>
                                <div className='alert alert-danger'>
                                    {this.state.apiError}
                                </div>
                            </div>
                        )
                    }
                    <ButtonWithProgress
                        showProgress={this.state.pendingApiCall}
                        disabled={disableSubmit || this.state.pendingApiCall}
                        text="Login"
                        onClick={this.onClickLogin}
                    />
                </div>
            </div>
        )
    }
}

// when we show the component without passing an action -> we don't receive an error
LoginPageOld.defaultProps = {
    actions: {
        postLogin: () => new Promise((resolve, reject) => resolve({}))
    }
}

export default LoginPageOld

//export default usage: 
//import LoginPage from './Pages/LoginPage'


//export class usage:
//import {LoginPage} from './Pages/LoginPage'