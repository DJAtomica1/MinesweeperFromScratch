
let isgame = false;
let Bombs = 30;
let timer;
let istimer = false;
let bombPositions = [];
let uncleared = [];
let randombombPosition = function () {
    return `${Math.floor(Math.random() * 15) + 1}-${Math.floor(Math.random() * 15) + 1}`;
};

let intiate = function () {
    for (let i = 0; i < Bombs; i++) {
        let str = randombombPosition();
        if (bombPositions.indexOf(str) === -1) {
            bombPositions.push(str);
        }
        else
            i -= 1;
    }
    for (let i = 1; i < 16; i++)
        for (let j = 1; j < 16; j++)
            uncleared.push(`${i}-${j}`);

    // delete item
    // console.log(uncleared.indexOf('1-1'));
    // uncleared.splice(uncleared.indexOf('1-1'), 1);
    for (let bombs of bombPositions) {
        let arr = bombs.split('-');
        uncleared.splice(uncleared.indexOf(`${arr[0]}-${arr[1]}`), 1);
    }
};


let showbombs = function () {
    for (let bombs of bombPositions) {
        let arr = bombs.split('-');
        // console.log(bombPositions[0].split('-'));
        // console.log("bombs at:", document.querySelector(`#r${arr[0]} .btn${arr[1]}`));
        document.querySelector(`#r${arr[0]} .btn${arr[1]}`).innerHTML = '💣';
    }

};

let isindomain = function (arr) {
    return arr[0] < 16 && arr[0] > 0 && arr[1] < 16 && arr[1] > 0;
}

let cleararound = function (arr) {
    if (isindomain(arr) && uncleared.indexOf(`${arr[0]}-${arr[1]}`) !== -1) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (bombPositions.indexOf(`${i + parseInt(arr[0])}-${j + parseInt(arr[1])}`) !== -1) {
                    count++;

                }
            }
        }



        let btn = document.querySelector(`#r${arr[0]} .btn${arr[1]}`);
        btn.style.borderColor = 'rgb(59, 59, 59)';
        uncleared.splice(uncleared.indexOf(`${arr[0]}-${arr[1]}`), 1);


        if (count !== 0) {
            btn.innerHTML = `${count}`;
            btn.style.textShadow = '1px 1px black';
            switch (count) {
                case 1:
                    btn.style.color = 'blue';
                    break;
                case 2:

                    btn.style.color = 'green';
                    break;
                case 3:

                    btn.style.color = 'red';
                    break;
                case 4:

                    btn.style.color = 'rgb(10, 10, 86)';
                    break;
                case 5:

                    btn.style.color = 'rgb(111, 0, 0)';
                    break;
                case 6:

                    btn.style.color = 'cyan';
                    break;
                case 7:
                    btn.style.color = 'purple';

                    break;
                case 8:
                    btn.style.color = 'gray';

                    break;

            }
        }

        if (count === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    cleararound([parseInt(arr[0]) + i, parseInt(arr[1]) + j]);
                    // console.log([parseInt(arr[0]) + i, parseInt(arr[1]) + j]);
                    // console.log('inside');

                }
            }
        }

    }
};

let leaderboardadd = function (name, time) {
    let outer = document.querySelector('.leaderboard');
    let row = document.createElement('div');
    row.classList.add('row');
    let boxname = document.createElement('div');
    let boxtime = document.createElement('div');
    boxname.innerHTML = `${name}`;
    boxtime.innerHTML = `${time}`;
    row.appendChild(boxname);
    row.appendChild(boxtime);
    outer.appendChild(row);


}



let buttonclicked = function (str) {
    console.log(str);
    if (!isgame) {
        let arr = str.split('-');
        if (bombPositions.indexOf(str) !== -1) {
            showbombs();
            clearInterval(timer);
            isgame = true;
        }
        else if (uncleared.indexOf(str) !== -1) {
            // let btn = document.querySelector(`#r${arr[0]} .btn${arr[1]}`);
            // btn.style.borderColor = 'rgb(59, 59, 59)';
            cleararound(arr);
            if (!istimer) {
                istimer = true;
                timer = setInterval(function () {
                    let span = document.querySelector(".lower span");
                    let currenttime = span.innerHTML.split(':');
                    currenttime[1] = 1 + parseInt(currenttime[1]);
                    if (currenttime[1] >= 60) {
                        currenttime[0] = 1 + parseInt(currenttime[0]);
                        currenttime[1] = 0;
                    }
                    currenttime[1] = currenttime[1].toString();
                    if (currenttime[1].length === 1) {
                        currenttime[1] = '0' + currenttime[1];
                    }
                    span.innerHTML = `${currenttime[0]}:${currenttime[1]}`;

                }, 1000);
            }
        }
        if (uncleared.length === 0) {
            // won the game
            isgame = true;
            clearInterval(timer);
            let totaltime = document.querySelector(".lower span");
            let name = window.prompt(`you won!\n time consumed: ${totaltime.innerHTML}\nEnter your Name`);
            if (name !== null)
                leaderboardadd(name, totaltime.innerHTML);
        }
    }
    // let sm = document.getElementById('a');
    // sm.style.borderColor
}

let restart = function () {
    istimer = false;
    clearInterval(timer);
    document.querySelector(".lower span").innerHTML = "0:00";
    isgame = false;
    uncleared = [];
    bombPositions = [];
    //remove numbers and bombs then fix the styling;
    for (let i = 1; i < 16; i++) {
        for (let j = 1; j < 16; j++) {
            let btn = document.querySelector(`#r${i} .btn${j}`);
            btn.innerHTML = '';
            btn.style.borderColor = 'rgb(200, 200, 200) rgb(59, 59, 59) rgb(59, 59, 59) rgb(200, 200, 200)';
        }
    }
    intiate();

}


intiate();

// showbombs();
// console.log(bombPositions);
// console.log(uncleared);



// let createFunction = function(min, max){
//     return function (input) {
//         return min <= input && input <= max;
//     }
// }

