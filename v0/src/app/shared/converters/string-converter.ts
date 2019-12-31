import { stringify } from "querystring";

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

/**
 * Converts a color string in hexa to integer 
 * @param value Hexadecimal string color
 */
export function toHexaInt(value: string): number {
    return parseInt(intToRGB(hashCode(value)));
}
