renderGraphs();

async function renderGraphs() {
    const data = await fetchData();

    createBars(data);
}

async function createBars(spendings) {
    const container = document.getElementById("graphs-container")
    const maximumValue = findMaximum(spendings.map(e => e.amount));

    div = document.createElement('div');

    spendings.forEach(spending => {
        node = document.createElement('div');
        node.innerHTML = spending.day;
        node.classList.add('bar-container');
        // node.style.height = `${spending.amount}px`;

        div.appendChild(node);
    })

    container.appendChild(div);
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