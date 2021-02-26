export default class SensorDF {
    constructor(rawData, name) {
        this.rawData = rawData;
        this.name = name;
        this.confirm()
        //measure everything for class 1, -1 and total
    }
    confirm() {
        console.log("imported")
        console.log(this.rawData)
        console.log(this.name)
    }

    calculateMean( data ) {
        const sumOfArray = data.reduce((a, b) => a + b)
        const mean = sumOfArray/data.length
        return mean;
    }
    //Kyle Jensen - bubble sort
    //https://medium.com/javascript-algorithms/javascript-algorithms-bubble-sort-3d27f285c3b2
    sortData ( inputArr ) {
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {
                if (inputArr[i] > inputArr[i + 1]) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    }

    calculateVariance( data ) {
        const mean = this.calculateMean(data);
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
        const index = sortedData.length;
        return sortedData[index];
    }
    calculateRange( sortedData ) {
        const range = calculateMax(sortedData) - calculateMin(sortedData);
        return range;
    }
    distributeData ( sortedData, distributionRange = 0.10 ) {
        let lastIndex = 0;
        let nextRange = distributionRange;
        let counts;

        for (let i=lastIndex; i<sortedData.length; i++){
            if(sortedData[i] > nextRange){
                counts.push(i-1-lastIndex)
                nextRange += distributionRange
                lastIndex = i
                break;
            }
        }

    }

}