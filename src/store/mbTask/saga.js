import * as types from './actionTypes';
import * as actions from './actions';
import { all, fork, put, call, takeLeading, select } from "redux-saga/effects";
import axios from 'axios';

const mockData = [
    { id: 1, "name": "Rahul", "birthDate": "1993-09-06", "email": "rahul@gmail.com", "phone": "5678956790", "gender": "male", "college": "Middlesbrough College", "hobbies": ["gaming", "reading", "traveling", "drawing"], "streetName": "tnhb colony", "city": "tirupathi", "state": "andhra pradesh", "zip": "34596", otherHobbie: 'Cricket', other: true },
    { id: 2, "name": "Pallavi", "birthDate": "1997-09-18", "email": "spallavi@gmail.com", "phone": "5678956790", "gender": "female", "college": "Middlesex Community College", "hobbies": ["gaming", "reading"], "streetName": "ngo colony", "city": "banglore", "state": "karnataka", "zip": "87689", otherHobbie: '' },
    { id: 3, "name": "Virat", "birthDate": "1996-06-13", "email": "virat@gmail.com", "phone": "5678956790", "gender": "male", "college": "Middlesbrough College", "hobbies": ["gaming", "reading", "traveling"], "streetName": "br conoly", "city": "chennai", "state": "chennai", "zip": "98789", otherHobbie: 'Tennis', other: true },
    { id: 4, "name": "Mandana", "birthDate": "1995-06-18", "email": "smriti@gmail.com", "phone": "5678956790", "gender": "female", "college": "Middlesex Community College", "hobbies": ["gaming", "reading"], "streetName": "sn puram", "city": "hyderabad", "state": "telangana", "zip": "23431", otherHobbie: '' },
    { id: 5, "name": "Rohit", "birthDate": "1993-09-19", "email": "rohit@gmail.com", "phone": "5678956790", "gender": "male", "college": "Middle East University", "hobbies": ["reading"], "streetName": "sj nagar", "city": "tirupati", "state": "andhra pradesh", "zip": "98767", otherHobbie: '' },
    { id: 6, "name": "Samson", "birthDate": "2000-07-17", "email": "samson@gmail.com", "phone": "5678956790", "gender": "male", "college": "American University of Middle East", "hobbies": ["gaming", "reading", "traveling"], "streetName": "Brn colony", "city": "banglore", "state": "karnataka", "zip": "56789", otherHobbie: 'Biking', other: true },
]

function* getCollegeData(action) {
    console.log("getCollegeData_Start=>", action);
    let collegesData;
    try {
        const apiFetch = async () => { return await axios.get("http://universities.hipolabs.com/search?name=middle") };
        const response = yield call(apiFetch);
        console.log("getCollegeData_Response", response);

        if (response && response?.status === 200) {
            collegesData = response?.data
        }
    } catch (err) {
        const error = err;
        console.log("getCollegeData_ERROR=>", error);
    }
    console.log("getCollegeData_END", collegesData);
    yield put(actions.getCollegeDataResponse(collegesData, mockData));
};

function* addOrUpdateStudentDetails(action) {
    console.log("addOrUpdateStudentDetails_Start=>", action);
    const dataObject = action?.payload?.reqObj;
    let totalData = (yield select())["taskReducer"]?.totalData;
    if (action?.payload?.actionType === 'add') {
        try {
            totalData?.unshift(dataObject)
        } catch (error) {
            console.log("Error", error);
        }
        console.log("addOrUpdateStudentDetails_END", totalData);
        yield put(actions.addOrUpdateStudentDetailsResponse(totalData))
    }
    if (action?.payload?.actionType === 'edit') {
        try {
            const index = totalData?.findIndex((item) => item?.id === dataObject?.id);
            console.log("adsffdafsv", index, totalData, dataObject);
            if (index !== -1) {
                totalData?.splice(index, 1, dataObject);
            }
        } catch (error) {
            console.log("Error", error);
        }
        console.log("addOrUpdateStudentDetails_END", totalData);
        yield put(actions.addOrUpdateStudentDetailsResponse(totalData))
    }
}
function* deleteStudentDetails(action) {
    console.log("deleteStudentDetailss_Start=>", action);
    const id = action?.payload?.id;
    let totalData = (yield select())["taskReducer"]?.totalData;
    try {
        const index = totalData?.findIndex((item) => item?.id === id);
        console.log("adsffdafsv", index);
        if (index !== -1) {
            totalData?.splice(index, 1);
        }
    } catch (error) {
        console.log("Error", error);
    }
    console.log("deleteStudentDetails_END", totalData);
    yield put(actions.deleteStudentDetailsResponse(totalData))
}

export function* taskWatcher() {
    yield takeLeading(types.GET_COLLEGE_DATA_REQUEST, getCollegeData);
    yield takeLeading(types.ADD_OR_UPDATE_STUDENT_DETAILS_REQUEST, addOrUpdateStudentDetails);
    yield takeLeading(types.DELETE_STUDENT_DETAILA_REQUEST, deleteStudentDetails)
}

function* taskSaga() {
    yield all([fork(taskWatcher)]);
}
export default taskSaga;