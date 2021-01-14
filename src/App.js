import React from 'react';

import './styles/App.scss';

import Loadingimage from './images/kOnzy.gif';

//when an empty input submit
const styles = {
  border: "rgb(207, 59, 59) 3px solid",
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      isEmpty: false,
      inputText: "",
      link:[],
      loading: false,
      isError: false

    };
  }




  clicked = () => {
    const inputText = this.state.inputText
    const relAPI = `https://api.shrtco.de/v2/shorten?url=`



    //check if input is empty so if it was show error
    if(!inputText){
      console.log("EMpty")
      this.setState({isEmpty:true})
    }
    else{
      this.setState({isEmpty:false,loading:true,isError:false})

      // fetch api
      fetch(relAPI + inputText)
      .then(response => response.json())
      .then(data => {
        console.log(data.result.short_link);
        var joined = this.state.link.concat();
        this.setState({ link: joined })

        this.setState(previousState => ({
          link: [...previousState.link, [data.result.short_link,inputText]],
          loading:false
     
        })
        );

            }).catch(function(error){
              console.log("error");
              this.setState({isError:true,loading:false})
              

            }.bind(this))
      
    }



    return 
    
    
}


  inputChanged = (e) => {
    console.log(e.target.value)
    this.setState({inputText:e.target.value}, function(){
      console.log(this.state.inputText)
    })
  }

  copy = () => {
    console.log("copy")
  }

  render(){
    var subset = this.state.link.slice(-3)
    subset = subset.reverse()

    return (
      <div className='app' >

        <div className="shorten-it" src="">

          <div>
            <input 
               type="text"
               style={this.state.isEmpty !==  '' ? styles : {}} 
               placeholder="Shorten a link here..."
               onChange={this.inputChanged} 
               value={this.state.inputText}
            />

            {this.state.loading && <img src={Loadingimage} alt="loading" />}
            {!this.state.loading && <button onClick={this.clicked} ><strong>Shorten It!</strong></button>}
             
          </div>

          {/* if empty */}
          {this.state.isEmpty && <p>Please add a link</p>}
          {this.state.isError && <p>Error - Please enter a valid link</p>}

        </div>

        <div className="results">
        {subset.map(function(hash, index){
            return(
              <ul key={index}>
                <li >
                  <p
                  style={{marginRight:'30px'}}

                  >{hash[1]}</p>
                  <p
                   className='ml-auto'
                   style={{color:'#26D2D4'}}
                  >
                    {hash[0]}
                  </p>
                </li>        
              </ul>
            )
          })}
        </div>

        
             
      </div>
    );
  }

}

export default App;
