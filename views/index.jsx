var React = require('react');
var ReactDOMServer = require('react-dom/server');
//var PropTypes = require('prop-types');
var Layout = require('./layout');
//var YouTube = require('react-youtube').default;
var ReactPlayer = require('react-player').default;

          //<YouTube videoId={this.props.videoid} onReady={this.onReady} />
// Contrived example to show how one might use Flow type annotations
function countTo(n:number):string {
  var a = [];
  for (var i = 0; i < n; i++ ) {
    a.push(i + 1);
  }
  return a.join(', ');
}

class Index extends React.Component {
  render() {
    /* const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters   n8d79M0LtfY <YouTube videoId='Uaf6JsCxqas' opts={opts} onReady={this.onReady} />
        autoplay: 1
      }
    }; */
    
    
    return (
      <Layout title={this.props.title}> 
        Video
        
          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
        
        
        <p>
          I can count to 10:
          {countTo(10)}
        </p>
      </Layout>
    );
  }
  
  /* _onReady(event) {
    // access to player in all event handlers via event.target 
    event.target.pauseVideo();
  }  */
}

ReactDOMServer.renderToString(<Index />);

/* Index.propTypes = {
  title: PropTypes.string.isRequired,
}; */

module.exports = Index;

//Invariant Violation: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. Check the render method of `Index`.