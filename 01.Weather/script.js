let valueSearch = document.getElementById('valueSearch')
let city = document.getElementById('city')
let temperature = document.getElementById('temperature')
let description = document.querySelector('.description')
let clouds = document.getElementById('clouds')
let humidity = document.getElementById('humidity')
let presure = document.getElementById('presure')
let form = document.querySelector('form')
let main = document.querySelector('main')

let id = '9505fd1df737e20152fbd78cdb289b6a'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id

form.addEventListener('submit', (event) => {
    event.preventDefault()   //is used inside the event listener to prevent the browser's default behavior of submitting the form and reloading the page

    if(valueSearch != ''){
        searchWeather()
    }
})

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
    .then(responsive => responsive.json())
    .then(data => {
        console.log(data)

        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name
            city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png'

            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'
            temperature.querySelector('figcaption span').innerText = data.main.temp
            description.innerText = data.weather[0].description

            clouds.innerText = data.clouds.all
            humidity.innerText = data.main.humidity
            presure.innerText = data.main.pressure
        }
        else {
            main.classList.add('error')
            setTimeout(() => {
                main.classList.remove('error')
            }, 1000)
        }

        valueSearch.value = ''
    })
}

const initApp = () => {
    valueSearch.value = 'Washington'
    searchWeather()
}

initApp()