const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2VhbmVkZXYiLCJhIjoiY2t6NjA4aWQ0MHZyMjJvbXBtY2o0OGNyZSJ9._aFiRBTfp3-1Z4zwW4I5pg";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
  });
}

export function initSearchForm(callback) {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mapboxClient.geocodeForward(
      e.target.q.value,
      {
        country: "ar",
        autocomplete: true,
        language: "es",
      },
      function (err, data, res) {
        console.log(data);
        if (!err) callback(data.features);
      }
    );
  });
}

(function () {
  window.map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);
    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
})();
