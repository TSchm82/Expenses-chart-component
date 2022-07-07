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

    balanceInfo.innerHTML = `$ ${balance}`;
}

function createBars(spendings) {
    const container = document.getElementById("graphs-container")
    const maximumHeight = findMaximum(spendings.map(e => e.amount));

    spendings.forEach((spending, index) => {
        barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        if (index !== spendings.length - 1) {
            barContainer.classList.add('bar-spacer-right');
        }

        const barHeight = spending.amount;

        infoSpace = document.createElement('div');
        infoSpace.classList.add('info-spacer');
        infoSpace.innerHTML = `$ ${spending.amount}`;

        spacer = document.createElement('div');
        spacer.classList.add('bar-spacer-top');
        spacer.style.height = `${70 * (maximumHeight - barHeight) / maximumHeight}%`;

        bar = document.createElement('div');
        bar.classList.add('bar');

        if (barHeight === maximumHeight) {
            bar.classList.add('maximum');
        }

        bar.style.height = `${70 * barHeight / maximumHeight}%`;

        info = document.createElement('span');
        info.innerHTML = spending.day;

        barContainer.appendChild(infoSpace);
        barContainer.appendChild(spacer);
        barContainer.appendChild(bar);
        barContainer.appendChild(info);

        container.appendChild(barContainer)
    })
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