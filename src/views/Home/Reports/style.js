import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles( ( theme ) => ( {
    rootTab: {
        justifyContent: 'center',
    },
    scroller: {
        flexGrow: '0',
    },
    margin: {
        margin: theme.spacing( 0 ),
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 6,
        '&:after': {
            borderBottomColor: 'black',
        },
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:disabled': {
            color: 'gray',
        },
    },
    multilineColor: {
        backgroundColor: 'white',
        borderRadius: 6,
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:after': {
            borderBottomColor: 'black',
        },
    },
    root: {
        '& .MuiTextField-root': {
            backgroundColor: 'white',
        },
        '& .Mui-focused': {
            backgroundColor: 'white',
            color: 'black',
        },
    },
} ) )

export const useCardStyles = makeStyles( {
    root: {
        minWidth: 945,
    },
    mt: {
        marginTop: 50
    }
} );