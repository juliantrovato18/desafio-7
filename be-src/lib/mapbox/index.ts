import * as mapboxgl from "mapbox-gl";
import MapboxClient from "mapbox";

const MAPBOX_TOKEN = process.env.TOKEN_MAPBOX;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export async function initMap(mapEl, lat, lng) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    return await new mapboxgl.Map({
      container: mapEl,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: 14
    });
  }


   export function initSearchForm(mapboxInput ,callback) {
          mapboxClient.geocodeForward(
              mapboxInput,
            
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
        
      }
  
      


