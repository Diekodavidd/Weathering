const apiKey = "1113e11a5ef48a786fc9d79a1c31553d"; // Replace with your valid OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const futureForecast = document.getElementById("future-forecast");
const weatherInfo = document.querySelector(".weather-info");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// async function signIn() {
//     alert("Sign-in function called!");
//      try {
//         const emailInput = document.getElementById("emaill");
//         const passwordInput = document.getElementById("passwordd");

//         if (!emailInput || !passwordInput) {
//             console.error("Email or Password input field not found!");
//             return;
//         }

//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();

//         if (!email || !password) {
//             alert("Please enter your email and password.");
//             return;
//         }

//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Fetch user display name from Firebase
//         let username = user.displayName || "User";

//         console.log("User signed in:", user);
//         alert(`Welcome back, ${username}!`);

//         // **Update Navigation Bar**
//         const navAuth = document.getElementById("nav-auth");
//         if (navAuth) {
//             navAuth.innerText = `Hi, ${username}`;
//         }

//         // **Show and Hide Elements**
//         document.getElementById("get")?.style.display = "none";
//         document.getElementById("fetch")?.style.display = "flex";

//         // **Close the menu**
//         const menuBtn = document.querySelector(".menu-btn");
//         if (menuBtn) {
//             menuBtn.checked = false;
//         }

//     } catch (error) {
//         console.error("Sign-in Error:", error);
//         alert(`Error: ${error.message}`);
//     }
// };
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else if (response.status === 401) {
                throw new Error("Invalid API Key. Please check your OpenWeatherMap API key.");
            } else {
                throw new Error("Failed to fetch weather data. Try again later.");
            }
        }

        const data = await response.json();
        console.log(data);
        
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherInfo.style.display = "block";
}

document.getElementById("toggle-btn").addEventListener("click", function () {
    const currentWeather = document.getElementById("current-weather");
    const futureForecast = document.getElementById("future-forecast");
    
    if (futureForecast.style.transform === "rotateX(-90deg)" || futureForecast.style.transform === "") {
        futureForecast.style.transform = "rotateX(0deg)";
        futureForecast.style.opacity = "1";
        currentWeather.style.opacity = "0";
    } else {
        futureForecast.style.transform = "rotateX(-90deg)";
        futureForecast.style.opacity = "0";
        currentWeather.style.opacity = "1";
    }
});
const rainContainer = document.getElementById('rain-container');

function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('rain');
    
    // Random position
    raindrop.style.left = Math.random() * window.innerWidth + 'px';
    
    // Random animation duration
    raindrop.style.animationDuration = (Math.random() * 2 + 2) + 's';

    rainContainer.appendChild(raindrop);

    setTimeout(() => {
        raindrop.remove();
    }, 3000);
}

// Generate rain at intervals
setInterval(createRaindrop, 100);
async function getForecast(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch forecast data.");
        }

        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateForecastUI(data) {
    futureForecast.innerHTML = "<h3>Future Days Forecast</h3>";
    
    const forecastByDay = {};

    data.list.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        if (!forecastByDay[date]) {
            forecastByDay[date] = item;
        }
    });

    Object.keys(forecastByDay).slice(0, 5).forEach((day) => {
        const forecast = forecastByDay[day];
        const iconCode = forecast.weather[0].icon;
        const temp = Math.round(forecast.main.temp);
        const desc = forecast.weather[0].description;

        futureForecast.innerHTML += `<div class="day">${day} - <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${desc}"> ${desc} - ${temp}°C</div>`;
    });
}

function updateChat(season) {
    const chatHeader = document.getElementById("fade");
    const SumCon = document.getElementById("summerChat");
    const WitCon = document.getElementById("witerChat");
    const SprCon = document.getElementById("springChat");
    const AutCon = document.getElementById("autumnChat");
    const chatContainer = document.querySelector(".chat-container");
    
    const chatMessages = {
        summer: "Welcome to the Summer chat!",
        winter: "This is the Winter chat. Stay warm!",
        spring: "Spring chat is here! Flowers are blooming.",
        autumn: "Autumn vibes! Enjoy the falling leaves."
    };
   
    
       // Hide all chat sections first
       SumCon.style.display = "none";
       WitCon.style.display = "none";
       SprCon.style.display = "none";
       AutCon.style.display = "none";
   
       // Show the selected season chat container
       if (season === "summer") {
           SumCon.style.display = "block";
       } else if (season === "winter") {
           WitCon.style.display = "block";
       } else if (season === "spring") {
           SprCon.style.display = "block";
       } else if (season === "autumn") {
           AutCon.style.display = "block";
       }
   
    chatContainer.style.display = "block"; // Show chat container
    // chatHeader.textContent = season.charAt(0).toUpperCase() + season.slice(1) + " Chat";
    chatHeader.innerHTML = `<p>${chatMessages[season]}</p>`;
}


document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");
    const triggerImage = document.getElementById("triggerImage"); // Change to the actual image ID

    triggerImage.addEventListener("click", function () {
        chatContainer.style.display = "block"; // Show chat container
    });
});

function closeChat() {
    const chatContainer = document.querySelector(".chat-container");
    
    chatContainer.style.display = "none"; // Hide chat container
}