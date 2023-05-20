// Fix CORS error issue



// Grab Form Data/Locating Items
const form = document.getElementById('inputselector')
const season = document.getElementById('selectseason').value
console.log(season)
const round = document.getElementById('selectround').value
console.log(round)
const resultsTable = document.getElementById('resultstable')


// Check previous entries


// Get API DATA, STORE
async function racerData(season, round){
    console.log(season,round)
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverstandings.json`,{
        method:"Get",
    })
    if (res.ok){
        const data = await res.json()
        console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings, 'data')
        let racers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        //const racerData = racers.map(racer=> formData(racers))
        //console.log(racerData)
        fillTable(racers)
    } 

    }

// Assign API data values
function formData(racers) {
    let depth = []
    for (let i = 0; i < 7; i++) {
        let sheet = {}
        sheet.position = racers[i].position
        sheet.points = racers[i].points
        sheet.firstName = racers[i].Driver.givenName
        sheet.lastName = racers[i].Driver.familyName
        sheet.sponsor = racers[i].Constructors[0].name
        sheet.nationality = racers[i].Driver.nationality
        sheet.sponsorUrl = racers[i].Constructors[0].url
        sheet.driverUrl = racers[i].Driver.url
        depth.push(sheet)
        }
    return depth
    }

// Fill lower screen with assigned API data
function fillTable(racers) {
    //console.log(racers, 'racers')
    //console.log(racers[0].position, 'racer0')
    for(const racer of racers){
        console.log(racer)
        let tr = document.createElement('tr')        
        let th = document.createElement('th')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')
        th.innerText = `${racer.position}`
        th.scope = `${"row"}`
        a1.innerText = `${racer.Driver.givenName} ${racer.Driver.familyName}`
        a1.href = `${racer.Driver.url}`
        a1.className = "entryLink"
        td2.append(a1)
        td3.innerText = `${racer.Driver.nationality}`
        a2.innerText = `${racer.Constructors[0].name}`
        a2.href = `${racer.Constructors[0].url}`
        a2.className = "entryLink"
        td4.append(a2)
        td5.innerText = `${racer.points}`
        tr.append(th, td2, td3, td4, td5)
        resultsTable.appendChild(tr)
        }}

form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const seasonInput = document.getElementById('selectseason')
    const roundInput = document.getElementById('selectround')
    const season = seasonInput.value
    const round = roundInput.value
    await racerData(season,round)
})