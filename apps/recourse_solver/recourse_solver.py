import sys, msgpack
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


def solve(sections):
    s = Solver()
    conditions = mk_sections(sections)
    [s.add(c) for c in conditions]
    s.check()
    return s.model()


def ping():
    return "pong"


handlers = {
    "ping": ping,
    "solve": solve
    }


def handle(msg):
    method = msg["method"]
    args = msg["args"]
    return handlers[method](*args)


def read():
    buffer_length = sys.stdin.read(1)

    # end of program
    if len(buffer_length) == 0:
      return False

    buffer_length = ord(buffer_length)
    buff = sys.stdin.read(buffer_length)
    return msgpack.unpackb(buff)


def write(response):
    response = msgpack.packb(response)
    sys.stdout.write(response)
    sys.stdout.flush()
