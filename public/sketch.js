// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      //console.log(lat)
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
      weather = json.weather;
      //console.log(weather);
      //console.log(weather.description);
      document.getElementById('summary').textContent = weather.weather[0]["description"];
      document.getElementById('temp').textContent = weather.main["feels_like"];
      air = json.air_quality.list[0].components;//.results[0];
      console.log(air);
      document.getElementById('aq_city').textContent = weather["name"];
      //document.getElementById('aq_location').textContent = air.location;
      //document.getElementById('aq_parameter').textContent = air.measurements[0].parameter;
      document.getElementById('aq_value').textContent = air["pm2_5"];
      //document.getElementById('aq_units').textContent = air.measurements[0].unit;
      //document.getElementById('aq_date').textContent = air.measurements[0].lastUpdated;
    } catch (error) {
      console.error(error);
      air = { value: -1 };
      document.getElementById('air').textContent = 'No air quality reading was found.';
    }

    const data = { lat, lon, weather, air };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
  });
} else {
  console.log('geolocation not available');
}
