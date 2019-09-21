window.onload=function(){

    //-------------------------ADMIN--------------------------


    function fetchJSONFile(path, callback){
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if(httpRequest.readyState === 4){
                if(httpRequest.status === 200){
                    var data = JSON.parse(httpRequest.responseText);
                    if(callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }


    function loadToLocal(){
        fetchJSONFile('clientList.json', function(data){
            for(let client of data){
                localStorage.setItem(client.name, client.clientNum);
                localStorage.setItem(client.clientNum, client.specialist);
            }})
    }

    const loadButton = document.getElementById('load-to-local');

    if(loadButton){
        loadButton.addEventListener('click', loadToLocal);
    }

    function calcClientNum(){
        var res = 0;

        for(let i = 0; i < localStorage.length; i++){
            storedNumber = parseInt(localStorage.getItem(localStorage.key(i)));
            if(storedNumber >= res){
                res = parseInt(storedNumber) + 1;
            }
        }

        return "0" + res.toString();
    }


    function storeInfo(){
        var name = document.getElementById("fname");
        var lastName = document.getElementById("lname");
        var specialist = document.getElementById('spec-select').value;

        var fullName = name.value + " " + lastName.value;

        if(name && lastName && specialist !== "Assign a specialist"){
            if(localStorage.getItem(fullName) === null){
                var clientNum = calcClientNum();
                localStorage.setItem(fullName, clientNum);
                localStorage.setItem(clientNum, specialist);
                updateScoreboard;
            }else{
                alert("Client already in line.");
            }
        }else{
            alert("Please fill the form correctly");
        }
    }

    const form = document.getElementById('client-form')
    if(form){
        form.addEventListener('submit', storeInfo);
    }

    this.console.log(this.localStorage);
//-----------------------SCOREBOARD-----------------------
    var scoreboard = document.getElementById('scoreboard');
    
    function sortLocalStorage(){
        var localStorageArray = [];
        var obj = {};
        for(let i = 0; i < localStorage.length; i++){
            if(!isNaN(parseInt(localStorage.key(i)))){
                obj = {};
                obj.specialist = localStorage.getItem(localStorage.key(i));
                obj.clientNum = localStorage.key(i);
                localStorageArray.push(obj);
            }
        }

        var sorted = localStorageArray.sort(function (obj1, obj2) {

            if (obj1.specialist > obj2.specialist) return -1;
            if (obj1.specialist < obj2.specialist) return 1;
        
            if (obj1.clientNum > obj2.clientNum) return 1;
            if (obj1.clientNum < obj2.clientNum) return -1;
        
        });

        return sorted;
    }

    if(scoreboard){
        var sortedArray = sortLocalStorage();
        for(let i = 0; i < sortedArray.length; i++){
            scoreboard.innerHTML += "<tr><td>" + sortedArray[i].specialist + "</td><td>" + sortedArray[i].clientNum + "</td><tr>";
        }
    }

//-----------------------SPECIALIST-----------------------

//------------------------COMBINED------------------------
}