/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';

const useStyles = makeStyles(styles);

export default function SearchBar(props) {
  return (
      <InputBase
        fullWidth
        style={{
          border: '2px solid rgb(165, 165, 165)',
          borderRadius: '50px',
          paddingLeft: '5%',
          paddingTop: '2%',
          paddingBottom: '2%',
        }}
        defaultValue=""
        placeholder={props.placeHolder}
        inputProps={{ 'aria-label': 'naked' }}
      />
  );
}
