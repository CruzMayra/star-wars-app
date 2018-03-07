// función que busca la data y la 'cachea'
if(!localStorage.getItem('sw-data')) {
  $.post({
    url: 'https://swapi.apis.guru/',
    data: JSON.stringify({ "query": " { allFilms { films { title episodeID characterConnection { characters { name height mass hairColor skinColor } } } } } " }),
    contentType: 'application/json'
  }).done(function(response) {
    let swData = ('Fetched:', response.data.allFilms.films);
    localStorage.setItem('sw-data', JSON.stringify(swData));
  });
} else {
  getSwData(localStorage.getItem('sw-data'))
}

// función que obtiene la data 'cacheada'
function getSwData(data) {
  // console.log(data);
  let filmsData = JSON.parse(data)
  .forEach(film => {
    paintFilmsCard(film)
  })
}

// // función que pinta en html cada película
function paintFilmsCard(film){
  let templateCharacter = '';
  film.characterConnection.characters.forEach( item => {
    templateCharacter +=
    `<li data-toggle="modal" data-target="#character-detail" data-id="${item.name}">${item.name}</li>`
  })

  let card = '';
  card +=
  `<section class="col-lg-6 col-6 film-card">
    <div class="card">
      <div class="card-body">
        <h2 class="text-center">${film.title}</h2>
        <h3 class="text-center">Episode ${film.episodeID}</h3>
        <h3 class="text-center">Characters:</h3>
        <ul class="characters-container">
        ${templateCharacter}
        </ul>
      </div>
    </div>
  </section>`

  $('#films-container').append(card)
}

// función que crea los modales con los datos particulares del personaje
$('#character-detail').on('show.bs.modal', function (event) {
  let card = $(event.relatedTarget) // Button that triggered the modal
  let character = JSON.parse(localStorage.getItem('sw-data')).find(item => {
    return card.data('id')
  })
  console.log(character);
  let modal = $(this);
  modal.find('.name').text(character.name);
})
