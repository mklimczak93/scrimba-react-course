import React from 'react'
import '/src/App.css'
import memesData from "/src/memesData.js"

function Main() {
    const memesArray = memesData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const [randomImage, changeRandomImage] = React.useState({
        image: memesArray[randomNumber].url,
        topText: "",
        bottomText: ""
    })

    function getMemeImage() {
        changeRandomImage(prevImage => ({
            ...prevImage,
            image: memesArray[randomNumber].url
        }))
    }
    function handleChange(event) {
        changeRandomImage(prevRandomImage => {
            return{
                ...prevRandomImage,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className="main">
            <form>
                <div className="inputs">
                    <input 
                        type="text" 
                        id="upper-text" 
                        className="input" 
                        name="topText" 
                        placeholder="Upper text"
                        onChange={handleChange}
                        value={randomImage.topText}
                    />
                    <input 
                        type="text" 
                        id="bottom-text" 
                        className="input"
                        name="bottomText"  
                        placeholder="Bottom text"
                        onChange={handleChange}
                        value={randomImage.bottomText}  
                    />
                </div>
                <button
                    className="submit-button"
                    onClick={getMemeImage}
                    >
                        Get a new meme image 🖼
                </button>
            </form>
            <div class="image-generator">
                <img src={randomImage.image} className="current-image"></img>
                <h2 className="meme--text top">{randomImage.topText} </h2>
                <h2 className="meme--text bottom">{randomImage.bottomText} </h2>
            </div>
        </div>
    )
}

export default Main