$(document).ready(function(){

  var isSending = false;
  var SENT_ERROR_MESSAGE = "Sorry, it appears there was an issue sending your message. Try us again later?";
  var NO_IDENTITY_MESSAGE = "An email or twitter handle is required.";
  var NO_MESSAGE_ERROR = "A message is required.";

  $('.social-feed-container').socialfeed({
    // TWITTER
    twitter:{
      accounts: ['#whyaz -RT -DesertHorizonQC'],
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

  function isValid(data) {
    var ret = true;

    if (!data.email && !data.twitter) {
      ret = false;
    }

    if (!data.message || data.message.length < 1) {
      ret = false;
    }

    return ret;
  }

  $('form button[type="submit"]').click(
    function(event) {
      event.preventDefault();
      if (isSending) return;
      // This is for those silly robots
      if ($('form input[name="email2"]').val()) return;

      var data = {
        name: $('form input[name="name"]').val(),
        email: $('form input[name="email"]').val(),
        twitter: $('form input[name="twitter"]').val(),
        message: $('form textarea[name="message"]').val()
      };

      if (data.twitter && data.twitter.indexOf('@') < 0) {
        data.twitter = '@'+data.twitter;
      }

      if (isValid(data)) {
        $.ajax({
          url: '/send-message',
          type: 'post',
          data: data,
          complete: function (data) {
            isSending = false;

            $('form button[type="submit"]').toggleClass('sending', isSending);
            $('.error').toggleClass('hidden', data.status === 200);
            $('.success').toggleClass('hidden', data.status !== 200);

            if (data.status >= 400 && data.status <= 599) {
              $('.error').html(SENT_ERROR_MESSAGE);
            } else {
              $('form input[name="name"]').val('');
              $('form input[name="email"]').val('');
              $('form input[name="twitter"]').val('');
              $('form textarea[name="message"]').val('');
            }
          }
        });

        isSending = true;
        $('form button[type="submit"]').toggleClass('sending', isSending);
      } else {
        console.log(isValid(data));
        $('.error').toggleClass('hidden', isValid(data));

        if (!data.message) {
          $('.error').html(NO_MESSAGE_ERROR);
        } else {
          $('.error').html(NO_IDENTITY_MESSAGE);
        }

      }

    });

});