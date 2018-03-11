import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

const Menu = () => {

  const menuStyle = {
    background: 'yellow',
    padding: 50,
    border: 'solid',
    font: 25
  }

  const activeLink = {
    fontWeight: 'bold',
    color: 'red'
  }
  return (
    <div style={menuStyle}>
      <NavLink exact to='/' activeStyle={activeLink}>anecdotes</NavLink>&nbsp;
    <NavLink exact to='/create' activeStyle={activeLink}>create new</NavLink>&nbsp;
    <NavLink exact to='/about' activeStyle={activeLink}>about</NavLink>&nbsp;
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see: <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} sm={10} md={8}>
        <code>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </code>
      </Col>
      <Col xs={6} sm={5} md={4}>
        <code>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Linus_Torvalds_flipped.jpg" width="50%" />
        </code>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)


const Notification = ({ notification }) => {

  const notificationStyle = {
    color: 'green',
    border: 'groove',
    font: 'italic',
    size: 14
  }

  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      redirect: false
    }
    
  }
  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.content)
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({ redirect: true })
  }


  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
            <FieldGroup 
              id="formControlsContent"
              name="content"
              type="text"
              label="Content"
              placeholder="Enter content" 
              defaultValue={this.state.content} 
              onChange={this.handleChange.bind(this)} />
          
          <FieldGroup 
              id="formControlsAuthor"
              name="author"
              type="text"
              label="Author"
              placeholder="Enter author" 
              defaultValue={this.state.author} 
              onChange={this.handleChange.bind(this)} />
           
          <FieldGroup 
              id="formControlsInfo"
              name="info"
              type="text"
              label="Info"
              placeholder="Enter url for more info" 
              defaultValue={this.state.info} 
              onChange={this.handleChange.bind(this)} />
            
          <Button bsStyle="danger">Create anecdote</Button>
        </form>
        {this.state.redirect && <Redirect to="/" />}
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created` })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }


  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    const showNotification = () => (
      <div>
        <Notification notification={this.state.notification} />
      </div>
    )

    return (
      <div className="container">
        <Router>
          <div>
            {this.state.notification !== '' && showNotification()}
            <h1>Software anecdotes</h1>
            <Menu />

            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={() => <CreateNew addNew={this.addNew} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
