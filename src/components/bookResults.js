import React, { Component } from 'react';
import BookResultTable from './bookResultTable';

class BookResults extends Component{

    render(){
        return(
                <div className="timetable">
                    <h1>BOOK A SERVICE</h1>
                    <h2>The Hollywood EGF Facial</h2>
                    <form>get db</form>
                    <BookResultTable></BookResultTable>
                    <h3>Congratulations we’ll see you soon!</h3>
                    <h4> #GLOtoGO </h4>
                </div>
        );
    }
}
export default BookResults;