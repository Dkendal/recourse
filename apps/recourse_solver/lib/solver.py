import z3
from .choice import Choice
from itertools import groupby


class Solver:
    def __init__(self, sections):
        self.sections = list(sections)
        self.solver = z3.Solver()

        groups = groupby(
                sections,
                lambda x: (x['course_id'], x['schedule_type']))

        self.groups = [Choice(k, v) for k, v in groups]

    def post(self):
        self.solver.add(z3.And(*list(self.klass_constraints())))

    def solve(self):
        self.post()
        assert self.solver.check() == z3.sat
        model = self.solver.model()
        return [model[x.const] for x in self.groups]

    def klass_constraints(self):
        for choice in self.groups:
            for section in choice.sections:
                for meeting in section.meeting_times:
                    for klass in meeting.klasses:
                        yield klass.constraint()
