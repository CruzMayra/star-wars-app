// función que busca la data y la 'cachea'
if(!localStorage.getItem('sw-films')) {
  $.ajax({
    url: `https://swapi.co/api/`
  }).done(getData)
} else {
  getData(localStorage.getItem('sw-films'))
}

// función que obtiene la data 'cacheada'
function getData(data) {
  $.ajax({
    url: `${data.films}`
  }).done(getFilmsData)
}

function getFilmsData(data){
  console.log(data);
  let films = data.results
  .forEach(film => {
    paintFilmsCard(film)
  })
}

// función que pinta en html cada película
function paintFilmsCard(films){
  let card = '';
  card +=
  `<section class="col-lg-3 col-8 film-card" data-toggle="modal" data-target="#film-detail" data-id="${films.episode_id}">
    <div class="card">
      <div class="card-body">
        <h2 class="text-center">Name: ${films.title}</h2>
        <h3 class="text-center">Episode ID: ${films.episode_id}</h3>
        <ul class="characters-container">
        </ul>
      </div>
    </div>
  </section>`

  $('#films-container').append(card)
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
