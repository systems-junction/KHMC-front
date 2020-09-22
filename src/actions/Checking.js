import {

    CONST_FOR_REDUCER_FUNCTION,
    CONST_FOR_SAGA_FUNCTION,
    CONST_FOR_SET_PATIENT_DETAILS
} from '../constants/ActionTypes';

export const funForSaga = (data) => {
    // console.log("in saga function")

    return {
        payload: data,
        type: CONST_FOR_SAGA_FUNCTION
    };
};

export const funForReducer = (data) => {
    // console.log("in reducer function")

    return {
        type: CONST_FOR_REDUCER_FUNCTION,
        payload: data
    };
};



export const setPatientDetailsForReducer = (data) => {
    console.log("in function for reducer", data)
    return {
        payload: data,
        type: CONST_FOR_SET_PATIENT_DETAILS
    };
};