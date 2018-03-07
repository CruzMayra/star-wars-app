// función que busca la data y la 'cachea'
if(!localStorage.getItem('sw-data')) {
  $.post({
    url: 'https://swapi.apis.guru/',
    data: JSON.stringify({ "query": " { allFilms { films { title episodeID characterConnection { characters { name height mass hairColor skinColor } } } } } " }),
    contentType: 'application/json'
  }).done(function(response) {
    // console.log(response);
    let swData = ('Fetched:', response.data.allFilms.films);
    localStorage.setItem('sw-data', JSON.stringify(swData));
  });
} else {
  getSwData(localStorage.getItem('sw-data'))
}

// función que obtiene la data 'cacheada'
function getSwData(data) {
  let filmsData = JSON.parse(data)
  .forEach(film => {
    paintFilmsCard(film)
  })
}

// // función que pinta en html cada película
function paintFilmsCard(film){
  let card = '';
  card +=
  `<section class="col-lg-6 col-6 film-card">
    <div class="card">
      <div class="card-body">
        <h2 class="text-center">${film.title}</h2>
        <h3 class="text-center">Episode ${film.episodeID}</h3>
        <h3 class="text-center">Characters:</h3>
        <ul class="characters-container">
        </ul>
      </div>
    </div>
  </section>`

  $('#films-container').append(card)
  getCharacters(film.characterConnection.characters)
}

// función que itera sobre el arreglo que contiene los personajes
function getCharacters(array) {
  console.log(array);
  return array.forEach(item => {
    let character = ``
    character += `<li data-toggle="modal" data-target="#character-detail" data-id="${item.name}">${item.name}</li>`
    $('.characters-container').append(character)
  })
}

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
