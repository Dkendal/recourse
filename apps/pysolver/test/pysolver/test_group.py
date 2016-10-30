import pytest
import z3
from pysolver.group import Group


@pytest.fixture
def section():
    return {'course_id': 1,
            'id': 3,
            'name': 'B04',
            'schedule_type': 'Lab',
            'meeting_times': [{'days': ['W'],
                               'end_time': 62400,
                               'start_time': 55800}]}


@pytest.fixture
def sections():
    return [
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
         'schedule_type': 'Lab'}]


@pytest.fixture
def group(sections):
    return Group(course_id=1, schedule_type='Lab', sections=sections)


def test_section_id_domain_values(group):
    assert group.section_id_domain_values() == [
        '3', '4', '5', '6', '7', '8', '9', '10']


def test_name(group):
    assert group.name() == '1_Lab'


def test_section_id_name(group):
    assert group.section_id_name() == '1_Lab_section_id'


def test_day_names(group):
    assert group.day_names() == [
        '1_Lab_M',
        '1_Lab_T',
        '1_Lab_W',
        '1_Lab_R',
        '1_Lab_F',
    ]


def test_section_range(group):
    result = repr(group.section_range()).replace('\n       ', '')
    assert 'Implies(1_Lab_section_id == 3, And(1_Lab_W == mk_pair(55800, 62400)))' in result
    assert 'Implies(1_Lab_section_id == 4, And(1_Lab_R == mk_pair(45000, 51600)))' in result
    assert 'Implies(1_Lab_section_id == 5, And(1_Lab_F == mk_pair(34200, 40800)))' in result
    assert 'Implies(1_Lab_section_id == 6, And(1_Lab_F == mk_pair(41400, 48000)))' in result
    assert 'Implies(1_Lab_section_id == 7, And(1_Lab_M == mk_pair(59400, 66000)))' in result
    assert 'Implies(1_Lab_section_id == 8, And(1_Lab_W == mk_pair(34200, 40800)))' in result
    assert 'Implies(1_Lab_section_id == 9, And(1_Lab_W == mk_pair(41400, 48000)))' in result
    assert 'Implies(1_Lab_section_id == 10, And(1_Lab_W == mk_pair(48600, 55200))' in result


def test_times_for(group, section):
    assert repr(group.times_for(section)
                ) == 'And(1_Lab_W == mk_pair(55800, 62400))'


def test_find_section(group):
    assert group.find_section(3) == {
        'course_id': 1,
        'id': 3,
        'name': 'B04',
        'schedule_type': 'Lab',
        'meeting_times': [{
                'days': ['W'],
                'end_time': 62400,
                'start_time': 55800}]}


def test_build_section_id_const(group):
    result = group.build_section_id_const()
    Sort, enums = result
    assert repr(Sort) == '1_LabSectionSort'
    assert repr(enums) == '[3, 4, 5, 6, 7, 8, 9, 10]'
