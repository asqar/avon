import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MapPin } from 'react-feather'

let mapkey = 'AIzaSyC6IwDk14O_G7kx_5ubE2_DnS5_B_jCGpc'

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 54.864961,
      lng: 69.148632
    },
    zoom: 14
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapkey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={54.864374} lng={69.146604} text={'Колхозный рынок'} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default GoogleMap

const Marker = () => {
  return (
    <div style={{ color: 'red' }}>
      <MapPin />
    </div>
  )
}
