import { readFile } from 'fs/promises';

async function readJSONDataFromFile( filePath ) {
  try {
    return JSON.parse( await readFile( filePath, { encoding: 'utf8' } ) );
  } catch (error) {
    return [];
  }
}

const locations = await readJSONDataFromFile( './api/datasources/locations_data.json' );

class LocationsAPI {
  getAllLocations() {
    return locations;
  }

  getLocation(id) {
    return locations.find(l => l.id === id);
  }
}

export default LocationsAPI;