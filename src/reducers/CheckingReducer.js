import {
  CONST_FOR_REDUCER_FUNCTION,
  CONST_FOR_SET_PATIENT_DETAILS,
} from "../constants/ActionTypes";

const INIT_STATE = {
  count: 0,
  patientDetails: "",
};

const CheckingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONST_FOR_REDUCER_FUNCTION:
      // console.log("in reducer")
      return {
        ...state,
        count: state.count + action.payload,
      };

    case CONST_FOR_SET_PATIENT_DETAILS:
      console.log("in reducer", action.payload);
      return {
        ...state,
        patientDetails: action.payload,
      };

    default:
      return state;
  }
};
export default CheckingReducer;
