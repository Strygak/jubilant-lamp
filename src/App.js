import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
    this.state = { items: [] };
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sayer</h1>
          <p>World's most used time waster</p>
        </header>
        <Items items={this.state.items} />
        <p className="add">
          <Link className="plus" to="/create">+</Link>
        </p>
      </div>
    );
  }

  componentDidMount() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    this.setState(prevState => ({
      items: values
    }));
  }

}

class Items extends React.Component {
  delete(id) {
    let keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      if (JSON.parse(localStorage.getItem(keys[i])).id === id) {
        let tempItems = this.props.items;
        for (let j = 0; j < tempItems.length; j++) {
          if (id === tempItems[j].id) {
            tempItems.splice(i, 1);
          }
          break;
        }
        this.setState(prevState => ({items: tempItems}));
        localStorage.removeItem(keys[i]);
        break;
      }
    }
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}><Link to={"items/" + item.id}>{item.text}</Link>
          <button className="delete" onClick={() => this.delete(item.id)}>Delete</button>
          <span className="comments-amount">{item.comments.length}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
