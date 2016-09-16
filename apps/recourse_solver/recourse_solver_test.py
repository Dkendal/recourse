import recourse_solver
from z3 import *


def DeclarePair():
    Pair = Datatype('Pair')
    Pair.declare('mk_pair', ('first', IntSort()), ('last', IntSort()))
    Pair.declare('nil')
    return Pair.create()

Pair = DeclarePair()

def domain(x, s):
    return Or(*[x == y for y in s])


def after(x, y):
    return Pair.first(x) > Pair.last(y)


def seperate(x, y):
    return Or(after(x, y), after(y, x))


def all_seperate(*s):
    return And(*[seperate(x, y) for x in s for y in s if x > y])


def mk_dow(section, dow):
    return Const(("%s_%s" % (section, dow)), Pair)


def mk_sections(sections):
    conditions = []
    mS = []
    tS = []
    wS = []
    rS = []
    fS = []
    dows = ('m', 't', 'w', 'r', 'f')
    for section in sections:
        imps = []
        choices = sections[section]
        section_names = choices.keys()
        Sort, section_enums = EnumSort("%sSort" % section, section_names)
        dow_consts = [mk_dow(section, dow) for dow in dows]
        dow_dict = dict(zip(dow_consts, dows))
        (m, t, w, r, f) = dow_consts
        mS.append(m)
        tS.append(t)
        wS.append(w)
        rS.append(r)
        fS.append(f)
        section_const = Const(section, Sort)
        for dow_const in dow_consts:
            for section_enum in section_enums:
                dow = dow_dict[dow_const]
                dow_choices = choices[str(section_enum)]
                if dow_choices.has_key(dow):
                    (start, end) = dow_choices[dow]
                    value = Pair.mk_pair(start, end)
                    imp = Implies(
                            (section_const == section_enum),
                            (dow_const == value))
                    imps.append(imp)
        # domains for meeting times
        conditions.append(And(imps))
    # sections may not overlap
    conditions.append(all_seperate(*mS))
    conditions.append(all_seperate(*tS))
    conditions.append(all_seperate(*wS))
    conditions.append(all_seperate(*rS))
    conditions.append(all_seperate(*fS))
    return conditions



def example_test():
    s = Solver()

    sections = {
            'section_a': {
                't1': {'m': (0, 2)},
                't2': {'m': (2, 4)},
                't3': {'m': (4, 6)},
                't4': {'m': (6, 8)},
                't5': {'m': (8, 10)}
                },
            'section_b': {
                't1': {'m': (0, 6)},
                't2': {'m': (2, 8)}
                },
            'section_c': {
                't1': {'w': (0, 6)},
                't2': {'w': (2, 8)}
                },
            'section_d': {
                't1': {'r': (0, 6)},
                't2': {'r': (2, 8)}
                }
            }
    conditions = mk_sections(sections)

    [s.add(c) for c in conditions]

    # s.add(seperate(section_a_m, section_b_m))

    print(s.check())
    print(s.model())


def handle_test():
    msg = {'method': 'ping', 'args': []}
    assert recourse_solver.handle(msg) == 'pong'
