import itertools
from .group import Group


class Schedule:

    def buildGroup(course_id, schedule_type, sections):
        return Group(course_id, schedule_type, sections)

    def key(section):
        return (section['course_id'],
                section['schedule_type'])

    def groupByScheduleType(sections):
        sections = sorted(sections, key=Schedule.key)
        sections = itertools.groupby(sections, key=Schedule.key)
        result = [Schedule.buildGroup(*k, v) for k, v in sections]
        return result
