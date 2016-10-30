import pytest
from pysolver.schedule import Schedule

@pytest.fixture
def csc_100():
    val = [{'course_id': 1,
            'id': 2,
            'meeting_times': [{'days': ['M',
                                        'R'],
                               'end_time': 40800,
                               'start_time': 36000}],
            'name': 'A02',
            'schedule_type': 'Lecture'},
           {'course_id': 1,
            'id': 3,
            'meeting_times': [{'days': ['W'],
                               'end_time': 62400,
                               'start_time': 55800}],
            'name': 'B04',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 4,
            'meeting_times': [{'days': ['R'],
                               'end_time': 51600,
                               'start_time': 45000}],
            'name': 'B05',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 5,
            'meeting_times': [{'days': ['F'],
                               'end_time': 40800,
                               'start_time': 34200}],
            'name': 'B06',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 6,
            'meeting_times': [{'days': ['F'],
                               'end_time': 48000,
                               'start_time': 41400}],
            'name': 'B07',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 7,
            'meeting_times': [{'days': ['M'],
                               'end_time': 66000,
                               'start_time': 59400}],
            'name': 'B08',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 8,
            'meeting_times': [{'days': ['W'],
                               'end_time': 40800,
                               'start_time': 34200}],
            'name': 'B01',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 9,
            'meeting_times': [{'days': ['W'],
                               'end_time': 48000,
                               'start_time': 41400}],
            'name': 'B02',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 10,
            'meeting_times': [{'days': ['W'],
                               'end_time': 55200,
                               'start_time': 48600}],
            'name': 'B03',
            'schedule_type': 'Lab'},
           {'course_id': 1,
            'id': 11,
            'meeting_times': [{'days': ['M',
                                        'R'],
                               'end_time': 40800,
                               'start_time': 36000}],
            'name': 'A01',
            'schedule_type': 'Lecture'}]
    return val

def test_group(csc_100):
    groups = Schedule.groupByScheduleType(csc_100)
    assert len(groups) == 2
    lab, lecture = groups

    assert lab.schedule_type == 'Lab'
    assert lab.course_id == 1
    assert lab.name == '1_Lab'

    assert lecture.schedule_type == 'Lecture'
    assert lecture.course_id == 1
    assert lecture.name == '1_Lecture'
