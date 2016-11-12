import z3

from z3 import (
    EnumSort,
    Datatype,
    IntSort,
    Function,
    ForAll,
    Const,
    Implies,
    And,
    Not,
    Or,
    BoolSort,
)


def DeclareListSort(T):
    ListSort = Datatype('List')

    attrs = [('hd', T),
             ('tl', ListSort)]

    ListSort.declare('nil')
    ListSort.declare('insert', *attrs)
    return ListSort.create()


def DeclareMeetingTimeSort(DayList):
    MeetingTimeSort = Datatype('MeetingTimeSort')
    attrs = [
        ('date_end', IntSort()),
        ('date_start', IntSort()),
        ('days', DayList),
        ('end_time', IntSort()),
        ('start_time', IntSort()),
    ]
    MeetingTimeSort.declare('new', *attrs)
    return MeetingTimeSort.create()


def DeclareSectionSort(ScheduleTypeSort, MeetingTimeList):
    SectionSort = Datatype('SectionSort')
    attrs = [
        ('course_id', IntSort()),
        ('schedule_type', ScheduleTypeSort),
        ('meeting_times', MeetingTimeList),
    ]
    SectionSort.declare('new', *attrs)
    return SectionSort.create()

###############################################################################
# Initialize Sorts
###############################################################################

DayLiterals = ['M', 'T', 'W', 'R', 'F']
DaySort, DayEnums = EnumSort('DaySort', DayLiterals)
(Monday, Teusday, wednesday, Thursday, Friday) = DayEnums
DayList = DeclareListSort(DaySort)

ScheduleTypeLiterals = ['LAB', 'LECTURE', 'TUTORIAL']
ScheduleTypeSort, ScheduleTypeEnums = EnumSort(
    'ScheduleTypeSort', ScheduleTypeLiterals)

(Lab, Lecutre, Tutorial) = ScheduleTypeLiterals

MeetingTimeSort = DeclareMeetingTimeSort(
    DayList=DayList)

MeetingTimeList = DeclareListSort(MeetingTimeSort)

SectionSort = DeclareSectionSort(
    ScheduleTypeSort=ScheduleTypeSort,
    MeetingTimeList=MeetingTimeList)


def Day(string):
    idx = DayLiterals.index(string)
    return DayEnums[idx]


def MeetingTime(date_end, date_start, days, end_time, start_time):
    return MeetingTimeSort.new(
        date_end,
        date_start,
        days,
        end_time,
        start_time,
    )

###############################################################################
# Constraints
###############################################################################
time_seperate = Function(
        'time_seperate',
        MeetingTimeSort,
        MeetingTimeSort,
        BoolSort())


def define_time_seperate():
    """
    Constraint to specify that and a and b have overlapping times.
    """
    start_time = MeetingTimeSort.start_time
    end_time = MeetingTimeSort.end_time
    x = Const('x', MeetingTimeSort)
    y = Const('y', MeetingTimeSort)
    return [
        # symmetric property
        ForAll([x, y],
            Implies(
                time_seperate(x, y),
                time_seperate(y, x))),

        ForAll([x, y],
            Implies(
                time_seperate(x, y),
                Or(
                    start_time(x) > end_time(y),
                    start_time(y) > end_time(x)))),
    ]
