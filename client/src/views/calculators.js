

function Calculators(props) {

    return <div>
    <h3>Calculators for Fitness</h3>
    <br></br>
    <p>No matter what goal you want to achieve with fitness and your weight (either to lose or gain weight, or stay the same!), it
        is definitely helpful to have some outside help to guide you in your fitness journey.
        The below calculators will help you gain some insight into your goal.
    </p>
    <p>
        ***Note: These calculators only provide an estimate for informational purposes and are not intended to be taken as fact, as everyone's body is different when it comes to changing their weight. Please consult a doctor before altering your diet or daily regimen.
    </p>
    <div>
        <h5>Total Daily Energy Expenditure (TDEE) Calculator</h5>
        <p>Tool used to calculate an individual's TDEE. 
            The calculator will ask you for information such as age, weight, and height, to estimate how many calories you use daily.
            The calculator uses multiple BMR Methodologies to find your TDEE. </p>
        <a href="https://www.sailrabbit.com/bmr/">TDEE Calculator</a>
        <img alt="TDEE Calculator"></img>

        <br></br>
        <h5>Total Daily Energy Expenditure (TDEE) Spreadsheet</h5>
        <p>Tool used to calculate an individual's TDEE. 
            Similar to the TDEE Calculator, the spreadsheet will ask you for information such as age, weight, and height, to estimate how many calories you use daily.
            The TDEE Spreadsheet asks you to input your weight and calories consumed daily to calculate an accurate TDEE.</p>
        <a href="https://www.reddit.com/r/Fitness/comments/4mhvpn/adaptive_tdee_tracking_spreadsheet_v3_rescue/">3-Suns TDEE Spreadsheet</a>
        <img alt="3-Suns TDEE Spreadsheet"></img>
    </div>
    <div>
        <h5>Weight Projection</h5>
        <p>A body weight planner created by the National Institute of Health.
            This calculator will ask you to input information, such as height, age, and weight.
            It will also ask you to enter your goal weight and desired goal achievement date to project your weight change day-by-day.  
        </p>
        <a href="https://www.niddk.nih.gov/bwp">Body Weight Planner</a>
        <img alt="NIH Body Weight Planner"></img>
    </div>
    <div>
        <h5>Realistic Weight Gained by Eating</h5>
        <p>When trying to lose weight, we might feel discouraged by the scale, especially after eating a large meal the day before.
        1 lb of body weight is equivalent to 3500 calories. This calculator was created as a "sanity check" to reassure myself that no,
        I did not gain 3 pounds in one day just by eating pizza the day before, and there are more factors in play, such as water retention, bloating, etc that leads to an uptick on the scale.
        This calculator will ask for your TDEE and the amount of calories eaten the day before.
        Then, it will calculate how much "actual weight" you gained from eating.
        </p>
        <div></div>
        <p>Please note that your calculations will not be saved and will be gone once you leave this page.</p>
    </div>
  </div>
}

export default Calculators;