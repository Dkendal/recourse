import pytest
from z3 import *
from z3 import(
        Solver,
        solve,
        unsat,
        unknown,
        sat)

from pysolver.solver import *
from pysolver.solver import(
        MeetingTime,
        DayList,
        Monday,
        time_seperate,
        define_time_seperate)


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

def test_solver():
    pass
