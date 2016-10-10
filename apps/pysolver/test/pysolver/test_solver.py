import pytest
from pysolver.solver import Solver


@pytest.fixture
def csc_100():
    val = [{'course_id': 28592,
      'id': 6552,
      'meeting_times': [{'days': ['M', 'R'],
        'end_time': 40800,
        'start_time': 36000}],
      'name': 'A02',
      'schedule_type': 'Lecture'},
     {'course_id': 28592,
      'id': 6556,
      'meeting_times': [{'days': ['W'], 'end_time': 62400, 'start_time': 55800}],
      'name': 'B04',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6557,
      'meeting_times': [{'days': ['R'], 'end_time': 51600, 'start_time': 45000}],
      'name': 'B05',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6558,
      'meeting_times': [{'days': ['F'], 'end_time': 40800, 'start_time': 34200}],
      'name': 'B06',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6559,
      'meeting_times': [{'days': ['F'], 'end_time': 48000, 'start_time': 41400}],
      'name': 'B07',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6560,
      'meeting_times': [{'days': ['M'], 'end_time': 66000, 'start_time': 59400}],
      'name': 'B08',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6553,
      'meeting_times': [{'days': ['W'], 'end_time': 40800, 'start_time': 34200}],
      'name': 'B01',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6554,
      'meeting_times': [{'days': ['W'], 'end_time': 48000, 'start_time': 41400}],
      'name': 'B02',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6555,
      'meeting_times': [{'days': ['W'], 'end_time': 55200, 'start_time': 48600}],
      'name': 'B03',
      'schedule_type': 'Lab'},
     {'course_id': 28592,
      'id': 6551,
      'meeting_times': [{'days': ['M', 'R'],
        'end_time': 40800,
        'start_time': 36000}],
      'name': 'A01',
      'schedule_type': 'Lecture'}]
    return val

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


def test_csc_100(csc_100):
    solver = Solver(csc_100)
    result = solver.solve()
    assert result != "unsat"


def test_group(sections):
    groups = Solver.group(sections)
    assert isinstance(groups, list)
    assert len(groups) == 2
    assert groups[0].schedule_type == 'lecture'
    assert groups[1].schedule_type == 'tutorial'
    for group in groups:
        assert group.course_id == 1
        assert isinstance(group.sections, list)
