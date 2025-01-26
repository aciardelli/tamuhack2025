
import { useState, useEffect } from 'react'
function SearchSuggestions(animationFinished){ 
    return(
        <>
        <div className = "suggestion-wrapper">
            <div className="suggestion-box">
                <p>best cars for family travel</p>
            </div>
            <div className="suggestion-box">
                <p>highest horsepower per dollar</p>
            </div>
        </div>
        <div className="suggestion-wrapper">
            <div className="suggestion-box">
                <p>cheapest eco friendly cars</p>
            </div>
            <div className="suggestion-box">
                <p>4 door trucks</p>
            </div>
        </div>
        </>
    )
}

export default SearchSuggestions