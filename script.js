let button = document.getElementById("start"); // Bouton
let app = document.getElementById("app"); // Notre container qui va accueillir le message
let dataExploit; // variable qui va accueillir les données

// ===== Pour accueillir les coordonnés que l'on va récupérer dans getCurrentPosition ====
let coordo = {
    lat: 0,
    lon: 0
}

// ========= Configuration de getCurrentPosition =========
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  coordo.lat = crd.latitude // On stocke les coordonnées dans notre objet "coordo"
  coordo.lon = crd.longitude
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// ===================================================

// ============ Fonction utilisant les coordonnées acquis plus haut pour appeller l'API et récupérer les données ============
async function getTemperature(coordo) {

    await fetch(`https://weather.contrateumdev.com.br/api/weather?lat=${coordo.lat}&lon=${coordo.lon}`)
        .then((response) => response.json())
        .then((data) => {
            dataExploit = data; // On stocke les données dans notre variable
        });

}


// ===================== Bouton permettant d'afficher la température ===========================
button.addEventListener("click", function(){

    
    app.innerHTML = `<p class="text-center font-semibold text-2xl">Récupération de la température ...</p>`;
    
    getTemperature(coordo);

    setInterval(() => {

        if (dataExploit) {
            app.innerHTML = `<p class="text-center font-semibold text-2xl">Il fait ${dataExploit.main.temp}° chez vous</p>`;
        } else {
            app.innerHTML = `<p class="text-center font-semibold text-2xl">Récupération de la température ...</p>`;
        }
        
    }, 50);





})