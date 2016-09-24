from itertools import (groupby)

class Solver:
    dow_consts = []
    section_consts = []
    conditions = []
    sections = []

    def __init__(self, sections=[]):
        self.sections = sections
        self

    def solve(self):
        1

    def transform(self, sections):
        def transform_meeting_time(meeting_time):
            days = meeting_time['days']
            start_time = meeting_time['start_time']
            end_time = meeting_time['end_time']
            for day in days:
                result = {
                        'day': day,
                        'start_time': start_time,
                        'end_time': end_time
                        }
                yield result

        def transform_sections(sections):
            for section in sections:
                name = section['name']
                mt = section['meeting_times']
                mt = [transform_meeting_time(x) for x in mt]
                mt = [y for x in mt for y in x]
                yield {'name': name, 'meeting_times': mt}

        def key(x):
            return (x['course_id'], x['schedule_type'])

        for x in groupby(sections, key):
            (course_id, schedule_type), sections = x
            sections = list(transform_sections(sections))
            yield {'course_id': course_id,
                   'schedule_type': schedule_type,
                   'sections': sections}
