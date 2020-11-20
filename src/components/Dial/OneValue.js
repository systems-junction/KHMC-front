import React, { useEffect, useState } from "react"

const styles = {
  stylesForLabelValue: {
    position: "absolute",
    fontSize: 10,
    opacity: "70%",
  },

  stylesForBars: {
    position: "absolute",
    fontWeight: "bold",
    opacity: "70%",
  },
}

function Dialer(props) {
  const [scaleOnXside, setScaleOnXside] = useState([])
  const [options, setOptions] = useState("")

  useEffect(() => {
    let temp = []
    for (let i = 6; i > 0; i--) {
      let date = new Date()

      var hours = date.getHours() - i
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? "pm" : "am"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      minutes = "00"
      var strTime = hours + ":" + minutes + " " + ampm
      temp.push(hours)
      console.log(strTime)
    }

    setOptions(options)
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 5,
        paddingTop: 20,
        height: 270,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "40%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: "700",
            opacity: "70%",
            textAlign: "center",
          }}
        >
          {props.heading}
        </span>
      </div>

      <div
        className="col-12"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: props.colorTime,
            fontSize: 50,
            fontWeight: "900",
            position: "absolute",
            marginTop: -10,
          }}
        >
          {props.time}
        </span>
      </div>
    </div>
  )
}

export default Dialer
