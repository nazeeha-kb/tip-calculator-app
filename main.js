const form = document.getElementById("form");
const inputParentBill = document.getElementById("input-parent-bill");
const bill = document.getElementById("bill");
const tip = document.querySelectorAll("#tip");
const custom = document.getElementById("custom");
const people = document.getElementById("people");
const reset = document.getElementById("reset");
const tipAmnt = document.getElementById("tip-amnt");
const totalAmnt = document.getElementById("total-amnt");
var tipValue;

// Form submission
form.addEventListener("submit", (e) => {
    console.log("submitting")
    e.preventDefault();
    validateInput();
});

// tip % value
tip.forEach((v) => {
    v.addEventListener("click", () => {
        tipValue = Number(v.textContent.replace("%", ""))
    })
})

// Reset button logic (sets bill, tipPercentage, numOfPeople to 0)
reset.addEventListener('click', () => {
    console.log("resetted")
    tipAmnt.innerHTML = "0"
    totalAmnt.innerHTML = "0"

    reset.classList.remove("btn-active")
    reset.classList.add("btn-disabled")

    // resetting the form
    form.reset()
})



// Validation (inputs mustn't be 0 and only ints)
const setError = (element, message) => {
    // ongoing.
    const inputParent = element.parentElement;
    const inputControl = inputParent.parentElement;
    const error = inputControl.querySelector("#error");

    error.innerText = message;
    error.classList.remove("hidden");
    inputParent.classList.add("outline", "outline-red-400")
};

const setSuccess = (element) => {
    // ongoing.
    const inputParent = element.parentElement;
    const inputControl = inputParent.parentElement;
    const error = inputControl.querySelector("#error");

    error.classList.add("hidden");
    inputParent.classList.remove("outline", "outline-red-400");

    console.log("submitted");
};

const isValidInput = (value) => {
    // Number.isFinite -> removes NaN, Infinity, -Infinity
    return typeof value === "number" && Number.isFinite(value);
};

const validateInput = () => {
    // getting input values without extra space
    const billValue = Number(bill.value.trim());
    const peopleValue = Number(people.value.trim());
    const customValue = Number(custom.value)

    // Bill
    if (billValue == "") {
        setError(bill, "Please enter an amount");
    }
    else if (billValue == 0) {
        setError(bill, "Can't be zero");
    }
    else if (!isValidInput(billValue)) {
        setError(bill, "Can only be a number");
    } else {
        setSuccess(bill);
    }

    // People
    if (peopleValue == "") {
        setError(people, "Can't be empty");
    }
    else if (peopleValue == 0) {
        setError(people, "Can't be zero");
    }
    else if (!isValidInput(peopleValue)) {
        setError(people, "Can only be a number");
    } else {
        setSuccess(people);
    }

    // custom
    if (isValidInput(customValue)) {
        tipValue = customValue;
        console.log("custom tip value", tipValue);
    }

    displayOutput(billValue, peopleValue, tipValue)
};

// Input: Bill, tip%, no of people.
// - total = bill's %tip x no people
// output: total, total / no of people
// RESET

displayOutput = (bill, people, tip) => {
    if (!tip) {
        tip = 0;
    }

    // round(x*100) -> divide the output by 100, this gives 2 decimal places in output.

    const tipPerPerson = Math.round(((bill * (tip / 100)) / people) * 100) / 100
    const totalPerPerson = Math.round((bill + (bill * (tip / 100))) / people * 100) / 100
    console.log("tip is", tip)

    tipAmnt.innerHTML = `${tipPerPerson}`
    totalAmnt.innerHTML = `${totalPerPerson}`

    reset.classList.add("btn-active")
    reset.classList.remove("btn-disabled")
}

// Calculations for total and per person