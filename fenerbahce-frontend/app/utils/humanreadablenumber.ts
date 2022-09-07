
export function humanReadableNumber(number: number) {

    return new Intl
       .NumberFormat('en-US')
       .format(number)
};