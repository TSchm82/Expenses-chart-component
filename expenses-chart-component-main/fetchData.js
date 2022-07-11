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

    const balanceInfo = document.getElementById("balance-info");

    balanceInfo.innerHTML = `$${balance}`;
}

function createBars(spendings) {
    const container = document.getElementById("graphs-container")
    const maximumHeight = findMaximum(spendings.map(e => e.amount));

    // Create bar and add it to container
    spendings.forEach((spending, index) => {
        barContainer = createElementAndAddClass('div', 'bar-container');

        // Add space on the right
        if (index !== spendings.length - 1) {
            barContainer.classList.add('bar-spacer-right');
        }

        // Create Elements
        infoBox = createElementAndAddClass('div', 'info-box', `$ ${spending.amount}`);
        spacerTop = createElementAndAddClass('div', 'bar-spacer-top');
        info = createElementAndAddClass('span', 'column-info-day', spending.day);
        bar = createElementAndAddClass('div', 'bar');

        // Add Styling
        const barHeight = spending.amount;
        bar.style.height = `${70 * barHeight / maximumHeight}%`;
        spacerTop.style.height = `${70 * (maximumHeight - barHeight) / maximumHeight}%`;

        // Style Maximum
        if (barHeight === maximumHeight) {
            bar.classList.add('maximum');
        }

        console.log(bar)

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
    console.log(element)
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