import {
    SUBMIT_CODE_FAILED,
    SUBMIT_CODE_SUCCESSFUL
} from "./Code.actions.screen";
import {ON_FILEUPLOAD_FINISHED} from "../upload/Upload.actions.screen";
import {NOT_AUTHORIZED} from "../../../admin/Admin.actions";

const initialState = {
    acceptedCode: null,
    error: null,
};

export const CodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_CODE_SUCCESSFUL:
            return Object.assign({}, state, {
                error: null,
                acceptedCode: action.payload.code,
                data: action.payload.data
            });
        case SUBMIT_CODE_FAILED:
            return Object.assign({}, state, {
                error: action.payload.message
            });
        case NOT_AUTHORIZED:
            return Object.assign({}, state, {
                error: "To access the admin page you must belong to a currently active styrIT group"
            })
        case ON_FILEUPLOAD_FINISHED:
            return initialState;
        default:
            return state;
    }
};
