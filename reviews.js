var currentReviewId;

function listReviews() {
    fetch ('http://localhost:3000/Reviews', {
        method: 'get' 
    }).then((response) => {
        response.json().then((data) => {
            let body = document.getElementsByTagName("div")[0];

            for(let i = 0; i < data.length; i++) {
                let nume = document.createElement("h2");
                nume.innerText = data[i].name;
                nume.style.marginLeft = "20px";
                body.appendChild(nume);

                let h2 = document.createElement("p");
                h2.innerText = data[i].comentariu;
                h2.style.marginLeft = "30px";
                h2.style.fontSize = "18px";
                body.appendChild(h2);

                let editButton = document.createElement("button");
                editButton.style.border ="solid green";
                editButton.style.borderRadius = "8px";

                let editText = document.createTextNode("Edit");
                editButton.style.marginLeft = "5px";
                editButton.style.marginRight = "5px";
                
                editButton.appendChild(editText);
                editButton.onclick = function() {
                    document.getElementById("name").value = data[i].name;
                    document.getElementById("comentariu").value = data[i].comentariu;
                    currentReviewId = data[i].id;
                }
                body.appendChild(editButton);
                
                let deleteButton = document.createElement("button");
                deleteButton.style.border ="solid green";
                deleteButton.style.borderRadius = "8px";
    
                let deleteText = document.createTextNode("Delete");
                deleteButton.appendChild(deleteText);
                deleteButton.onclick = function() {
                    deleteReview(data[i].id);
                }
                body.appendChild(deleteButton);

                let hr = document.createElement("hr");
                body.appendChild(hr);
            }

            body.removeChild(editButton);
            window.location.reload();
        })
    })
}

listReviews();

document.addEventListener('keypress', function(enter)
            {
                if(enter.key === 'Enter')
                {
                    addReview();
                }
            })

function addReview() {
    var name = document.getElementById("name").value;
    var comentariu = document.getElementById("comentariu").value;

    var newPers = {
        name: name,
        comentariu: comentariu
    };
    fetch('http://localhost:3000/Reviews', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPers)
    }).then(function(response) {
        console.log(response);
        window.location.reload();
    })
   
}

function editReview() {
    var name = document.getElementById("name").value;
    var comentariu = document.getElementById("comentariu").value;
    var newPers = {
        name: name,
        comentariu: comentariu
    };

    fetch('http://localhost:3000/Reviews/' + currentReviewId, {
        method: 'put', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPers)
    }).then((response) => {
        window.location.reload();
    })
}

function deleteReview(id) {
    fetch('http://localhost:3000/Reviews/' + id, {
        method: 'delete',
    }).then(function(response) {
        window.location.reload();
    })
}
