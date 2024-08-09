let countryFrom = document.querySelector(".countryFrom");
let countryTo = document.querySelector(".countryTo");
let img1 = document.querySelector(".imgfrom");
let img2 = document.querySelector(".imgto");
let btn = document.querySelector(".get");
let input = document.querySelector(".inputcurr");
let apiKey = "059a7a0672210bb8008b2ef2";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
let output = document.querySelector(".output");
let eRate = document.querySelector(".eRate");
for (let country in countryList) {
    let newOption = document.createElement("option");
    let newOption1 = document.createElement("option");
    newOption.innerText = country;
    newOption1.innerText = country;
    newOption.value = country;
    newOption1.value = country;
    countryFrom.append(newOption);
    countryTo.append(newOption1);
    // Set US as the default selected option for countryFrom
    if (country === "USD") {
        newOption.selected = true;
    }

    // Set PK as the default selected option for countryTo
    if (country === "PKR") {
        newOption1.selected = true;
    }
}

countryFrom.addEventListener("change", (evt) => {
    updateFlag1(evt.target);
});
countryTo.addEventListener("change", (evt) => {
    updateFlag2(evt.target);
});


let updateFlag1 = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    img1.src = newsrc;
}

let updateFlag2 = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    img2.src = newsrc;
}

btn.addEventListener("click", (evt) => {
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let inputVal = input.value;
    if (inputVal <= 0 || inputVal == "") {
        input.value = 1;
        inputVal = input.value;
    }
    let countryFromVal = countryFrom.value;
    let countryToVal = countryTo.value;
    console.log(countryFromVal, countryToVal);
    let response = await fetch(api);
    let data = await response.json();
    let fromExchangeRate = data.conversion_rates[countryFromVal];
    let toExchangeRate = data.conversion_rates[countryToVal];
    eRate.innerText = `${inputVal} ${countryToVal} = ${toExchangeRate} ${countryFromVal}`;
    const convertedAmount = (inputVal / fromExchangeRate) * toExchangeRate;
    output.value = convertedAmount;
};

window.addEventListener("load", () => {
    input.value = 1;
    updateExchangeRate();

})