import React from 'react'
import Button from '@material-ui/core/Button'
import plus_icon from '../../assets/img/Plus.png'
import VIewAll from '../../assets/img/Eye.png'

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    background: '#2c6ddd',
    width: '140px',
    height: '50px',
    outline: 'none',
  },
}
const buttonField = ({ onClick, name }) => {
  return (
    <Button
      onClick={onClick}
      style={styles.stylesForButton}
      variant='contained'
      color='primary'
    >
      {name === 'add' ? (
        <>
          <img src={plus_icon} />
          &nbsp;&nbsp;
          <strong>Add New</strong>
        </>
      ) : (
        <>
          <img onClick={onClick} src={VIewAll} />
          &nbsp;&nbsp;
          <strong>View All</strong>
        </>
      )}
    </Button>
  )
}

export default buttonField
