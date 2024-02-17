/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/
(function($){
  $.ajax({
    url: 'http://api.tvmaze.com/shows'}).then(function showlist(shows){
      shows.forEach(show => {
        $('#tvShowList').append(`
          <li><a href="${show._links.self.href}">${show.name}</a></li>
        `);
      });
      
      $('#tvShowList').show();
    });

  $('#searchShows').submit(event => {
    event.preventDefault();
    
    const query = $('#show_search_term').val().trim();
    const errorContainer = $('#errorContainer');
    if(!query) {
      errorContainer.text('Please enter a valid show name.');
      return;
    }
    errorContainer.text('');
    $('#tvShowList').empty();
  
    $.ajax({
      url: `http://api.tvmaze.com/search/shows?q=${query}`}).then(function search(shows){
        if(shows.length === 0){
          const errorContainer = $('#errorContainer');
          errorContainer.text('No shows found with that search term enter different search term');
        }
        else{
          shows.forEach(show => {
            $('#tvShowList').append(`
              <li><a href="${show.show._links.self.href}">${show.show.name}</a></li>  
            `);
          });
          $('#tvShowList').show();
          $('#rootLink').show();
        }
      });
  });
  
  $('#tvShowList').on('click', 'a', event => {
    event.preventDefault();
    
    $('#tvShowList').hide();
    $('#showDetails').empty();
  
    const showUrl = event.target.href;
    
    $.ajax({
      url: showUrl}).then(function details(show){
        let image = show.image ? show.image.medium : '/noimage.jpg';
  
        $('#showDetails').append(`
          <h1>${show.name}</h1>
          <img src=${image}>
  
          <dl>
            <dt>Language</dt>
            <dd>${show.language || "N/A"}</dd>
            <dt>Genres</dt>
            <dd>
              <ul>
                ${show.genres.map(genre => `<li>${genre}</li>`).join('') || 'N/A'}
              </ul>
            </dd>
            <dt>Average Rating</dt>
            <dd>${show.rating?.average || 'N/A'}</dd>
            <dt>Network</dt>
            <dd>${show.network && show.network.name ? show.network.name : "N/A"}</dd>
            <dt>Summary</dt>
            <dd>${show.summary || 'N/A'}</dd>
          </dl>
        `);
        $('#showDetails').show();
        $('#rootLink').show();
      });
  });
})(window.jQuery);