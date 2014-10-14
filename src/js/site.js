$(document).ready(function(){
  $('.social-feed-container').socialfeed({
    // TWITTER
    twitter:{
      accounts: ['#whyaz -RT'],
      limit: 20,
      consumer_key: 'DUtm3KoTGnsKQ9v09seWlYWqP', // make sure to have your app read-only
      consumer_secret: '9PiruhZGrZz3QkZT31gbps52jcuyUkBbQSDccT95r7uJyiPOY1', // make sure to have your app read-only
    },
    // INSTAGRAM
    instagram:{
      accounts: ['#whyaz'],
      limit: 20,
      client_id: '922c1c27ecc8401b9dff1215013efe8b'
    },
    // GENERAL SETTINGS
    length:400,
    show_media:true,
    // Moderation function - if returns false, template will have class hidden
    moderation: function(content){
        return  (content.text) ? content.text.toLowerCase().indexOf('whyaz') > -1 : true;
    },
    update_period: 30000,
    template: "/public/js/templates/feedElement.html"
  });

  $('form button[type="submit"]').click(
    function(event) {
      event.preventDefault();

      var data = {
        name: $('form input[name="name"]').val(),
        email: $('form input[name="email"]').val(),
        twitter: $('form input[name="twitter"]').val(),
        message: $('form textarea[name="message"]').val()
      };

      $.ajax({
        url: 'http://localhost:8081/send-message',
        type: 'post',
        data: data,
        success: function(data, status) {
          console.log(data);
        }
      });
    });

});