import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class CreateItem extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
		this.change = this.change.bind(this);
		this.submit = this.submit.bind(this);
	}

  render() {
    return (
      <div className="CreateItem">
        <header className="App-header">
          <div>
            <Link className="back" to="/">&#8592;</Link>
            <h2 className="create-title">Create new item</h2>
          </div>
        </header>
        <form className="create-form" onSubmit={this.submit}>
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
    const newItem = {
      text: this.state.text,
			id: Date.now(),
			comments: []
		};

		localStorage.setItem(this.state.text + '', JSON.stringify(newItem));

    this.setState(prevState => ({
      text: ''
    }));
  }
}

export default CreateItem;
