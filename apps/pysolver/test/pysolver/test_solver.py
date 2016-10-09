import pytest
from pysolver.solver import Solver


@pytest.fixture
def unsat_sections():
    val = [
            {
                'id': 2,
                'course_id': 2,
                'meeting_times': [{
                    'end_time': 1000,
                    'start_time': 0,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A01'
                },
            {
                'id': 1,
                'course_id': 1,
                'meeting_times': [{
                    'end_time': 1000,
                    'start_time': 0,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A01'
                },
            ]
    return val

@pytest.fixture
def sections():
    val = [
            {
                'id': 1,
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
                'id': 2,
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
                'id': 3,
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
    solver = Solver(sections)
    result = solver.solve()
    assert isinstance(result, list)

    for x in result:
        assert isinstance(x, dict)

    assert result == [
            {
                'course_id': 1,
                'schedule_type': 'lecture',
                'id': '2',
                'ids': [1, 2]
                },
            {
                'course_id': 1,
                'schedule_type': 'tutorial',
                'id': 'None',
                'ids': [3]
                }
            ]

def test_solve_unsat(unsat_sections):
    solver = Solver(unsat_sections)
    result = solver.solve()
    assert result == "unsat"
