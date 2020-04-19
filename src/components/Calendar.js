import React from "react";
import dateFns from "date-fns";
import Daily from './dailyschedule';
import axios from 'axios';


class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timedatas: [],//expect getting time data
            currentWeek: new Date(),
            selectedDate: new Date()
        };
    }

    componentDidMount() { // prepare for getting data from the backend
        axios.get('http://localhost:5000/schedule/')//address for rest +id or token to got the personal schedule
            .then(response => {
                console.log(response.data);
                this.setState({ timedatas: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    //got today from weekstart to weekend;
    renderHeader() {
        const dateFormat = "YYYY/MM/DD - ";
        const addDayFormat = "DD"
        //week starting date
        let startDate = dateFns.startOfWeek(this.state.currentWeek);
        // today
        const date = this.state.currentWeek
        const newday = new Date(Number(startDate))
        newday.setDate(date.getDate() + 6)
        //get time zone
        var zone = new Date();
        var timezone = zone.getTimezoneOffset() / -60;

        return (
            <div className="row">
                <div className="col">
                    <button className="icon button" onClick={this.prevWeek}>chevron_left</button>
                    <button className="icon button" onClick={this.nextWeek}>chevron_right</button>
                    <span className="weektext">
                        {dateFns.format(startDate, dateFormat)}
                        {dateFns.format(newday, addDayFormat)}
                    </span>
                    <span className="timezone">時間以香港(GMT{timezone}:00) 顯示</span>
                </div>

            </div>
        )
    }

    //format the the weekname 
    dateFormat(i) {
        const dateFormat = "d";
        let startDate = dateFns.startOfWeek(this.state.currentWeek);
        const formated = dateFns.format(dateFns.addDays(startDate, i), dateFormat)
        var day = ""
        switch (formated) {
            case "0":
                day = "日"
                break;
            case "1":
                day = "一"
                break;
            case "2":
                day = "二"
                break;
            case "3":
                day = "三"
                break;
            case "4":
                day = "四"
                break;
            case "5":
                day = "五"
                break;
            default:
                day = "六"
                break;
        }
        return day;
    }


    passedDate(day) {
        const isAfter = require('date-fns/is_after')
        var ispass = isAfter(new Date(day), dateFns.subDays(this.state.selectedDate, 2))

        return ispass;
    }


    //prepare to get data from the back end and map it
    timeList() {
        return this.state.timedatas.map(currentday => {
            return <Daily timedata={currentday} />;
        })
    }




    renderCells() {
        const { currentWeek } = this.state;
        const WeekStart = dateFns.startOfWeek(currentWeek);
        const WeekEnd = dateFns.endOfWeek(WeekStart);
        const startDate = dateFns.startOfWeek(WeekStart);
        const endDate = dateFns.endOfWeek(WeekEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";


        while (day <= endDate) {


            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
            


                days.push(
                    <div className="col col-center" key={day}> 
                        <div style={this.passedDate(day) ? { color: "#484848", borderTop: "5px solid #02CAB9" } : { color: "#D8D8D8", borderTop: "5px solid #D8D8D8" }}
                            className="col col-center topBorder" key={i}>
                            {this.dateFormat(i)}
                        </div>
                        <div style={this.passedDate(day) ? { color: "#484848" } : { color: "#D8D8D8" }} className="number">{formattedDate}</div>
                        {this.passedDate(day) ? <Daily key={day} /> : ""}
                        
                     </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }



    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    nextWeek = () => {
        this.setState({
            currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
        });
    };

    prevWeek = () => {
        this.setState({
            currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
        });
    };

    render() {
        return (
            <div className="calendar">

                {this.renderHeader()}
                {this.renderCells()}
              
            </div>
        )
    }
}

export default Calendar;