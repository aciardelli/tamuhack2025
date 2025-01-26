import SearchBar from "./SearchBar"
import SearchSuggestions from "./SearchSuggestions"

import { useState } from 'react'

function SearchComponent({ listenForPrompt }){
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(true)

    const handlePromptReceived = (data) => {
        setLoading(true)
        listenForPrompt(data)
    }

    return(
        <div className = "search-component">
            {/* <img src="hand_render.png" className="hands"></img> */}
            <img src="salesman.png" className="looking-down"></img>
            <SearchBar listenForPrompt={handlePromptReceived}></SearchBar>
            <SearchSuggestions></SearchSuggestions>
            {loading && <div className="loading-wrapper">
                <div className="loader"></div>
            </div>}
        </div>
    )
}

export default SearchComponent