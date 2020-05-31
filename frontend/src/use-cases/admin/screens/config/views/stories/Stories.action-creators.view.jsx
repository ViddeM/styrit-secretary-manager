import {
    ON_ADD_STORY_GROUP_YEAR,
    ON_SAVE_STORIES_ERROR,
    ON_SAVE_STORIES_SUCCESSFUL,
    ON_STORY_GROUP_DELETED,
    ON_STORY_GROUP_SELECTED,
    ON_STORY_YEAR_SELECTED,
    SEND_STORY_EMAILS_FAILED,
    SEND_STORY_EMAILS_SUCCESSFUL
} from "./Stories.actions.view";
import {WAITING_FOR_RESULT} from "../meeting/views/meeting-actions/MeetingActions.actions.view";
import {postStories} from "../../../../../../api/post.Stories.api";
import {handleError} from "../../../../../../common/functions/handleError";
import {putStoryEmails} from "../../../../../../api/put.StoryEmails.api";

export function selectedStoryGroup(group) {
    return {
        type: ON_STORY_GROUP_SELECTED,
        payload: {
            group: group
        },
        error: false
    }
}

export function selectedStoryYear(year) {
    return {
        type: ON_STORY_YEAR_SELECTED,
        payload: {
            year: year
        },
        error: false
    }
}

export function addStoryGroupYear() {
    return {
        type: ON_ADD_STORY_GROUP_YEAR,
        payload: {},
        error: false
    }
}

export function deleteStoryGroupYear(groupYear) {
    const group = groupYear.group.name;
    const year = groupYear.year;

    return {
        type: ON_STORY_GROUP_DELETED,
        payload: {
            group: group,
            year: year
        },
        error: false
    }
}

export function saveStories(storyGroups, password) {
    return dispatch => {
        dispatch({
            type: WAITING_FOR_RESULT
        })
        postStories(storyGroups, password)
            .then(response => {
                dispatch(onStoriesSavedSuccessful(response));
            })
            .catch(error => {
                dispatch(onStoriesSavedError(error));
            });
    };
}

export function sendStoryEmails(password) {
    return dispatch => {
        dispatch({
            type: WAITING_FOR_RESULT
        })
        putStoryEmails(password)
            .then(response => {
                dispatch(onSendStoryEmailsSuccessful(response))
            }).catch(error => {
            dispatch(onSendStoryEmailsFailed(error))
        })
    }
}

function onStoriesSavedSuccessful(response) {
    // Make sure our data is up to date with the server
    return {
        type: ON_SAVE_STORIES_SUCCESSFUL,
        payload: {
            groupYears: response.data.groupYears,
            years: response.data.years
        },
        error: false
    };
}

function onStoriesSavedError(error) {
    console.log(error.response)
    return handleError(error, ON_SAVE_STORIES_ERROR);
}

function onSendStoryEmailsSuccessful(response) {
    alert("Send story emails successful!");
    return {
        type: SEND_STORY_EMAILS_SUCCESSFUL,
        payload: {},
        error: false
    }
}

function onSendStoryEmailsFailed(error) {
    return handleError(error, SEND_STORY_EMAILS_FAILED)
}