from lib import recourse_solver

sections = [
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

section = sections[0]


def test_meeting_times():
    expected = {
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
    actual = recourse_solver.meeting_times(sections)
    assert expected == actual, str(actual)


def test_name():
    assert recourse_solver.name(section) == "MATH_100_lecture"


def test_handle():
    msg = {'method': 'ping', 'args': []}
    assert recourse_solver.handle(msg) == 'pong'
