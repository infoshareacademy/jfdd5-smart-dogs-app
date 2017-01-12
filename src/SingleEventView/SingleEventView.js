import React from 'react'
import {SingleMapView} from '../MapView'
import { places } from '../data'
import {Grid, Row, Col} from 'react-bootstrap'
import './SingleEventview.css'

import { connect } from 'react-redux'

const mapStateToProps = state => ({
  allEvents: state.eventsData.allEvents,
  favoriteEvents: state.favoritesData.favoritesEvents
})

const mapDispatchProps = dispatch => ({
   addEventToFavorites: (eventId) => dispatch({
    type: 'ADD_EVENT_TO_FAVORITES',
    eventId: eventId
  }),
  removeEventFromFavorites: (eventId) => dispatch({
    type: 'REMOVE_EVENT_FROM_FAVORITES',
    eventId: eventId
  })
})

const SingleEventView = props => {

  const placeOfEvent = places.find(
    place => place.events.indexOf(parseInt((props.params.eventId),10)) !== -1
  )

  return (
    <Grid>
      {
        props.allEvents.filter(
          event => event.id === parseInt((props.params.eventId),10)
        ).map(
          event =>
            <div className="singleEvent-container" key={event.id}>
              <Row>
                <Col sm={4} smOffset={2}>
                  <img className="event-img" role="presentation" src={process.env.PUBLIC_URL + '/img/events/' + event.image}/>
                </Col>
                <Col sm={4}>
                  {
                    props.favoriteEvents.indexOf(event.id) !== -1 ?
                      <button onClick={() => props.removeEventFromFavorites(event.id)}>
                       Usuń z ulubionych
                      </button> :
                      <button onClick={() => props.addEventToFavorites(event.id)}>
                        Dodaj do ulubionch
                      </button>
                  }
                  <br />
                  <hr />
                  <h1 className="event-name">{event.name}</h1>
                  <p>Data: {event.date}</p>
                  <p>Kategoria: {event.category}</p>
                  <p>Godzina: {event.hour}.00</p>
                  <p>Czas trwania: {event.duration} min</p>
                  <p>Cena: {event.price} PLN</p>
                  <p>Adres: {placeOfEvent.address}</p>
                  <p>Miasto: {placeOfEvent.city}</p>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col sm={6} smOffset={2}>
                  <p>{event.description}</p>
                </Col>
              </Row>
              <br/>
              <br/>
              <Row>
                <Col sm={6} smOffset={2}>
                  <SingleMapView event={props.params.eventId}/>
                  {console.log(props.params.eventId)}
                </Col>
              </Row>
            </div>
        )
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchProps)(SingleEventView)