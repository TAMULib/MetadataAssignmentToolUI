jQuery(document).ready(function() {
  'use strict';
  jQuery.simpleWeather({
    location: 'College Station, TX',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      var html;
      html = '<h2><i class="weather-icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.city+', '+weather.region+'</li></ul>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li>';
    
      jQuery('#weather').html(html);
    },
    error: function(error) {
      jQuery('#weather').html('<p>'+error+'</p>');
    }
  });
});