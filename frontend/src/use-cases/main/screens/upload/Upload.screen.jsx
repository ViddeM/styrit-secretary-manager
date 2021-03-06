import React from "react";
import UploadCard from "./views/uploadcard";
import {InputGroup, Space, UploadContainer} from "./Upload.styles.screen";
import {DigitButton, DigitText} from "@cthit/react-digit-components";

export const Upload = props => (
    <UploadContainer>
        <InputGroup>
            <DigitText.Text bold={false}
                            text={formatGroupName(props.group)}
                            style={{fontSize: "28px"}}/>
            <Space/>
            {props.tasks.map(task => (
                <UploadCard
                    props={{
                        taskName: task.displayName,
                        onUpload: file => props.onUpload(file, task.codeName),
                        onInvalidFiletype: props.onInvalidFiletype
                    }}
                    key={task.codeName}
                />
            ))}
            {props.error && (
                <DigitText.Text text={props.error} color="error" bold/>
            )}
            <DigitButton
                text="Skicka in"
                raised
                primary
                disabled={props.noSubmit}
                onClick={() =>
                    props.submitFiles(
                        props.reports,
                        props.code,
                        props.group.codeName
                    )
                }
            />
        </InputGroup>
    </UploadContainer>
);

function formatGroupName(group) {
    let groupText = "";
    if (group.year !== "active") {
        groupText = " " + group.year;
    }
    return "Hej " + group.displayName + groupText + "!"
}


export default Upload;
