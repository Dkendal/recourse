from .pair import Pair
import z3


class Klass:
    def __init__(
            self,
            time=None,
            day=None,
            choice_const=None,
            section_val=None):
        name = Klass.name(choice_const, section_val, day)
        self.day = day
        self.time = time
        self.const = z3.Const(name, Pair)
        self.choice_const = choice_const
        self.section_val = section_val

    def constraint(self):
        return z3.Implies(
                (self.choice_const == self.section_val),
                (self.const == self.time))

    def name(*args):
        return "{}_{}_{}".format(*args)

    def after(x, y):
        return Pair.first(x.time) > Pair.last(y.time)

    def seperate(x, y):
        return z3.Or(
                Klass.after(x, y),
                Klass.after(y, x))

    def all_seperate(s):
        return z3.And(
            *[Klass.seperate(x, y) for x in s for y in s if hash(x) > hash(y)])
