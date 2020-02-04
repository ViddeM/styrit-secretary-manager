import React from "react";
import { connect } from "react-redux";
import { onUpload, onSubmitFiles } from "./Upload.action-creator.screen";

import Upload from "./Upload.screen";
import { DigitDialogActions, DigitButton } from "@cthit/react-digit-components";

function invalidFiletypeDialogData(type) {
    return {
        title: "Invalid filetype " + type,
        description: "Only pdf files are allowed",
        renderButtons: confirm => (
            <DigitButton text="Ok" onClick={confirm} primary raised />
        )
    };
}

const dispatchDialog = (dialogData, dispatch) =>
    dispatch(DigitDialogActions.digitDialogCustomOpen(dialogData));

const mapStateToProps = state => ({
    group: state.root.CodeReducer.data.group,
    tasks: state.root.CodeReducer.data.tasks,
    error: state.root.UploadReducer.error,
    noSubmit: state.root.UploadReducer.noSubmit,
    reports: state.root.UploadReducer.reports,
    code: state.root.CodeReducer.acceptedCode
});

const mapDispatchToProps = dispatch => ({
    onUpload: (file, task) => dispatch(onUpload(file, task)),
    onInvalidFiletype: type =>
        dispatchDialog(invalidFiletypeDialogData(type), dispatch),
    submitFiles: (reports, code, group) =>
        dispatch(onSubmitFiles(reports, code, group))
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
