import React from 'react'
import './dashboardDCD.css';
import TickIcon from "../../../assets/img/Tick Icon.png"
import TriageBoxIcon from "../../../assets/img/Triage & Assessment.png";

export default function Box(props) {
    return (
        
           <div onClick={props.Boxclick}className='dashboard-chunk-area' style={{backgroundColor: props.backgroundColor? props.backgroundColor : "" , height : props.height1? props.height1 : 200  }}>
                                <div className='row' style={{ height:'40%'}}>
                                 
                                     <div className="col-md-12">
                                            <h4 style={{color: "#fff", fontSize: "21px"}}  >{props.title}</h4>
                                            <p style={{color: "#fff"}} >{props.detail}</p>
                                    </div> 
                                    
                                    <div  style={{display: "flex", justifyContent: "flex-end", position: "absolute",top: 13, right: props.right1 ? props.right1 : 7,  alignItems: "flex-end" }}>
                                        <img style={{ width: 25, height: 25}} src={TickIcon}/>
                                    </div>
                                       
                                </div>
                                            
                                <div className='row' style={{ display: "flex",  flexDirection:"row"}}>
                                    <div className="col-md-6 col-sm-6 col-6 box-number"   style={{display: props.display? props.display : " " ,  justifyContent: props.justifyContent ? props.justifyContent : " ", marginTop: props.marginTop? props.marginTop: " " ,  bottom: props.bottom? props.bottom : " " }}>
                                        <h3>{props.numberCount}</h3>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-6 box-icon"  style={{right: props.right4Icon ? props.right4Icon : " " , bottom: props.bottom4Icon? props.bottom4Icon : " "}}>
                                        <img style={{ width: 90, height: 90}} src={props.boxIcon}/>
                                    </div>
                                 
                                </div>
         </div>
        
    )
}
