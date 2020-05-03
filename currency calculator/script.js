const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

async function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    
    try {
        const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`);
        const result = await res.json();

        // Check if base currency is supported by API
        if(!result.rates) {
            alert(result.error)
        
        // Check if selected currency pair is supported by API     
        }else if(!result.rates[currency_two]){
            alert('This currency pair is not supported');
            
        } else {
            //Get the exchange rate for selected currencies
            const rate = result.rates[currency_two];
        
            //Update UI with data
            rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
            amountEl_two.value = (+amountEl_one.value * rate).toFixed(4);
        }
        
    } catch (error) {
        alert(error);
        console.log(error);
    }

    // fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    // .then(res => res.json())
    // .then(data => {
    //     //Get the exchange rate for selected currencies
    //     console.log(data);
    //     const rate = data.rates[currency_two];
        
    //     //Update UI with data
    //     rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
    //     amountEl_two.value = (+amountEl_one.value * rate).toFixed(4);
    // })
    // .catch(err => {
    //     console.log(err);
    //     alert(err);
    // });  
    

};

function swapCurrency() {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
}

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', swapCurrency);

calculate();