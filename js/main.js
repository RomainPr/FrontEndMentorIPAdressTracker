const mymap = L.map ('MyMap').setView ([51.505, -0.09], 13);
const api_key = 'at_aHFkrNgZeYZeMmi7SvDGRe1pb4lYS';
var input = document.getElementById ('submitIP');
let myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [45, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -52],
})

L.tileLayer (
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGhhbnRvbW96IiwiYSI6ImNraGp0M2F3eTE0eHEydG8xN2FzbjV1eDQifQ.Np9rILbmNHfMt6429oH0UA',
  }
).addTo (mymap);

window.onload = function() {
  axios
    .get (
      'https://geo.ipify.org/api/v1?apiKey=at_aHFkrNgZeYZeMmi7SvDGRe1pb4lYS'
    )
    .then (function (response) {
      $ ('#ipaddress').text (response.data.ip);
      $ ('#location').text (
        response.data.location.city +
          ', ' +
          response.data.location.region +
          ', ' +
          response.data.location.country +
          ' ' +
          response.data.location.postalCode
      );
      $ ('#timezone').text ('utc ' + response.data.location.timezone);
      $ ('#isp').text (response.data.isp);
      let lat = response.data.location.lat;
      let lng = response.data.location.lng;
      mymap.setView ([lat, lng], 13);
      L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
    })
    .catch (function (error) {
      // handle error
    })
    .then (function () {
      // always executed
    });
}

input.addEventListener ('click', function () {
  var ipaddress = document.getElementById ('IPtext').value;

  if (ipaddress == '') {
    alert ("Merci d'entrer une adresse IP valide");
  } else {
    axios
      .get (
        'https://geo.ipify.org/api/v1?apiKey=at_aHFkrNgZeYZeMmi7SvDGRe1pb4lYS&ipAddress=' +
          ipaddress
      )
      .then (function (response) {
        $(".leaflet-marker-icon").remove();
        $ ('#ipaddress').text (response.data.ip);
        $ ('#location').text (
          response.data.location.city +
            ', ' +
            response.data.location.region +
            ', ' +
            response.data.location.country +
            ' ' +
            response.data.location.postalCode
        );
        $ ('#timezone').text ('utc ' + response.data.location.timezone);
        $ ('#isp').text (response.data.isp);
        let lat = response.data.location.lat;
        let lng = response.data.location.lng;
        mymap.setView ([lat, lng], 13);
        L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
      })
      .catch (function (error) {
        // handle error
      })
      .then (function () {
        // always executed
      });
  }
});