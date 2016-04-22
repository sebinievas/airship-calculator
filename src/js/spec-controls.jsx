var React = require('react');

module.exports = React.createClass({
  handlePropChange: function(e, data) {
    
  },
  render: function() {
    return <div className="spec-controls">
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2" for="exampleInputEmail1">Email address</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="exampleInputPassword1">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
        </div>
      </form>
    </div>
  }
});
