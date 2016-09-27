from z3 import (EnumSort, Const)
from .section import Section

class Choice:
    def __init__(self, key, sections):
        sections = list(sections)
        name = "{}_{}".format(*key)
        section_names = [x['name'] for x in sections]
        self.Sort, self.enums = EnumSort(name, section_names)
        self.const = Const(name, self.Sort)

        def gen_sections(args, enum):
            return Section(
                    choice_const=self.const,
                    section_val=enum,
                    **args)

        self.sections = [
                gen_sections(x, y) for x, y in zip(sections, self.enums)]
