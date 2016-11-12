import pytest
from z3 import *
from pysolver.solver import *
from pysolver.solver import MeetingTime, DayList, Monday


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


def test_solver():
    pass
