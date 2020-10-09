import uuid
from typing import Dict, List

from HttpResponse import HttpResponse, get_with_error
from ResultWithData import ResultWithData, get_result_with_error
from command.MeetingCommands import create_new_meeting, update_meeting
from data_objects.GroupTaskData import GroupTaskData
from data_objects.MeetingJsonData import MeetingJsonData
from process.Validation import validate_meeting


def handle_meeting_config(data: Dict) -> HttpResponse:
    try:
        valid = validate_meeting(data)
    except Exception as e:
        print("Failed validating meeting {0}".format(e))
        return get_with_error(400, "Bad Request")

    if valid.is_error:
        return get_with_error(400, valid.message)

    update_meeting_data(valid.data)


def update_meeting_data(meeting_data: MeetingJsonData) -> ResultWithData[Dict]:
    if meeting_data.id is None:
        # The meeting does not yet exist, create it.
        create_meeting_res = create_new_meeting(date=meeting_data.date,
                                                last_upload=meeting_data.last_upload,
                                                lp=meeting_data.lp,
                                                meeting_no=meeting_data.meeting_no)
        if create_meeting_res.is_error:
            return get_result_with_error(create_meeting_res.message)

        meeting_data.id = create_meeting_res.data
    else:
        update_res = update_meeting(meeting_data)
        if update_res.is_error:
            return get_result_with_error(update_res.message)

    update_groups_tasks(meeting_data.groups_tasks)

    raise NotImplementedError(NotImplemented)


def update_groups_tasks(id: uuid, groups_tasks: List[GroupTaskData]) -> ResultWithData[Dict]:
    for group_task in groups_tasks:
        raise NotImplementedError(NotImplemented)
