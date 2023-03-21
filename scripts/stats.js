const url = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(url).then(response => response.json())
    .then(datosApi => {

        arrayPast = past(datosApi.events, datosApi.currentDate)
        arrayUpcoming = futures(datosApi.events, datosApi.currentDate)
        printTable(results(assistance(arrayPast), assistance(arrayPast).reverse(), capacity(arrayPast)), "datosSuperior")

        printSecondTable(dataTable(arrayUpcoming), "upcoming")
        printSecondTable(dataTable(arrayPast), "past")
    }).catch(error => console.error(error.message))

function futures(data, currentDate) {
    return data.filter(evento => evento.date > currentDate)
}

function past(data, currentDate) {
    return data.filter(event => event.date < currentDate)
}

function assistance(arrPast) {
    const arrayPercentage = arrPast.map(event => {
        return {
            attendance: (event.assistance / event.capacity) * 100,
            nameEvent: event.name
        }
    })
    arrayPercentage.sort((a, b) => b.attendance - a.attendance)
    return arrayPercentage

}

function capacity(arrPast) {
    const arrayCapacity = arrPast.map(event => {
        return {
            capacity: event.capacity,
            nameEvent: event.name
        }
    })
    arrayCapacity.sort((a, b) => b.capacity - a.capacity)
    return arrayCapacity

}

function results(highestPercentage, lowestPercentage, largerCapacity) {
    let all = {
        highestPercentage: highestPercentage[0].nameEvent,
        lowestPercentage: lowestPercentage[0].nameEvent,
        largerCapacity: largerCapacity[0].nameEvent
    }
    return all
}

function printTable(results, container) {
    const table = document.getElementById(container)
    table.innerHTML = `
    <tr>
        <td>${results.highestPercentage}</td>
        <td>${results.lowestPercentage}</td>
        <td>${results.largerCapacity}</td>
    </tr>
    `
}



function dataTable(arr) {
    let categories = Array.from(new Set(arr.map(a => a.category)));
    let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
        let calculate = eventCat.reduce((acc, event) => {
            acc.category = event.category;
            acc.revenues += event.price * (event.assistance || event.estimate);
            acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
            return acc
        }, {
            category: "",
            revenues: 0,
            attendance: 0
        })
        calculate.attendance = calculate.attendance / eventCat.length
        return calculate
    })
    return result;
}

function printSecondTable(arr, idTag) {
    const upcomingTable = document.getElementById(idTag)
    let html = arr.map(events => {
        return `
        <tr>
                <td>${events.category}</td>
                <td>$${events.revenues}</td>
                <td>${events.attendance.toFixed(2)}%</td>
            </tr>
        `
    })
    upcomingTable.innerHTML = html.join("")
}



