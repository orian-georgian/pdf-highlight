export function getStringDifference(str1: string, str2: string): string {
    let i = 0;
    
    while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
        i++;
    }

    return str1.slice(i);
}
