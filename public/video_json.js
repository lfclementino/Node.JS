$('#like').click(function(){
  $.post('/addLike', function(data) {
   $('#likes').html(data);
  });
  $('#like').attr('disabled','disabled').css('opacity',0.5);
  setTimeout(function(){$('#like').removeAttr('disabled').css('opacity',1)},10000);
});

function getLikes() {
 $.get('/likes', function(data) {
  $('#likes').html(data)
 })
}

function start() {
 getLikes();
 setInterval(getLikes,1000);
}

start();