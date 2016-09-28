from z3 import (EnumSort, Const)
from .section import Section

class Choice:
    def __init__(self, key, sections):
        sections = list(sections)
        (self.course_id, self.schedule_type) = key

        name = "{}_{}".format(*key)
        enum_values = Choice.enum_values(sections)
        self.Sort, self.enums = EnumSort(name, enum_values)
        self.const = Const(name, self.Sort)

        def gen_sections(section, enum):
            return Section(
                    choice_const=self.const,
                    section_val=enum,
                    **section)

        self.sections = [
                gen_sections(x, y) for x, y in zip(sections, self.enums)]

    def enum_values(sections):
        return [str(x['id']) for x in sections]
