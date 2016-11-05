import itertools
from z3 import And, Const, Solver, EnumSort


class MeetingTime:
    def __init__(self, date_start, date_end, start_time, days, end_time):
        self.date_end = date_end
        self.date_start = date_start
        self.days = days
        self.end_time = end_time
        self.start_time = start_time

    def __repr__(self):
        return "<MeetingTime " \
                "date_end={} " \
                "date_start={} " \
                "days={} " \
                "end_time={} " \
                "start_time={}>".format(
                        self.date_end,
                        self.date_start,
                        self.days,
                        self.end_time,
                        self.start_time)


class Section:
    def __init__(self, name, schedule_type, course_id, id, meeting_times):
        self.name = name
        self.schedule_type = schedule_type
        self.course_id = course_id
        self.id = id
        self.meeting_times = [MeetingTime(**meeting_time) for
                              meeting_time in meeting_times]


    def __repr__(self):
        return "<Section " \
                "name={} " \
                "schedule_type={} " \
                "course_id={} " \
                "id={} " \
                "meeting_times={}>".format(
                        self.name,
                        self.schedule_type,
                        self.course_id,
                        self.id, self.meeting_times)


class Group:
    def __init__(self, course_id, schedule_type, sections):
        self.course_id = course_id
        self.schedule_type = schedule_type
        self.sections = [Section(**section) for section in sections]

    def name(self):
        return "{}-{}".format(self.course_id, self.schedule_type)

    def section_ids(self):
        sections = self.sections
        return [str(s.id) for s in sections]

    def sort_name(self):
        return "{}{}Sort".format(
                self.course_id,
                self.schedule_type.capitalize())

    def replace_ids(self, enums):
        sections = []

        for section in self.sections:
            enum = next(enum for enum in enums if int(str(enum)) == section.id)
            section.id = enum
            sections.append(section)

        self.sections = sections

        return self

    def create_sort(self):
        name = self.sort_name()
        enums = self.section_ids()
        Sort, enums = EnumSort(name, enums)
        self.Sort = Sort
        self.enums = enums
        self = self.replace_ids(enums)
        return self

    def create_const(self):
        self = self.create_sort()
        name = self.name()
        sort = self.Sort
        self.const = Const(name, sort)
        return self

    def __repr__(self):
        return "<Group " \
                "course_id={} " \
                "schedule_type={} " \
                "sections={}>".format(
                        self.course_id,
                        self.schedule_type,
                        self.sections)


class Schedule:
    def Solver():
        solver = Solver()
        return solver

    def solve(sections):
        solver = Schedule.Solver()

        groups = Schedule.group_by_schedule_type(sections)

        for group in  groups:
            group = group.create_const()

        return groups

    def key(section):
        return (section['course_id'],
                section['schedule_type'])

    def group_by_schedule_type(sections):
        sections = sorted(sections, key=Schedule.key)
        grouped_sections = itertools.groupby(sections, key=Schedule.key)
        result = list()

        for (course_id, schedule_type), sections in grouped_sections:
            result.append(Group(course_id, schedule_type, list(sections)))

        return result
