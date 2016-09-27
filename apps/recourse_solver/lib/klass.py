from .pair import Pair
import z3


class Klass:
    def __init__(
            self,
            time=None,
            day=None,
            choice_const=None,
            section_val=None):
        name = Klass.name(choice_const, day)
        self.day = day
        self.time = time
        self.const = z3.Const(name, Pair)
        self.choice_const = choice_const
        self.section_val = section_val

    def constraint(self):
        return z3.Implies(
                (self.choice_const == self.section_val),
                (self.const == self.time))

    def name(choice_const, day):
        return "{}_{}".format(str(choice_const), day)
