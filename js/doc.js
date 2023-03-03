const masti = [
    ['f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'a',],
    ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'n',],
    ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'A',],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'N',],
];  // 0 Pika;  1 Trefa;  2 Bubna;  3 Cherva

let kozuri = [];
let kompKards = [];
let playerKards = [];
let sklad = [];
let op1 = [];
//---------------------
let komp_kozurs = [];
let player_kozurs = [];
let player_hod = true;
let comp_prinyal = false;

//-------------------------S h o w   M a s s a g e-------------------------------------
function showMassage_(massage = '', timeShow = 900) {
    let body = document.querySelector('body');
    let p = document.createElement('p');
    p.classList.add('massage');
    p.setAttribute('id', 'p_massage');
    p.innerText = massage;
    body.prepend(p);
    let p_massage = document.getElementById('p_massage');
    let stepTransparent = 0;
    let down = false;
    setInterval(() => {
        if (stepTransparent < 100 && down == false) {
            p_massage.style.opacity = (stepTransparent * 0.01);
            stepTransparent += 5;
            if (stepTransparent >= 99) { down = true }
        }
        if (stepTransparent > 0 && down == true) {
            p_massage.style.opacity = (stepTransparent * 0.01);
            stepTransparent--;
        }
    }, (timeShow / 200));
    setTimeout(() => {
        body.removeChild(p_massage);
    }, timeShow);
}
//-------------------------Show Massage-------------------------------------

//------------------t a s o v k a------------------------
let tempTasov = [];
function tasov() {
    let tempMasti = [];
    let count = 0;
    for (let i = 0; i < masti.length; i++) {
        for (let k = 0; k < masti[i].length; k++) { tempMasti[count] = masti[i][k]; count++; }
    }
    for (let i = tempMasti.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tempMasti[i], tempMasti[j]] = [tempMasti[j], tempMasti[i]];
    }
    tempTasov = tempMasti;
}
tasov();
//-----tasovka-------------------------------------------

//------------------- R A Z D A C H A -------------------------------------

function razdacha_(arr_actual) {
    for (let i = 0; i < arr_actual.length; i++) {
        if (i < 6 && playerKards.length < 6) {
            console.log('mne ');
            playerKards.push(arr_actual[i]);
        } else if (i < 12 && i >= 6 && kompKards.length < 6) {
            console.log('tebe ');
            kompKards.push(arr_actual[i]);
        } else if (i >= 12 && sklad.length < 24) {
            console.log('sklad ');
            sklad.push(arr_actual[i]);
        }
    }
}
razdacha_(tempTasov);
tempTasov = sklad;
//-------------------razdacha-----------------------------------------------

//---------------------- K O Z U R I --------------------------------------------------------------

function kozuri_() {
    for (let i = 0; i < masti.length; i++) {
        for (let k = 0; k < masti[i].length; k++) {
            if (masti[i][k] == sklad[23]) {
                kozuri = masti[i].slice(0);
                if (i == 0) { console.log('Pika') }
                if (i == 1) { console.log('Trefa') }
                if (i == 2) { console.log('Bubna') }
                if (i == 3) { console.log('Cherva') }
            }
        }
    }
}
kozuri_();

//------------------------kozuri--------------------------------------------------------------

//----------------- C H E Y   H O D -----------------------------

function chey_hod() {
    player_kozurs = playerKards.filter(function (obj) { return kozuri.indexOf(obj) >= 0; });
    komp_kozurs = kompKards.filter(function (obj) { return kozuri.indexOf(obj) >= 0; });
    console.log(player_kozurs, komp_kozurs);
    let p = 0, k = 0;
    for (let i = 0; i < kozuri.length; i++) {
        if (player_kozurs[player_kozurs.length - 1] == kozuri[i]) { p = i };
        if (komp_kozurs[komp_kozurs.length - 1] == kozuri[i]) { k = i };
    }

    if (p > k || p == k) { console.log('pl'); showMassage_('Х о д и !', 4000); player_hod = true };
    if (p < k) {
        console.log('ko'); showMassage_('О т б и в а й !', 4000); player_hod = false;
        hod_kompa_();

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
}
chey_hod();
//-------------------chey hod----------------------------

// -------------- V E R S T K A   ------------------------------------------------

function verstka_() {
    let compzone_elem = document.querySelector('.compzone');
    while (compzone_elem.firstChild) { compzone_elem.removeChild(compzone_elem.firstChild); }

    for (let i = 0; i < sklad.length; i++) {
        let divs = document.createElement('div');
        divs.classList.add('card', 'card-back', 'c' + i);
        if (i == (sklad.length - 1)) {
            divs.classList.add('card-front'); divs.classList.remove('card-back');
            let p = document.createElement('p'); p.classList.add('p-card');
            if (sklad[i] == sklad[i].toUpperCase()) { p.classList.add('red'); }
            p.innerHTML = sklad[i];
            divs.append(p);
        }
        compzone_elem.append(divs);
    }

    let playerzone_elem = document.querySelector('.playerzone');
    while (playerzone_elem.firstChild) { playerzone_elem.removeChild(playerzone_elem.firstChild); }

    for (let i = 0; i < playerKards.length; i++) {
        let divs = document.createElement('div');
        let p = document.createElement('p');
        divs.classList.add('card', 'card-front', 'd' + i);
        divs.setAttribute('name', 'player');
        p.classList.add('p-card', 'p' + i);
        if (playerKards[i] == playerKards[i].toUpperCase()) { p.classList.add('red'); }
        p.innerHTML = playerKards[i];
        divs.append(p);
        playerzone_elem.append(divs);
    }

    let pole_elem = document.querySelector('.pole');
    while (pole_elem.firstChild) { pole_elem.removeChild(pole_elem.firstChild); }

    for (let i = 0; i < op1.length; i++) {
        let divs = document.createElement('div');
        let p = document.createElement('p');
        divs.classList.add('card', 'card-front', 'd' + i);
        divs.setAttribute('name', 'pole');
        p.classList.add('p-card', 'p' + i);
        if (op1[i] == op1[i].toUpperCase()) { p.classList.add('red'); }
        p.innerHTML = op1[i];
        divs.append(p);
        pole_elem.append(divs);
    }
}
verstka_();
//------verstka-------------------------------------------------------------------


// -------------- C l i c k _ r e f r e s h - ----------------------------
function playerClick_refresh() {
    let playerClickCard = document.getElementsByName('player');
    for (let i = 0; i < playerClickCard.length; i++) {
        playerClickCard[i].onclick = () => {
            console.log(player_hod);
            if (player_hod == true) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                let hodCard = playerKards.splice(i, 1,);
                op1.push(hodCard[0]);
                console.log(op1);
                verstka_();
                playerClick_refresh();
                razbor_(hodCard);
                player_hod = false;
                console.log('player_hod == true');
            } else {
                let hodCard = playerKards.splice(i, 1,);
                op1.push(hodCard[0]);
                console.log(op1);
                verstka_();
                playerClick_refresh();
                //razbor_(hodCard);//
                player_hod = true;
                console.log('player_hod == false');
            }

        }
    }
}
playerClick_refresh();

// --------------Click_refresh---------------------------------------------

//------------------------ O T B O Y ------------------------------------------------------------

function otboy_(comp_prinyal = false) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    op1 = [];

    while (6 > kompKards.length) {
        let boat = sklad.splice(0, 1);
        kompKards.push(boat[0]);
    }

    while (6 > playerKards.length) {
        let boat = sklad.splice(0, 1);
        playerKards.push(boat[0]);
    }

    if (comp_prinyal == true) {
        showMassage_('З а б р а л !', 2000);
        player_hod = true;
        comp_prinyal = false;

    } else {
        showMassage_('О т б о й !', 1000);
        //hod_kompa_();
    }
    if (player_hod == false) { hod_kompa_(); }// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    verstka_();
    playerClick_refresh();

}

document.querySelector('.compzone').onclick = otboy_;

//--------------------------------------otboy-------------------------------------------


//----------------------- R A Z B O R ---------------------------------------------------------- R A Z B O R --------------------

function razbor_(hodCard) {
    for (let i = 0; i < masti.length; i++) {
        for (let k = 0; k < masti[i].length; k++) {
            if (hodCard[0] == masti[i][k]) {
                //======================================
                let podkinut = [];
                for (let u = 0; u <= 3; u++) {
                    if (masti[u][k] !== hodCard[0]) { podkinut.push(masti[u][k]); }
                }
                console.log('podkinut ' + podkinut);
                //======================================
                console.log('mast' + i + "  karta" + k);
                console.log('otvet eto ' + masti[i][k + 1]);
                let otvet_eto = masti[i][k + 1];
                if (otvet_eto == undefined) {
                    console.log('prinimau');
                    let temp_arr = kompKards.concat(op1);
                    op1 = [];
                    kompKards = temp_arr;
                    console.log('kompKards4 = ' + kompKards);
                    player_hod = true;
                    console.log(player_hod);
                    verstka_();
                    playerClick_refresh();
                    otboy_(true);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    return;
                }
                console.log(masti[i][k].length);
                let otvet = masti[i].slice(k + 1);
                console.log(otvet);
                //=======================================
                let shag_Flag = 0;
                let prinimau_flag = 0;
                for (let a = 0; a < otvet.length; a++) {
                    for (let b = 0; b < kompKards.length; b++) {
                        if (otvet[a] === kompKards[b]) {
                            if (shag_Flag == 0) {
                                prinimau_flag++;
                                console.log('kompKards1 = ' + kompKards);
                                let otvetCard = kompKards.splice(b, 1);
                                op1.push(otvetCard[0]);
                                console.log('kompKards2 = ' + kompKards);
                                verstka_();
                                playerClick_refresh();
                                shag_Flag++;
                                break;
                            }
                        }
                    }
                }
                if (prinimau_flag == 0) {
                    console.log(prinimau_flag + ' prinimau_flag');
                    let temp_arr = kompKards.concat(op1);
                    op1 = [];
                    kompKards = temp_arr;
                    console.log('kompKards3 = ' + kompKards);
                    verstka_();
                    playerClick_refresh();
                    otboy_(true);// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                }
            }
        }
    }
}
//------------------razbor-------------------------------------------------------------------------------razbor------------------


//-------------------------------------- H O D   K O M P A ----------------------------------

function hod_kompa_() {
    let temp_cards = [],
        temp_group = [];

    if (sklad.length > 10 && player_hod == false) {

        let koz_cards = kompKards.filter(x => kozuri.includes(x)); // выделить козыря .. 
        let temp_cards = kompKards.filter(x => !kozuri.includes(x)); // выделить козыря .. 
        console.log(temp_cards + ' простыеКарты');
        console.log(koz_cards + ' козыри');

        let small = []; let kk = 999; // выделить младшую карту

        for (let i = 0; i < masti.length; i++) {
            for (let k = 0; k < masti[i].length; k++) {
                if (temp_cards.includes(masti[i][k])) {
                    if (k < kk) {
                        kk = k;
                        small[0] = masti[i][k]; // записали младшую в small[0]
                    }
                }
            }
        }

        for (let u = 0; u < kompKards.length; u++) {
            if (kompKards[u] == small[0]) {
                console.log(small + ' ..small');// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                op1 = kompKards.splice(u, 1); // срезали младшую в Ход
                //player_hod = true; //  
            }
        }
        //-------        
        verstka_();
        playerClick_refresh();
        player_hod == true;

    } else if (false) {
        temp_cards = kompKards.filter(x => !kozuri.includes(x));
        //console.log(temp_cards);
        for (let i = 0; i < masti.length; i++) {
            for (let k = 0; k < masti[i].length; k++) {

                // let podkinut = [];
                // for (let u = 0; u <= 3; u++) {
                //     if (masti[u][k] !== hodCard[0]) { podkinut.push(masti[u][k]); }
                // }
                // console.log('podkinut ' + podkinut);


                if (temp_cards.includes(masti[i][k])) {
                    temp_group.push(k);
                    console.log(temp_group);
                    //counter++;
                }
            }
        }
    } else if (sklad.length == 0) {

    }

    //kompKards
}
//hod_kompa_();
//-----------------------------------------hod kompa-----------------------------------------










//============== M O B I L E ========================================

// function t1() { this.classList.toggle('card_show') }

// let chTouch = document.querySelectorAll('div.card-front');

// for (let i = 0; i < chTouch.length; i++) { chTouch[i].ontouchend = t1 }







//===============MOBILE========================================





























    //