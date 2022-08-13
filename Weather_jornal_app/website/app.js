// Date instance
let d = new Date();
let newDate = d.toDateString();

// // Personal  API

const myAPI = ",&appid=d24bf70d6dae818a6893be61edd0ae3c&units=metric"; // &units=metric to get the Celsius Temperature

//  retrieve weather information from his API (country : US) as default
const ApiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";



// the URL of server
const my_server = "http://127.0.0.1:4000";

// showing the error
const err = document.getElementById("error");
const showChandes = async () => {
  const response = await fetch(my_server + "/all");
  try {
    const savedData = await response.json();

    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (err) {
    console.log(err);
  }
};

const generateTheData = function generate() { 

  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    
    if (data) {
      const {
        main: { temp }, name: city,weather: [{ description }],
      } = data;

      const info = {
        newDate, city,
        temp: Math.round(temp), // to avoid floating numbers
        description,feelings,
      };

      postData(my_server + "/add", info);
      showChandes();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};


// Function called by event listener
document.getElementById("generate").addEventListener("click", generateTheData);
//I can use the below code to make data showen when I press enter

/*document.getElementById("generate").addEventListener("keyup", (e)=>{
  if (e.keyCode === 13 )
  {
    generateData();
  }
});*/

//Function to GET Web API Data
const getWeatherData = async (zip) => {
  try {
    const response = await fetch( ApiURL+ zip +  myAPI);
    const data = await response.json();

    if (data.cod != 200) { // 200 means sucessfull status
      // display the error message on UI
      err.innerHTML = data.message;
      setTimeout( ()=> err.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(`Data is just saved`, newData);
    return newData;
  } catch (err) {
    console.log(err);
  }
};



