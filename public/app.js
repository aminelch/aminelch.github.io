
const openweatherKey = 'd766fef235784f384b36dd2bc1f6d9b1'
//http://api.openweathermap.org/data/2.5/weather?lat=35.8254&lon=10.6370&appid=d766fef235784f384b36dd2bc1f6d9b1
const weatherIcons = {
    'Rain': "wi wi-day-rain",
    'Clouds': "wi wi-day-cloudy",
    'Clear': "wi wi-day-sunny",
    'Snow': "wi wi-day-snow",
    'mist': "wi wi-day-fog",
    'Drizzle': "wi wi-day-sleet",
}
/** IL FAUT :
  1 savoir l'addressee IP de visiteur
  2 contacter une API pour savoir la localisation de l'utilisateur
  3 renvoyé la méteo
 */


/**
 *
 * @param {boolean} withIp indique si on va procèder en se basant sur l'ip de l'utilisateur ou sur le nom de la ville
 */
async function getMeteoInfos(withIp = true) {
    /**
     * Si withIp = true
     * on va chercher lip de l'utilisatuer et selon l'ip on deduira la ville puis on va afficher la meteo
     * SINON
     * on prend le contenut de span ville et on travaille avec  cette valeur
     */

    let weather, currentCity, openweatherURL
    if (withIp) {

         currentCity = await fetch(`https://ipinfo.io/?token=9218caedcca17b`)
            .then(result => result.json())
            .then(data => {
                return { city: data.city, loc: data.loc } // on retourne un obj au lieu d'un item
            })
            .catch(error => console.log(error))

        const commaPosition = currentCity.loc.indexOf(',')  // position de , dans la chaine
        const lon = currentCity.loc.substring(0, commaPosition)
        const lat = currentCity.loc.substring(commaPosition + 1, currentCity.loc.length)

         openweatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${openweatherKey}&lang=fr&units=metric`

         weather = await fetch(openweatherURL)
        .then(result => result.json())
        .then(data => {
            return {
                description: data.weather[0].description,
                main: data.weather[0].main,
                temp: data.main.temp,
                city: data.name,
                meteo: {
                    data
                }

            }
        })
        .catch(error => console.log(error))
    }
    else {

        //recuperer la ville depuis la span city
        currentCity= document.querySelector('#city').textContent

        openweatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${openweatherKey}&lang=fr&units=metric`

        weather = await fetch(openweatherURL)
       .then(result => result.json())
       .then(data => {
           return {
               description: data.weather[0].description,
               main: data.weather[0].main,
               temp: data.main.temp,
               city: data.name,
               meteo: {
                   data
               }

           }
       })
       .catch(error => console.log(error))

    }

    displayMeteoInfos(weather)
}

let displayMeteoInfos = (meteo) => {
    // if (!(meteo instanceof Object)) throw 'Param must be an Object';
    document.querySelector('#city').textContent = meteo.city
    document.querySelector('#temperature').textContent = meteo.temp
    document.querySelector('#description').textContent = meteo.description
    document.querySelector('i.wi').className = weatherIcons[meteo.main]
    document.querySelector('body').className = (meteo.main).toLowerCase()
    console.log(meteo.main.toLowerCase())
    console.log(meteo.meteo)


}

let city = document.querySelector('#city')

city.addEventListener('click', (e) => {
    //rendre le span editable
    city.contentEditable = true

})

city.addEventListener('keydown', (e) => {
    // keycode de la touche entrer
    if (e.keyCode == 13) {
        e.preventDefault()
        city.contentEditable = false
        getMeteoInfos(false)

    }

})

getMeteoInfos()

