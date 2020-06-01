import { connectRouter } from 'connected-react-router'
import CheckingReducer from './CheckingReducer';


export default (history) => ({
  router: connectRouter(history),
  CheckingReducer:CheckingReducer
});
