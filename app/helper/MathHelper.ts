export const countDecimals = (number:number)=>{
    let separator = ".";
    const splittedNumber = number.toString().split(separator,2);
    return splittedNumber[1] ? parseInt(splittedNumber[1].length.toString()) : 0 ;    
}