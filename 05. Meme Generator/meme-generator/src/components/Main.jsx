import React from 'react'
import '/src/App.css'

function Main() {
    //setting an empty array for all memes
    const [allMemes, setAllMemes] = React.useState([])
    
    //filling it with memes from website
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    //creating image state
    const [randomImage, setrandomImage] = React.useState({
        topText: "",
        bottomText: "",
        image: "http://i.imgflip.com/1bij.jpg" 
    })
    
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setrandomImage(prevMeme => ({
            ...prevMeme,
            image: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setrandomImage(prevImage => ({
            ...prevImage,
            [name]: value
        }))
    }

    return (
        <div className="main">
            <div className="form">
                <div className="inputs">
                    <input 
                        type="text"  
                        placeholder="Upper text"
                        className="input" 
                        name="topText" 
                        value={randomImage.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="input"
                        name="bottomText"  
                        value={randomImage.bottomText}  
                        onChange={handleChange}
                    />
                </div>
            <button
                className="submit-button"
                onClick={getMemeImage}
                >
                    Get a new meme image 🖼
            </button>
            </div>
            <div className="image-generator">
                <img src={randomImage.image} className="current-image" />
                <h2 className="meme--text top">{randomImage.topText}</h2>
                <h2 className="meme--text bottom">{randomImage.bottomText}</h2>
            </div>
        </div>
    )
}

export default Main