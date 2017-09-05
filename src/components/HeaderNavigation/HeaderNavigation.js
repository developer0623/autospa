import React from 'react'
import { Link } from 'react-router-dom'

const HeaderNavigation = ({ signOut }) => {
  const toggleHamburger = () => {
    let nav = document.getElementsByClassName('nav-menu')[0]
    const className = nav.getAttribute('class')

    if (className === 'nav-right nav-menu') {
      nav.className = 'nav-right nav-menu is-active'
    } else {
      nav.className = 'nav-right nav-menu'
    }
  }

  return (
    <nav className='nav has-shadow'>
      <div className='container'>
        <div className='nav-left'>
          <a className='nav-item'>
            <img src='http://bulma.io/images/bulma-logo.png' alt='Bulma logo' />
          </a>
          <Link to='/accounts' className='nav-item is-tab is-hidden-mobile'>Accounts</Link>
          <Link to='/services' className='nav-item is-tab is-hidden-mobile'>Services</Link>
          <Link to='/locations' className='nav-item is-tab is-hidden-mobile'>Locations</Link>
        </div>
        <span className='nav-toggle' onClick={toggleHamburger}>
          <span />
          <span />
          <span />
        </span>
        <div className='nav-right nav-menu'>
          <Link to='/accounts' className='nav-item is-tab is-hidden-tablet'>Accounts</Link>
          <Link to='/services' className='nav-item is-tab is-hidden-tablet'>Services</Link>
          <Link to='/locations' className='nav-item is-tab is-hidden-tablet'>Locations</Link>
          <Link to='/logout' className='nav-item is-tab'>Sign out</Link>
        </div>
      </div>
    </nav>
  )
}

export default HeaderNavigation
