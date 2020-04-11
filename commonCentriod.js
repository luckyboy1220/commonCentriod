//Initialize UI variables
const stringSel = document.querySelector("#stringSel");
const stringTyped = document.querySelector("#stringTyped");
const squaresBlock = document.querySelector("#squaresBlock");
const centerOfMassXDisplay = document.querySelector("#centerOfMassXDisplay");
const centerOfMassYDisplay = document.querySelector("#centerOfMassYDisplay");
const rstBtn = document.querySelector("button");
const ul = document.querySelector("ul");

// let data = {
//     a: [1, 2, 1]        0,                1,                  2
//     string: [weight of rows, weight of cols, number of elements]
// };

let data = {};

stringSel.addEventListener("input", function(e) {
    stringTyped.textContent = e.target.value;
});

squaresBlock.addEventListener("click", function(e) {
    const targetText = e.target.textContent;
    const displayText = stringTyped.textContent;
    // debugger
    //whenever the display and current target text are different the data and display needs to be changed
    if(e.target.className === "square" && targetText !== displayText) {
        e.target.textContent = stringTyped.textContent;
        const row = Math.floor(parseInt(e.target.id) / 10);
        const col = Math.floor(parseInt(e.target.id) % 10);
        updateData(stringTyped.textContent, targetText, row, col);//updates the data if the element is in data, add new data if the element is not in data
        updateCenterOfMassDisplayAllRerenderAll();//only update if the contents in data change, either need to add a new list, or need to update the values in the list
    }
});

rstBtn.addEventListener("click", function() {
    //reset everything
    data = {};
    stringSel.value = "";
    ul.innerHTML= "";
    Array.from(squaresBlock.children).forEach(function (elem) {
        console.log(elem.textContent);
        elem.textContent = "";
    });
});


function updateData(displayText, targetText, row, col) {
    /*
            Display   ""        not blank
    Target
     ""               X       add to display
    not blank  remove target  remove target, add to display
    */
    if (targetText !== "") {
        data[targetText][0] -= row;
        data[targetText][1] -= col;
        data[targetText][2] -= 1;
        if (data[targetText][2] == 0) {
            delete data[targetText];
        }
    } 
    
    if (displayText !== "") {
        //before increasing value, check if in object
        if ((data.hasOwnProperty(displayText))) {
            data[displayText][0] += row;
            data[displayText][1] += col;
            data[displayText][2] += 1;
        } else {
           data[displayText] = [];
           data[displayText].push(row);
           data[displayText].push(col);
           data[displayText].push(1);
        }
    }
    
}

function updateCenterOfMassDisplayAllRerenderAll() {
    //clear all li elements in ul
    //iterate through the data object and add it's corresponding li
    ul.innerHTML = "";
    //get all the keys of the data object
    const keys = Object.keys(data);
    //sort the keys
    keys.sort();
    for (const key of keys) {
        console.log(key);
        const rowWeightAvg = data[key][0] / data[key][2];
        const colWeightAvg = data[key][1] / data[key][2];
        const num = data[key][2];
        let li = document.createElement("li");        
        li.textContent = `Center of Mass for ${key} is : ( ${rowWeightAvg}, ${colWeightAvg}), Total number is ${num}`;
        ul.appendChild(li);
    }

}

// function updateCenterOfMassDisplayIncrement(status, displayText) {
//     if (status === "add") {
//         let li = document.createElement("li");
//         let nameX = "centerOfMassX_" + displayText;
//         let nameY = "centerOfMassY_" + displayText;
//         li.innerHTML = <p>Center of Mass: ( <span id="name"></span>, <span id="nameY"></span>)</p>;
//         ul.appendChild(li);
//     } else if (status === "update") {
//         ul.children 
//     } else {//status == "delete"

//     }
// }