import { combineReducers } from 'redux';
import SignUpReducer from '../components/signup/store/reducer';
import DelegateReducer from '../components/delegate/store/reducer';
import NewConfReducer from '../components/newconf/store/reducer';
import EnrollReducer from '../components/enroll/store/reducer';
import EnrollForReducer from '../components/enrollfor/store/reducer';

export default combineReducers({
  signup: SignUpReducer,
  delegate: DelegateReducer,
  newconf: NewConfReducer,
  enroll: EnrollReducer,
  enrollfor: EnrollForReducer,
});