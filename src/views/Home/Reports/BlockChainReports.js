import React from "react";
import
{
    Card,
    makeStyles,
    CardActions,
    CardContent,
    Button,
    Typography,
    CardActionArea,
} from "@material-ui/core";
import Header from "../../../components/Header/Header";
import { blockChainReports } from '../../../constants/Constants';
import Back from "../../../assets/img/Back_Arrow.png";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useStyles, useCardStyles } from "./style";
import './Reports.css'

const BlockChainReports = ( props ) =>
{
    const classes = useStyles();
    const cardClasses = useCardStyles();
    console.log( "BlockChainReports called." );
    return (
        <div
            style={ {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#13D59F",
                overflowY: "scroll",
            } }
        >
            <Header history={ props.history } />
            <div className='cPadding'>
                <div className='subheader'>
                    <div>
                        <h4>Reports</h4>
                    </div>
                </div>
                <div className="container-fluid" style={ { marginTop: -120 } }>
                    <div>
                        <div className="vh-100 d-flex align-items-center justify-content-center">
                            <div className="align-items-center">
                                { blockChainReports && blockChainReports.length && blockChainReports.map( ( { title, route } ) => (
                                    <div key={ title } className="col-md-12 col-sm-12 col-xm-12 col-12" id="my-panel" onClick={ () => props.history.push( route ) }>
                                        <Card
                                            className={ `${ cardClasses.root } ` }
                                            style={ { padding: 35, borderRadius: 20, marginTop: 30 } }
                                            role="button"
                                        >
                                            <div className="row">
                                                <div className="col-md-6 col-sm-8 col-xm-6">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        { title }
                                                    </Typography>
                                                </div>
                                                <div className="col-md-6 col-sm-8 col-xs-6">
                                                    <span className="pull-right">
                                                        <ArrowForwardIcon />
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
        // <div style={ {
        //     display: "flex",
        //     flexDirection: "column",
        //     flex: 1,
        //     position: "fixed",
        //     width: "100%",
        //     height: "100%",
        //     backgroundColor: "#2B62CC",
        // } }>
        //     <Header history={ props.history } />
        //     <div className='cPadding'>
        //         <div className='subheader'>
        //             <div>
        //                 <h4>Reports</h4>
        //             </div>
        //         </div>
        //         <div className={ `container-fluid ${ classes.root }` }>
        //             <div className="row">
        //                 <div className='align-items-center'>
        //                     <div
        //                         className='col-md-12 col-sm-12'
        //                     >
        //                         <Card>
        //                             <Typography>
        //                                 Typography
        //             </Typography>
        //                         </Card>
        //                     </div>
        //                     <div
        //                         className='col-md-12 col-sm-12'
        //                     >
        //                         <Card>
        //                             <Typography>
        //                                 Typography
        //             </Typography>
        //                         </Card>
        //                     </div>
        //                     <div
        //                         className='col-md-12 col-sm-12'
        //                     >
        //                         <Typography>
        //                             Typography
        //             </Typography>
        //                     </div>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>
        // </div>
    );
};

export default BlockChainReports;
