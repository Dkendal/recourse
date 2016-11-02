import pytest
import z3
from pysolver.group import Group


@pytest.fixture
def section():
    return {
        'course_id': 28504,
        'id': 7075,
        'meeting_times': [
            {
                'date_end': 736423,
                'date_start': 736332,
                'days': ['W'],
                'end_time': 40800,
                'start_time': 37800
            }
        ],
        'name': 'T01',
        'schedule_type': 'Tutorial'
    }


@pytest.fixture
def sections():
    return [
        {
            'course_id': 28504,
            'id': 7075,
            'meeting_times': [
                {
                    'date_end': 736423,
                    'date_start': 736332,
                    'days': ['W'],
                    'end_time': 40800,
                    'start_time': 37800
                }
            ],
            'name': 'T01',
            'schedule_type': 'Tutorial'
        },
        {
            'course_id': 28504,
            'id': 7074,
            'meeting_times': [
                {
                    'date_end': 736423,
                    'date_start': 736332,
                    'days': ['W'],
                    'end_time': 37200,
                    'start_time': 34200
                },
                {
                    'date_end': 736423,
                    'date_start': 736332,
                    'days': ['T'],
                    'end_time': 48000,
                    'start_time': 41400
                }
            ],
            'name': 'A01',
            'schedule_type': 'Lecture'
        }
    ]


@pytest.fixture
def group(sections):
    return Group(
        course_id=28504,
        schedule_type='Lecture',
        sections=sections
    )


def test_section_id_domain_values(group):
    assert group.section_id_domain_values() == ['7075', '7074']


def test_name(group):
    assert group.name() == '28504_Lecture'


def test_section_id_name(group):
    assert group.section_id_name() == '28504_Lecture_section_id'


def test_day_names(group):
    assert group.day_names() == [
        '28504_Lecture_M',
        '28504_Lecture_T',
        '28504_Lecture_W',
        '28504_Lecture_R',
        '28504_Lecture_F',
    ]


def test_times_for(group, section):
    assert repr(group.times_for(section)
                ) == 'And(28504_Lecture_W == mk_pair(37800, 40800))'


def test_find_section(group, section):
    assert group.find_section(7075) == section


def test_build_section_id_const(group):
    result = group.build_section_id_const()
    Sort, enums = result
    assert repr(Sort) == '28504_LectureSectionSort'
    assert repr(enums) == '[7075, 7074]'
