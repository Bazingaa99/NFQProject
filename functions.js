window.onload=function(){

    let cardiologist = [], odontologist = [], dermatologist = [];

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

    const loadButton = document.getElementById('load-to-local');
    if(loadButton){
        loadButton.addEventListener('click', fetchJSONFile('clientList.json', function(data){
            for(let client of data){
                window.localStorage.setItem(client.name, client.clientNum);
            }
        }));
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
        var specialist = document.getElementById('spec-select');

        var fullName = name.value + " " + lastName.value;

        if(name && lastName && specialist){
            if(localStorage.getItem(fullName) === null){
                var clientNum = calcClientNum();
                localStorage.setItem(fullName, clientNum);
            }else{
                alert("Client already in line.");
            }
        }else{
            alert("Please fill the form correctly");
        }
    }

    const form = document.getElementById('client-form')
    if(form){
        form.addEventListener('submit', storeInfo)
    }

    console.log(localStorage);
}
