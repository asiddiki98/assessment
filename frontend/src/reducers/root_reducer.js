import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import notes from './notes_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    notes,
});

export default RootReducer;