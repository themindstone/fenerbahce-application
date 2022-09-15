


const min = (arr: number[]): number => {
    let minValue: number = Number.MAX_SAFE_INTEGER;

    if (arr.length === 0) {
        throw new Error("array is empty")
    }

    arr.forEach((item) => {
        if (item < minValue) {
            minValue = item;
        }
    });

    return minValue;
}


const max = (arr: number[]): number => {
    let maxValue: number = Number.MIN_SAFE_INTEGER;

    if (arr.length === 0) {
        throw new Error("array is empty")
    }

    arr.forEach((item) => {
        if (item > maxValue) {
            maxValue = item;
        }
    });

    return maxValue;
}


export {
    min,
    max
};