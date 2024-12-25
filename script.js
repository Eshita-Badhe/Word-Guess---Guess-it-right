let str = "CART"; // Default word for level 1
let letter=3; //Default for level 1
let letters=[3,4,5];

//words
const words3 = ['CAT', 'DOG', 'BAT', 'POT', 'HAT', 'SAD', 'FAT', 'RAT', 'HOT', 'MOT', 'LOG', 'JAM', 'PAN', 'FUN', 'TUG', 'VAN', 'CUP', 'PEN', 'BED', 'SUN'];

const words4 = ['CART', 'FIRE', 'BONE', 'BLUE', 'MIND', 'ROSE', 'PINK', 'STAR', 'JUMP', 'BIRD', 'FUEL', 'RAIN', 'BELL', 'TREE', 'COOL', 'LION', 'KIND', 'NICE', 'PEAR', 'JUMP'];

const words5 = ['WRITE', 'APPLE', 'LIGHT', 'MOUSE', 'WATCH', 'MINTS', 'PLANT', 'BREAD', 'PEARL', 'FIGHT', 'DREAM', 'STORM', 'GLOWY', 'TOAST', 'NIGHT', 'BEACH', 'GOLDY', 'CLOUD', 'SWIMY', 'GLOWY'];

let randomWord=parseInt(Math.random()*20);

function levelSelector(l) 
{
    localStorage.setItem("level", l); // Store level in localStorage
    if (l === 1) 
    {
        localStorage.setItem("letter", 3);
    } 
    else if (l === 2) 
    {
        localStorage.setItem("letter", 4);
    } 
    else if (l === 3) 
    {
        localStorage.setItem("letter", 5);
    }
}

function setRandomStr(nletter)
{
    if(nletter===3)
    {
        return words3[randomWord];
    }
    else if(nletter===4)
    {
        return words4[randomWord];
    }
    else
    {
        return words5[randomWord];
    }
}
function play() 
{
    
    const level = localStorage.getItem("level");
    if (level) 
    {
        window.location.href = `${level}.html`;
    } 
    else 
    {
        alert("Select level to proceed!");
    }
}

function submit() 
{
    let correct = 0,
        cor_wrong_pos = 0,
        wrong = 0;
    
    letter=letters[parseInt(localStorage.getItem("level") - 1)];
    str=setRandomStr(letter);
    if (isNaN(letter) || letter <= 0) 
    { // Validate letter
        alert("Invalid game setup! Please select a level again.");
        location.href = "index.html";
        return;
    }

    // Collect input
    let l=new Array(letter);

    for (let i = 0; i < letter; i++) 
    {
        l[i]=document.getElementsByClassName("l")[i].value.toUpperCase(); 
    }

    for (let i = 0; i < letter; i++) 
    {
        if (l[i] === undefined || l[i] === null || l[i] === '') 
        {
            alert("All input fields must be filled!");
            return;
        }
        
    }
    
    const inputElements = document.getElementsByClassName("l");
    if (inputElements.length !== letter) 
    {
        alert("Mismatch between the number of input fields and expected letters.");
        return;
    }
    
    console.log("str:", str);
    console.log("l:", l);

    let guess = l.join('');

    if (guess === str) {
        alert("Congratulations! You got it!");
        location.href = "index.html";
        return; // Exit after success
    } 
    else 
    {
        const used = Array(letter).fill(false); // Track used letters in `guess`
        for (let i = 0; i < letter; i++) 
        {
            if (str[i] === l[i]) 
            {
                correct++;
                used[i] = true;
            }
        }
        for (let i = 0; i < letter; i++) 
        {
            if (str[i] !== l[i]) 
            {
                for (let j = 0; j < letter; j++) 
                {
                    if (!used[j] && str[i] === l[j]) 
                    {
                        cor_wrong_pos++;
                        used[j] = true;
                        break;
                    }
                }
            }
        }

        wrong = letter - correct - cor_wrong_pos;

        const msg = [
            `${correct} letter${correct === 1 ? " is" : "s are"} at the correct position.`,
            `${cor_wrong_pos} letter${cor_wrong_pos === 1 ? " is" : "s are"} correct but in the wrong position.`,
            `${wrong} letter${wrong === 1 ? " is" : "s are"} wrong.`,
        ].join("\n");

        alert(msg);
    }
}
