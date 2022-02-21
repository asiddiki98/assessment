import { withRouter, Link } from 'react-router-dom';
import { GoogleLogin } from "react-google-login"
import React from 'react';
import { connect } from 'react-redux';
import { login, actionGoogleLogin } from '../../actions/session_actions';

const style = {
    formContainer: {

    }
}



class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.googleSuccess = this.googleSuccess.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/browse');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user)
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    async googleSuccess(res){
        
        this.props.googleLogin(res)
    }

    googleFailure(error){
        console.log(error)
        console.log("google sign in was failed")
    }


    render() {
        return (
            <div className='form-container'>
                <h1 className='form-title'>Sign In</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className='input'>
                        <p className="input-prompt">Email</p>
                        <input className='input-field' type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <p className='errors'>{this.state.errors.email}</p>
                    </div>

                    <div className='input'>
                        <p className='input-prompt' >Password</p>
                        <input className='input-field' type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <p className='errors' >{this.state.errors.password}</p>
                    </div>

                    <div className='registration'>
                        <button className='registration-button'>login</button>
                        <div className='registration-alternative'>Need an account? <Link style={{ color: "white" }} to="/signup">Sign Up!</Link></div>
                    </div >
                    <GoogleLogin
                        clientId="728506483786-lsrimoj61fi0hn0v3pq37pksvutvu8j3.apps.googleusercontent.com"
                        onSuccess={this.googleSuccess}
                        onFailure={this.googleFailure}
                        cookiePolicy="single_host_origin"
                        className='google-button'
                    >

                    </GoogleLogin>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(login(user)),
        googleLogin: user => dispatch(actionGoogleLogin(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginForm));
