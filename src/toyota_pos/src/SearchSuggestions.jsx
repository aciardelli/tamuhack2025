
import { useState, useEffect } from 'react'
function SearchSuggestions(animationFinished){ 
    return(
        <>
        <div className = "suggestion-wrapper">
            <div className="suggestion-box">
                <p>cars similar to my 2009 buick lacrosse</p>
            </div>
            <div className="suggestion-box">
                <p>highest horsepower per dollar</p>
            </div>
        </div>
        <div className="suggestion-wrapper">
            <div className="suggestion-box">
                <p>best for a family of 5</p>
            </div>
            <div className="suggestion-box">
                <p>v8 engines</p>
            </div>
        </div>
        </>
    )
}

export default SearchSuggestions