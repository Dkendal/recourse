import z3
from .choice import Choice
from .klass import Klass
from itertools import groupby
from collections import defaultdict


class Solver:
    def __init__(self, sections):
        self.sections = list(sections)
        self.solver = z3.Solver()

        groups = groupby(
                sections,
                lambda x: (x['course_id'], x['schedule_type']))

        self.groups = [Choice(k, v) for k, v in groups]

    def post(self):
        self.solver.add(z3.And(*list(self.implications())))
        self.solver.add(z3.And(*list(self.all_seperate())))

    def do_solve(self):
        self.post()
        assert self.solver.check() == z3.sat
        model = self.solver.model()
        return model

    def solve(self):
        model = self.do_solve()
        for group in self.groups:
            val = {
                    'course_id': group.course_id,
                    'schedule_type': group.schedule_type,
                    'id': str(model[group.const]),
                    'ids': [str(x) for x in group.enums]
                    }
            yield val


    def implications(self):
        for klass in self.klasses():
            yield klass.constraint()

    def all_seperate(self):
        days = defaultdict(list)
        for klass in self.klasses():
            days[klass.day].append(klass)

        for day, klasses in days.items():
            yield Klass.all_seperate(klasses)

    def klasses(self):
        for choice in self.groups:
            for section in choice.sections:
                for meeting in section.meeting_times:
                    for klass in meeting.klasses:
                        yield klass
