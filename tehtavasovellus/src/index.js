import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.tehtavia}</p>
        </div>
    )
}

const Sisalto = (props) => {
    const osat = props.osat
    return (
        <div>
            <Osa nimi={osat[0].nimi} tehtavia={osat[0].tehtavia}/>
            <Osa nimi={osat[1].nimi} tehtavia={osat[1].tehtavia}/>
            <Osa nimi={osat[2].nimi} tehtavia={osat[2].tehtavia}/>
        </div>
    )
}

const Yhteensa = (props) => {
    const osat = props.osat
    return (
        <div>
            <p>yhteensä {osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]
    }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)