import { useEffect, useState } from "react"

function CarCell(){
    const [expanded, setExpanded] = useState(false)
    const [cellHeight, setCellHeight] = useState(400)

    useEffect(() => {
        if(expanded){
            setCellHeight(800)
        }else{
            setCellHeight(400)
        }
    },[expanded])

    const handleExpand = () => {
        setExpanded(!expanded)
    }
    return(
        <div className="car-cell" style={{height: cellHeight}}>
            <div className="wrapper-wrapper">
                <div className="information-wrapper">
                    <h2 className="car-name">2004 Toyota 4Runner</h2>
                    <h2 className="car-price">$27,270</h2>
                </div>
                <div className="picture-wrapper">
                    <img src="" alt="an image" />
                </div>
            </div>
            <div className="footer">
                <p onClick={handleExpand}>v</p>
            </div>
        </div>
    )
}

export default CarCell