import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import axios from 'axios';

import EntryAdder from './components/EntryAdder';
import ReservationEntry from './components/ReservationEntry';

	var ID = function () {
	  return '_' + Math.random().toString(36).substr(2, 9);
	};

class ReservationList extends React.Component {

	constructor() {
		super();
		this.state = {
			reservations : []
		}
		this.addReservation = this.addReservation.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
		this.editReservation = this.editReservation.bind(this);
	}

	addReservation(reservation) {
		var reservations = this.state.reservations;
		reservations.push(reservation);

		console.log(reservations);

		this.setState({
			reservations : reservations
		})
	}

	editReservation(res) {
		var reservations = this.state.reservations;
		
		var index = _.findIndex(reservations, function(o) { return o.id == res.id; });
		var uri = '/reservation/' + reservations[index].id;

		reservations[index] = res;

		this.setState({
			reservations : reservations
		})
	}

	removeReservation(res) {
		var reservations = this.state.reservations;
		
		var index = _.findIndex(reservations, function(o) { return o.id == res.id; });
		var uri = '/reservation/' + reservations[index].id;

		reservations.splice(index,1);

		this.setState({
			reservations : reservations
		})
	}

	render() {

		const {reservations} = this.state;

		const ReservationEntries = reservations.map((reservation) => {
			return <ReservationEntry key={reservation.id} id={reservation.id} edit={this.editReservation} remove={this.removeReservation} firstname={reservation.firstname} lastname={reservation.lastname} number={reservation.number}/>
		})

		return (
			<div>
				<EntryAdder onAdd={this.addReservation}/>
				<ol>{ReservationEntries}</ol>
			</div>
		)
	}
}


ReactDOM.render(
	<MuiThemeProvider>
		<ReservationList/>
	</MuiThemeProvider>,
	document.getElementById('root')
);