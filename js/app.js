/*Number.prototype.isInt= function(){
	return this == this >> 0;
}*/
			
const loadCurrencies = async () => {
    const response = await fetch('https://api.exchangerate.host/latest?base=aed');
    const json = await response.json();
    Object.entries(json.rates).forEach(entry => {
        const [key, value] = entry;
        document.getElementById("currency").add(new Option(key, key));
        document.getElementById("currency2").add(new Option(key, key));
    });
}

loadCurrencies();

const convertCurrency = async (amount, pair, pair2) => {
    const response = await fetch('https://api.exchangerate.host/latest?base=' + pair);
    const json = await response.json();
    const result = json.rates[pair2] * amount;
    document.getElementById("result").innerText = result;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("converted-currency").innerText = "AED";

    const selectCurrency = document.getElementById("currency");
    const selectCurrency2 = document.getElementById("currency2");
	const amount = document.getElementById("amount");
	
    selectCurrency.addEventListener("change", (e) => {
        const selectedCurrency = e.target;
        const amount = document.getElementById("amount").value;
        convertCurrency(amount, selectCurrency.options[selectCurrency.selectedIndex].text, selectCurrency2.options[selectCurrency2.selectedIndex].text);
    });

    selectCurrency2.addEventListener("change", (e) => {
        const selectedCurrency = e.target;
        const currencyText = selectedCurrency.selectedOptions[0].text;
        document.getElementById("converted-currency").innerText = currencyText;
        const amount = document.getElementById("amount").value;
        convertCurrency(amount, selectCurrency.options[selectCurrency.selectedIndex].text, selectCurrency2.options[selectCurrency2.selectedIndex].text);
    });

    amount.addEventListener('input', function() {
        const selectCurrency = document.getElementById("currency");
        const selectCurrency2 = document.getElementById("currency2");
        convertCurrency(amount.value, selectCurrency.options[selectCurrency.selectedIndex].text, selectCurrency2.options[selectCurrency2.selectedIndex].text);
    });

});