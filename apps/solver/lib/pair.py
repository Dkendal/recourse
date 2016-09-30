from z3 import Datatype, IntSort


def DeclarePair():
    Pair = Datatype('Pair')
    Pair.declare('mk_pair', ('first', IntSort()), ('last', IntSort()))
    Pair.declare('nil')
    return Pair.create()


Pair = DeclarePair()
