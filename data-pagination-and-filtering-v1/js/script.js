/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
// Search bar functionality 
const header = document.querySelector('.header');
const searchLabel = document.createElemeent('label');
searchLabel.className = 'student-search';
searchLabel.setAttribute('for','search');

searchLabel.innerHTML = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

header.appendChild(searchLabel);

const searchInput = document.getElementById('search');
const searchButton = searchLabel.querySelector('button');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage; 
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = ''; 
   for (let i=0; i<list.length; i++) {
      if (i>=startIndex && i<endIndex){
         const student = list[i];
         const html = `<li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${student.picture.large}" alt="Student Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${student.registered.date}</span>
          </div>
        </li>
      `;
      studentList.insertAdjacentHTML("beforeend", html);
    }
   }
};

showPage(data, 1);
//create the performSearch function
function performSearch() {
  const searchValue = searchInput.value.toLowerCase();

  const filteredStudents = data.filter(student => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    return fullName.includes(Searchvalue);
  });

  if (filteredStudents.length === 0) {
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = `<li class="student-item cf"><h3>No results found</h3></li>`;
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = ''; // remove pagination buttons
  return;
}

  showPage(filteredStudents, 1);
  addPagination(filteredStudents);
};

searchInput.addEventListener('keyup', performSearch);
searchButton.addEventListener('click', performSearch);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
// create a variable to calculate the number of pages needed
const itemsPerPage = 9;
const numOfPages = Math.ceil(list.length / itemsPerPage);
// select the element with a class of `link-list` and assign it to a variable
const linkList = document.querySelector('ul.link-list');
// set the innerHTML property of the variable you just created to an empty string
linkList.innerHTML = '';
// loop over the number of pages needed
  // create the elements needed to display the pagination button
  // insert the above elements
for (let i=1; i<=numOfPages; i++) {
  const buttonHTML = `
  <li>
  <button type="button">${i}</button>
  </li>
  `;
  linkList.insertAdjacentHTML("beforeend", buttonHTML);
};
// give the first pagination button a class of "active"
const firstButton = linkList.querySelector("button");
if (firstButton) firstButton.classList.add("active");
// create an event listener on the `link-list` element
linkList.addEventListener("click", (e) => {
  const buttonClicked = e.target.closest("button")
  if (buttonClicked) {
    // if the click target is a button:
    // remove the "active" class from the previous button
    const currentActive = linkList.querySelector('.active');
    if (currentActive) currentActive.classList.remove('active');
    // add the active class to the clicked button
    // call the showPage function passing the `list` parameter and page to display as arguments
    buttonClicked.classList.add('active');
    const page = parseInt(buttonClicked.textContent);
    showPage(list, page);
    };
  });
};

// Call functions
showPage(data, 1);
addPagination(data);

