import SearchBar from "./SearchBar"
import SearchSuggestions from "./SearchSuggestions"

import { useState, useEffect } from 'react'

function SearchComponent({ listenForPrompt }){
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePromptReceived = (data) => {
        listenForPrompt(data)
    }

    const handleLoadSignal = () => {
        setLoading(true)
    }

    useEffect(() => {
        console.log("loading", loading)
    }, [loading])

    return(
        <div className = "search-component">
            {/* <img src="hand_render.png" className="hands"></img> */}
            <img src="salesman.png" className="looking-down"></img>
            <SearchBar listenForPrompt={handlePromptReceived} loadSignal={handleLoadSignal}></SearchBar>
            <SearchSuggestions></SearchSuggestions>
            {loading && <div className="loading-wrapper">
                <div className="loader"></div>
            </div>}
        </div>
    )
}

export default SearchComponent