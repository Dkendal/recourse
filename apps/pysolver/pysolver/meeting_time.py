from .pair import Pair
from .klass import Klass


class MeetingTime:

    def __init__(self, days=None, start_time=None, end_time=None, **rest):
        time = Pair.mk_pair(start_time, end_time)

        def gen_klass(day):
            return Klass(
                time=time,
                day=day,
                **rest
            )
        self.klasses = [gen_klass(x) for x in days]
