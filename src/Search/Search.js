import React, { Component } from 'react'
import ProptType from 'prop-types'
import './Search.css'
import Button from '../Button/Button.js'

export default class Search extends Component {
    constructor(...args){
        super(...args)
        this.state= {
            textToSearch: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        this.setState({textToSearch: e.currentTarget.value}, () =>{
          console.log(this.state.textToSearch)
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.onSubmit(this.state.textToSearch)
    }

    render () {
        return (
            <form className="Searcher" onSubmit={this.handleSubmit}>
                <input 
                    autoFocus
                    disabled={this.props.isLoading}
                    onChange={this.handleChange} 
                    placeholder="Find a character" 
                    type="text" />
                <Button 
                    isLoading={this.props.isLoading}
                    label="Search"/>
            </form>
        )
    }
}

Search.proptType = {
    isLoading: ProptType.bool,
    onSubmit: ProptType.func.isRequired
}

Search.defaultProps = {
    onSubmit: () => {}
}