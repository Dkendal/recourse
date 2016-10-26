import pytest
import z3
from pysolver.klass import Klass
from pysolver.pair import Pair


@pytest.fixture
def x(day='M'):
    return Klass(Pair.mk_pair(0, 1), day, 'X', '0')


@pytest.fixture
def y(day='M'):
    return Klass(Pair.mk_pair(2, 3), day, 'Y', '1')


@pytest.fixture
def z(day='M'):
    return Klass(Pair.mk_pair(4, 5), day, 'Z', '2')


def test_name():
    assert Klass.name('foo', 'bar') == 'foo_bar'


def test_after(x, y):
    assert repr(Klass.after(x, y)) == 'first(X_M) > last(Y_M)'


def test_seperate(x, y):
    constraint = Klass.seperate(x, y)
    assert repr(
        constraint) == 'Or(first(X_M) > last(Y_M), first(Y_M) > last(X_M))'

    solver = z3.Solver()
    solver.add(constraint)
    solver.add(x.const == x.time)
    solver.add(y.const == y.time)
    assert solver.check() == z3.sat

    solver.reset()

    constraint = Klass.seperate(x, x)
    solver.add(constraint)
    solver.add(x.const == x.time)
    assert solver.check() == z3.unsat


def test_all_seperate(x, y, z):
    constraint = Klass.all_seperate([x, y, z])
    assert repr(constraint) == """And(Or(first(X_M) > last(Y_M), first(Y_M) > last(X_M)),
    Or(first(X_M) > last(Z_M), first(Z_M) > last(X_M)),
    Or(first(Y_M) > last(Z_M), first(Z_M) > last(Y_M)))"""


def test_constraint():
    p1 = z3.Bool('p1')
    time = Pair.mk_pair(0, 1)
    x = Klass(time, 'M', p1, True)
    solver = z3.Solver()
    solver.add(x.constraint())
    assert solver.check([p1]) == z3.sat
    model = solver.model()
    assert model[x.const] == time


def test_group():
    X = x('M')
    Y = y('W')
    Z = z('M')
    g = Klass.group([X, Y, Z])
    assert 'M', 'W' in g.keys()
    assert len(g['M']) == 2
    assert len(g['W']) == 1
    assert g == {
        'M': [X, Z],
        'W': [Y]
    }
