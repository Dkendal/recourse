import pytest
from z3 import *
from z3 import(
        Not,
        IntSort,
        Solver,
        solve,
        unsat,
        unknown,
        sat)

from pysolver.solver import *
from pysolver.solver import(
        define_range_disjoint,
        range_disjoint,
        DayList,
        DeclareListSort,
        MeetingTime,
        Monday,
        declare_overlap,
        define_overlap,
        define_time_seperate,
        time_seperate)


@pytest.fixture
def sections():
    pass


def test_Day():
    assert Monday == Day('M')


def test_MeetingTime():
    mt = MeetingTime(
            date_end=1,
            date_start=2,
            days=DayList.nil,
            end_time=3,
            start_time=4)

    assert mt.sexpr() == "(new 1 2 nil 3 4)"


def test_time_seperate():
    # when they are in an overlapping time period
    mt1 = MeetingTime(
            date_end=0,
            date_start=0,
            days=DayList.nil,
            end_time=99,
            start_time=0)

    mt2 = MeetingTime(
            date_end=0,
            date_start=0,
            days=DayList.nil,
            end_time=149,
            start_time=50)

    mt3 = MeetingTime(
            date_end=0,
            date_start=0,
            days=DayList.nil,
            end_time=199,
            start_time=100)

    sol = Solver()
    sol.add(define_time_seperate())
    sol.push()

    # Two meeting times with over lapping times -> False
    sol.add(time_seperate(mt1, mt2))
    assert sol.check() == unsat

    sol.pop()
    sol.push()

    # x == x -> False
    sol.add(time_seperate(mt1, mt1))
    assert sol.check() == unsat

    sol.pop()
    sol.push()

    # when times don't overlap -> True
    sol.add(time_seperate(mt1, mt3))
    assert sol.check() == sat

def test_range_disjoint():
    sol = Solver()
    sol.add(define_range_disjoint())
    sol.push()

    sol.add(range_disjoint(0, 10, 11, 20))
    assert sol.check() == sat

    sol.push()
    sol.pop()

    sol.add(range_disjoint(11, 20, 0, 10))
    assert sol.check() == sat

    sol.push()
    sol.pop()

    sol.add(range_disjoint(0, 10, 10, 20))
    assert sol.check() == unsat

    sol.push()
    sol.pop()

    sol.add(range_disjoint(10, 20, 0, 10))
    assert sol.check() == unsat

    sol.push()
    sol.pop()


def test_overlap():
    sol = Solver()

    IntList = DeclareListSort(IntSort())
    nil = IntList.nil
    insert = IntList.insert

    overlap = declare_overlap(IntList)

    l1 = insert(1, insert(2, nil))
    l2 = insert(1, insert(3, nil))
    l3 = insert(4, insert(3, nil))

    sol.add(define_overlap(IntList, overlap))
    sol.push()

    sol.add(overlap(l1, l2))
    assert sol.check() == sat

    sol.pop()
    sol.push()

    sol.add(overlap(l2, l3))
    assert sol.check() == sat

    sol.pop()
    sol.push()

    sol.add(overlap(l1, l3))
    assert sol.check() == unsat

def test_conflict():
    return
    sol = Solver()
    mt1 = MeetingTime(
        date_end=0,
        date_start=0,
        days=0,
        end_time=0,
        start_time=0,
        )

def test_solver():
    pass
