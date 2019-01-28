//Global Variables
var carsArray = ['Ferrari', 'Audi', 'Subaru', 'Mclaren', 'Porsche', 'BMW', 'Lamborghini', 'Ford', 'Volkswagen', 'Tesla'];
var favorites;

//Create Buttons from carsArray
for(var i=0; i<carsArray.length;i++){
    var newButton = $('<button>').text(carsArray[i]).attr('class','carButton');
    $('#buttons').append(newButton);
};

//Loads favorite cars into favorites from favorites array
function addCarsToFavorites(favorites){
    $('#favorites').empty();
    $('#favorites').append($('<div id="favorites-text">Favorites</div>'));
    for(var i=0;i<favorites.length;i++){
        $('#favorites').append($('<div>' + favorites[i]));
    };
};

//Takes cars from localStorage and puts them in favorites
function loadSavedFavorites(){
    if(localStorage.getItem('favorites') !== null){
        favorites = (JSON.parse(localStorage.getItem('favorites')));
        addCarsToFavorites(favorites)        ;
    } else {
        favorites = [];
    };
};
loadSavedFavorites();

//Click handler for car buttons at the top of the page
$(document).on('click', '.carButton', function(){
    $('#photos').empty();
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?api_key=2WU4PYcRUv7T886W3C56ImE48Qdl0J7U&q=" + this.innerHTML,
        method: "GET"
        }).then(function(response) {
            for(var i=0;i<10;i++){
                $('#photos').append($('<div class="gif-div">')
                .append($('<button class="parent-gif-button"><img class="gif" state="still" src="' + response.data[i].images.fixed_height_still.url + '" still-src="' +response.data[i].images.fixed_height_still.url + '" gif-src="' + response.data[i].images.fixed_height.url +'"/></button>'))
                .append($("<button>").text('Add to favorites').attr('id','gif-button'))
                );                
            };
        });
});


//Click handler to alter between gif and still image
$(document).on('click', '.gif', function(event) {
    if($(this).attr('state') === 'still'){
        $(this).attr('src',$(this).attr('gif-src'));
        $(this).attr('state','gif');
    } else if($(this).attr('state') === 'gif'){
        $(this).attr('src',$(this).attr('still-src'));
        $(this).attr('state','still');
    };
  });

//Click handler for input field to create new button based on user input
$('#addCar').on('click',function(){
    var input = $('#inputCar').val();
    if(input !== '' && carsArray.indexOf(input) === -1){
        var newButton = $('<button>').text(input).attr('class', 'carButton');
        $('#buttons').append(newButton);
        carsArray.push(input);
    } ;
});


//Click handler for button below each image to either add it to favorites or remove it from favorites
$(document).on('click', '#gif-button', function(event) {
    if($(this).text()==='Remove'){
        var thisButton = $(this).parent()[0].innerHTML;
        var thisIndexinFavorites = favorites.indexOf(thisButton);
        favorites.splice(thisIndexinFavorites,1);
        addCarsToFavorites(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        $(this).parent().css('display','none');
        $(this).text('Remove');
        favorites.push($(this).parent()[0].innerHTML);
        addCarsToFavorites(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } ;
});






