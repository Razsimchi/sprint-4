import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/car.actions.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { stationService } from '../services/station.service.local.js';
import { StationList } from '../cmps/station-list.jsx';

export function StationIndex() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    try {
      const loadedStations = await stationService.query();
      setStations(loadedStations);
      console.log(loadedStations);
    } catch (error) {
      showErrorMsg('Cannot load stations');
    }
  }

  return (
    <div className="stations">
      <h2>Spotify Playlists</h2>
      <StationList stations={stations} />
    </div>
  );
}