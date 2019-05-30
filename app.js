//listen for submit.

const loanForm = document.querySelector('#loan-form');

loanForm.addEventListener('submit',function(e){
  //Hide results
  document.querySelector('#results').style.display = 'none';
  //Show loader
  document.querySelector('#loading').style.display = 'block';
  setTimeout(calculateResults,2000);
  e.preventDefault();
});

//Function to calculate results.
function calculateResults() {
  console.log('calculating.....');
  //UI Variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //Compute Monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

    //Hide loader
    document.querySelector('#loading').style.display = 'none';
    //Show results
    document.querySelector('#results').style.display = 'block';
  }else{
    showError('Please check your numbers.');
  }
}

function showError(error) {

  //Hide loader
  document.querySelector('#loading').style.display = 'none';
  //Show results
  document.querySelector('#results').style.display = 'none';
  
  //Create a div
  const errorDiv = document.createElement('div');
  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //Add class
  errorDiv.className = 'alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//Function to clear error
function clearError() {
  document.querySelector('.alert').remove();
}