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


def get_dow(section, dow):
    key = (section, dow)
    if not hasattr(get_dow, 'memo'):
        get_dow.memo = {}
    if not key in get_dow.memo:
        val = mk_dow(*key)
        get_dow.memo[key] = val
    return get_dow.memo[key]


def mk_sections(sections):
    conditions = []
    # mS = []
    # tS = []
    # wS = []
    # rS = []
    # fS = []
    dows = {
            'm': [],
            't': [],
            'w': [],
            'r': [],
            'f': []
            }

    for section, choices in sections.items():
        imps = []
        section_names = choices.keys()
        Sort, section_enums = EnumSort("%sSort" % section, section_names)
        enum_map = dict(zip(section_names, section_enums))
        section_const = Const(section, Sort)
        # domains for meeting times
        for section_name, blocks in choices.items():
            section_enum = enum_map[section_name]
            for dow, (start, end) in blocks.items():
                dow_const = get_dow(section, dow)
                a = dows[dow]
                # add the dow const if we haven't seen it before
                if dow_const not in a:
                    a.append(dow_const)
                value = Pair.mk_pair(start, end)
                imp = Implies(
                        (section_const == section_enum),
                        (dow_const == value))
                imps.append(imp)
        conditions.append(And(imps))
    # sections may not overlap
    for v in dows.values():
        c = all_seperate(*v)
        conditions.append(c)
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
                't1': {'m': (0, 2), 'r': (0, 6)},
                't2': {'m': (2, 4), 'r': (2, 8)},
                't3': {'m': (14, 16), 'r': (14, 20)}
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
