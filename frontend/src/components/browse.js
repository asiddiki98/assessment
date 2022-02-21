import { connect } from 'react-redux';
import { logout, createNote, fetchNotes } from '../actions/session_actions';
import React from 'react';
const style = {
    table: {
        borderCollapse: 'collapse'
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
}


class  Browse extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            note: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getNotes(this.props.user.email)
    }


    logoutUser = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    handleChange(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        let note = {
            note: this.state.note,
            creator: this.props.user.email
        }
        this.props.addNote(note)
    }

    render(){
        const { firstname, lastname } = this.props.user;

        const userNotes=  this.props.notes && Object.values(this.props.notes).map((note, idx) => {
            return (
                <tr key={idx}>
                    <th>{note.note}</th>
                </tr>
            )
        })
        return (
    
            <>
                <h1>Hello {`${firstname} ${lastname}`}</h1> 
    
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.note}
                        onChange={this.handleChange('note')}
                    >
                    </input>
                    <button>Add Note</button>
                </form>
                <button  onClick={this.logoutUser}>logout</button>
                <table style={style.tableCell}>
                    <thead>
                        <tr>
                            <th style={style.tableCell}>Notes</th>
                        </tr>
                    </thead>
                    {userNotes}
                </table>

            </>
            
        )
    }
}


const mapStateToProps = state => {

    return {
        user: state.session.user,
        loggedIn: state.session.isAuthenticated,
        notes: state.notes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        addNote: (note) => dispatch(createNote(note)),
        getNotes: (id) => dispatch(fetchNotes(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
