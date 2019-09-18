window.onload=function(){

    window.localStorage.setItem('clients', JSON.parse(Storage.readSync('clientList.json')));

    let clientObj = this.localStorage.getItem('clients');

    this.alert(clientObj);

function storeInfo(){
    console.log("praeina");
    var inputName = document.getElementById("fname");
    window.localStorage.setItem("name", inputName.value);

    var inputLastName = document.getElementById("lname");
    window.localStorage.setItem("last-name", inputLastName.value);

    var inputAge = document.getElementById("age");
    window.localStorage.setItem("age", inputAge.value.toString());

    alert(window.localStorage.getItem('name'));
    alert(window.localStorage.getItem('last-name'));
    alert(window.localStorage.getItem('age'));
}

const form = document.getElementById('client-form')
if(form){
    form.addEventListener('submit', storeInfo)
}

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

const loadClient = document.getElementById('load-client');
if(loadClient){
    loadClient.addEventListener('click', function(){
        fetchJSONFile('clientList.json', function(data){
                document.getElementById('demo').innerHTML += client['name'] + " " + client['last-name'] + " " + client['age'];
        });
    })
}

}
