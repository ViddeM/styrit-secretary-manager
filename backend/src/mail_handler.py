import requests
from pony import orm
from pony.orm import db_session

import private_keys
from db import GroupMeeting, GroupMeetingTask, Config


@db_session
def get_groups_for_meeting(meeting):
    """
    Returns all the GroupMeetings for the meeting
    """
    groups = list(GroupMeeting.select(lambda group_meeting: group_meeting.meeting == meeting))
    return groups


@db_session
def get_mail_from_code(code, group, meeting):
    """
    Returns the mail to be sent to a group given it's code, group and meeting
    """
    tasks = ""
    task_list = list(orm.select(group_meeting_task.task
                                for group_meeting_task in GroupMeetingTask
                                if group_meeting_task.group.code == code))
    for task in task_list:
        tasks += " - " + task.display_name + "\n"

    last_turnin_time = meeting.last_upload.strftime("%H:%M")
    last_turnin_date = meeting.last_upload.strftime("%d/%m")

    mail_to = group.name + Config["group_email_domain"].value
    subject = "Dokument till sektionsmöte"

    # Setup the message that will be sent to the different groups
    msg = Config["mail_to_groups_message"].value
    msg = msg.format(group.display_name, meeting.date.day, meeting.date.month, last_turnin_time, last_turnin_date,
                     tasks, Config["frontend_url"].value, code, Config["document_template_url"].value,
                     Config["secretary_email"].value, Config["board_display_name"].value, Config["board_email"].value)
    return mail_to, subject, msg


@db_session
def send_mails(meeting):
    groups = get_groups_for_meeting(meeting)

    for group_meeting in groups:
        url = Config["gotify_url"].value
        header = {"Authorization": private_keys.gotify_auth_key, "Accept": "*/*"}
        mail_to, subject, msg = get_mail_from_code(group_meeting.code, group_meeting.group, meeting)
        data = {"to": mail_to,
                "from": Config["from_email_address"],
                "subject": subject,
                "body": msg}
        r = None
        try:
            r = requests.post(url=url, json=data, headers=header)
            print(r.reason)
        except Exception as e:
            print("Encontered an error while contacting gotify: " + str(e))
