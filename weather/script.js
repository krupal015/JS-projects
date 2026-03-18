document.addEventListener('DOMContentLoaded',()=> {
    let CityInput = document.getElementById("city-input");
    let weatherButton = document.getElementById("get-weather-btn");
    let weatherInfo =  document.getElementById("weather-info");
    let citynameDisplay = document.getElementById("city-name");
    let temprature = document.getElementById("temperature");
    let errorMessage =document.getElementById("error-message");
    let disciptionDisplay = document.getElementById("error-message");

    const API_KEY =  "5f56d525d1619d0a2cd2eac4ce55588e";

    weatherButton.addEventListener('click' , async () => {
        const city = CityInput.value.trim();
        if(!city) return;

        try{
                const weatherData = await fetchWeatherData(city);
                DisplayWeatherData(weatherData);
        }catch(error){
            showErrorMessage();
        }


    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        let response = await fetch(url);
        console.log(typeof response)
        console.log("response",response)


        if(!response.ok){
            console.log("city not found");
        }
        const data = await response.json();
        return data;
    }


    function DisplayWeatherData(data){
        console.log(data);

        const{name ,main , weather} = data;
        citynameDisplay.textContent = name;
        temprature.textContent= `temperature : ${main.temp}`
        weatherInfo.textContent = `Weather : ${weather[0].description}`


         weatherInfo.classList.remove("hidden");
         errorMessage.classList.add("hidden");
    }

    function showErrorMessage(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden")
    }
})