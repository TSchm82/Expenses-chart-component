var balance;

renderGraphs();

async function renderGraphs() {
    const data = await fetchData();

    calculateBalance(data);
    createBars(data);
}

function calculateBalance(spendings) {
    const balance = spendings
        .map(e => e.amount)
        .reduce((previousValue, currentValue) =>
            currentValue + previousValue, 0);

    const balanceInfo = document.getElementById("info-area__balance");

    balanceInfo.innerHTML = `$${balance}`;
}

function createBars(spendings) {
    const container = document.getElementById("balance")
    const maximumHeight = findMaximum(spendings.map(e => e.amount));

    // Create bar and add it to container
    spendings.forEach((spending, index) => {
        let barContainer = createElementAndAddClass('div', 'balance__bar-container');

        // Add space on the right
        if (index !== spendings.length - 1) {
            barContainer.classList.add('balance__bar-spacer-right');
        }

        // Create Elements
        infoBox = createElementAndAddClass('div', 'balance__heighlighted', `$ ${spending.amount}`);
        spacerTop = createElementAndAddClass('div', 'balance__bar-spacer-top');
        info = createElementAndAddClass('span', 'balance__day', spending.day);
        bar = createElementAndAddClass('div', 'balance__bar');

        // Add Styling
        const barHeight = spending.amount;
        bar.style.height = `${70 * barHeight / maximumHeight}%`;
        spacerTop.style.height = `${70 * (maximumHeight - barHeight) / maximumHeight}%`;

        // Style max spending
        if (barHeight === maximumHeight) {
            bar.classList.add('maximum');
        }

        // Append to container
        barContainer.appendChild(spacerTop);
        barContainer.appendChild(infoBox);
        barContainer.appendChild(bar);
        barContainer.appendChild(info);

        container.appendChild(barContainer)
    })
}

function createElementAndAddClass(type, style, innerHTML) {
    element = document.createElement(type);
    element.classList.add(style);

    if (!!innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

async function fetchData() {
    const data = await fetch('./data.json').then(function (resp) {
        return resp.json();
    }).then();

    return data;
}

function findMaximum(spendings) {
    return spendings.reduce((previousValue, currentValue) =>
        currentValue >= previousValue ? currentValue : previousValue, 0);
}