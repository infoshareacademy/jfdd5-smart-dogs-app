import React from 'react'
import {Col, Thumbnail, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import {events} from '../data'
import './EventsListView.css';

export default (props) => {
  return (
    <div>
      {
        (props.events || events).map(event =>
          <Col xs={6} sm={3} key={event.id}>
            <Link to={'/events/' + event.id}>
              <Thumbnail bsClass="event-thumbnail" src={process.env.PUBLIC_URL + '/img/' + event.image} alt="242x200" responsive>
                <h3>{event.name}</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="primary">Cena</Button>&nbsp;
                  <Button bsStyle="default">Data</Button>
                </p>
              </Thumbnail>
            </Link>
          </Col>
        )
      }
    </div>

  )
}
