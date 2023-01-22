//Add event lister for submit event of form
document.getElementById('loan-form').addEventListener("submit", function(e){
    //Hide results
    document.getElementById("results").style.display="none";
    //Show loader
    document.getElementById("loading").style.display="block";

    //setTimeout function
    setTimeout(calculateResults,1000);
    
    e.preventDefault();
});

//Make function claculateResults
function calculateResults(){

    //Fetching UI variables
    //Inputs
    const UIamount=document.getElementById("amount");
    const UIinterest=document.getElementById("interest");
    const UIyears=document.getElementById("years");
    //Outputs
    const monthlyPayment=document.getElementById("monthly-payment");
    const totalPayment=document.getElementById("total-payment");
    const totalInterest=document.getElementById("total-interest");


    //get the loan amount and make it float type
    const principal= parseFloat(UIamount.value);
    //get inerest value in float type
    const calculatedInterest= parseFloat(UIinterest.value)/100/12;
    //get years in float
    const calculatedPayment=parseFloat(UIyears.value)*12;

    //Compute monthly payment
    const x=Math.pow(1 + calculatedInterest,calculatedPayment);
    const monthly=(principal*x*calculatedInterest)/(x-1);

    //Check if monthly value is a finite number
    //using a JavaScript method
    if(isFinite(monthly)){
        //toFixed() method is used to indicate decimal points in JavaScript
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayment).toFixed(2);
        totalInterest.value=((monthly*calculatedPayment)-principal).toFixed(2);

        //Show results
        document.getElementById("results").style.display="block";

        //Hide the spinner image
        document.getElementById("loading").style.display="none";
        
        
    }else{
        showError("Please Check your numbers");
        
        //Hide the spinner image
        document.getElementById("loading").style.display="none";
    }

}

//Create Function showError
function showError(error){
    //Create a div
    const errorDiv=document.createElement("div");

    //Get elements
    const card=document.querySelector(".card");
    const heading=document.querySelector(".heading");

    //Add class for that div
    //alert class of bootstrap
    errorDiv.className="alert alert-danger";

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above error
    //jS method to insert before an element
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    //Js methods that trigers a function after some time
    setTimeout(clearError,3000);
}

//Create clearError function
function clearError(){
    document.querySelector(".alert").remove();
}

//Create reset button function
//fetch and addevent listener for reset button
document.getElementById("reset").addEventListener("click",function(){

    //Grab all input fields
    const inputs=document.querySelectorAll(".form-control");

    //use a loop to set first 3 input fields to empty
    for(let i=0;i<3;i++){
        inputs[i].value="";
    }

    //Hide results
    document.getElementById("results").style.display="none";
});