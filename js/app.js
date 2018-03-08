// función que busca la data y la 'cachea'
if(!localStorage.getItem('sw-data')) {
  $.post({
    url: 'https://swapi.apis.guru/',
    data: JSON.stringify({ "query": " { allFilms { films { title episodeID characterConnection { characters { name } } } } allPeople { people { name height mass hairColor skinColor } } } " }),
    contentType: 'application/json'
  }).done(function(response) {
    let swData = ('Fetched:', response.data);
    localStorage.setItem('sw-data', JSON.stringify(swData));
  });
} else {
  getSwData(localStorage.getItem('sw-data'))
}

// función que obtiene la data 'cacheada'
function getSwData(data) {
  let filmsData = JSON.parse(data)
  filmsData.allFilms.films.forEach(film => {
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

  $('#films-container').prepend(card)
}

// función que crea los modales con los datos particulares del personaje
$('#character-detail').on('show.bs.modal', function (event) {
  let card = $(event.relatedTarget) // Button that triggered the modal
  let character = JSON.parse(localStorage.getItem('sw-data')).allPeople.people.find(item => {
    return item.name === card.data('id')
  })
  let modal = $(this);
  modal.find('.name').text(character.name);
  modal.find('.character-height').text(character.height);
  modal.find('.character-mass').text(character.mass);
  modal.find('.character-hair-color').text(character.hairColor);
  modal.find('.character-skin-color').text(character.skinColor);
})
