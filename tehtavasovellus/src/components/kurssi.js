import React from 'react'

const Otsikko = (props) => {
    console.log(props.kurssi);
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
            {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Yhteensa = (props) => {
    const osat = props.osat
    const tehtaviaYhteensa = osat.map(osa => osa.tehtavia).reduce(function (summa, lisattava) { return summa + lisattava })
    return (
        <div>
            <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
        </div>
    )
}

const Kurssi = (props) => {
    const kurssit = props.kurssit

    return (
        <div>
            {kurssit.map(kurssi => 
                <div key={kurssi.id}>
                <Otsikko kurssi={kurssi.nimi} />
                <Sisalto osat={kurssi.osat} />
                <Yhteensa osat={kurssi.osat} />
            </div>
            )}
        </div>
    )
}

export default Kurssi
