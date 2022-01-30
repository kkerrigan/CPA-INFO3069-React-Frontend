import React from 'react'
import '../App.css'

class Lab6Component extends React.PureComponent {
    constructor() {
        super();
        this.state = {message: "", word: ""}
    }

    handleChange(event){
        this.setState({word: event})
    }
    clearMessage(){
        this.setState({message: ""})
    }
    addWord() {
        let msgCombo = this.state.message + " " + this.state.word;
        this.setState({message: msgCombo, word: ""})
    }

    render() {
        return (
            <p>
                The message is: {this.state.message}<p></p>
                <input type="text" value={this.state.word}
                       onChange={(event) => this.handleChange(event.target.value)} />
                <input type="submit" value="Add Word" onClick={ () => this.addWord()} /> <p></p>
                <input type="submit" value="Clear msg!" onClick={() => this.clearMessage()}/>
            </p>
        )
    }
}

export default Lab6Component