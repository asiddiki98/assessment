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
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <p>Email</p>
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Please enter your email."
                            />
                            <p>{this.state.errors.email}</p>
                        </div>
                        <div>
                            <p>Name</p>
                            <div>
                                <div>

                                    <input type="text"
                                        value={this.state.firstname}
                                        onChange={this.update('firstname')}
                                        placeholder="First name"
                                    />
                                    <p>{this.state.errors.firstname}</p>
                                </div>
                                <div>

                                    <input type="text"
                                        value={this.state.lastname}
                                        onChange={this.update('lastname')}
                                        placeholder="Last name"
                                    />
                                    <p>{this.state.errors.lastname}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p>Password</p>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Create a password."
                            />
                            <p>{this.state.errors.password}</p>
                        </div>

                        <div>
                            <p className="form-prompt">Confirm Password</p>
                            <input type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Enter your password again."
                            />
                            <p>{this.state.errors.password2}</p>
                        </div>

                        <div >
                            <div>Already have an account? <Link to="/">Login!</Link></div>
                            <button id="signup-button" >Sign Up</button>
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