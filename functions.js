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
                alert("Registered succesfully");
            }else{
                alert("Client already in line.");
            }
        }else{
            alert("Please fill the form correctly");
        }
    }

    this.console.log(this.localStorage);

    const form = document.getElementById('client-form')

    if(form){
        form.addEventListener('submit', storeInfo);
    }

    const fname = document.getElementById('fname');
    const select = document.getElementById('spec-select');
    const submit = document.getElementById('form-submit');

    if(fname){
        fname.focus();
    }
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

            if (obj1.specialist < obj2.specialist) return -1;
            if (obj1.specialist > obj2.specialist) return 1;
        
            if (parseInt(obj1.clientNum) > parseInt(obj2.clientNum)) return 1;
            if (parseInt(obj1.clientNum) < parseInt(obj2.clientNum)) return -1;
        
        });

        return sorted;
    }

    if(scoreboard){
        var sortedArray = sortLocalStorage();
        this.console.log(sortedArray);
        var currentSpecialist = "";
        const maxNumOfClientsPerSpec = 5;
        var currentNumOfClientsPerSpec;
        for(let i = 0; i < sortedArray.length; i++){
            if(sortedArray[i].specialist !== currentSpecialist){
                currentNumOfClientsPerSpec = 1;
                currentSpecialist = sortedArray[i].specialist;
                scoreboard.innerHTML += "<tr class='first'><td>" + sortedArray[i].specialist + "</td><td>" + sortedArray[i].clientNum + "</td><tr>";
            }else if(currentNumOfClientsPerSpec < maxNumOfClientsPerSpec){
                this.console.log("dabar klientu yra: ", currentNumOfClientsPerSpec, "/n galima kiekis klientu: ", maxNumOfClientsPerSpec);
                scoreboard.innerHTML += "<tr><td>" + sortedArray[i].specialist + "</td><td>" + sortedArray[i].clientNum + "</td><tr>";
                currentNumOfClientsPerSpec++;
            }
        }
    }

    this.console.log(parseInt("01"));
    this.console.log(parseInt("010"));

//-----------------------SPECIALIST-----------------------

    var selectSpec = document.getElementById('spec-page-spec-select');
    var selectClient = document.getElementById('spec-page-client-select');
    var servicedButton = document.getElementById('serviced-button');

    if(selectSpec){
        function refreshArray(){
            var array = sortLocalStorage();

            return array;
        }
        
        var sortedArray = refreshArray();

        var specArray = [...new this.Set(sortedArray.map(item => item.specialist))];
        for(let item of specArray){
            var option = document.createElement('option');
            option.text = item;
            selectSpec.add(option);
        }

        function changeClientList(){
            var startClientLength = selectClient.length;

            for(let i = 0; i < startClientLength; i++){
                selectClient.remove(1);
            }
            var clientArray = sortedArray.map(item => item.clientNum);
            for(let item of clientArray){
                if(selectSpec.value === localStorage.getItem(item)){
                    var option = document.createElement('option');
                    for(let i = 0; i < localStorage.length; i++){
                        if(localStorage.getItem(localStorage.key(i)) === item){
                            option.text = item + " " + localStorage.key(i);
                            break;
                        }
                    }
                    selectClient.add(option);
                }
            }
        }

        function removeClient(){
            var valueArray = selectClient.value.split(' ');
            var clientNumOnly = valueArray[0];

            console.log(clientNumOnly);

            localStorage.removeItem(clientNumOnly);

            console.log(localStorage);
            
            for(let i = 0; i < localStorage.length; i++){
                if(localStorage.getItem(localStorage.key(i)) === clientNumOnly){
                    localStorage.removeItem(localStorage.key(i));
                } 
            }
        }

        selectSpec.addEventListener('change', changeClientList);
        servicedButton.addEventListener('click', removeClient);
    }

//------------------------CLIENT------------------------


}