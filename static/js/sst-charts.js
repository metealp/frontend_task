import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
// import 'https://code.highcharts.com/es-modules/masters/modules/accessibility.src.js';
import SensorDF from './Sensor.js'

let fetched;

fetch('/data')
.then( response => response.json())
.then(result => {
    fetched = result.sensor_data;
    console.log(fetched['sensor0'])
    const test = new SensorDF([0, 1], "sensor0")

    Highcharts.chart('container', {
    
        title: {
            text: 'Smart Steel Technologies'
        },
    
        subtitle: {
            text: 'Frontend Demo'
        },
    
        yAxis: {
            title: {
                text: 'Sensor readings'
            }
        },
    
        xAxis: {
            title: {
                text: 'Samples'
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                // pointStart: 2010
            }
        },
    
        series: [{
            name: 'sensor0',
            data: fetched['sensor0']
        },
        {
            name: 'sensor1',
            data: fetched['sensor1']
        },
        {
            name: 'sensor2',
            data: fetched['sensor2']
        },
        {
            name: 'sensor3',
            data: fetched['sensor3']
        }
    
        ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
});
