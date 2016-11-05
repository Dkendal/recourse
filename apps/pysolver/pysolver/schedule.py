import itertools
from .group import Group


class Schedule:

    def build_group(course_id, schedule_type, sections):
        return Group(course_id, schedule_type, sections)

    def key(section):
        return (section['course_id'],
                section['schedule_type'])

    def group_by_schedule_type(sections):
        sections = sorted(sections, key=Schedule.key)
        sections = itertools.groupby(sections, key=Schedule.key)
        result = [Schedule.build_group(*k, v) for k, v in sections]
        return result
