import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lscache from 'lscache'
import './Card.css'
import {IoMdStarOutline} from 'react-icons/io'  //https://react-icons.github.io/react-icons/icons?name=io
import {IoMdStar} from 'react-icons/io'

export default class Card extends Component {
    constructor (...args){
        super (...args)
        this.state = {
            isFav: this.props.isFav
        }

        this.addFav = this.addFav.bind(this)
        this.removeFav = this.removeFav.bind(this)
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
    }

    addFav() {
        this.setState ({isFav: !this.state.isFav})
        this.saveToLocalStorage()
    }

    removeFav() {
        this.setState ({isFav: !this.state.isFav})
        this.saveToLocalStorage()
    }

    saveToLocalStorage () {
        const id = this.props.item.id
        let favs = lscache.get('favs') || []
        if (favs.indexOf(id) < 0) {
            favs.push(id)
        } else {
            favs.splice(favs.indexOf(id), 1)
        }
        lscache.set('favs', favs)
    }

    render () {
        const item = this.props.item
        const img= `${item.thumbnail.path}.${item.thumbnail.extension}`
          return (
              <div className="card">
                  {this.state.isFav ? <IoMdStar onClick={this.addFav} /> : <IoMdStarOutline onClick={this.removeFav} />}
                  <img className="card-image" src={img} alt={item.name} />
                  <div className="card-content">
                      <h2 className="card-title">{item.name}</h2>
                      <p className="card-description">{item.description}</p>
                  </div>
              </div>
             )
    }
}

Card.propTypes = {
    item: PropTypes.object,
    isFav: PropTypes.bool
}