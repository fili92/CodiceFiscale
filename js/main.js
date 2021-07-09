var txt_surname = document.getElementById('txt_surname');
var txt_name = document.getElementById('txt_name');
var cmb_sex = document.getElementById('cmb_sex');
var txt_placeBirthday = document.getElementById('txt_placeBirthday');
var cmb_birthDate_day = document.getElementById('cmb_birthDate_day');
var cmb_birthDate_month = document.getElementById('cmb_birthDate_month');
var cmb_birthDate_year = document.getElementById('cmb_birthDate_year');
var div_cf = document.getElementById('cf');

const vocali = ['a', 'e', 'i', 'o', 'u'];

function calcoloCF() {
    if(txt_surname.value === '' ||
       txt_name.value === '' ||
       txt_placeBirthday.value === '') {
        return;
    }

    var surname = txt_surname.value;
    var name = txt_name.value;
    var sex = cmb_sex.value;
    var placeBirthday = txt_placeBirthday.value;
    var birthDate_day = parseInt(cmb_birthDate_day.value);
    var birthDate_month = cmb_birthDate_month.value;
    var birthDate_year = cmb_birthDate_year.value;

    var surnameArr = surname.split('');
    var nameArr = name.split('');
    var yearArr = birthDate_year.split('');
    if(sex === 'f') {
        birthDate_day = birthDate_day + 40;
    }
    var dayArr = birthDate_day.toString().split('');
    
    var cf = [];

    // Le prima tre consonanti del cognome
    var output = [];
    output = getCharacterSurname(surnameArr);

    for (let i = 0; i < output.length; i++) {
        cf.push(output[i]);        
    }

    // la prima, seconda e quarta consonante del nome
    output = getCharacterName(nameArr);

    for (let i = 0; i < output.length; i++) {
        cf.push(output[i]);
    }

    // Ultime due cifre dell'anno di nascita
    cf.push(yearArr[2]);
    cf.push(yearArr[3]);

    // Lettera relativa al mese di nascita
    cf.push(birthDate_month);

    // Giorno di nascita
    if(dayArr.length === 1) {
        cf.push('0');
    }

    for (let i = 0; i < dayArr.length; i++) {
        cf.push(dayArr[i]);
    }
    
    // Codice Catastale del comune di nascita
    cf.push('g');
    cf.push('2');
    cf.push('7');
    cf.push('3');

    // Carattere di controllo
    cf.push(getCarattereDiControllo(cf));

    div_cf.style.display = "block";
    div_cf.innerText = cf.join('').toUpperCase();
}

function isConsonante(lettera) {
    return !vocali.includes(lettera);
}

function getCharacterSurname(array) {
    var consonanti = [];
    var vocali = [];
    for (let i = 0; i < array.length; i++) {
        if(isConsonante(array[i])){
            consonanti.push(array[i]);
        } else {
            vocali.push(array[i]);
        }
    }

    if(consonanti.length >= 3) {
        return consonanti.slice(0, 3);
    } else {
        var returnedArray = [];

        for (let i = 0; i < consonanti.length; i++) {
            returnedArray.push(consonanti[i]);                        
        }
        
        if(vocali.length > 0) {
            for (let j = 0; j < vocali.length && returnedArray.length != 3; j++) {
                returnedArray.push(vocali[j]);                    
            }
        }
        
        while(returnedArray.length != 3) {
            returnedArray.push('x');
        }

        return returnedArray;
    }
}

function getCharacterName(array) {
    var consonanti = [];
    var vocali = [];
    for (let i = 0; i < array.length; i++) {
        if(isConsonante(array[i])){
            consonanti.push(array[i]);
        } else {
            vocali.push(array[i]);
        }
    }

    if(consonanti.length >= 4) {
        return [consonanti[0], consonanti[2], consonanti[3]];
    } else if (consonanti.length === 3) {
        return [consonanti[0], consonanti[1], consonanti[2]];
    } else {
        var returnedArray = [];

        for (let i = 0; i < consonanti.length; i++) {
            returnedArray.push(consonanti[i]);                        
        }
        
        if(vocali.length > 0) {
            for (let j = 0; j < vocali.length && returnedArray.length != 3; j++) {
                returnedArray.push(vocali[j]);                    
            }
        }
        
        while(returnedArray.length != 3) {
            returnedArray.push('x');
        }

        return returnedArray;
    }
}

function getCarattereDiControllo(cf) {
    var counter = 0;
    for (let i = 0; i < cf.length; i++) {
        if((i + 1) % 2 === 0) {
            counter += getNumeroValorePari(cf[i]);
        } else {
            counter += getNumeroValoreDispari(cf[i]);
        }
    }

    counter = counter % 26;

    return getCarattereDiControlloItem(counter);
}

function getNumeroValoreDispari(value) {
    switch (value.toUpperCase()) {
        case '0':
            return 1;
        case '1':
            return 0;
        case '2':
            return 5;
        case '3':
            return 7;
        case '4':
            return 9;
        case '5':
            return 13;
        case '6':
            return 15;
        case '7':
            return 17;
        case '8':
            return 19;
        case '9':
            return 21;
        case 'A':
            return 1;
        case 'B':
            return 0;
        case 'C':
            return 5;
        case 'D':
            return 7;
        case 'E':
            return 9;
        case 'F':
            return 13;
        case 'G':
            return 15;
        case 'H':
            return 17;
        case 'I':
            return 19;
        case 'J':
            return 21;
        case 'K':
            return 2;
        case 'L':
            return 4;
        case 'M':
            return 18;
        case 'N':
            return 20;
        case 'O':
            return 11;
        case 'P':
            return 3;
        case 'Q':
            return 6;
        case 'R':
            return 8;
        case 'S':
            return 12;
        case 'T':
            return 14;
        case 'U':
            return 16;
        case 'V':
            return 10;
        case 'W':
            return 22;
        case 'X':
            return 25;
        case 'Y':
            return 24;
        case 'Z':
            return 23;
    }
}

function getNumeroValorePari(value) {
    switch (value.toUpperCase()) {
        case '0':
            return 0;
        case '1':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        case 'E':
            return 4;
        case 'F':
            return 5;
        case 'G':
            return 6;
        case 'H':
            return 7;
        case 'I':
            return 8;
        case 'J':
            return 9;
        case 'K':
            return 10;
        case 'L':
            return 11;
        case 'M':
            return 12;
        case 'N':
            return 13;
        case 'O':
            return 14;
        case 'P':
            return 15;
        case 'Q':
            return 16;
        case 'R':
            return 17;
        case 'S':
            return 18;
        case 'T':
            return 19;
        case 'U':
            return 20;
        case 'V':
            return 21;
        case 'W':
            return 22;
        case 'X':
            return 23;
        case 'Y':
            return 24;
        case 'Z':
            return 25;
    }
}

function getCarattereDiControlloItem(value) {
    switch (value) {
        case 0:
            return 'a';
        case 1:
            return 'b';
        case 2:
            return 'c';
        case 3:
            return 'd';
        case 4:
            return 'e';
        case 5:
            return 'f';
        case 6:
            return 'g';
        case 7:
            return 'h';
        case 8:
            return 'i';
        case 9:
            return 'j';
        case 10:
            return 'k';
        case 11:
            return 'l';
        case 12:
            return 'm';
        case 13:
            return 'n';
        case 14:
            return 'o';
        case 15:
            return 'p';
        case 16:
            return 'q';
        case 17:
            return 'r';
        case 18:
            return 's';
        case 19:
            return 't';
        case 20:
            return 'u';
        case 21:
            return 'v';
        case 22:
            return 'w';
        case 23:
            return 'x';
        case 24:
            return 'y';
        case 25:
            return 'z';
    }
}