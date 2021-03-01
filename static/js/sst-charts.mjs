import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import SensorDF from './Sensor.mjs'
import { oneSensorReadingChartOptions, 
    allSensorsReadingChartOptions, 
    distributionPolarChartOptions, 
    distributionPercChartOptions,
    totalDistributionChartOptions} from './ChartOption.mjs'

let fetched;
let masterSerie = [];

fetch('/data')
.then( response => response.json())
.then(result => {
    fetched = result.sensor_data;
    const pivotIndex = fetched.class_label.indexOf(-1)
    for(let i=0; i<10; i++){
        const sensor = `sensor${i}`;
        masterSerie.push({name: sensor, data: fetched[`${sensor}`]});
        const sensorData = new SensorDF(fetched[`${sensor}`], sensor, pivotIndex)
        
        //RAW READINGS CHART
        const readingsChartOptions = oneSensorReadingChartOptions(fetched.sample_index, sensorData.rawData)
        Highcharts.chart(`${sensor}-readings-chart`, readingsChartOptions, function(chart) {
            const len = sensorData.rawData.length
            chart.xAxis[0].setExtremes(len-11,len-1);
            chart.showResetZoom();
        })
        
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
        Highcharts.chart(`${sensor}-total-distribution-chart`, totalDistributionChartOptions([{name: "total", data: sensorData.totalDistribution}]))
    }

    console.log(masterSerie)
    const masterReadingsChartOptions = allSensorsReadingChartOptions(fetched.sample_index, masterSerie);
    Highcharts.chart(`master`, masterReadingsChartOptions, function(chart) {
        const len = fetched.class_label.length;
        console.log(len)
        chart.xAxis[0].setExtremes(len-11,len-1);
        chart.showResetZoom();
    });
});
