import z3
from .pair import Pair

days = ['M', 'T', 'W', 'R', 'F']


class Group:

    def __init__(self, course_id, schedule_type, sections=list()):
        self.course_id = course_id
        self.schedule_type = schedule_type
        self.sections = sections
        result = self.build_section_id_const()
        self.SectionSort, self.section_id_enums = result

        self.section_id_const = z3.Const(
                self.section_id_name(),
                self.SectionSort)

        day_consts = [z3.Const(x, Pair) for x in self.day_names()]
        self.days = dict(zip(days, day_consts))

    def build_section_id_const(self):
        return z3.EnumSort(
            self.section_sort_name(),
            self.section_id_domain_values())

    def times_for(self, section):
        def f(meeting_time, day):
            start_time = meeting_time['start_time']
            end_time = meeting_time['end_time']
            day_const = self.days[day]
            pair = Pair.mk_pair(start_time, end_time)
            return day_const == pair

        times = [f(meeting_time, day)
                 for meeting_time in section['meeting_times']
                 for day in meeting_time['days']]

        return z3.And(times)

    def find_section(self, section_id):
        s = self.sections
        key = lambda x: str(x['id']) == str(section_id)
        return next(x for x in s if key(x))

    def section_range(self):
        def f(section_id):
            section_id_const = self.find_section(section_id)
            section = self.find_section(section_id)
            times = self.times_for(section)
            return z3.Implies(self.section_id_const == section_id, times)
        return [f(section_id) for section_id in self.section_id_enums]

    def section_id_domain_values(self):
        return [str(x['id']) for x in self.sections]

    def section_sort_name(self):
        return "{}SectionSort".format(self.name())

    def section_id_name(self):
        return "{}_section_id".format(self.name())

    def name(self):
        return "{}_{}".format(self.course_id, self.schedule_type)

    def day_names(self):
        name = self.name()
        return ["{}_{}".format(name, x) for x in days]
