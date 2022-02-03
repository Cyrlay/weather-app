const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=d33f32d45c69b55cc2ea90931c1f0d44'
const API_UNITS = '&units=metric'

const getWeather = () => {

    if (input.value === '') {
        alert('Enter city name.')
    } else {

        const city = input.value || 'Zielona Góra'
        const URL = API_LINK + city + API_KEY + API_UNITS

        axios.get(URL).then(res => {

            console.log(res)

            cityName.textContent = res.data.name
            temperature.textContent = Math.floor(res.data.main.temp) + ' ℃'
            humidity.textContent = res.data.main.humidity + '%'
            const status = Object.assign({}, ...res.data.weather)
            weather.textContent = status.main

            warning.textContent = ''
            input.value = ''

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', 'img/thunderstorm.png')
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', 'img/drizzle.png')
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', 'img/rain.png')
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', 'img/ice.png')
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', 'img/fog.png')
            } else if (status.id === 800) {
                photo.setAttribute('src', 'img/sun.png')
            } else if (status.id > 800 && status.id < 900) {
                photo.setAttribute('src', 'img/fog.png')
            } else {
                photo.setAttribute('src', 'img/unknown.png')
            }

        }).catch(() => warning.textContent = 'Invalid city name.')
    }
}

const enterCheck = (e) => {
    if(e.key === 'Enter'){
        getWeather()
    }
}

input.addEventListener('keyup',enterCheck)
button.addEventListener('click',getWeather)
