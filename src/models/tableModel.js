export const generateTableModel = (
  tableData,
  tableHeading,
  tableDataKeys,
  toggleActionObjView
) => ({
  tableData: tableData,
  tableHeading: tableHeading,
  tableDataKeys: tableDataKeys,
  actions: toggleActionObjView,
});

export default generateTableModel;
