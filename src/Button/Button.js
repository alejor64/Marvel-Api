import React from 'react'
import PropTypes from 'prop-types'
import RingLoader from 'react-spinners/RingLoader' //React sipnner https://www.davidhu.io/react-spinners/

export default function Button (props) {
    return (
        <button>{
            props.isLoading ? <RingLoader size="20" color="white" />
            : props.label} 
        </button>
    )
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string
}