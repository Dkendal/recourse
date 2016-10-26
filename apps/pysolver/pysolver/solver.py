import z3
from .choice import Choice
from .klass import Klass
from itertools import groupby
from collections import defaultdict


unsat = "unsat"


def encodeForElixir(group, model):
    val = {
        'course_id': group.course_id,
        'schedule_type': group.schedule_type,
        'id': str(model[group.const]),
        'ids': [int(str(x)) for x in group.enums],
    }
    return val


class Solver:

    def __init__(self, sections):
        self.sections = list(sections)
        self.solver = z3.Solver()
        self.groups = Solver.group(sections)

    def post(self):
        self.solver.add(self.implications())
        self.solver.add(self.all_seperate())

    def do_solve(self):
        self.post()
        if self.solver.check() == z3.unsat:
            return unsat

        model = self.solver.model()
        return model

    def solve(self):
        model = self.do_solve()

        if model == unsat:
            return unsat

        return [encodeForElixir(group, model) for group in self.groups]

    def implications(self):
        s = [klass.constraint() for klass in self.klasses()]
        return z3.And(*s)

    def all_seperate(self):
        days = defaultdict(list)

        for klass in self.klasses():
            days[klass.day].append(klass)

        s = [Klass.all_seperate(klasses) for day, klasses in days.items()]

        return z3.And(*s)

    def klasses(self):
        for choice in self.groups:
            for section in choice.sections:
                for meeting in section.meeting_times:
                    for klass in meeting.klasses:
                        yield klass

    def group(sections):
        groups = groupby(
            sections,
            lambda x: (x['course_id'], x['schedule_type']))

        return [Choice(k, v) for k, v in groups]
