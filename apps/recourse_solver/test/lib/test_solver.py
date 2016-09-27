import pytest
from lib.solver import Solver


@pytest.fixture
def sections():
    val = [
            {
                'course_id': 1,
                'meeting_times': [{
                    'end_time': 1000,
                    'start_time': 0,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A01'
                },
            {
                'course_id': 1,
                'meeting_times': [{
                    'start_time': 2000,
                    'end_time': 3000,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A02'
                },
            {
                'course_id': 1,
                'meeting_times': [{
                    'start_time': 8000,
                    'end_time': 9000,
                    'days': ['F']
                    }],
                'schedule_type': 'tutorial',
                'name': 'T01'
                }
            ]
    return val


def test_solve(sections):
    s = Solver(sections)
    result = s.solve()
    assert repr(result) == '[A02, None]'
