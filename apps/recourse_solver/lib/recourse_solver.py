import sys
import msgpack
from collections import defaultdict
from z3 import (Or,
                And,
                Datatype,
                IntSort,
                Const,
                EnumSort,
                Solver,
                Implies)


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
    return And(*[seperate(x, y) for x in s for y in s if hash(x) > hash(y)])


def mk_dow(section, dow):
    return Const(("%s_%s" % (section, dow)), Pair)


def name(section):
    subject = section['course']['subject']
    number = section['course']['number']
    schedule_type = section['schedule_type']
    return "%s_%s_%s" % (subject, number, schedule_type)


def get_dow(section, dow):
    key = (section, dow)
    if not hasattr(get_dow, 'memo'):
        get_dow.memo = {}
    if key not in get_dow.memo:
        val = mk_dow(*key)
        get_dow.memo[key] = val
    return get_dow.memo[key]


def mk_sections(sections):
    section_consts = []
    conditions = []
    dows = {
            'M': [],
            'T': [],
            'W': [],
            'R': [],
            'F': []
            }

    for section, choices in sections.items():
        imps = []
        section_names = list(choices.keys())
        Sort, section_enums = EnumSort("%sSort" % section, section_names)
        enum_map = dict(zip(section_names, section_enums))
        section_const = Const(section, Sort)
        section_consts.append(section_const)
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
    return (section_consts, conditions)


def time(meeting_time):
    start = meeting_time['start_time']
    end = meeting_time['end_time']
    return (start, end)


def meeting_times(sections):
    section_types = defaultdict(lambda: defaultdict(dict))

    for section in sections:
        section_name = section['name']
        n = name(section)
        for mt in section['meeting_times']:
            for dow in mt['days']:
                section_types[n][section_name][dow] = time(mt)

    return section_types


def solve(sections):
    s = meeting_times(sections)
    solver = Solver()
    (consts, conditions) = mk_sections(s)
    [solver.add(c) for c in conditions]
    solver.check()
    model = solver.model()
    return dict([(str(c), str(model[c])) for c in consts])


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
    buff = sys.stdin.readline()
    if len(buff) == 0:
        return False
    return msgpack.unpackb(buff[0:-1])


def write(response):
    response = msgpack.packb(response)
    sys.stdout.write(response)
    sys.stdout.flush()
