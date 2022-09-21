import { ethers } from "ethers";


const max = (arr: ethers.BigNumber[]): ethers.BigNumber => {
    if (arr.length === 0) {
        throw new Error("arr is empty");
    }

    let maxValue = ethers.BigNumber.from(0);

    arr.forEach(item => {
        if (item.gt(maxValue)) {
            maxValue = item;
        }
    });

    return maxValue;
};

const min = (arr: ethers.BigNumber[]): ethers.BigNumber => {
    if (arr.length === 0) {
        throw new Error("arr is empty");
    }

    let minValue = ethers.BigNumber.from(0);

    arr.forEach(item => {
        if (item.lt(minValue)) {
            minValue = item;
        }
    });

    return minValue;
};

// const sort = (arr: ethers.BigNumber[]) => {
//     if (arr.length === 0) {
//         throw new Error("arr is empty");
//     }

    

//     // return maxValue;
// }



export {
    max,
    min
};

