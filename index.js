const authorName = document.getElementById("authorName");
const currentTime = document.getElementById("time");
const currentDate = document.getElementById("date");
const weather = document.getElementById('weather')
const weatherIcon = document.getElementById('weather-icon')
let date = new Date()

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url('${data.urls.full}')`;
    authorName.textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage =
      "url(default-background.jpeg)";
    authorName.textContent = "Personal Dashboard";
  });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    // console.log(res.status);
    return res.json();
  })
  .then((data) => {
    document.getElementById("bitcoin-image").innerHTML = `<img src=${data.image.small}/>  <span>${data.name}</span>`;
    document.getElementById("bitcoin-price").innerHTML= `🎯: $${data.market_data.current_price.usd}`;
    document.getElementById("high").textContent = `👆: $${data.market_data.high_24h.usd}`;
    document.getElementById("low").textContent= `👇: $${data.market_data.low_24h.usd}`;
  })
  .catch((err) => {
    document.getElementById("bitcoin-image").innerHTML =
      "Coin info is not available at this moment";
    document.getElementById("bitcoin-image").style.marginTop = "30px";
    document.getElementById("bitcoin-price").textContent = "";
  });


function getCurrentTime(){
  const d = new Date();
  currentTime.textContent = d.toLocaleTimeString("en-us", {timeStyle:"short"});
}

currentDate.textContent = date.toLocaleDateString();

setInterval(getCurrentTime, 1000)


navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position.coords.latitude, position.coords.longitude)
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
  .then(res => {
      if(!res.ok){
        throw Error("weather data not available")
      }
      return res.json()
  })
  .then(data => {
    console.log(data)
    weather.innerHTML=`<div class="top-weather">
    <img id="degree-image" src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>
    <h1 id="degree-number">${Math.round(data.main.temp)}°</h1>
    </div>
    `

    weather.innerHTML += `<p id="weather-city">${data.name}</p>`
  


    console.log(data.weather[0].icon)
    })
  .catch(err => {
     console.error(err);
}) 

})

// Finding the icon of the weather
// https://openweathermap.org/weather-conditions
// adress for the icon images: http://openweathermap.org/img/wn/10d@2x.png

// Another way to make the catch block work if it does not reject the 404 error
// fetch("https://api.coingecko.com/api/v3/coins/dogecoins")
//     .then(res => {
//         if (!res.ok) {
//             throw Error("Something went wrong")
//         }
//         console.log(res.status)
//         return res.json()
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => console.error(err))

// document from stackoverflow
// A JavaScript Date has several methods allowing you to extract its parts:
// getFullYear() - Returns the 4-digit year
// getMonth() - Returns a zero-based integer (0-11) representing the month of the year.
// getDate() - Returns the day of the month (1-31).
// getDay() - Returns the day of the week (0-6). 0 is Sunday, 6 is Saturday.
// getHours() - Returns the hour of the day (0-23).
// getMinutes() - Returns the minute (0-59).
// getSeconds() - Returns the second (0-59).
// getMilliseconds() - Returns the milliseconds (0-999).
// getTimezoneOffset() - Returns the number of minutes between the machine local time and UTC.

// another way to get AMPM format
//  function formatAMPM(date) {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     let strTime = hours + ':' + minutes + ' ' + ampm;
//     return strTime;
//   }



// another way to get date of today
// let today = new Date();
// let date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}` 


