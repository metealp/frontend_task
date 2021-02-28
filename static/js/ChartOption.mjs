export const distributionPolarChartOptions = (series) => {
    return {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Polar Distribution Chart'
        },
        xAxis: [{
            categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
            reversed: false,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (male)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
            linkedTo: 0,
            labels: {
                step: 1
            },
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value);
                }
            },
        },
    
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: series

    }
};

export const distributionPercChartOptions = (series) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Distribution Percentages'
        },
        xAxis: {
            categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"]
        },
        yAxis: {
            min: 0,
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: series
    }
};

export const totalDistributionChartOptions = (series) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Heterogenous Distribution'
        },
        xAxis: {
            categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
            crosshair: true
        },
        yAxis: {
            min: 0,
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    }
}

export const oneSensorReadingChartOptions = (sampleCodes, readings) => {
    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Sensor Readings'
        },
        xAxis: {
            categories: sampleCodes
        },
        legend: {
            enabled: false
        },  
        series: [{
            data: readings
        }]
    }
}

export const allSensorsReadingChartOptions = (sampleCodes, series) => {
    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Sensor Readings'
        },
        xAxis: {
            categories: sampleCodes
        },
        legend: {
            enabled: false
        },  
        series: series
    }
}