export const generateTableModel = (
  tableData,
  tableHeading,
  tableDataKeys,
  toggleActionObjView,
  selected
) => ({
  tableData: tableData,
  tableHeading: tableHeading,
  tableDataKeys: tableDataKeys,
  actions: toggleActionObjView,
  selected: selected,
});

export default generateTableModel;
