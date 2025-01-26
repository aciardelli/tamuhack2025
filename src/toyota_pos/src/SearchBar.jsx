import { useState, useEffect } from 'react'

function SearchBar({ listenForPrompt, mini, loadSignal }){
    const [text, setText] = useState("")
    const [opacity, setOpacity] = useState(0)
    const [anim, setAnim] = useState("")

    const [prompt, setPrompt] = useState("")

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(opacity < 1){
                setOpacity(prevOpacity => prevOpacity + 0.002)
            }else{
                clearInterval(intervalId)
            }
        })
        
    }, [])

    const handleSubmit = async () => {
        loadSignal()
        console.log("submitting")
        try{
            const response = await fetch("http://localhost:3000/api/userSearch", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "query": text })
            })

            setAnim("fly-up 0.5s forwards")
            const data = await response.json()
            listenForPrompt(data)
        } catch(error){
            console.error("Error: ", error)
        }
    }

    const handleKeyDown = async (event) => {
        if(event.key == 'Enter'){
            await handleSubmit()
        }
    }

    const handleInputChange = (event) => {
        setText(event.target.value)
    }
    if(!mini){
        return(
            <input placeholder = "Ask me about cars" className = "search-box" onChange={handleInputChange} style={{ opacity: opacity, animation: anim }} onKeyDown={handleKeyDown}></input>
        )
    }else{
        return(
            <input type="text" className="search-box-mini" onChange={handleInputChange} onKeyDown={handleKeyDown} />
        )
    }
    
}

export default SearchBar