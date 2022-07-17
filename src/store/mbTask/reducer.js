import * as types from './actionTypes';



const initialState = {
    collegeData: [],
    totalData: [],
    actionType: '',
    actionData: '',
    length: '',
    searchKey: ''
}

const taskReducer = (state = initialState, action) => {
    let undefinedData;
    switch (action.type) {

        case types.GET_COLLEGE_DATA_RESPONSE:
            state = {
                ...state,
                collegeData: action?.payload?.data,
                totalData: action?.payload?.totalData
            }
            break;
        case types.ADD_BUTTON:
            state = {
                ...state,
                actionType: action?.payload?.actionType,
                actionData: action?.payload?.actionData
            }
            break;
        case types.ADD_OR_UPDATE_STUDENT_DETAILS_RESPONSE:
            state = {
                ...state,
                totalData: action?.payload,
                actionType: "unselect",
                actionData: undefinedData
            }
            break;
        case types.DELETE_STUDENT_DETAILA_RESPONSE:
            state = {
                ...state,
                totalData: action?.payload,
                actionType: 'unselect',
                actionData: undefinedData,
                length: action?.payload?.length
            }
            break;
        case types.SEARCH_KEY:
            console.log("SEARCH_KEY", action?.payload);
            state = {
                ...state,
                searchKey: action?.payload
            }
            break;
        default:
            state = {
                ...state
            };
            break;
    }
    return state;
}

export default taskReducer;