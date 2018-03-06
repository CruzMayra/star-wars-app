// función que busca la data y la 'cachea'
if(!localStorage.getItem('sw-films')) {
  $.post({
    url: 'http://graphql.org/swapi-graphql/',
    data: JSON.stringify({ "{ { allFilms { films { title episodeID characterConnection { characters { name height mass hairColor skinColor } } } } } }" }),
    contentType: 'application/json'
  }).done(function(response) {
    console.log(response);
    let swData = ('Fetched:', response.data.allFilms);
    localStorage.setItem('data', JSON.stringify(swData));
  });
} else {
  getPokemonsData(localStorage.getItem('sw-films'))
}


// función que obtiene la data 'cacheada'
function getFilmsData(data) {
  let filmsData = JSON.parse(data)
  console.log(filmsData);
  // .forEach(pokemon => {
  //   paintPokemonCard(pokemon);
  // })
}

// función que pinta en html cada pokemon
// function paintPokemonCard(pokemon){
//   let card = '';
//   card +=
//   `<section class="col-lg-3 col-8 pokemon-card" data-toggle="modal" data-target="#pokemon-detail" data-id="${pokemon.id}">
//     <div class="card">
//       <img class="card-img-top img-fluid rounded mx-auto d-block" src="${pokemon.image}" alt="pokemon-${pokemon.name}">
//       <div class="card-body">
//         <h2 class="text-center">${pokemon.name}</h2>
//       </div>
//     </div>
//   </section>`
//
//   $('#pokemons-container').append(card)
// }
//
// // función que filtra los pokemones
// function filterPokemons(){
//   let searchPokemon = $filterInput.val().toLowerCase();
//   $('#pokemons-container').empty();
//   if($filterInput.val().trim().length > 0){
//     var filteredPokemons = JSON.parse(localStorage.getItem('data')).filter( pokemon => {
//       let nameMatch = pokemon.name.toLowerCase().indexOf(searchPokemon) >=0
//       return nameMatch
//     }).forEach(pokemon => {
//       paintPokemonCard(pokemon)
//     })
//     $('#pokemons-container:empty').html('<p class="h1">Lo sentimos, no encontramos coincidencias <i class="fa fa-frown-o" aria-hidden="true"></i></p>');
//   } else {
//     $('#pokemons-container').empty();
//     JSON.parse(localStorage.getItem('data')).forEach(pokemon => {
//       paintPokemonCard(pokemon)
//     })
//   }
// }
//
// // función que crea los modales con los datos particulares del pokemon
// $('#pokemon-detail').on('show.bs.modal', function (event) {
//   let card = $(event.relatedTarget) // Button that triggered the modal
//   let pokemon = JSON.parse(localStorage.getItem('data')).find( pokemon => {
//     return pokemon.id === card.data('id')
//   })
//   var modal = $(this)
//   modal.find('.modal-title').text(pokemon.name);
//   modal.find('.modal-img').attr('src',pokemon.image);
//   modal.find('.classification').text(pokemon.classification);
//   modal.find('.type').empty().text(createTypesButtons(pokemon.types));
//   modal.find('.height').text(pokemon.height.maximum);
//   modal.find('.weight').text(pokemon.weight.maximum);
//   modal.find('.resistant').empty().text(createResistantButtons(pokemon.resistant));
//   modal.find('.weaknesses').empty().text(createWeaknessesButtons(pokemon.weaknesses));
// })
//
// // función que crea botones 'type' del modal
// function createTypesButtons(array){
//   return array.forEach(item => {
//     var templateButton = '';
//     templateButton += `<button type="button" class="btn btn-sm ${item}">${item}</button>`
//     $('.type').append(templateButton)
//   })
// }
//
// // función qye crea botoenes 'resistant' del modal
// function createResistantButtons(array){
//     return array.forEach(item => {
//       var templateButton = '';
//       templateButton += `<button type="button" class="btn btn-sm ${item}">${item}</button>`
//       $('.resistant').append(templateButton)
//     })
// }
//
// // función que crea los botones 'weaknesses' del modal
// function createWeaknessesButtons(array){
//     return array.forEach(item => {
//       var templateButton = '';
//       templateButton += `<button type="button" class="btn btn-sm ${item}">${item}</button>`
//       $('.weaknesses').append(templateButton)
//     })
// }
