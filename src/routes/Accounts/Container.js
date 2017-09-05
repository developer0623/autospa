import React from 'react'
import { connect } from 'react-redux'
import { AccountActions } from 'store/actions'
import { HeaderNavigation } from 'components'

// let connectState = state => ({ currentUser: UserSelectors.current(state) })
const connectProps = { ...AccountActions }
const enhancer = connect(null, connectProps)

class AccountsContainer extends React.Component {
  renderContent () {
    return (
      <table className='table is-bordered is-narrow'>
    <thead>
      <tr>
        <th><abbr title='Position'>Pos</abbr></th>
        <th>Team</th>
        <th><abbr title='Played'>Pld</abbr></th>
        <th><abbr title='Won'>W</abbr></th>
        <th><abbr title='Drawn'>D</abbr></th>
        <th><abbr title='Lost'>L</abbr></th>
        <th><abbr title='Goals for'>GF</abbr></th>
        <th><abbr title='Goals against'>GA</abbr></th>
        <th><abbr title='Goal difference'>GD</abbr></th>
        <th><abbr title='Points'>Pts</abbr></th>
        <th>Qualification or relegation</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title='Position'>Pos</abbr></th>
        <th>Team</th>
        <th><abbr title='Played'>Pld</abbr></th>
        <th><abbr title='Won'>W</abbr></th>
        <th><abbr title='Drawn'>D</abbr></th>
        <th><abbr title='Lost'>L</abbr></th>
        <th><abbr title='Goals for'>GF</abbr></th>
        <th><abbr title='Goals against'>GA</abbr></th>
        <th><abbr title='Goal difference'>GD</abbr></th>
        <th><abbr title='Points'>Pts</abbr></th>
        <th>Qualification or relegation</th>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <th>19</th>
        <td><a href='https://en.wikipedia.org/wiki/Norwich_City_F.C.' title='Norwich City F.C.'>Norwich City</a> <strong>(R)</strong>
        </td>
        <td>38</td>
        <td>9</td>
        <td>7</td>
        <td>22</td>
        <td>39</td>
        <td>67</td>
        <td>−28</td>
        <td>34</td>
        <td>Relegation to the <a href='https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship' title='2016–17 Football League Championship'>Football League Championship</a></td>    </tr>
      <tr>
        <th>20</th>
        <td><a href='https://en.wikipedia.org/wiki/Aston_Villa_F.C.' title='Aston Villa F.C.'>Aston Villa</a> <strong>(R)</strong>
        </td>
        <td>38</td>
        <td>3</td>
        <td>8</td>
        <td>27</td>
        <td>27</td>
        <td>76</td>
        <td>−49</td>
        <td>17</td>
        <td>Relegation to the <a href='https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship' title='2016–17 Football League Championship'>Football League Championship</a></td>
      </tr>
    </tbody>
  </table>
    )
  }
  render () {
    return (
      <div>
        <HeaderNavigation />
        <div className='container'>
          <div className='notification'>
            This container is <strong>centered</strong> on desktop.
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default enhancer(AccountsContainer)
