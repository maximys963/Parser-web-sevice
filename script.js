const obj = [{
    id: 1,
    url: 'https://learn.javascript.ru/modifying-document',
    status: "done",
    entriesCount: 17
},
    {
        id: 2,
        url: 'https://github.com/axios/axios',
        status: "done",
        entriesCount: 19
    },
    {
        id: 3,
        url: 'https://flatuicolors.com/palette/tr',
        status: "done",
        entriesCount: 21
    }
];
let tableRegistry = [{}];
const ulrinput = document.getElementById("url-input");
const symbols = document.getElementById("symbol");
const maxcount = document.getElementById("max-count");
const maxurl = document.getElementById("max-url");
const okbutton = document.getElementById("button");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const pause = document.getElementById("pause");

class ValiationStore{
    constructor(){
        this.firstInputIsValid = false;
        this.secondInputIsValid = false;
        this.thirdInputIsValid = false;
        this.fourthInputIsValid = false;
    }
}

let __validationRegistration = new ValiationStore();

ulrinput.addEventListener('focusout', ()=>{
    let regUrlInput = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/igm;
    if(ulrinput.value === "" || ulrinput.value === " "){
        ulrinput.style.border = "1px solid #c0392b";
        ulrinput.value = "your field is empty";
        ulrinput.style.color = "#c0392b";
        __validationRegistration.firstInputIsValid = false;
    }else if(regUrlInput.test(ulrinput.value) === false){
        ulrinput.style.border = "1px solid #c0392b";
        ulrinput.value = "your url is invalid";
        ulrinput.style.color = "#c0392b";
        __validationRegistration.firstInputIsValid = false;
    }else{
        ulrinput.style.border = "1px solid lightgrey";
        __validationRegistration.firstInputIsValid = true;
    }
});
ulrinput.addEventListener('focus', ()=>{
    ulrinput.style.border = "1px solid lightgrey";
    ulrinput.style.color = "black";
    ulrinput.value = "";
    __validationRegistration.firstInputIsValid = false;
});


symbols.addEventListener("focusout", ()=>{
    if(symbols.value === "" || symbols.value === " " ){
        symbols.style.border = "1px solid #c0392b";
        symbols.value = "your field is empty";
        symbols.style.color = "#c0392b";
        __validationRegistration.secondInputIsValid = false;
    }else{
        __validationRegistration.secondInputIsValid = true;
    }
});

symbols.addEventListener("focus", ()=>{
    symbols.style.border = "1px solid lightgrey";
    symbols.style.color = "black";
    symbols.value = "";
    __validationRegistration.secondInputIsValid = false;
});

maxcount.addEventListener("focusout", ()=>{
    if( maxcount.value === "" ||  maxcount.value === " " ){
        maxcount.style.border = "1px solid #c0392b";
        maxcount.value = "your field is empty";
        maxcount.style.color = "#c0392b";
        __validationRegistration.thirdInputIsValid = false;
    }else if(maxcount.value< 1 || maxcount.value > 500){
        maxcount.style.border = "1px solid #c0392b";
        maxcount.value = "value must be from 1 to 500";
        maxcount.style.color = "#c0392b";
        __validationRegistration.thirdInputIsValid = false;
    }else if(isNaN(maxcount.value)){
        maxcount.style.border = "1px solid #c0392b";
        maxcount.value = "value must be a Number";
        maxcount.style.color = "#c0392b";
        __validationRegistration.thirdInputIsValid = false;
    }else{
        __validationRegistration.thirdInputIsValid = true;
    }
});
maxcount.addEventListener("focus", ()=> {
    maxcount.style.border = "1px solid lightgrey";
    maxcount.style.color = "black";
    maxcount.value = "";
    __validationRegistration.thirdInputIsValid = false;
});

maxurl.addEventListener("focusout", ()=>{

    if( maxurl.value === "" ||  maxurl.value === " " ){
        maxurl.style.border = "1px solid #c0392b";
        maxurl.value = "your field is empty";
        maxurl.style.color = "#c0392b";
        __validationRegistration.fourthInputIsValid = false;
    }else if(maxurl.value< 1 || maxurl.value > 1000){
        maxurl.style.border = "1px solid #c0392b";
        maxurl.value = "value must be from 1 to 1000";
        maxurl.style.color = "#c0392b";
        __validationRegistration.fourthInputIsValid = false;
    }else if(isNaN(maxurl.value)){
        maxurl.style.border = "1px solid #c0392b";
        maxurl.value = "value must be a Number";
        maxurl.style.color = "#c0392b";
        __validationRegistration.fourthInputIsValid = false;
    }else{
        __validationRegistration.fourthInputIsValid = true;
    }

});

maxurl.addEventListener("focus", ()=>{

    maxurl.style.border = "1px solid lightgrey";
    maxurl.style.color = "black";
    maxurl.value = "";
    __validationRegistration.fourthInputIsValid = false;

});
function isValid(element ) {
    return element = true;
}

okbutton.addEventListener('click', validation);
function validation() {

    // let addmenu = document.getElementById("addition-menu");
    if(__validationRegistration.firstInputIsValid && __validationRegistration.secondInputIsValid && __validationRegistration.thirdInputIsValid && __validationRegistration.fourthInputIsValid){
        console.log("yeep");
        let status = document.getElementById("progress");
        status.innerText = "prepare to start";
        status.style.color = "lightgreen";


        pause.addEventListener('click', Pause);
        function Pause(){
            let status = document.getElementById("progress");
            status.innerText = "paused";
            status.style.color = "#fffa65";
            status.style.borderColor = "#fffa65"
        }

        stop.addEventListener('click', Stop);
        function Stop(){
            let status = document.getElementById("progress");
            status.innerText = "stoped";
            status.style.color = "#ff4d4d";
            status.style.borderColor = "#ff4d4d"

        }

    }
}
start.addEventListener('click', Run);
function Run(){

    if(__validationRegistration.firstInputIsValid && __validationRegistration.secondInputIsValid && __validationRegistration.thirdInputIsValid && __validationRegistration.fourthInputIsValid) {
        console.log("run");
        obj.forEach((element)=>{

            let checker = tableRegistry.some((writen)=>{
                return writen.id === element.id
            });

            if(!checker){
                tableRegistry.push(element);
                let table = document.getElementById("table");
                let mainTR = document.createElement("tr");
                let numberTD = document.createElement("td");
                numberTD.innerText = element.id;
                let urlTD = document.createElement("td");
                urlTD.innerText = element.url;
                let statusTD = document.createElement("td");
                statusTD.innerText = element.status;
                let foundTD = document.createElement("td");
                foundTD.innerText = element.entriesCount;

                table.appendChild(mainTR);
                mainTR.appendChild(numberTD);
                mainTR.appendChild(urlTD);
                mainTR.appendChild(statusTD);
                mainTR.appendChild(foundTD);
            }




        });

       let check =  {
                url: ulrinput.value,
                symbol: symbols.value,
                maxCount: maxcount.value,
                maxUrl: maxurl.value
         };
        // console.log(  axios.post('http://localhost:8091/openNewSession', JSON.stringify({
        //     url: ulrinput.value,
        //     symbol: symbols.value,
        //     maxCount: maxcount.value,
        //     maxUrl: maxurl.value
        // })));
// first
        axios.post('http://localhost:8091/openNewSession', {
            url: ulrinput.value,
            symbol: symbols.value,
            maxCount: maxcount.value,
            maxUrl: maxurl.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        //second
        // axios.post('http://localhost:8091/openNewSession', JSON.stringify({
        //     url: ulrinput.value,
        //     symbol: symbols.value,
        //     maxCount: maxcount.value,
        //     maxUrl: maxurl.value
        // }))
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // third fetch
        // const newPost = check =>{
        //     const options = {
        //         method: 'POST',
        //         body: JSON.stringify(check),
        //         headers: new Headers({
        //             'Content-Type' : 'application/json'
        //         })
        //
        //     };
        //     return fetch('http://localhost:8091/openNewSession', options)
        //         .then( res => res.json())
        //         .then( res => console.log(res))
        //         .catch(error => console.error(`Error: ${error}`))
        //
        // }


        // $.ajax({
        //     url:'http://localhost:8091/openNewSession',
        //     type:"POST",
        //     contentType: "application/json; charset=utf-8",
        //     data: JSON.stringify(check), //Stringified Json Object
        //     async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
        //     cache: false,    //This will force requested pages not to be cached by the browser
        //     processData:false, //To avoid making query String instead of JSON
        //     success: function(resposeJsonObject){
        //        console.log("success")
        //     }
        // });
        //


    }
}







