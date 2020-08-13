import {
    CONST_FOR_REDUCER_FUNCTION
} from "../constants/ActionTypes";


const INIT_STATE = {
    count: 0,
};


const CheckingReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CONST_FOR_REDUCER_FUNCTION:
            // console.log("in reducer")
            return {
                ...state,
                count: state.count + action.payload
            }

        default:
            return state;
    }
}
export default CheckingReducer