import React, { useState } from 'react';
import TDEECalc from '../images/TDEECalculator.JPG';
import TDEESpreadsheet from '../images/TDEESpreadsheet.JPG';
import NIH from '../images/NIH.JPG';
import '../styles/calculators.css'


const Calculators = props => {
    const [tdee, setTDEE] = useState('');
    const [eaten, setEaten] = useState('');

    const compute = () => {
        var excess = eaten - tdee;
        if (excess <= 0) {
            return "No additional weight gained.";
        } else {
            var gained = Math.floor(excess/3500);
            return gained.toString();
        }
    }

    const onChangeTDEE = e => {
        console.log(e.target.value)
        setTDEE(e.target.value);
      }
    
      const onChangeEaten = e => {
        setEaten(e.target.value);
      }

    return <div className='calculatorsPage'>
    <h3>Calculators for Fitness</h3>
    <br></br>
    <p>No matter what goal you want to achieve with fitness and your weight (either to lose or gain weight, or stay the same!), it
        is definitely helpful to have some outside help to guide you in your fitness journey.
        The below calculators will help you gain some insight into your goal.
    </p>
    <p>
        *** Note: These calculators only provide an estimate for informational purposes and are not intended to be taken as fact, as everyone's body is different when it comes to changing their weight. Please consult a doctor before altering your diet or daily regimen.
    </p>
    <div className='calc'>
        <h5>Total Daily Energy Expenditure (TDEE) Calculator</h5>
        <p>Tool used to calculate an individual's TDEE. 
            The calculator will ask you for information such as age, weight, and height, to estimate how many calories you use daily.
            The calculator uses multiple BMR Methodologies to find your TDEE. </p>
        <img alt="TDEE Calculator" src={TDEECalc}></img>
        <br></br>
        <a href="https://www.sailrabbit.com/bmr/">TDEE Calculator</a>
        <br></br>
        <br></br>
        <h5>Total Daily Energy Expenditure (TDEE) Spreadsheet</h5>
        <p>Tool used to calculate an individual's TDEE. 
            Similar to the TDEE Calculator, the spreadsheet will ask you for information such as age, weight, and height, to estimate how many calories you use daily.
            The TDEE Spreadsheet asks you to input your weight and calories consumed daily to calculate an accurate TDEE.</p>
        <img alt="3-Suns TDEE Spreadsheet" src={TDEESpreadsheet}></img>
        <br></br>
    <a href="https://www.reddit.com/r/Fitness/comments/4mhvpn/adaptive_tdee_tracking_spreadsheet_v3_rescue/">3-Suns TDEE Spreadsheet</a>
    </div>
    <div className='calc'>
        <h5>Weight Projection</h5>
        <p>A body weight planner created by the National Institute of Health.
            This calculator will ask you to input information, such as height, age, and weight.
            It will also ask you to enter your goal weight and desired goal achievement date to project your weight change day-by-day.  
        </p>
        <img alt="NIH Body Weight Planner" src={NIH}></img>
         <br></br>
        <a href="https://www.niddk.nih.gov/bwp">Body Weight Planner</a>

    </div>
    <div className='calc'>
        <h5>Realistic Weight Gained by Eating</h5>
        <p>When trying to lose weight, we might feel discouraged by the scale, especially after eating a large meal the day before.
        1 lb of body weight is equivalent to 3500 calories. This calculator was created as a "sanity check" to reassure myself that no,
        I did not gain 3 pounds in one day just by eating pizza the day before, and there are more factors in play, such as water retention, bloating, etc that leads to an uptick on the scale.
        This calculator will ask for your TDEE and the amount of calories eaten the day before.
        Then, it will calculate how much "actual weight" you gained from eating.
        </p>
        <p>Please note that your calculations will not be saved and will be gone once you leave this page.</p>
        <div id='calculator'>
            <h5>Calculator</h5>
            <div className="row">
                <div className="col">
            <form>
      <div className="form-group"> 
          <label>TDEE: </label>
          <input  type="number"
              required
              placeholder='calories'
              value={tdee}
              className="form-control"
              onChange={(e) => onChangeTDEE(e)}
              />
        </div>
        <div className="form-group"> 
          <label>Calories Eaten: </label>
          <input  type="number"
              required
              placeholder='calories'
              value={eaten}
              className="form-control"
              onChange={(e) => onChangeEaten(e)}
              />
        </div>
        <div className="form-group">
          <input type="button" onClick={compute} value="Calculate" className="btn btn-primary" />
        </div>
      </form>
        </div>
        
        </div>
        </div>
    </div>
  </div>
}

export default Calculators;