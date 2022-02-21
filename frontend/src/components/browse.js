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
        width: 'max-content',
        minWidth: '150px'
    },

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
            .then(() => {
                this.setState({
                    note: ""
                })
            })
    }

    render(){
        const { firstname, lastname } = this.props.user;

        const userNotes=  this.props.notes && Object.values(this.props.notes).map((note, idx) => {
            return (
                <div className='note-card' key={idx}>
                    <p className='note'>{note.note}</p>
                </div>
            )
        })
        return (
    
            <div className='browse'>
                <div className='nav'>
                    <h1 className='user'>Hello {`${firstname} ${lastname}`}</h1> 
                    <button className='logout-bttn'  onClick={this.logoutUser}>logout</button>
                </div>
    
                <form className='note-form' onSubmit={this.handleSubmit}>
                    <textarea
                        className='note-input'
                        value={this.state.note}
                        onChange={this.handleChange('note')}
                    >
                    </textarea>
                    <button className='create-note-bttn'>Add Note</button>
                </form>
                    <h1 className='note-header' >Notes</h1>
                <div className='notes-container'>


                    {userNotes}
                </div>
            </div>
            
        )
    }
}


const mapStateToProps = state => {

    return {
        user: state.session.user,
        loggedIn: state.session.isAuthenticated,
        notes: state.notes,
        errors: state.errors
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
