from lib import recourse_solver
import pytest

@pytest.fixture
def parsed_sections():
    val = {
            'MATH_100_lecture': {
                'A01': {
                    'M': (0, 1000),
                    'W': (0, 1000),
                    'F': (0, 1000),
                    },
                'A02': {
                    'M': (2000, 3000),
                    'W': (2000, 3000),
                    'F': (2000, 3000),
                    },
                },
            'MATH_100_tutorial': {
                'T01': {
                    'F': (8000, 9000)
                    }
                }
            }
    return val


@pytest.fixture
def sections():
    val = [
            {
                'course': {
                    'number': '100',
                    'subject': 'MATH'
                    },
                'meeting_times': [{
                    'end_time': 1000,
                    'start_time': 0,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A01'
                },
            {
                'course': {
                    'number': '100',
                    'subject': 'MATH'
                    },
                'meeting_times': [{
                    'start_time': 2000,
                    'end_time': 3000,
                    'days': ['M', 'W', 'F']
                    }],
                'schedule_type': 'lecture',
                'name': 'A02'
                },
            {
                'course': {
                    'number': '100',
                    'subject': 'MATH'
                    },
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


@pytest.fixture
def section():
    return sections()[0]


def test_meeting_times(parsed_sections, sections):
    actual = recourse_solver.meeting_times(sections)
    assert parsed_sections == actual, str(actual)


def test_name(section):
    assert recourse_solver.name(section) == "MATH_100_lecture"


def test_mk_sections(parsed_sections):
    recourse_solver.mk_sections(parsed_sections)


def test_solve(sections):
    expected = {}
    actual = recourse_solver.solve(sections)
    assert actual == expected


def test_handle():
    msg = {'method': 'ping', 'args': []}
    assert recourse_solver.handle(msg) == 'pong'
