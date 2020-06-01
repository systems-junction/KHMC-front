/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import TablePagination from '@material-ui/core/TablePagination';
import RcIf from 'rc-if';
import { dateOptions } from '../../variables/public';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const { tableHeading, tableData, tableDataKeys, tableHeaderColor } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const replaceSlugToTitle = val => {
    if (val === 'in_active') {
      return 'In Active';
    } else if (val === 'active') {
      return 'Active';
    }

    return val;
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = date => {
    const d = new Date(date);
    return (
      d.getDate() +
      '/' +
      (d.getMonth() + 1) +
      '/' +
      d.getFullYear() +
      ' ' +
      d.toLocaleTimeString()
    );
  };

  const handleClick = (prop, val) => {
    if (props.handleModelMaterialReceiving) {
      props.handleModelMaterialReceiving(prop, val);
    }
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHeading !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHeading.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData &&
            tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((prop, index) => {
                return (
                  <TableRow key={index} className={classes.tableBodyRow}>
                    {tableDataKeys
                      ? tableDataKeys.map((val, key) => {
                          if (val === 'date') {
                            return (
                              <TableCell
                                className={classes.tableCell}
                                key={key}
                              >
                                {formatDate(prop[val])}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                className={classes.tableCell}
                                key={key}
                                onClick={() => handleClick(prop, val)}
                                style={{
                                  cursor: props.handleModelMaterialReceiving
                                    ? 'pointer'
                                    : ''
                                }}
                              >
                                {Array.isArray(val)
                                  ? prop[val[0]]
                                    ? prop[val[0]][val[1]]
                                    : null
                                  : val.toLowerCase() === 'timestamp'
                                  ? new Intl.DateTimeFormat(
                                      'en-US',
                                      dateOptions
                                    ).format(Date.parse(prop[val]))
                                  : `${replaceSlugToTitle(prop[val])}`}
                              </TableCell>
                            );
                          }
                        })
                      : null}
                    <TableCell
                      style={{
                        cursor: 'pointer'
                      }}
                      className={classes.tableCell}
                      colSpan="2"
                    >
                      {props.action ? (
                        <>
                          <RcIf if={props.action.edit}>
                            <span onClick={() => props.handleEdit(prop)}>
                              <i className="zmdi zmdi-edit zmdi-hc-2x" />
                            </span>
                          </RcIf>
                          <RcIf if={props.action.delete}>
                            <span onClick={() => props.handleDelete(prop._id)}>
                              <i className=" ml-10 zmdi zmdi-delete zmdi-hc-2x" />
                            </span>
                          </RcIf>
                          <RcIf
                            if={
                              props.action.active && prop.status === 'in_active'
                            }
                          >
                            <span
                              onClick={() => props.handleStatus(prop._id)}
                              title="Active"
                            >
                              <i className=" ml-10 zmdi zmdi-check zmdi-hc-2x" />
                            </span>
                          </RcIf>
                        </>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={props.tableData && props.tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ])
  // tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
