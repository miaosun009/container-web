import React, { useState } from 'react';
import less from './less/index.less';
import CssModule from 'react-css-modules';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { connect } from 'dva';

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const mapOptions = {
  disableDefaultUI: true,
  styles: mapStyles,
};
const CustomMarker = ({ id, cid, lng, lat }: any) => {
  const [open, setOpen] = useState(false);
  return <Marker key={id} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)} position={{ lng, lat }} children={open && <InfoWindow children={<div style={{color:'#000'}}>{cid}</div>} />} />;
};
const MyMapComponent = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap defaultZoom={4} defaultCenter={props.defaultCenter} center={props.defaultCenter} defaultOptions={mapOptions}>
      {props.containerStore && props.containerStore.map((item: any, index: number) => <CustomMarker key={index} {...item} />)}
    </GoogleMap>
  )),
);

const Map = (props:any) => {
  console.info(props.defaultCenter);
  return (
    <div styleName="map-box">
      <MyMapComponent containerStore={props.containers} defaultCenter={props.defaultCenter} containerElement={<div style={{ height: `100%` }} />} mapElement={<div style={{ height: `100%` }} />} googleMapURL="http://ditu.google.cn/maps/api/js?v=3.exp&key=AIzaSyAPC1r2cUvl0RturJBdMgqnUpg0JL3mmVY&language=en" loadingElement={<div style={{ height: `100%` }} />} isMarkerShown={true} />
    </div>
  );
};

function mapStateToProps(state: any) {
  const { containers,defaultCenter } = state.container;
  return { containers,defaultCenter };
}

export default connect(mapStateToProps)(CssModule(Map, less));
