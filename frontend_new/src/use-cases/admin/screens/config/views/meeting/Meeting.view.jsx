import React from "react";
import {
    DigitSelect,
    DigitButton,
    DigitCheckbox
} from "@cthit/react-digit-components";
import {
    MeetingContainer,
    MeetingSelectContainer,
    NewButtonContainer,
    MeetingConfContainer
} from "./Meeting.styles.view";
import GeneralMeeting from "./views/general-meeting/";
import MeetingTable from "./views/meeting-table";
import { Button } from "@material-ui/core";

export const Meeting = props => {
    console.log("MEETINGS: ", props.meetings);
    return (
        <MeetingContainer>
            <MeetingSelectContainer>
                <DigitSelect
                    upperLabel={"Meeting"}
                    outlined
                    valueToTextMap={getMeetingsMap(props.meetings)}
                    onChange={e => {
                        props.onMeetingSelected(e.target.value);
                    }}
                    value={props.selectedMeetingID}
                    disabled={!props.meetings || Object.keys(props.meetings).length === 0}
                />
                <NewButtonContainer>
                    {/* text="New Meeting" raised primary /> */}
                    <Button variant="contained" color="primary" onClick={props.onNewMeeting}>
                        New Meeting
                    </Button>
                </NewButtonContainer>
            </MeetingSelectContainer>
            {props.selectedMeeting && (
                <MeetingConfContainer>
                    <GeneralMeeting />
                    <MeetingTable />
                </MeetingConfContainer>
            )}
        </MeetingContainer>
    );
};

export default Meeting;

function getMeetingsMap(meetings) {
    let meetingsMap = {};
    Object.keys(meetings).forEach(key => {
        meetingsMap[key] = getName(meetings[key]);
    });
    return meetingsMap;
}

function getName(meeting) {
    let date = new Date(meeting.date);
    return date.getFullYear() + "_LP" + meeting.lp + "_" + meeting.meeting_no;
}
