import { all } from 'redux-saga/effects';
import taskSaga from './mbTask/saga';

export default function* rootSaga() {
    yield all([

        //public
        taskSaga()

    ])
}