import SearchBar from "./SearchBar"
import CarCell from "./CarCell"
import { useEffect, useState } from "react";
import { CanceledError } from "axios";

function ListComponent({message = "", data = []}){
    const [cars, setCars] = useState(data);
    const [explanation, setExplanation] = useState(message)
    const [wrapperHeight, setWrapperHeight] = useState(400)

    const handleGetData = (newData) => {
        console.log(newData)
        setCars(newData.data)
        setExplanation(newData.explanation)
    }

    useEffect(() => {
        console.log("hello")
    }, [cars])

    const handleLoadCars = () => {
        console.log(cars.length)
        if(cars.length > 0){
            return cars.map((car, index) => {
                return (<CarCell data={car} key={index} order={index}></CarCell>)
            })
        }

        return []
    }

    return(
        <div className="list-component">
            <div className="head">
                <SearchBar listenForPrompt={handleGetData} mini={true}></SearchBar>
            </div>
            <h2 className = "header">Here's Why</h2>
            <div className="why-wrapper">
                <div className="why-center"> 
                    <img src="salesman_2.png"className="why-img"></img>
                    <p className="why-p">{explanation}</p>
                </div>
            </div>
            <h2 className="header">Top Picks</h2>
            <div className="picks-wrapper" style={{height: wrapperHeight}}>
                {/* <div className="car-row">
                 {cars.map((car, index) => { 
                    return (<CarCell key={index}></CarCell>)
                })}    
                </div>  */}
                <div className="car-row">
                    {handleLoadCars()}
                    {/* {cars.map((car, index) => {
                        return (<CarCell data={car} key={index}></CarCell>)
                    })} */}
                </div>
            </div>
        </div>
    )
}

export default ListComponent