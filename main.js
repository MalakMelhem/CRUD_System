let courseName=document.getElementById('courseName');
let courseCategory=document.getElementById('courseCategory');
let coursePrice=document.getElementById('coursePrice');
let courseDescription=document.getElementById('courseDescription');
let data=document.getElementById('data');
let search=document.getElementById('search');
let error = document.getElementsByClassName('error');
let courses=[];
let inputs=document.querySelectorAll('input');
if(localStorage.getItem("alldata")!=null){
    courses = JSON.parse(localStorage.getItem("alldata"));
    displayCourse();
    }else {
    courses =[];
    }
    

function createCourse(){
    if(validateCourseName()){
        let course={
            cName:courseName.value,
            cCategory:courseCategory.value,
            cPrice:coursePrice.value,
            cDescription:courseDescription.value
        }
        courses.push(course);
        localStorage.setItem("alldata",JSON.stringify(courses));
        displayCourse();
        clearInput();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
}
function displayCourse(){
    let result='';
    for(let i=0;i<courses.length;i++){
        result+=`
        <tr><td>${i}</td>
            <td>${courses[i].cName}</td>
            <td>${courses[i].cCategory}</td>
            <td>${courses[i].cPrice}</td>
            <td>${courses[i].cDescription}</td>
            <td><button onclick="updateCourse(${i})"><i class="fas fa-edit"></i></button></td></td>
            <td><button onclick="deleteCourse(${i})" class="delete"><i class="far fa-trash-alt"></i> </button></td>  
            </tr>
        `;
    }
    data.innerHTML=result;
}
function deleteCourse(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1);
            localStorage.setItem("alldata",JSON.stringify(courses));  
            displayCourse();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}

function clearInput(){
    courseName.value="";
    coursePrice.value="";
    courseCategory.value="";
    courseDescription.value="";
}
function updateCourse(id){
    courses[id].cName=courseName.value;
    courses[id].cCategory=courseCategory.value;
    courses[id].cPrice=coursePrice.value;
    courses[id].cDescription=courseDescription.value;
    displayCourse();
    clearInput();
}
function searchCourse(){
    let searchValue=search.value;
    let result='';
    for(let i=0;i<courses.length;i++){
        if(courses[i].cName.toLowerCase().includes(searchValue.toLowerCase()))
        result+=`
        <tr><td>${i}</td>
            <td>${courses[i].cName}</td>
            <td>${courses[i].cCategory}</td>
            <td>${courses[i].cPrice}</td>
            <td>${courses[i].cDescription}</td>
            <td><button onclick="updateCourse(${i})"><i class="fas fa-edit"></i></button></td></td>
            <td><button onclick="deleteCourse(${i})" class="delete"><i class="far fa-trash-alt"></i> </button></td>  
            </tr>
        `;
    }
    data.innerHTML=result;

}

const patterns={
    cPrice:/^\d$/,
    cName:/^[A-Z][a-z0-9]{3,15}$/,
    cCategory:/^[A-Z][a-z0-9]{3,15}$/

};

function validate(field,regex){
    if(regex.test(field.value)){
        field.className='valid';
    }else{
        field.className='invalid';
    }

}

for(let i=0;i<inputs.length;i++){
    inputs[i].addEventListener('keyup',function(e){
        validate(e.target,patterns[e.target.attributes.name.value]);
    })
    
}
/*function validateCourseName(){
    let cnameRegex= /^[A-Z][a-z0-9]{3,15}$/;
    if(!cnameRegex.test(courseName.value)){
        error[0].style.display='block'; 
        return false;
    }else{
        error[0].style.display='none';
        return true;
    }
}
courseName.addEventListener('blur',validateCourseName);
*/