// html form link
const form = document.getElementById("form")

// html input elements links:
const jobSelectElem = document.getElementById("jobSelect");
const promoElem = document.getElementById("promo")

// html missing information error elements links:
const missingJobSelectElem = document.getElementById("missingJobSelect");
const wrongPromoElem = document.getElementById("wrongPromo")

// html final amount display link
const finalAmountElem = document.getElementById("finalAmount")

// bonus section
const optionsObject = [
    {
        option: `<option selected>-Scegli un tipo di lavoro-</option>`
    },

    {
        option: `<option aria-label="sviluppo backend">Sviluppo Backend</option>`
    },

    {
        option: `<option aria-label="svilupo frontend">Sviluppo Frontend</option>`
    },

    {
        option: `<option aria-label="analisi progettuale">Analisi progettuale</option>`
    }
]

for (let i = 0; i < optionsObject.length; i++) {
    const curOption = optionsObject[i].option
    jobSelectElem.innerHTML += curOption
}

//event listener:
form.addEventListener("submit", formHandler)

// price varables check function
function formHandler(event) {
    event.preventDefault()
    if (jobSelectElem.value === "-Scegli un tipo di lavoro-") {
        missingJobSelectElem.innerText = "Inserisci campo obbligatorio"
        finalAmountElem.innerHTML = `Prezzo finale <br> <span class="fs-3">&euro;
        0</span><span class="fw-medium text-secondary">,00</span>`

    } else {
        missingJobSelectElem.innerText = ""
        const discount = jobType(jobSelectElem.value) * 25 / 100;
        let definitiveResult


        if (promoElem.value === "YHDNU32" || promoElem.value === "JANJC63" || promoElem.value === "PWKCN25" || promoElem.value === "SJDPO96" || promoElem.value === "POCIE24") {
            definitiveResult = jobType(jobSelectElem.value) - discount
            wrongPromoElem.innerText = ""
            finalAmountElem.innerHTML = `Prezzo finale <br> <span class="fs-3">&euro;
        ${parseInt(definitiveResult)}</span><span class="fw-medium text-secondary">,${getDecimals(definitiveResult)}</span>`

        } else if (promoElem.value === "") {
            definitiveResult = jobType(jobSelectElem.value)
            wrongPromoElem.innerText = ""
            finalAmountElem.innerHTML = `Prezzo finale <br> <span class="fs-3">&euro;
        ${parseInt(definitiveResult)}</span><span class="fw-medium text-secondary">,${getDecimals(definitiveResult)}</span>`

        } else {
            definitiveResult = jobType(jobSelectElem.value)
            wrongPromoElem.innerText = "Il codice sconto è scaduto o non è valido"
            finalAmountElem.innerHTML = `Prezzo finale <br> <span class="fs-3">&euro;
        ${parseInt(definitiveResult)}</span><span class="fw-medium text-secondary">,${getDecimals(definitiveResult)}</span>`
        }
    }
}

// price calculation function
function jobType(optionValue) {
    const workHours = 10
    const backEndPrice = 20.50 * workHours
    const frontEndPrice = 15.30 * workHours
    const projectAnalisis = 33.60 * workHours
    let priceResult


    if (optionValue === "Sviluppo Backend") {
        priceResult = backEndPrice
    } else if (
        optionValue === "Sviluppo Frontend") {
        priceResult = frontEndPrice
    } else if (
        optionValue === "Analisi progettuale") {
        priceResult = projectAnalisis
    }
    return priceResult
}

// decimals extraction function
function getDecimals(number) {
    let numberStr = number.toString()
    let dot = numberStr.indexOf(".")
    let decimals = numberStr.substring(dot + 1, dot + 3)
    return decimals
}