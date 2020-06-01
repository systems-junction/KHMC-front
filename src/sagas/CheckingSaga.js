import { all, fork, put, takeLatest, select } from "redux-saga/effects";
import {
    CONST_FOR_SAGA_FUNCTION
} from "../constants/ActionTypes";

import { funForReducer } from "../actions/Checking";

function* fetchAllUsers({ payload }) {

    yield put(funForReducer(1));
}




export function* requestAllUsers() {
    yield takeLatest(CONST_FOR_SAGA_FUNCTION, fetchAllUsers)
}


export default function* CheckingSaga() {
    yield all([
        fork(requestAllUsers),
    ]);
}
