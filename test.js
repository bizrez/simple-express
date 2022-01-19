const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'IenHfnUY6oHIRn0e7GeVAB29GDBKKFTW'
const org = 'everi'
const bucket = 'mallon'

const client = new InfluxDB({url: 'http://20.189.163.219', token: token})
const {Point} = require('@influxdata/influxdb-client')
const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'everi'})

//const point = new Point('mem').floatField('used_percent', 23.43234543)
const point = new Point('automated-test-runs')
   .tag('product-family','casino-solutions')
   .tag('product-line', 'metersxpress')
   .tag('product-module', 'module-1')
   .stringField('result', 'passed')
   

console.log(`${point}`)
writeApi.writePoint(point)

writeApi
    .close()
    .then(() => {
        console.log('FINISHED magic')
    })
    .catch(e => {
        console.error(e)
        console.log('Finished ERROR')
    })
