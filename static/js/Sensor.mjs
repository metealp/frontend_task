export default class SensorDF {
    constructor(rawData, name, turnSample) {
        this.name = name;
        this.turnSample = turnSample;
        //raw data
        this.rawData = rawData;
        this.positiveData = rawData.slice(0, turnSample);
        this.negativeData = rawData.slice(turnSample);

        //sorted data
        this.rawDataSorted =  this.sortData(this.rawData);
        this.positiveDataSorted =  this.sortData(this.positiveData);
        this.negativeDataSorted =  this.sortData(this.negativeData);
        
        //MEANS
        this.totalMean = this.calculateMean(this.rawData);
        this.positiveMean = this.calculateMean(this.positiveData)
        this.negativeMean = this.calculateMean(this.negativeData)
        
        this.totalVariance = this.calculateVariance(this.rawData, this.totalMean)
        this.positiveVariance = this.calculateVariance(this.positiveData, this.positiveMean)
        this.negativeVariance = this.calculateVariance(this.negativeData, this.negativeMean)
        
        this.totalStd = this.calculateStd(this.totalVariance);
        this.positiveStd = this.calculateStd(this.positiveVariance);
        this.negativeStd = this.calculateStd(this.negativeVariance);
        
        this.totalMedian = this.calculateMedian(this.rawDataSorted)
        this.positiveMedian = this.calculateMedian(this.positiveDataSorted)
        this.negativeMedian = this.calculateMedian(this.negativeDataSorted)
        
        this.totalMin = this.calculateMin(this.rawDataSorted)
        this.positiveMin = this.calculateMin(this.positiveDataSorted)
        this.negativeMin = this.calculateMin(this.negativeDataSorted)
        
        this.totalMax = this.calculateMax(this.rawDataSorted)
        this.positiveMax = this.calculateMax(this.positiveDataSorted)
        this.negativeMax = this.calculateMax(this.negativeDataSorted)
        
        this.totalDistribution = this.distributeData(this.rawDataSorted)
        this.positiveDistribution = this.distributeData(this.positiveDataSorted)
        this.negativeDistribution = this.distributeData(this.negativeDataSorted)
    }

    calculateMean( data ) {
        const sumOfArray = data.reduce((a, b) => a + b)
        const mean = sumOfArray/data.length
        return mean;
    }
    //Kyle Jensen - bubble sort
    //https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
    sortData ( inputArr ) {
        let outputArr = Array.from(inputArr); 
        let len = outputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {
                if (outputArr[i] > outputArr[i + 1]) {
                    let tmp = outputArr[i];
                    outputArr[i] = outputArr[i + 1];
                    outputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return outputArr;
    }

    calculateVariance( data, mean ) {
        let deviationArray = [];
        for( let item of data) {
            const deviation = Math.pow((item-mean), 2);
            deviationArray.push(deviation);
        }
        const variance = Math.pow(this.calculateMean(deviationArray), 0.5);
        return variance;
    }
    calculateStd( variance ) {
        const std = Math.pow(variance, 0.5);
        return std;
    }
    calculateMedian( sortedData ) {
        const index = Math.floor(sortedData.length / 2);
        return sortedData[index];
    }
    calculateMin( sortedData ) {
        return sortedData[0];
    }
    calculateMax( sortedData ) {
        return sortedData[sortedData.length - 1];
    }
    distributeData ( sortedData, distributionRange = 0.10 ) {
        let lastIndex = 0;
        let nextRange = distributionRange;
        let counts = [];
        for (let i=0; i<sortedData.length; i++){
            if(sortedData[i] > nextRange){
                counts.push(i-lastIndex)
                nextRange += distributionRange
                lastIndex = i
            }
        }
        const sum = counts.reduce((a, b) => a + b, 0);
        counts.push(sortedData.length - sum);
        return counts;
    }

}