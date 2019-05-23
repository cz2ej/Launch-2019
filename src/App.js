import React from "react";
import axios from "axios";
import "./App.css";
import { Map, CircleMarker, TileLayer } from "react-leaflet";
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
      <div>
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={1}
          center={[-0.09, 51.505]}>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker
            center={[51.505, -0.09]} />

        </Map>
        <footer>
          <ul>
            {this.state.info.map(mapper =>
              (<li className="Restaurants">{mapper.name}<ul> Location: {mapper.formatted_address}<li>{mapper.price_level}</li></ul></li>)
            )}












          </ul>
        </footer>






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