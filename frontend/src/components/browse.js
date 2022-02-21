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
                <tr key={idx}>
                    <th style={style.tableCell}>{note.note}</th>
                </tr>
            )
        })
        return (
    
            <>
                <div style={{
                    display:"flex",
                    justifyContent: "space-between",
                    width: "100",

                }}>
                    <h1>Hello {`${firstname} ${lastname}`}</h1> 
                    <button  onClick={this.logoutUser}>logout</button>
                </div>
    
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        value={this.state.note}
                        onChange={this.handleChange('note')}
                    >
                    </textarea>
                    <button>Add Note</button>
                </form>

                <table style={style.tableCell}>
                    <thead>
                        <tr>
                            <th style={style.tableCell}>Notes</th>
                        </tr>
                    </thead>
                    <tbody>

                    {userNotes}

                    </tbody>
                </table>

            </>
            
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
