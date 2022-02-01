import React, {useState, useEffect} from "react";
import SauceList from './components/SauceList'

function App() {

  //useState will track the state of my sauceList data
  //1st arg: name of the state
  //2nd arg: name of the function that updates the state
  //arg passed to useState sets the default
  const [sauces, setSauces] = useState([])

  //function to fetch sauces and store in state
  async function fetchSauces(){
    try{
        const response = await fetch('http://localhost:3000/sauces', {
          method: 'GET'
        });
        const responseJSON = await response.json()
        //updates state with sauce list
        setSauces(responseJSON)
    } catch(err) {
      console.log(err)
    }
  }
  //upon initial render, fetch sauces as json from backend
  useEffect(() => {
    fetchSauces()
  }, [])


  //render saucelist state
  return (
    <div className="App">
      <SauceList sauces={sauces}/>
    </div>
  );
}

export default App;
