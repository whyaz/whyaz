$(document).ready(function(){

  var $contributorsList = $('.contributors-list');
  $.getJSON('/public/contributors', function(data){
    // We want to keep the hard coded contributors at the end
    var currentList = $contributorsList.html();
    $contributorsList.html('');
    for(var i=0; i<data.length; i++){
      $contributorsList.append('<li class="contributor"><a href="'+data[i].html_url+'"><img class="avatar" src="'+data[i].avatar_url+'"></a></li>');
    }
    $contributorsList.append(currentList);
  });

});