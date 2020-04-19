import React from "react";
//import dateFns from "date-fns";

function dailyschedule(props){
// so for here are using the dummy data, but with the data i'll 
// got the start time and end time and using while loop to render 
// every half an hour. and map both the available data and book data
// const time = props.timedata.map((timedata)=><ol>{timedata}</ol>)
// const start = props.timedata.available.start
// const end = props.timedatea.available.end
    return(
        <div className="col dailyset">
            {/* dummy data */}
            <p>9:00</p>
            <p>9:30</p>
            <p>10:00</p>
            <p>10:30</p>
            <p>11:00</p>
            <p>11:30</p>
            <p>12:00</p>
            <p>12:30</p>
            {/* prepare for randering the time data from the backend */}
            {/* {time} */}
        </div>
    )
}
export default dailyschedule;