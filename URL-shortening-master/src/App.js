import React from 'react';

import './styles/App.scss';

import {CopyToClipboard} from 'react-copy-to-clipboard';

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

    };
  }




  clicked = () => {
    const inputText = this.state.inputText

    //check if input is empty so if it was show error
    if(!inputText){
      console.log("EMpty")
      this.setState({isEmpty:true})
    }
    else{
      this.setState({isEmpty:false})
      // this.setState({inputText:""})
    
    }


    //fetch api with POST method
  const relAPI = `https://rel.ink/api/links/`

    let fetchURL = async (link) => {
    let response = await fetch(relAPI, { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: link }) })
    let json = await response.json(link)

    this.setState({ link: [...this.state.link, [json.hashid, this.state.inputText]] }) 
    console.log("inside",this.state.link)



    return 
    
    
}

  fetchURL(inputText)


  }


  inputChanged = (e) => {
    // const inputText = this.state.inputText
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
    var subset = subset.reverse()

    return (
      <div className='app' >

        <div className="shorten-it" src="">

          <div>
            <input 
               type="text"
               style={this.state.isEmpty !=  '' ? styles : {}} 
               placeholder="Shorten a link here..."
               onChange={this.inputChanged} 
               value={this.state.inputText}
            />
            <button onClick={this.clicked} ><strong>Shorten It!</strong></button>
          </div>

          {this.state.isEmpty && <p>Please add a link</p>}

        </div>
        <div className="results">
        {subset.map(function(hash, index){
            return(
              <ul key={index}>
                <li >
                  <p>{hash[1]}</p>
                  <p
                   className='ml-auto'
                   style={{color:'#26D2D4'}}
                  >
                    {"https://rel.ink/" + hash[0]}
                  </p>
                  {/* <button key={index} onClick={() => console.log("https://rel.ink/" +  hash[0] )} ><span>copy</span></button>   */}
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
