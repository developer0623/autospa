import React from 'react'
import styled from 'styled-components'

export default class ServiceFooter extends React.Component {
  render () {
    return (
      <Footer>
        <FooterTitle>MEILTÄ AUTOSPASTA SAAT KAIKKI SEURAAVAT PALVELUT:</FooterTitle>
        <ImgContainer>
          <Service>
            <Img src={require('assets/img/icon/a1.png')} />
            <ServiceName>AUTOPESUT</ServiceName>
          </Service>
          <Service>
            <Img src={require('assets/img/icon/a2.png')} />
            <ServiceName>VAHAUKSET</ServiceName>
          </Service>
          <Service>
            <Img src={require('assets/img/icon/a3.png')} />
            <ServiceName>RENKAAT</ServiceName>
          </Service>
          <Service>
            <Img src={require('assets/img/icon/a4.png')} />
            <ServiceName>ILMASTOINTI-HUOLLOT</ServiceName>
          </Service>
          <Service>
            <Img src={require('assets/img/icon/a5.png')} />
            <ServiceName>LASIN-KORJAUKSET</ServiceName>
          </Service>
          <Service>
            <Img src={require('assets/img/icon/a6.png')} />
            <ServiceName>RENGAS-HOTELLI</ServiceName>
          </Service>
        </ImgContainer>
      </Footer>
    )
  }
}

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FooterTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
  padding-top: 10px;
`
const ImgContainer = styled.div`
  margin-top: 20px
  border-top: 2px solid #F7F7F7;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%
`
const Img = styled.img`
  height: 80px;
  width: 80px;
`
const Service = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const ServiceName = styled.p`
  color: #0D58A6
  font-weight: bold;
`
