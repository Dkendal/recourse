import z3

days = ['M', 'T', 'W', 'R', 'F']


class Group:

    def __init__(self, course_id, schedule_type, sections=list()):
        self.course_id = course_id
        self.schedule_type = schedule_type
        self.sections = sections

    def set_section_domain(self):
        result = self.build_section_id_const()
        self.section_id_const, self.section_id_enums = result

    def build_section_id_const(self):
        return z3.EnumSort(
                self.section_id_name(),
                self.section_id_domain_values())

    def section_id_domain_values(self):
        return [str(x['id']) for x in self.sections]

    def section_id_name(self):
        return "{}_section_id".format(self.name())

    def name(self):
        return "{}_{}".format(self.course_id, self.schedule_type)

    def day_names(self):
        name = self.name()
        return ["{}_{}".format(name, x) for x in days]
