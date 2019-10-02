const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationParam = document.querySelector('#location');
const forecastParam = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e)=>
{
    e.preventDefault();

    const location = search.value;

    locationParam.textContent = 'Loading...';
    forecastParam.textContent = '';

    fetch('/weather?location=' + location).then((response)=>
    {
        response.json().then((data) =>
        {
            if (data.error)
            {
                return locationParam.textContent = data.error;
            }
            locationParam.textContent = data.location;
            forecastParam.textContent = data.forecast;
        });
    });
});



