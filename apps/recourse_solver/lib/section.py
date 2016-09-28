import z3
from .meeting_time import MeetingTime


class Section:
    def __init__(
            self,
            course_id=None,
            meeting_times=None,
            name=None,
            schedule_type=None,
            id=None,
            choice_const=None,
            **rest
            ):
        self.course_id = course_id
        self.name = name
        self.schedule_type = schedule_type
        self.id = id

        def gen_mt(x):
            return MeetingTime(
                    choice_const=choice_const,
                    **rest,
                    **x)

        self.meeting_times = [gen_mt(x) for x in meeting_times]
