function iconName(section) {
  return `icon-${section.schedule_type.toLowerCase()}`;
}

export default {
  iconName,
};
