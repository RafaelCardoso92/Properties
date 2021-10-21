import './App.css';
import properties from'./properties.json';
import { useState } from "react";

function App(){
 //get total sum from JSON
  let total = properties.reduce((total, el) => {
    el.complianceChecks.forEach((value) => {
      const keys = Object.keys(value);
      total += value[keys[0]];
    });
    return total;
  }, 0);

  //get date
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let d = today.setMonth(today.getMonth()+6);
    let s = new Date(d).toLocaleDateString('en-US');
    
    //sum total 
    const [number1, setNumber1] = useState();
    const [totalt, setTotalt] = useState(total);
    function calculateTotal() {
      setTotalt(number1 + totalt);
    }

  //list all data from JSON 
  const DisplayData=properties.map(
      (info)=>{
          return(
              <tr>
                  <td>{info.propertyId}</td>
                  <td>{info.name}</td>
                  <td>{info.complianceChecks.map(info2 => <tr>  {Object.keys(info2)}: £{Object.values(info2)}  </tr>   )}</td>
                  <td>Total: £{info.complianceChecks.map(info2 =>   Object.values(info2)).reduce((a,b)=>parseFloat(a)+parseFloat(b)) } </td>   
                  <td>{info.nextCheckOn.replace('T', ' ').replace('Z', ' ')}</td>
              </tr>
          )
      }
  )

//list fire safety checks
  const DisplayData2=properties.map(
    (infom)=>{ if (infom.complianceChecks.map(infon =>   Object.keys(infon)).reduce((a) => (a)  ) == 'fire'){
              return(
                <tr>
                  <td>{infom.propertyId}</td>
                  <td>{infom.name}</td>
                  <td>{infom.complianceChecks.map(infon =>   Object.keys(infon).filter((infon) => infon == 'fire')) } </td>
                  <td> Next Due on : {infom.nextCheckOn.replace('T', ' ').replace('Z', ' ')}</td>
                </tr>
              )}
    }
  )
//list all upcomming checks
  return(
    <div id="wrap">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Compliance Checks</th>
              <th>Total Compliance Cost</th>
              <th>Next check date</th>
            </tr>
           </thead>
          {DisplayData}
        </table>

        <table>
          <div className="number-inputs">
            <p>Enter additional compliance costs</p>
            <input
              type="number"
              value={number1}
              onChange={(e) => setNumber1(+e.target.value)}
              placeholder="0"
            />
            <button onClick={calculateTotal}>Calculate</button>
            <h3> Total yearly cost £{totalt}</h3>
          </div>
        </table>  

          <div class="fire">
            <p>Fire safety checks required:</p>
                <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Compliance Check</th>
                        <th>Next check date</th>
                      </tr>
                        </thead>

                {DisplayData2}
                </table>
            </div>

      <table class="upcome">
        <p>Current date : {date}</p>
        <p>  Upcomming checks</p>
        <ul>
          {properties
            .filter(({ nextCheckOn }) => nextCheckOn < date.toLowerCase())
            .map(info2 => (
              <li key={info2.propertyId}>{info2.name}, Next due on : {info2.nextCheckOn.replace('T', ' ').replace('Z', ' ')}</li>
            ))
          }
        </ul>

        <p>  Upcomming checks in 6 months : {s}</p>
        <ul>
          {properties
            .filter(({ nextCheckOn }) => nextCheckOn < s.toLowerCase())
              .map(info3 => (
                <li key={info3.propertyId}>{info3.name}, Next due on : {info3.nextCheckOn.replace('T', ' ').replace('Z', ' ')}</li>
              )
            )
          }
        </ul>

      </table>
    </div>
  )

}
export default App;
