renderGraphs();

async function renderGraphs() {
    const data = await fetchData();

    createBars(data);
}

async function createBars(spendings) {
    const container = document.getElementById("graphs-container")
    const maximumHeight = findMaximum(spendings.map(e => e.amount));

    spendings.forEach((spending, index) => {
        barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        if (index !== spendings.length - 1) {
            barContainer.classList.add('bar-spacer-right');
        }

        const barHeight = spending.amount;

        spacer = document.createElement('div');
        spacer.classList.add('bar-spacer-top');
        spacer.style.height = `${95 * (maximumHeight - barHeight) / maximumHeight}%`;

        bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${95 * barHeight / maximumHeight}%`;

        info = document.createElement('p')
        info.innerHTML = spending.day;

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
        currentValue >= previousValue ? currentValue : previousValue, 5);
}