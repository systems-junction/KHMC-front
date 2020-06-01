/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
import { socketUrl } from '../public/endpoins';

    var ws = null;
    var timeout = 250;

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    function connect(){
        var connectInterval;
        ws = new WebSocket(socketUrl);

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            // this.setState({ ws: ws });

            timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (timeout + timeout) / 1000
                )} second.`,
                e.reason
            );

            // eslint-disable-next-line operator-assignment
            timeout = timeout + timeout; // increment retry interval
            connectInterval = setTimeout(check(), Math.min(10000, timeout)); // call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };
        /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    function check(){
        if (!ws || ws.readyState === WebSocket.CLOSED) connect(); // check if websocket instance is closed, if so call `connect` function.
    };

    connect();
export default ws;