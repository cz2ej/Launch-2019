import React from "react";
import axios from "axios";
import "./App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
export default class App extends React.Component {
  state = { name: [], id: [] };

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&opennow&key=" +
          API_KEY
      )
      .then(res => {
        var theName = res.data.results.map(name => name.name);
        console.log(theName);
        var ids = res.data.results.map(id => id.id);
        this.setState({
          name: theName,
          id: ids
        });
        console.log(this.state);
      });
  }
  render() {
    console.log(this.state.name);
    return (
      <div>
        <li>
          <ul>
            {this.state.name.map(maps => (
              <li>
                {" "}
                {maps} is in Charlottesville, VA and currently open for
                business!
              </li>
            ))}
          </ul>
        </li>
      </div>
    );
  }
}
