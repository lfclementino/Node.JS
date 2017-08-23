
/*
 * GET home page.
 , foo: {bar:'baz'}
 videoid: 'n8d79M0LtfY'
 */

exports.index = function(req, res){
  res.render('index', { title: 'Video Descomplica', foo: {bar:'baz'} });
};
