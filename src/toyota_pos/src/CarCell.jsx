import { useEffect, useState } from "react"

function CarCell({data, order}){
    const [expanded, setExpanded] = useState(false)
    const [cellHeight, setCellHeight] = useState(300)

    useEffect(() => {
        if(expanded){
            const intervalId = setInterval(() => {
                setCellHeight((prevHeight) => {
                    if(prevHeight < 750){
                        return prevHeight + 10
                    }else{
                        clearInterval(intervalId)
                        return prevHeight
                    }
                })
            })
            // setCellHeight(450)
        }else{
            const intervalId = setInterval(() => {
                setCellHeight((prevHeight) => {
                    if(prevHeight > 300){
                        return prevHeight - 10
                    }else{
                        clearInterval(intervalId)
                        return prevHeight
                    }
                })
            })
        }
    },[expanded])

    const handleExpand = () => {
        setExpanded(!expanded)
    }
    return(
        <div className="car-cell" style={{height: cellHeight }}>
            <div className="wrapper-wrapper">
                <div className="information-wrapper">
                    <h2 className="car-name">{data.model_year} Toyota {data.car_title}</h2>
                    <h2 className="car-price">MSRP: {parseFloat(data.msrp > 0 ? data.msrp : data.shown_price).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}</h2>
                    {data.is_compact && <h3 className="car-type">Compact</h3>}
                    {data.is_minivan && <h3 className="car-type">Minivan</h3>}
                    {data.is_small_pickup && <h3 className="car-type">Small Pickup</h3>}
                    {data.is_small_suv && <h3 className="car-type">Small SUV</h3>}
                    {data.is_standard_pickup && <h3 className="car-type">Standard Pickup</h3>}
                    {data.is_standard_suv && <h3 className="car-type">Standard SUV</h3>}
                    {data.is_subcompact && <h3 className="car-type">Subcompact</h3>}
                    {data.is_midsize && <h3 className="car-type">Midsize</h3>}
                    {data.is_two_seater && <h3 className="car-type">Two Seater</h3>}
                    {data.is_small_truck && <h3 className="car-type">Small Truck</h3>}
                    {data.is_standard_truck && <h3 className="car-type">Standard Truck</h3>}
                    {data.highway_mpg > 0 && <h3 className="mpg">{data.highway_mpg} MPG</h3>}
                    {expanded && data.horsepower > 0 && <h3 className="horsepower">{data.horsepower} Horsepower</h3>}
                    {data.cylinders > 0 && expanded && <h3 className="cylinders">{data.cylinders} Cylinders</h3>}
                    {data.is_4wd && expanded && <h3 className = "wheel-drive">4 Wheel Drive</h3>}
                    {data.is_fwd && expanded && <h3 className = "wheel-drive">Front Wheel Drive</h3>}
                    {data.is_rwd && expanded && <h3 className = "wheel-drive">Rear Wheel Drive</h3>}
                    {data.is_gas && !data.is_electric && expanded && <h3 className="powered">Gas-powered</h3>}
                    {data.is_electric && !data.is_gas && expanded && <h3 className = "powered">Electric-powered</h3>}
                    {data.is_electric && data.is_gas && expanded && <h3 className = "powered">Hybrid</h3>}

                </div>
         
                <div className="picture-wrapper">
                    <img src={data.image_url} alt="an image" />
                </div>

                {expanded && <div className="finance-wrapper">
                    <div className="finance-term">
                        <p className = "finance-term-text">{data.finance_term ? data.finance_term : 60}</p>
                        <p className="normal">months finance</p>
                        <p className="normal">for just</p>
                        <p className="finance-payment-text">${data.monthly_finance ? data.monthly_finance : 754.19}</p>
                    </div>
                    <div className="or-wrapper">OR</div>
                    <div className="lease-term">
                        <p className="finance-term-text">{data.lease_term ? data.lease_term : 36}</p>
                        <p className="normal">months lease</p>
                        <p className="normal">for just</p>
                        <p className="finance-payment-text">${data.monthly_lease ? data.monthly_lease : 263.45}</p>
                    </div>
                </div>}
            </div>
            <div className="footer" onClick={handleExpand}>
                <p onClick={handleExpand}>v</p>
            </div>
        </div>
    )
}

export default CarCell