import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class ItemDetails extends Component {
	constructor(props) {
		super(props);
    this.state = { item: {}, text: '', comments: [] };
    this.change = this.change.bind(this);
		this.submit = this.submit.bind(this);
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link className="back" to="/">&#8592;</Link>
            <h2 className="item-title">{this.state.item.text}</h2>
          </div>
        </header>
        <Comments comments={this.state.item.comments} />
				<form className="add-comment" onSubmit={this.submit}>
          <input
            onChange={this.change}
            value={this.state.text}
          />
          <button>
					  &#62;
          </button>
        </form>
      </div>
    );
	}
	
	change(e) {
    this.setState({ text: e.target.value });
	}

	submit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    
    localStorage.removeItem(this.state.item.text);

    let tempItem = this.state.item;
    tempItem.comments.push(this.state.text);

    this.setState({item: tempItem});

		localStorage.setItem(this.state.item.text + '', JSON.stringify(this.state.item));

    this.setState(prevState => ({ text: '' }));
  }

  componentWillMount() {
    let keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      if (JSON.parse(localStorage.getItem(keys[i])).id === +this.props.match.params.id) {
        this.setState(prevState => ({
          item: JSON.parse(localStorage.getItem(keys[i]))
        }));
        break;
      }
    }
  }

}

class Comments extends React.Component {
  render() {
    return (
      <ul className="comments">
        {this.props.comments.map((comment, i) => (
          <li key={i} className="row">
            <div className="column left"><p className="cube"></p></div>
            <div className="column right"><p>{comment}</p></div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ItemDetails;
