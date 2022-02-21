import {
    RECEIVE_USER_NOTES,
    RECEIVE_USER_NOTE
} from '../actions/session_actions';

const _notes = [];

const NotesReducer = (state = _notes, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER_NOTES:
            const notes = {};
            action.userNotes.notes.forEach( element => {notes[element._id] = element })
            return notes;
        case RECEIVE_USER_NOTE:
            debugger
            return Object.assign({}, state, {[action.userNote._id]: action.userNote});
        default:
            return state;
    }
};

export default NotesReducer;