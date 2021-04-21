const generateTabsModel = (
  id,
  defaultValue,
  tabs,
  innerDefaultValue,
  innerTabs,
  mainTabSelected
) => ( {
  id: id,
  value: defaultValue,
  innerValue: innerDefaultValue,
  tabs: tabs,
  innerTabs: innerTabs,
  mainTabSelected: mainTabSelected,
} );
export default generateTabsModel;
