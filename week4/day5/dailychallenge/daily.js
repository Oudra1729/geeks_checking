function areAnagrams(str1, str2) {
    // Remove whitespace and convert to lowercase
    const normalize = str => str.replace(/\s+/g, '').toLowerCase();
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    // Sort the letters
    const sortedStr1 = normalizedStr1.split('').sort().join('');
    const sortedStr2 = normalizedStr2.split('').sort().join('');

    // Compare sorted strings
    return sortedStr1 === sortedStr2;
}

// Examples
console.log(areAnagrams("listen", "silent"));      
console.log(areAnagrams("hello", "world"));
console.log(areAnagrams("Astronomer", "Moon starer"));
console.log(areAnagrams("The Morse Code", "Here come dots"));