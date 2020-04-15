import { handleError } from "../../../../common/functions/handleError";
import {
    SUBMIT_PASSWORD_FAILED,
    SUBMIT_PASSWORD_SUCCESSFUL
} from "./Password.actions.screen";
import { putPassword } from "../../../../api/put.Password.api";

export function submitPassword(password) {
    return dispatch => {
        putPassword(password)
            .then(response => {
                return dispatch(onAccept(response, password));
            })
            .catch(error => {
                return dispatch(onError(error));
            });
    };
}

function onAccept(response, password) {
    console.log("RESPONSE::", response);

    // Modify the data here.
    let data = response.data;
    let meetings = {};
    data.meetings.forEach(meeting => (meetings[meeting.id] = meeting));
    data.meetings = meetings;

    return {
        type: SUBMIT_PASSWORD_SUCCESSFUL,
        payload: {
            data: data,
            password: password
        },
        error: false
    };
}

function onError(error) {
    return handleError(error, SUBMIT_PASSWORD_FAILED);
}