import { ON_UPLOAD, ON_SUBMIT_FILES_FAILED } from "./Upload.actions.screen";
import { putFiles } from "../../../../api/put.Files.api";
import { handleError } from "../../../../common/functions/handleError";
import { DigitDialogActions } from "@cthit/react-digit-components";

export function onUpload(file, task) {
    return {
        type: ON_UPLOAD,
        payload: {
            file: file,
            task: task
        },
        error: false
    };
}

export function onSubmitFiles(reports, code, group) {
    return dispatch => {
        putFiles(reports, code, group)
            .then(response => {
                return dispatch(onAccept(response));
            })
            .catch(error => {
                return dispatch(onError(error));
            });
    };
}

function onAccept(response) {
    console.log("RESPONSE::", response);

    let overwrite = false;
    if (response.data) {
        overwrite = response.data.overwrite;
    }

    let msg = "";
    if (overwrite) {
        msg = "\nSkrev över tidigare uppladdad fil.";
    }

    let dialogData = {
        title: "Fil(er) upladdade!",
        description:
            "Om du vill byta ut en fil är det bara att skriva in koden igen och ladda upp en ny fil." +
            msg,
        confirmButtonText: "Ok",
        cancelButtonText: ""
    };

    return DigitDialogActions.digitDialogOpen(dialogData);
}

function onError(error) {
    return handleError(error, ON_SUBMIT_FILES_FAILED);
}
