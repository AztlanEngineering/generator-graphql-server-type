import React from 'react'
import PropTypes from 'prop-types'

//Config
import C from 'ui/cssClasses'

//Relative imports

if(!process.env.BACKEND) {
  import(
    /* webpackChunkName: "css.<%= chunk_name %>" */ 
    './<%= scss %>'
  )
}

const baseClassName = '<%= lower %>'

const <%= name %> = ({
  id,
  className,
  style
}) => (
  <div 
    className={
      [
        baseClassName,
        className
      ].filter(e => e).join(' ')
  }
    id={ id }
    style={ style }
  >
    <h2>Welcome to the <%= name %> component</h2>
  </div>
)

<%= name %>.propTypes = {
  /**
   * Provide an HTML id to this element
   */
  id: PropTypes.string,

  /**
   * The html class names to be provided to this element
   */
  className: PropTypes.string,

  /**
   * The JSX-Written, css styles to apply to the element.
   */
  style: PropTypes.object,

  /**
   *  The children JSX
   */
  children: PropTypes.node,

  /*
  : PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  : PropTypes.func,
  : PropTypes.func,
  : PropTypes.oneOf(['primary', 'stroke', 'flat'])
  */
}

/*
<%= name %>.defaultProps = {
  status: 'neutral',
}
*/

export default <%= name %>
