import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import SensorDF from './Sensor.mjs'
import { oneSensorReadingChartOptions, 
    allSensorsReadingChartOptions, 
    distributionPolarChartOptions, 
    distributionPercChartOptions,
    totalDistributionChartOptions} from './ChartOption.mjs'

let fetched;

fetch('/data')
.then( response => response.json())
.then(result => {
    fetched = result.sensor_data;
    const pivotIndex = fetched.class_label.indexOf(-1)
    for(let i=0; i<10; i++){
        const sensor = `sensor${i}`;
        const sensorData = new SensorDF(fetched[`${sensor}`], sensor, pivotIndex)
        
        //RAW READINGS CHART
        const readingsChartOptions = oneSensorReadingChartOptions(fetched.sample_index, sensorData.rawData)
        Highcharts.chart(`${sensor}-readings-chart`, readingsChartOptions)
        
        //POLAR DISTRIBUTION CHART
        const polarizedData = sensorData.negativeDistribution.map(elm => elm * -1)
        const distributedPolarSeries = [
        {
            name: 'positive',
            data: sensorData.positiveDistribution
        },
        {
            name: 'negative',
            data: polarizedData
        }];
        Highcharts.chart(`${sensor}-distributed-polar-chart`, distributionPolarChartOptions(distributedPolarSeries))

        //DISTRIBUTION PERCENTAGE CHART
        const distributedPercSeries = [
            {
                name: 'positive',
                data: sensorData.positiveDistribution
            },
            {
                name: 'negative',
                data: sensorData.negativeDistribution
            }
        ];
        Highcharts.chart(`${sensor}-distributed-percent-chart`, distributionPercChartOptions(distributedPercSeries))

        //TOTAL DISTRIBUTION CHART

        console.log(sensorData.totalDistribution)
        Highcharts.chart(`${sensor}-total-distribution-chart`, totalDistributionChartOptions([{name: "total", data: sensorData.totalDistribution}]))
    }
});
