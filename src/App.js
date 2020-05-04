import React, { Component } from 'react'
import Logo from './Logo.js'
import './App.css'
import lscache from 'lscache'
import Card from './Card/Card.js'
import Search from './Search/Search.js'

const API_URL = 'http://gateway.marvel.com:80/v1/public'
const APIKEY_QUERYSTRING = 'apikey=408b6d7a1fd0560193bf0a239d279af1'

class App extends Component {

  constructor (...args){
    super (...args)
    this.state = {
      isLoading: false,
      favs: [],
      initialState: true,
      results: [] //dummyData
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const favs = lscache.get('favs') || []
    this.setState({favs: favs})
  }

  handleSubmit (textToSearch) {
    this.setState({initialState: false, isLoading: true})

    const FETCH_URL = `${API_URL}/characters?nameStartsWith=${textToSearch}&${APIKEY_QUERYSTRING}`
    
    console.log("TCL------>: handleSubmit -> FETCH_URL", FETCH_URL)
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({isLoading: false, results: res.data.results})
      })
      .catch (err => {console.log(err)})
  }

  render (){
    return (
      <div className="container">
        <Logo isCentered />
        <Search onSubmit={this.handleSubmit} isLoading={this.state.isLoading} />

        {this.state.initialState && 
          <p className="has-text-centered">Por favor busca un personaje</p>}

        <div className="results">
            {this.state.results.map(item=>{
              return (
                <Card 
                  isFav={this.state.favs.find(id => item.id === id)} 
                  item={item} 
                  key={item.id}/>
              )
            })}
        </div>
      </div>
    )
  }
}

export default App;
