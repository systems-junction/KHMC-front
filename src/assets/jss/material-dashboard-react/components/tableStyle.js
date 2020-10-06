const tableStyle = (theme) => ({
  // warningTableHeader: {
  //   color: warningColor[0]
  // },
  // primaryTableHeader: {
  //   color: primaryColor[0]
  // },
  // dangerTableHeader: {
  //   color: dangerColor[0]
  // },
  // successTableHeader: {
  //   color: successColor[0]
  // },
  // infoTableHeader: {
  //   color: infoColor[0]
  // },
  // roseTableHeader: {
  //   color: roseColor[0]
  // },
  // grayTableHeader: {
  //   color: grayColor[0]
  // },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    // border: '1px solid rgb(165, 165, 165)',
    fontFamily: "Open Sans,sans-serif",
  },
  tableHeadCell: {
    // color: "inherit",
    // ...defaultFont,
    "&, &$tableCell": {
      // fontSize: '1rem',
      fontWeight: "bold",
      fontFamily: "Open Sans,sans-serif",
      paddingLeft: 8,
      paddingRight: 8,
    },
    // textAlign: 'center',
  },
  tableCell: {
    // ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    // fontSize: '0.8125rem',
    // border: '0.5px solid rgb(165, 165, 165)',
    fontFamily: "Open Sans,sans-serif",
    // textAlign: 'center',
  },

  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },

  tableHeadRow: {
    // height: '56px',
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
    // backgroundColor: '#2873CF'
  },

  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },

  tableData: {
    fontSize: "0.8125rem",
    fontWeight: "400",
    // fontFamily: 'Ubuntu'
  },
  pointer: {
    cursor: "pointer",
  },
});

export default tableStyle;
