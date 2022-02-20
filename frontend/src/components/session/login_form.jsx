import { withRouter, Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';



class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

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


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div>
                        <p className="form-prompt">Email</p>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <p>{this.state.errors.email}</p>
                    </div>

                    <div >
                        <p >Password</p>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <p >{this.state.errors.password}</p>
                    </div>

                    <div>
                        <div>Need an account? <Link to="/signup">Sign Up!</Link></div>
                            <button>login</button>
                    </div>

                </form>

                {/* <Chat /> */}
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginForm));
