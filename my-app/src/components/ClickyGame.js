import React, { Component } from 'react';
import images from "../images.json";


const shuffleImages = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class ClickyGame extends Component {

    constructor() {
        super()
        this.state = {
            score: 0,
            topScore: 0,
            message: "",
            statesImages: images
        }
    }

    componentDidMount() {
        this.setState({
            message: "Click an image to begin!"
        })

    }

    handleItemClick = (clicked, id) => {
        // console.log(clicked)
        // console.log(id)

        let img = this.state.statesImages.find((img) => {
            return id === img.id;
        });

        console.log('img: ', img)

        if (img) {
            if (!img.clicked) {
                img.clicked = true;
                console.log("inside if: ", this.state.score)
                return this.setState({
                    statesImages: shuffleImages(this.state.statesImages),
                    score: this.state.score + 1,
                    message: "You gussed correctly!"
                });
            }
            else {
                images.forEach(image => {
                    image.clicked = false;
                });
                return this.setState({
                    score: 0,
                    topScore: (this.state.topScore < this.state.score) ? this.state.score : this.state.topScore,
                    statesImages: images,
                    message: "You gussed incorrectly!"
                })
            }
        } 
        // if (this.state.score === 12) {
        //     return this.setState({
        //         statesImages: shuffleImages(this.state.statesImages),
        //         score: 0,
        //         topScore: 0,
        //         statesImages: images,
        //         message: "You Win!!"
        //     })
        // }
    }

    render() {
        // console.log(this.state.statesImages)
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <br />
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <h2>Clicky Game!</h2>
                            </div>
                            <div className="col-sm-4 text-center">
                                <h2>{this.state.message}</h2>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6 text-right">
                                        <h2>Score: {this.state.score} |</h2>
                                    </div>
                                    <div className="col-sm- text-left">
                                        <h2>Total Score: {this.state.topScore}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        {this.state.statesImages.map(img => {
                            return (
                                <div className="col-sm-3 imageDiv" key={img.id}>
                                    <button>
                                        <img className="img-thumbnail"
                                            onClick={() => this.handleItemClick(img.clicked, img.id)}
                                            id={img.id}
                                            style={{ width: '250px', height: '250px' }}
                                            alt="img1" src={img.image} />
                                    </button>
                                    <br /><br />
                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClickyGame;