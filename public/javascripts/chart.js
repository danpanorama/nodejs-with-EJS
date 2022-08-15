window.addEventListener('load', (event) => {

console.log(document.getElementById('soldad').innerText)

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: [' sold', 'Likes', 'BadLike', 'commends'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'crimson',
            borderColor: 'black',
            data: [ document.getElementById('soldad').innerText, document.getElementById('like').innerText, document.getElementById('unsold').innerText, document.getElementById('commens').innerText]
        }]
    },

    // Configuration options go here
    options: {}
});

});

