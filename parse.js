const fs = require('fs')
const express = require('express')
const { parse } = require('path')
const app = express()
const port = 3000
app.use(require('cors')())
var dataToSend = []
var digitclasses = {

}
app.get('/', (req, res) => {
    res.send({ dataToSend })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
var logData = fs.readFileSync('./foo.txt',
    { encoding: 'utf8', flag: 'r' });


logData = logData.split("\n")

sanitizeData(logData)
function sanitizeData(data) {
    let digitcache_ = null
    for (let i = 0; i < data.length; i++) {
        let currentTS = (data[i].split("*"))[0]
        let c = currentTS
        let theDigit = currentTS[7]
        let converted = (`${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}${c[5]}${c[6]}${c[7]}00000`)
        if (theDigit !== digitcache_) {

            if (!digitclasses[parseInt(converted)]) {
                let dat = {
                    category: parseInt(currentTS),
                    value: 1,
                    month: `${new Date(parseInt(currentTS))}`
                }
                digitclasses[converted] = dat
                dataToSend.push(dat)
            }
            /* dataToSend.push({
                language: `${new Date(parseInt(currentTS))}`,
                value: 60.4,
                color: '#5d2f8e'
            })*/
            digitcache_ = theDigit
        }
        else {
            if (digitclasses[parseInt(converted)]) {
                digitclasses[converted].value = digitclasses[converted].value + 1
            }
        }
        /*dataToSend[labels].push = new Date(parseInt(currentTS))
        dataToSend[data].push*/
    }
}
console.log(digitclasses)

//console.log(digitclasses);
console.log(dataToSend);
//console.log(dataToSend[0]);
