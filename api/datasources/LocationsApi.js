import path from 'path';
import { readFileSync } from 'fs';
const { locations } = JSON.parse( readFileSync( path.resolve( process.cwd(), 'api/datasources/locations_data.json' ), { encoding: 'utf8' } ) );

class LocationsAPI {
  getAllLocations() {
    return locations;
  }

  getLocation(id) {
    return locations.find(l => l.id === id);
  }
}

export default LocationsAPI;