import React/*, { Component }*/ from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
//import ReactDOM from 'react-dom'
//import mountNode from 'react'

const Card = (props) => {
	return (
  	<div>
    	<div>{props._id}</div>
		<div>{props.activityId}</div>
		<div>{props.kid_id}</div>
		<div>{props.sender_id}</div>
		<div>{props.category_id}</div>
		<div>{props.date}</div>
		<div>{props.time}</div>
		<div>{props.text}</div>
		<div>{props.p}</div>
		<img width="75" src={"data:image/"+props.photoType+";base64,"+props.photo} alt="" />
    </div>
  );
};

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card key={card._id} {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state = { kid: '', date: '' }
	handleSubmit = (event) => {
		event.preventDefault();
	axios.get(`http://localhost:5000/api/activities/kid/${this.state.kid}/date/${this.state.date}`)
			.then(resp => {
				this.props.onSubmit(resp.data);
        //this.setState({kid: '', date: ''});
			});
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text"
					value={this.state.kid}
					onChange={(event) => this.setState({kid: event.target.value})}
					placeholder="Kid Id" required />
				<br/>
				<input type="text"
					value={this.state.date}
					onChange={(event) => this.setState({date: event.target.value})}
					placeholder="Date (yymmdd)" required />
				<button type="submit">Search</button> 
			</form>
		);
	};
}

class App extends React.Component {
	state = {
		cards: []
	};

	search = (cardInfo) => {
		this.setState(() => ({
    	cards: cardInfo
    }));
	};
	
	render() {
		return (
			<div>
				<Form onSubmit={this.search} />
				<CardList cards={this.state.cards} />
			</div>
		);
	};
}

//ReactDOM.render(<App />, mountNode);

export default App;
