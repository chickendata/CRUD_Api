

var coursesApi = 'http://localhost:3000/courses';


function start() {
    getCourses(renderCourses);

    handleCreateForm();
}   

start();

// Function

function getCourses(callback) {
    fetch(coursesApi).then(function(res) {
        return res.json();
    })
    .then(callback)
}

function createCourses(data, callback) {
    var option = {
        method:"POST",
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }
    fetch(coursesApi, option).then(function(res) {
        res.json();
    })
    .then(callback);
}


function handleDeleteCourses(id) {
    var option = {
        method:'DELETE',
        headers: {
            'Content-type':'application/json'
        }
    }

    fetch(coursesApi + '/' + id,option).then(function(res) {
        res.json();
    }).then(function(renderCourses) {
        getCourses(renderCourses);
    });
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(courses) {
        return(
            `<li>
                <h4 id="name${courses.id}">${courses.name}</h4>
                <p id="description${courses.id}">${courses.description}</p>
                <button onclick = "handleUpdateCourses(${courses.id})">Sửa</button>
                <button onclick = "handleDeleteCourses(${courses.id})">&times;</button>
            </li>
            `
        )
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name:name,
            description:description
        };
        createCourses(formData, function(renderCourses) {
            getCourses(renderCourses);
        });
    }
}

function handleUpdateCourses(id){

        const inputName = document.getElementById('name' + id).innerHTML;
        const inputDes = document.getElementById('description' + id).innerHTML;
        const create = document.getElementById('create');
        const save = document.getElementById('save');
        let name = document.querySelector('#inputName');
        let des = document.querySelector('#inputDes');
        name.value = inputName;
        des.value = inputDes;
        console.log(name.value);
        console.log(des.value);
        create.style.display = 'none';
        save.style.display = 'block';
        save.onclick = function () {

            let data = {
                name: name.value,
                description:des.value
            }

            var option = {
                method:"PATCH",
                headers: {
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            }
            create.style.display = 'block';
            save.style.display = 'none';
            fetch(coursesApi + '/' + id, option).then(function(res) {
                res.json();
            }).then(() => {
                getCourses(renderCourses);
            })
        }
}
