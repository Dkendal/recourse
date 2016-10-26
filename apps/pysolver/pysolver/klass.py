from .pair import Pair
import z3
from itertools import combinations, groupby


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

    def name(*args):
        return "{}_{}".format(*args)

    def after(x, y):
        return Pair.first(x.const) > Pair.last(y.const)

    def seperate(x, y):
        return z3.Or(
            Klass.after(x, y),
            Klass.after(y, x))

    def all_seperate(s):
        return z3.And(*[Klass.seperate(x, y) for x, y in combinations(s, 2)])

    def group(klasses):
        f = lambda x: x.day
        klasses.sort(key=f)
        g = (groupby(klasses, f))
        return dict([(k, list(v)) for k, v in g])
