import React from "react";
import
{
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";

export const DialogComponent = ( { contents, handleDialog } ) =>
{
    const [ open, setOpen ] = React.useState( true );
    const theme = useTheme();
    const fullScreen = useMediaQuery( theme.breakpoints.down( "sm" ) );

    const handleClickOpen = () =>
    {
        setOpen( true );
    };

    const handleClose = () =>
    {
        setOpen( false );
        handleDialog( false );
    };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={ handleClickOpen }>
                Open responsive dialog
      </Button> */}
            <Dialog
                fullScreen={ fullScreen }
                open={ open }
                onClose={ handleClose }
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    {
                        contents && contents.length && contents.map( ( { title, value } ) => (
                            <div style={ { marginBottom: 30 } }>
                                <Typography variant="h6" gutterBottom>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12" style={ { color: "#2873CF" } }>
                                                { title }
                                            </div>
                                            <div className="col-md-12 col-sm-12" style={ { color: "#666666" } }>
                                                { value }
                                            </div>
                                        </div>
                                    </div>
                                </Typography>
                            </div>
                        ) )
                    }
                </DialogContent>
                <DialogActions style={ { display: 'flex', textAlign: 'center', justifyContent: 'center' } }>
                    <Button autoFocus onClick={ handleClose } style={ { background: "#2873CF", color: "#ffff" } }>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComponent;
