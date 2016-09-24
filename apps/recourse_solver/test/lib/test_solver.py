import pytest
from lib import solver
from lib.solver import Solver

@pytest.fixture
def transformed_sections():
    val = [{
        'course_id': 1,
        'schedule_type': 'lecture',
        'sections': [
            {
                'name': 'A01',
                'meeting_times': [
                    {
                        'start_time': 0,
                        'end_time': 1000,
                        'day': 'M'
                        },
                    {
                        'start_time': 0,
                        'end_time': 1000,
                        'day': 'W'
                        },
                    {
                        'start_time': 0,
                        'end_time': 1000,
                        'day': 'F'
                        }
                    ]
                },
            {
                'name': 'A02',
                'meeting_times': [
                    {
                        'start_time': 2000,
                        'end_time': 3000,
                        'day': 'M'
                        },
                    {
                        'start_time': 2000,
                        'end_time': 3000,
                        'day': 'W'
                        },
                    {
                        'start_time': 2000,
                        'end_time': 3000,
                        'day': 'F'
                        }
                    ]
                }
            ],
        },
        {
            'course_id': 1,
            'schedule_type': 'tutorial',
            'sections': [
                {
                    'name': 'T01',
                    'meeting_times': [
                        {
                            'start_time': 8000,
                            'end_time': 9000,
                            'day': 'F'
                            }
                        ]
                    }
                ]
            }
        ]
    return val


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


def test__init__():
    assert Solver(1)


def test_transform(transformed_sections, sections):
    assert list(solver.transform(sections)) == transformed_sections


def test_solve(sections):
    s = Solver(sections)
    s.setup()
    result = s.solve()
