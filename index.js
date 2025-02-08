// Stores the ID off student
// If null, no student is edited
let editingStudentID=null;


// Ensure all HTML elements are available before running the script
document.addEventListener("DOMContentLoaded", function(){
  loadStudents();
})


// Attaching event listner to Form trigger on submission
document
.getElementById("studentForm")
.addEventListener("submit", function(event){
  // Prevent default submission 
  event.preventDefault();

  // Retrieves input value from Form
  let name=document.getElementById("studentName").value;
  let id=document.getElementById("studentID").value;
  let email=document.getElementById("email").value;
  let contact=document.getElementById("contactNo").value;

  // Validate that not field remain unfilled
  if(!name || !id || !email || !contact){
    alert("Please fill all the fields");
    return; //Stop executing if condition failed
  }

  // Retrieves existing student from local storage
  let students=JSON.parse(localStorage.getItem("students")) ||[];

  if(editingStudentID){
    // Edit Existing student
    let index=students.findIndex(
      (student) => student.id===editingStudentID
    );

    // Update student details and save back to Local Storage
    if(index !==-1){
      students[index]={ name, id, email, contact};
      localStorage.setItem("students", JSON.stringify(students));

      // Refresh student list and reset editing state
      loadStudents();
      editingStudentID=null;
    }
  }

  // Add new student
  else{
    let student={ name, id, email, contact};
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    addStudentToTable(student);
  }

  // Resset the Form after submission
  document.getElementById("studentForm").reset();
});


// Adding dynamic record in student table
function addStudentToTable(student){

  // Table Body where new rows are inserted
  let table=document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];

    // Inserting new row at end of table
    let newRow=table.insertRow();

    // New row with student details and action button
    newRow.innerHTML=`<td>${student.name}</td><td>${student.id}</td><td>${student.email}</td><td>${student.contact}</td>
                       <td>
                        <button class='edit-btn' onclick='editRow("${student.id}")'>Edit</button> 
                        <button class='delete-btn' onclick='deleteRow("${student.id}")'>Delete</button> 
                      </td>`
}


// Loads data from local storage
function loadStudents(){

  // Retrieves student from local storage and parse them into array
  let students=JSON.parse(localStorage.getItem("students")) ||[];

  // Get table body where student row inserted 
  let tableBody=document
  .getElementById("studentTable")
  .getElementsByTagName("tbody")[0];

  // To clear existing table data before new data is added
  tableBody.innerHTML=" ";

  // Loop to add each student to table
  students.forEach(addStudentToTable);
}


function deleteRow(studentId){

  // Retrives students from local storage
  let students=JSON.parse(localStorage.getItem("students")) ||[];

  // Filters students with matching ID
  students=students.filter((student)=> student.id !== studentId);

  // Save the update list back to local storage
  localStorage.setItem("students", JSON.stringify(students));

  // Refresh table to reflect change
  loadStudents();
}


function editRow(studentID){

  // Retrives students from local storage
  let students=JSON.parse(localStorage.getItem("students")) ||[];

  // Finding student with matching studentID
  let student=students.find((student) => student.id === studentID);

  if(student){
    // Form fields with student data
    document.getElementById("studentName").value=student.name;
    document.getElementById("studentID").value=student.id;
    document.getElementById("email").value=student.email;
    document.getElementById("contactNo").value=student.contact;

    // Setting editingStudentID to know which student is edited
    editingStudentID=studentID
  }
}


