
async function locationObject(location) {
    console.log('location', location)
    let newLocation = {
        city: location ? location.city : null,
        state: location ? location.state : null,
        country: location ? location.country : null,
        address: location ? location.address : null,
        geometry: {
            latitude: (location.coordinates && location.coordinates.length) ? location.coordinates[1] : 0,
            longitude: (location.coordinates && location.coordinates.length) ? location.coordinates[0] : 0
        }
    }

    return newLocation;
}

module.exports = {
    locationObject,
};