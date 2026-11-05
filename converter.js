let choice = prompt("CONVERTER\n1. Temperature\n2. Distance\n3. Weight\n4. Currency");

let value = Number(prompt("Enter value to convert:"));

let result;

if (choice == 1) {
    let type = prompt("1. Celsius to Fahrenheit\n2. Fahrenheit to Celsius");

    if (type == 1)
        result = (value * 9/5) + 32;
    else
        result = (value - 32) * 5/9;
}
else if (choice == 2) {
    let type = prompt("1. Kilometres to Metres\n2. Metres to Kilometres");

    if (type == 1)
        result = value * 1000;
    else
        result = value / 1000;
}
else if (choice == 3) {
    let type = prompt("1. Kilograms to Grams\n2. Grams to Kilograms");

    if (type == 1)
        result = value * 1000;
    else
        result = value / 1000;
}
else if (choice == 4) {
    let type = prompt("1. USD to XAF\n2. XAF to USD");

    if (type == 1)
        result = value * 600;
    else
        result = value / 600;
}
else {
    alert("Invalid choice!");
}

if (result !== undefined)
    alert("Conversion Result: " + result);