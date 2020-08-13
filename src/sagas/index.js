import { all } from 'redux-saga/effects';
import CheckingSaga from './CheckingSaga';

export default function* rootSaga(getState) {
    yield all([
        CheckingSaga(),
    ]);
}
