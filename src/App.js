/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import axios from "axios";
import "./App.css";
import { Map, CircleMarker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = process.env.REACT_APP_API_KEY;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: [] };
  }
  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&opennow&key=" +
        API_KEY
      )
      .then(res => {

        const info = res.data.results;


        this.setState({
          info: info
        });
        console.log(this.state);
      });
  }
  render() {
    console.log(this.state.name);
    return (
      <div className="page">
        <h1 className='heading1'>Restaurants Open in Charlottesville</h1>


        <p>
          <ul>
            {this.state.info.map(mapper =>
              (<li className="Restaurants">{mapper.name}<ul> Location: {mapper.formatted_address}<li>{"$".repeat(mapper.price_level)}</li><li>Rating: {mapper.rating}</li></ul></li>)
            )}
          </ul>
        </p>


        <p className="Open">
          <Map
            style={{ height: "480px", width: "100%" }}
            zoom={11}
            center={[38.036, -78.50]}>
            <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {this.state.info.map(mapper => {
              console.log(mapper)
              return (<CircleMarker center={[mapper.geometry.location.lat, mapper.geometry.location.lng]}>
                <Popup> <li>{mapper.name}
                </li><li> Rating: {mapper.rating}</li></Popup>

              </CircleMarker>)
            })}


          </Map>



        </p>






      </div>

    );
  }
}

/*<div>
  <li>
    <ul>
      {this.state.name.map(maps => (
        <li>
          {maps} is in Charlottesville, VA and currently open for
          business!
        </li>
      ))}
    </ul>
  </li>
</div>*/