import SearchBar from "./SearchBar"
import SearchSuggestions from "./SearchSuggestions"

import { useState } from 'react'

function SearchComponent({ listenForPrompt }){
    const [prompt, setPrompt] = useState("")

    const handlePromptReceived = (data) => {
        listenForPrompt(data)
    }

    return(
        <div className = "search-component">
            <SearchBar listenForPrompt={handlePromptReceived}></SearchBar>
            <SearchSuggestions></SearchSuggestions>
        </div>
    )
}

export default SearchComponent