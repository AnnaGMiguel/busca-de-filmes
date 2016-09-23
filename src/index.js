var NativeInput = React.createClass({
  getInitialState: function() {
    return {
      value: null
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(e.target.value);
    }
  }
});
var SearchIn = React.createClass({

   /* $.get("http://www.omdbapi.com/?s="+this.state.title+"&y=&plot=full&r=json&page="+1, 
        
      function(data, status){
        this.setState({data: data.Search});
      }
    );*/
 
  getInitialState: function() {
    return {term : null};
  },
 
  
  handleSubmit: function(e) {
    e.preventDefault();
    var term = this.state.term.trim();
    if (!term) {
      return;
    }
    this.setState({Title: ''});
  },

  handleChange: function(term) {
    this.setState({
      term: term
    });
  },
  handleResult: function() {
    this.props.onClick(this.state.term);
  },
 

  render: function() {
    return (
      
      <div className="search-input">
        <NativeInput onChange={this.handleChange} />
        <button onClick={this.handleResult}>Search</button>
      </div>
    
    );
  }
});

var SearchOut = React.createClass({
  render: function() {
    return (
      <div className="search-output">
        {this.props.results.map(function(result) {
          return (
            <div key={result.imdbID} className="result">
              <img src={result.Poster} alt={result.Title} width="100" height="120"/>
              <div className="content">
                <h4>{result.Title}</h4>
                <p>{result.Year}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});

var Pagination = React.createClass({
  render: function(){
    return(
      <div>{this.props.page}</div>
    );
  }
});

var Main = React.createClass({
  
  getInitialState: function() {
    return {
      result: [],
      pages: 0
    };
  },
  render: function() {
    return (
      <div>
        <SearchIn onClick={this.handleResult} />
        <SearchOut results={this.state.result} />
        <Pagination page={this.state.pages}/>
      </div>
    );
  },
 
  handleResult: function(term) {

    var updateResult = function(response, textStatus, jqXHR) {
      this.setState({
        result:response.Search,
        pages:parseInt(response.totalResults/10)+1
      });
    }.bind(this);

    $.ajax('http://www.omdbapi.com', {
      method: 'GET',
      data: {
        's': term,
        'page': 1
      },
      success: updateResult
    });
  }

});


React.render(
  <Main />,
  document.getElementById('root')
);