import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: 0,
            mostVoted: 0
        }
    }

    randomAnecdote = () => {
        this.setState({ selected: Math.floor(Math.random() * 6) })
    }

    vote = () => {
        this.setState({votes: this.state.votes + 1})
        this.props.anecdotes[this.state.selected].voteCount = this.props.anecdotes[this.state.selected].voteCount + 1
        if (this.props.anecdotes[this.state.selected].voteCount > this.props.anecdotes[this.state.mostVoted].voteCount) {
            this.setState({mostVoted : this.state.selected})
        }
    }

    render() {
       
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected].text}</p>
                <p>Votes: {this.props.anecdotes[this.state.selected].voteCount}</p>
                <button onClick={this.vote.bind(this)}>Vote</button>
                <button onClick={this.randomAnecdote.bind(this)}>Next anecdote</button>

                <h2>Anecdote with most votes</h2>
                <p>{this.props.anecdotes[this.state.mostVoted].text}</p>
                <p>Votes: {this.props.anecdotes[this.state.mostVoted].voteCount}</p>

            </div>
        )
    }
}

const anecdotes = [
    { text: 'If it hurts, do it more often', voteCount: 0 },
    { text: 'Adding manpower to a late software project makes it later!', voteCount: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', voteCount: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', voteCount: 0 },
    { text: 'Premature optimization is the root of all evil.', voteCount: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', voteCount: 0 }
]

ReactDOM.render(
    <App anecdotes={anecdotes.sort(function (a, b) {
        return b.voteCount - a.voteCount
    })} />,
    document.getElementById('root')
)

