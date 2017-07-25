/**
 * Created by israelor on 25.7.2017.
 */
angular.module('starter.services')

.factory('roomsService', roomsService);

function roomsService(Database) {

	var service = {
		getAllRooms: allRooms
	};

	return service;

	function allRooms() {
		return Database.ref('/rooms').once('value');
	}
}
