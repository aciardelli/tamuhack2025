import { useEffect, useState } from "react"

function CarCell({data}){
    const [expanded, setExpanded] = useState(false)
    const [cellHeight, setCellHeight] = useState(300)

    useEffect(() => {
        if(expanded){
            setCellHeight(450)
        }else{
            setCellHeight(300)
        }
    },[expanded])

    const handleExpand = () => {
        setExpanded(!expanded)
    }
    return(
        <div className="car-cell" style={{height: cellHeight}}>
            <div className="wrapper-wrapper">
                <div className="information-wrapper">
                    <h2 className="car-name">{data.model_year} Toyota {data.car_title}</h2>
                    <h2 className="car-price">{parseFloat(data.msrp).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</h2>
                    {data.is_compact && <h2 className="car-type">Compact</h2>}
                    {data.is_minivan && <h2 className="car-type">Minivan</h2>}
                    {data.is_small_pickup && <h2 className = "car-type">Small Pickup</h2>}
                    {data.is_small_suv && <h2 className = "car-type">Small SUV</h2>}
                    {data.is_standard_pickup && <h2 className = "car-type">Standard Pickup</h2>}
                    {data.is_standard_suv && <h2 className = "car-type">Standard SUV</h2>}
                    {data.is_subcompact && <h2 className = "car-type">Subcompact</h2>}
                    {data.highway_mpg > 0 && <h2 className="mpg">{data.highway_mpg} MPG</h2>}
                    {data.horsepower > 0 && <h2 className="horsepower">{data.horsepower} Horsepower</h2>}
                    {expanded && <h2 className="cylinders">{data.cylinders} Cylinders</h2>}
                    {data.is_4wd && expanded && <h2 className = "wheel-drive">4 Wheel Drive</h2>}
                    {data.is_fwd && expanded && <h2 className = "wheel-drive">Front Wheel Drive</h2>}
                    {data.is_rwd && expanded && <h2 className = "wheel-drive">Rear Wheel Drive</h2>}
                    {data.is_gas && expanded && <h2 className="powered">Gas-powered</h2>}
                    {data.is_electric && expanded && <h2 className = "powered">Electric-powered</h2>}
                </div>
         
                <div className="picture-wrapper">
                    <img src={data.image_url} alt="an image" />
                </div>
            </div>
            <div className="footer" onClick={handleExpand}>
                <p onClick={handleExpand}>v</p>
            </div>
        </div>
    )
}

export default CarCell