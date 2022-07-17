import * as types from './actionTypes';

export const getCollegeDataRequest = () => {
    return {
        type: types.GET_COLLEGE_DATA_REQUEST
    }
}
export const getCollegeDataResponse = (data, totalData) => {
    return {
        type: types.GET_COLLEGE_DATA_RESPONSE,
        payload: { data, totalData }
    }
}
export const addButton = (actionType, actionData) => {
    return {
        type: types.ADD_BUTTON,
        payload: { actionType, actionData }
    }
}
export const addOrUpdateStudentDetailsRequest = (actionType, reqObj) => {
    return {
        type: types.ADD_OR_UPDATE_STUDENT_DETAILS_REQUEST,
        payload: { actionType, reqObj }
    }
}
export const addOrUpdateStudentDetailsResponse = (totalData) => {
    return {
        type: types.ADD_OR_UPDATE_STUDENT_DETAILS_RESPONSE,
        payload: totalData
    }
}

export const deleteStudentDetailsRequest = (id) => {
    return {
        type: types.DELETE_STUDENT_DETAILA_REQUEST,
        payload: { id }
    }
}
export const deleteStudentDetailsResponse = (totalData) => {
    return {
        type: types.DELETE_STUDENT_DETAILA_RESPONSE,
        payload: totalData
    }
}
export const searchKey = (searchKey) => {
    console.log("searchKey__",searchKey);
    return {
        type: types.SEARCH_KEY,
        payload: searchKey
    }
}