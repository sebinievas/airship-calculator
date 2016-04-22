var React = require('react');
var ReactDOM = require('react-dom');
var SpecControls = require('./spec-controls');

var App = React.createClass({
  render: function() {
    return <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SpecControls />
        </div>
        <div className="col-md-6">
        </div>
        <div className="col-md-3">
        </div>
      </div>
    </div>
  }
});

ReactDOM.render(
  React.createElement(App)
, document.getElementById('airship-calculator'));