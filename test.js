const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'vo4fTmF_ZIidhT5fsvrX2m39wvd2ZBD5hgiKg8PrecaubfYQsrBpO7Y9cELLM5TLS0rt-QrRVU90ezDgFX6xEQ=='
const org = 'everi'
const bucket = 'mallon'

const client = new InfluxDB({url: 'http://168.61.149.254', token: token})
const {Point} = require('@influxdata/influxdb-client')
const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'everi'})

//const point = new Point('mem').floatField('used_percent', 23.43234543)
const point = new Point('automated-test-runs')
   .tag('product-family','casino-solutions')
   .tag('product-line', 'surveillance')
   .tag('product-module', 'module-1')
   .stringField('result', 'failed')
   

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
