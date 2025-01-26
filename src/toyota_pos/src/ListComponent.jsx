import SearchBar from "./SearchBar"
import CarCell from "./CarCell"

function ListComponent({message, carsToDisplay}){
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
            <div className="picks-wrapper">
                {/* {carsToDisplay.map((car) => {
                    <CarCell></CarCell>
                })} */}
            </div>
        </div>
    )
}

export default ListComponent