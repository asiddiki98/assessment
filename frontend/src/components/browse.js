import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';


function Browse(props){
    
    
    const logoutUser = (e) => {
        e.preventDefault();
        props.logout();
    }

    return (

        <>
        <div>hello</div>
            <button  onClick={logoutUser}>logout</button>
        </>
        
    )
}


const mapStateToProps = state => {

    return {
        user: state.session.user,
        loggedIn: state.session.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
