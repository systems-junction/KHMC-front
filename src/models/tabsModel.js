const generateTabsModel = (
  id,
  defaultValue,
  innerDefaultValue,
  tabs,
  innerTabs,
  mainTabSelected
) => ({
  id: id,
  value: defaultValue,
  innerValue: innerDefaultValue,
  tabs: tabs,
  innerTabs: innerTabs,
  mainTabSelected: mainTabSelected,
});
export default generateTabsModel;
