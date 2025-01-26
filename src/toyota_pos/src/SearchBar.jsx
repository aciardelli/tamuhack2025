import { useState, useEffect } from 'react'

function SearchBar({ listenForPrompt, mini, loadSignal }){
    const [text, setText] = useState("")
    const [opacity, setOpacity] = useState(0)
    const [anim, setAnim] = useState("")
    const [load, setLoad] = useState(false)

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
        if(loadSignal){
            loadSignal()
        }else{
            setLoad(true)
        }
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
            setLoad(false)
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
            <input placeholder = "Describe your needs and I'll help find the right car" className = "search-box" onChange={handleInputChange} style={{ opacity: opacity, animation: anim }} onKeyDown={handleKeyDown}></input>
        )
    }else{
        return(
            <>
            <input type="text" className="search-box-mini" onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Not quite right? Search again"/>
            {load && <div className="load-wrapper-mini">
                <div className="loader"></div>
            </div>}
            </>
        )
    }
    
}

export default SearchBar