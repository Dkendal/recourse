import pytest
from pysolver.schedule import Schedule


@pytest.fixture
def csc_100():
    return [
        {'course_id': 28592,
         'id': 6552,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736332,
                            'days': ['M', 'R'],
                            'end_time': 40800,
                            'start_time': 36000}],
         'name': 'A02',
         'schedule_type': 'Lecture'},
        {'course_id': 28592,
         'id': 6556,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['W'],
                            'end_time': 62400,
                            'start_time': 55800}],
         'name': 'B04',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6557,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['R'],
                            'end_time': 51600,
                            'start_time': 45000}],
         'name': 'B05',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6558,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['F'],
                            'end_time': 40800,
                            'start_time': 34200}],
         'name': 'B06',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6559,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['F'],
                            'end_time': 48000,
                            'start_time': 41400}],
         'name': 'B07',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6560,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['M'],
                            'end_time': 66000,
                            'start_time': 59400}],
         'name': 'B08',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6553,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['W'],
                            'end_time': 40800,
                            'start_time': 34200}],
         'name': 'B01',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6554,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['W'],
                            'end_time': 48000,
                            'start_time': 41400}],
         'name': 'B02',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6555,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736339,
                            'days': ['W'],
                            'end_time': 55200,
                            'start_time': 48600}],
         'name': 'B03',
         'schedule_type': 'Lab'},
        {'course_id': 28592,
         'id': 6551,
         'meeting_times': [{'date_end': 736423,
                            'date_start': 736332,
                            'days': ['M', 'R'],
                            'end_time': 40800,
                            'start_time': 36000}],
         'name': 'A01',
         'schedule_type': 'Lecture'}]


def test_group_by_schedule_type(csc_100):
    groups = Schedule.group_by_schedule_type(csc_100)
    assert len(groups) == 2
    lab, lecture = groups

    assert lab.schedule_type == 'Lab'
    assert lab.course_id == 28592
    sections = list(lab.sections)
    assert len(sections) == 8

    assert lecture.schedule_type == 'Lecture'
    assert lecture.course_id == 28592
    sections = list(lecture.sections)
    assert len(sections) == 2

    section, *_ = sections
    assert section.id == 6552
    assert section.name == 'A02'
    assert section.schedule_type == 'Lecture'
    assert section.course_id == 28592

    assert len(section.meeting_times) == 1
    meeting_time, = section.meeting_times
    assert meeting_time.date_end == 736423
    assert meeting_time.date_start == 736332
    assert meeting_time.start_time == 36000
    assert meeting_time.end_time == 40800
    assert meeting_time.days == ['M', 'R']

def test_solve(csc_100):
    lecture_sections = [6551, 6552]
    lab_sections = [6553, 6554, 6555, 6556, 6557, 6558, 6559, 6560]

    result = Schedule.solve(csc_100)

    assert len(result) == 2

    lab, lecture = result

    assert lab.course_id == 28592
    assert lab.schedule_type == 'Lab'
    assert lab.section_id in lab_sections

    assert lecture.course_id == 28592
    assert lecture.schedule_type == 'Lecture'
    assert lecture.section_id in lecture_sections
