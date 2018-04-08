const axios = require('axios')
const publicIp = require('public-ip')
const DarkSky = require('dark-sky')

const instance = axios.create({
    baseURL: 'https://od-api.oxforddictionaries.com:443/api/v1/',
    timeout: 30000,
    headers: {
        app_id: "b38e545c",
        app_key: "ead6a6a9b285918bebb8a85abb9e47b4"
    }
})

const example1 = async () => {
    const res = await axios.get('https://ipapi.co/1.1.1.1/json')
    console.log(res.data)
}

const example2 = async () => {
    const ip = await publicIp.v4()
    const ipInfo = await axios.get(`https://ipapi.co/${ip}/json`)
    const res = await axios.get(`https://api.darksky.net/forecast/ff2792dff02f6c3d7e5b61fa786f02c1/${ipInfo.data.latitude},${ipInfo.data.longitude}?units=auto`)
    console.log(`${ipInfo.data.city} is currently ${res.data.currently.summary} and ${res.data.currently.temperature} degrees`)
}

const example3 = async () => {
    const ipInfo = await axios.get('https://ipapi.co/90.187.17.121/json')

    const darksky = new DarkSky('ff2792dff02f6c3d7e5b61fa786f02c1') // Your API KEY can be hardcoded, but I recommend setting it as an env variable.

    const res = await darksky
        .latitude(ipInfo.data.latitude)
        .longitude(ipInfo.data.longitude)
        .units('auto')
        .language('en')
        .get()

    console.log(`${ipInfo.data.city} is currently ${res.currently.summary} and ${res.currently.temperature} degrees`)
}

const example4 = async () => {
    const res = await axios.request({
        method: 'get',
        url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/example',
        headers: {
            app_id: "b38e545c",
            app_key: "ead6a6a9b285918bebb8a85abb9e47b4"
        }
    })

    const result = res.data.results[0]
    console.log(`${result.word}: ${result.lexicalEntries[0].entries[0].senses[0].definitions[0]}`)
}

const example5 = async () => {
    const res = await instance.get('entries/en/example')
    const result = res.data.results[0]
    console.log(`${result.word}: ${result.lexicalEntries[0].entries[0].senses[0].definitions[0]}`)
}

const example6 = async () => {
    const ips = ['1.1.1.1', '8.8.8.8']

    const promises = ips.map(ip => axios.get(`https://ipapi.co/${ip}/json`))

    const resp = await Promise.all(promises)
    console.log(resp)
}

example1()
example2()
example3()
example4()
example5()
example6()
