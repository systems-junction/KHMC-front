import { makeStyles, withStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  input: {
    backgroundColor: 'white!important',
    borderRadius: 4,
    '&:placeholder': {
      // color: "gray",
      // fontWeight: "400",
    },

    '&:before': {
      borderBottomWidth: '0px',
    },
    '&:after': {
      color: 'black',
    },

    '&:hover': {
      backgroundColor: 'white',
    },

    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },

  // label: {
  //   "&:focused": {
  //     color: "black",
  //   },
  //   "&:after": {
  //     color: "black",
  //   },
  // },
}))
