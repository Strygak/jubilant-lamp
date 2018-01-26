import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import CreateItem from './CreateItem';
import ItemDetails from './ItemDetails';

ReactDOM.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
	  <div>
			<Route exact path="/" component={App} />
			<Route exact path="/create" component={CreateItem} />
			<Route exect path="/items/:id" component={ItemDetails} />
		</div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
