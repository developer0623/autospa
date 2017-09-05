import React from 'react'
import styled from 'styled-components'
import tiresImg from 'assets/img/tires.jpg'
import washImg from 'assets/img/wash.jpg'
import classNames from 'classnames'

export default class ServiceTypeTab extends React.Component {
  state = { showModal: false }

  tiresSelected (storedWithAutospa) {
    this.props.onSelect({ isWashing: false, storedWithAutospa })
  }

  renderModal () {
    return (
      <div className={classNames('modal', { 'is-active': this.state.showModal })}>
        <div className='modal-background' />
        <div className='modal-card'>
          <section className='modal-card-body'>
            <strong>Ovatko renkaat Autospan varastossa?</strong>
            <br />
            Renkaiden vaihto vaatii väh. 2 vrk renkaiden toimittamiseksi toimipisteeseen.
          </section>
          <footer className='modal-card-foot'>
            <a onClick={this.tiresSelected.bind(this, true)} className='button is-success'>Kyllä</a>
            <a onClick={this.tiresSelected.bind(this, false)} className='button'>Ei</a>
          </footer>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Container>
        { this.renderModal() }
        <Title>Valitse haluamasi palvelun</Title>
        <Wrapper>
          <Selector onClick={() => this.props.onSelect({ isWashing: true })} backgroundImage={tiresImg}>
            Auton pesu
          </Selector>
          <Selector onClick={() => this.setState({ showModal: true })} backgroundImage={washImg}>
            Renkaiden vaihto
          </Selector>
        </Wrapper>
        <img src={require('assets/img/logo.png')} style={{marginTop: 40}} />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Title = styled.h1`
  color: #43BADE;
  font-size: 28px;
  font-weight: bold;
  padding: 50px;
`
const Selector = styled.div`
  border: 2px solid #F5F5F5;
  height: 250px;
  width: 450px;
  margin-left: 30px;
  display: flex;
  font-size: 40px;
  color: #fff;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${props => props.backgroundImage});
  background-repeat:no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  &:hover {
    opacity: 0.7;
  }
`
