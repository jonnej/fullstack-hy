import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({ state }) => {
    const yhteensa = state.hyva + state.neutraali + state.huono
    const arvosana = state.hyva - state.huono
    const keskiarvo = arvosana / yhteensa
    const positiivisia = state.hyva / yhteensa
    return (
        <div>
            <h2>Statistiikka</h2>

            {yhteensa === 0 ? (
                <p>Ei yhtään palautetta annettu</p>
            ) : (
                    <table>
                        <tbody>

                            <Statistic text='Hyvä:' value={state.hyva} />
                            <Statistic text='Neutraali:' value={state.neutraali} />
                            <Statistic text='Huono:' value={state.huono} />
                            <Statistic text='Keskiarvo:' value={keskiarvo.toFixed(2)} />
                            <Statistic text='Positiivisia arvosteluja:' value={positiivisia.toFixed(2) + '%'} />

                        </tbody>
                    </table>
                )}
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    clickArvostelu = (arvostelu) => {

        return () => {
            if (arvostelu === 'hyva') {
                this.setState({ hyva: this.state.hyva + 1 })
            } else if (arvostelu === 'neutraali') {
                this.setState({ neutraali: this.state.neutraali + 1 })
            } else if (arvostelu === 'huono') {
                this.setState({ huono: this.state.huono + 1 })
            }
        }
    }

    render() {

        return (
            <div>
                <h1>Anna palautetta</h1>

                <Button handleClick={this.clickArvostelu('hyva')} text='Hyvä' />
                <Button handleClick={this.clickArvostelu('neutraali')} text='Neutraali' />
                <Button handleClick={this.clickArvostelu('huono')} text='Huono' />

                <Statistics state={this.state} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
