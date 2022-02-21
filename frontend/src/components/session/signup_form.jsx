import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            password2: '',
            errors: {},

        };
        
            this.handleSubmit = this.handleSubmit.bind(this);
            this.clearedErrors = false;
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            password2: this.state.password2,

        };

        this.props.signup(user)
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

    render(){
        return (
            <div className='form-container'>
                <h1 className='form-title'>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className='input'>
                            <p className='input-prompt'>Email</p>
                            <input className='input-field' type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Please enter your email."
                            />
                            <p className='errors'>{this.state.errors.email}</p>
                        </div>
                        <div className='input'>
                            <p className='input-prompt'>Name</p>
                            <div>
                                <div>

                                    <input className='input-field' type="text"
                                        value={this.state.firstname}
                                        onChange={this.update('firstname')}
                                        placeholder="First name"
                                    />
                                    <p className='errors'>{this.state.errors.firstname}</p>
                                </div>
                                <div>

                                    <input className='input-field' type="text"
                                        value={this.state.lastname}
                                        onChange={this.update('lastname')}
                                        placeholder="Last name"
                                    />
                                    <p className='errors'>{this.state.errors.lastname}</p>
                                </div>
                            </div>
                        </div>

                        <div className='input'>
                            <p className='input-prompt'>Password</p>
                            <input  className='input-field' type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Create a password."
                            />
                            <p className='errors'>{this.state.errors.password}</p>
                        </div>

                        <div className='input'>
                            <p className='input-prompt'>Confirm Password</p>
                            <input className='input-field' type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Enter your password again."
                            />
                            <p className='errors'>{this.state.errors.password2}</p>
                        </div>

                        <div className='registration'>
                            <button className='registration-button' id="signup-button" >Sign Up</button>
                            <div className='registration-alternative'>Already have an account? <Link style={{color: "white"}} to="/">Login!</Link></div>
                        </div>
                    </div>

                </form>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch(signup(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignupForm));