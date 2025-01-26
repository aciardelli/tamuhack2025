import SearchBar from "./SearchBar"
import CarCell from "./CarCell"
import { useEffect, useState } from "react";
import { CanceledError } from "axios";

function ListComponent({message, carsToDisplay}){
    const cars = [1,2,3,4,5];
    const [wrapperHeight, setWrapperHeight] = useState(400)

    return(
        <div className="list-component">
            <h2 className = "header">here's why</h2>
            <div className="why-wrapper">
                <div className="why-center"> 
                    <div className="why-img">img goes here</div>
                    <p className="why-p">{message}</p>
                </div>
            </div>
            <h2 className="header">top picks</h2>
            <div className="picks-wrapper" style={{height: wrapperHeight}}>
                <div className="car-row">
                 {cars.map((car, index) => { 
                    return (<CarCell key={index}></CarCell>)
                })}    
                </div> 
            </div>
        </div>
    )
}

export default ListComponent