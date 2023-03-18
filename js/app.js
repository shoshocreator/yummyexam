// !asidevar

let container = document.querySelector(".container");
let root = document.querySelector(".root");
let closeBtn = document.querySelector(".closeBtn");
let sidebar = document.querySelector(".sidebar");

let loader = document.querySelector(".loader");
// !navlinks var
let searchLink = document.querySelector(".SearchLink");
let catLink = document.querySelector(".catLink");
let areaLink = document.querySelector(".areaLink");
let ingredLink = document.querySelector(".ingredLink");
let contactus = document.querySelector(".contactus");

// !aside
closeBtn.addEventListener("click", (e) => {
  sidebar.classList.toggle("open");
  closeBtn.classList.replace("fa-bars", "fa-xmark");

  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("fa-bars", "fa-xmark");
  } else {
    closeBtn.classList.replace("fa-xmark", "fa-bars");
  }
});

// !fuctions related to links
// categories
catLink.addEventListener("click", () => {
  getcat();
});
// area
areaLink.addEventListener("click", () => {
  getarea();
});
// ingrdfunction
ingredLink.addEventListener("click", () => {
  getingr();
});
// contactus
contactus.addEventListener("click", () => {
  showingcontact();
});

// !searchpage function
searchLink.addEventListener("click", () => {
  showingsearch();
});
// !searchbyletter function

// !search input functtions
// !search by malename
async function searchName(mealName, searchdiv) {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    let finaldata = await data.json();
    displayMealsSearch(finaldata.meals, searchdiv);
  } catch (error) {
    console.log(error);
  }
}

async function searchLetter(mealLetter, searchdiv) {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`
    );
    let finaldata = await data.json();
    console.log(finaldata);
    displayMealsSearch(finaldata.meals, searchdiv);
  } catch (error) {
    console.log(error);
  }
}

// !showingsearch data
function showingsearch() {
  let meals = `<form class='searchForm'>
  <input type="text" placeholder="search by name" class='nameinp' />
  <input type="text" placeholder="search by letter" class='letterinp' maxlength="1" />
</form>

 <div class="mealsSearch"> 
 </div>
`;

  root.innerHTML = meals;

  let nameSearch = document.querySelector(".searchForm .nameinp");
  let lettersearch = document.querySelector(".searchForm .letterinp");
  let mealsdiv = document.querySelector(".mealsSearch");
  nameSearch.addEventListener("input", (e) => {
    searchName(nameSearch.value, mealsdiv);
  });

  lettersearch.addEventListener("input", (e) => {
    searchLetter(lettersearch.value, mealsdiv);
  });
}
function displayMealsSearch(array, div) {
  loader.classList.add(active);
  let box = "";
  array.map((meal) => {
    let id = meal.idMeal;
    box += `
  <div class="meal" onclick="getsingle(${id})">
  <img
    src="${meal.strMealThumb}"
  />
  <div class="overlay">
    <h3>${meal.strMeal}</h3>
  </div>
</div>`;
  });
  div.innerHTML = box;
  setTimeout(() => {
    loader.classList.remove(áctive);
  }, 300);
}
// !getsingle
async function getsingle(data) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
  );
  let finalapi = await api.json();
  console.log(finalapi.meals[0]);

  displaySingle(finalapi.meals[0]);
}
// todo span ooooooooooooooooooooooooooooooooooooooooooooooooo
// !singlemeal page
function displaySingle(data) {
  loader.classList.add("active");

  let meals = `<div class="single">
    <div class="mealpic">
      <img src="${data.strMealThumb}" alt="" />
      <h3>${data.strMeal}</h3>
    </div>
    <div class="mealinst">
      <h1> istructions</h1>
      <p>
      ${data.strInstructions}
      </p>
      <h4>Area:${data.strArea}</h4>
      <h4>category: ${data.strCategory}</h4>
      <h5>recipes:</h5>
      <div class="recspans">

        <span>${data.strIngredient1}</span>
        <span>cumin</span>
        <span>oniona</span>
        <span>1cup</span>
        <span>1cup</span>
        <span>tomato</span>
      </div>
      <h5>tags:</h5>
      
      <button class="pinkish">${
        data.strTags == null ? "" : data.strTags
      }</button>
      <div class="tagbtns">
        <a href="${data.strSource}"> <button class="gr">source</button></a>
        <a href="${data.strYoutube}"> <button class="re">youtube</button></a>
      </div>
    </div>
  </div>
    `;

  root.innerHTML = meals;
  setTimeout(() => {
    loader.classList.remove("active");
  }, 300);
}

// showingsearch();
// !default function
async function getdata() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
  );
  let finalapi = await api.json();
  showingdata(finalapi.meals);
}
getdata();
// !showing datafunction
function showingdata(data) {
  loader.classList.add("active");

  let meals = "";
  data.map((meal) => {
    meals += `
    <div class="meal" onclick="getsingle(${meal.idMeal})" >
    <img
      src="${meal.strMealThumb}"
    />
    <div class="overlay" >
      <h3>${meal.strMeal}</h3>
    </div>
  </div>
  `;
  });
  root.innerHTML = meals;
  setTimeout(() => {
    loader.classList.remove("active");
  }, 300);
}

//! categories function
async function getcat() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let finalapi = await api.json();
  console.log(finalapi.categories);
  showingcat(finalapi.categories);
}
// getcat();
//! showing category function
function showingcat(data) {
  loader.classList.add("active");

  let meals = "";

  data.map((meal) => {
    let catp = `${meal.strCategoryDescription}`;
    if (catp.length > 126) {
      catp = catp.slice(0, 126);
    }
    meals += `
      <div class="meal" onclick=getmealcat("${meal.strCategory}");>
      <img
        src="${meal.strCategoryThumb}"
      />
      <div class="overlay catoverlay">
        <h3>${meal.strCategory}</h3>

       
        <p> ${catp}</p>
      </div>
    </div>`;
  });
  root.innerHTML = meals;
  setTimeout(() => {
    loader.classList.remove("active");
  }, 300);
}
// knowing the maxlengthof p
// var pasta =
//   "Pasta is a staple food of traditional Italian cuisine, with the first reference dating to 1154 in Sicily.Also commonly used ";
// console.log(pasta.length);

// !showing newcatpage
// get api
async function getmealcat(data) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}
    `
  );
  let finalapi = await api.json();
  console.log(finalapi.meals);
  showingdata(finalapi.meals);
}

// showingmealcat
// functio showmealcat(data) {
//   data.map()
//   let meals = `<div class="meal" onclick="" >
// <img
//   src="${data.strMealThumb}"
// />
// <div class="overlay" >
//   <h3>${data.strMeal}</h3>
// </div>
// </div>
// `;
//   root.innerHTML = "meals";
// }

// !getarea function
async function getarea() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );

  let finalapi = await api.json();

  showingarea(finalapi.meals);
}

// !showing area
function showingarea(data) {
  loader.classList.add("active");

  let meals = "";
  data.map((meal) => {
    meals += `
     <div class="meal area" onclick=getMealArea("${meal.strArea}")>
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${meal.strArea}</h3>
        </div>
      </div> `;
  });
  root.innerHTML = meals;
  setTimeout(() => {
    loader.classList.remove("active");
  }, 300);
}
async function getMealArea(data) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`
  );
  let finalapi = await api.json();
  let finalresult = finalapi.meals;
  showingdata(finalresult);
}

// !ingredirnt
async function getingr() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list
  `
  );
  let finalapi = await api.json();
  console.log(finalapi.meals);
  showingingr(finalapi.meals);
}

// !showingingr
function showingingr(data) {
  loader.classList.add("active");

  let meals = "";

  for (let i = 0; i < 20; i++) {
    console.log(data[1]);
    let description = `${data[i].strDescription}`;
    if (description !== null) {
      description = description.slice(0, 100);
    }
    meals += ` <div class="meal area" onclick=getmealingr("${data[i].strIngredient}")>
  
  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
  <h3>${data[i].strIngredient}</h3>
  <p>
   ${description}
  </p>
</div>
    `;
  }

  root.innerHTML = meals;
  setTimeout(() => {
    loader.classList.remove("active");
  }, 300);
}
//! getmealingr

async function getmealingr(data) {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`
  );
  let finalapi = await api.json();
  let finalresult = finalapi.meals;
  showingdata(finalresult);
}
// !contact us function
// function showingcontact() {
//   let meals = `<div class="contactcontainer">
//     <form class="contactForm">
//       <input type="text" placeholder="enter your name" class='nameInput' />

//       <input type="email" placeholder="enter your email" class='emailInput' />
//       <input type="number " placeholder="enter your phone" class='nmberInput' />
//       <input type="number " placeholder="enter your age"  class='ageInput'/>
//       <input type="password " placeholder="enter your password" class='passwordIput' />
//       <input type="password " placeholder="repassword" class='repassword' />
//       <button type="submit">submit</button>
//     </form>
//   </div>
//       `;

//   root.innerHTML = meals;
//   // !inputs vars
//   let nameInput = document.querySelector(".nameInput");
//   let emaInput = document.querySelector(".emailInput");
//   let phoneInput = document.querySelector(".numberIput");
//   let ageInput = document.querySelector(".ageIput");
//   let passwordIput = document.querySelector(".passwordInput");
//   let repasswordIput = document.querySelector(".repassword");
//   // !regex
//   let x = /^[a-z]{1,}/;
//   // !addevent

//   nameInput.addEventListener("input", () => {
//     let name = emaInput.value;
//     let regex = /^[a-z]{1,}/;
//     let result = name.match(regex);
//     if (result) {
//       emaInput.style.color = "green";
//     } else {
//       emaInput.style.color = "red";
//     }
//   });
//   emaInput.addEventListener("input", () => {
//     let email = emaInput.value;
//     let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
//     let result = email.match(regex);
//     if (result) {
//       emaInput.style.color = "green";
//     } else {
//       emaInput.style.color = "red";
//     }
//   });

//   phoneInput.addEventListener("input", () => {
//     let phone = phoneInput.value;
//     let regex = /^\d{10,11}$/;
//     let result = phone.match(regex);
//     if (result) {
//       phoneInput.style.color = "green";
//     } else {
//       phoneInput.style.color = "red";
//     }
//   });
//   ageInput.addEventListener("input", () => {
//     let age = ageInput.value;
//     let regex = /^(0?[1-9]|[1-9][0-9])$/;
//     let result = age.match(regex);
//     if (result) {
//       ageInput.style.color = "green";
//     } else {
//       ageInput.style.color = "red";
//     }
//   });
//   passwordIput.addEventListener("input", () => {
//     let password = passwordIput.value;
//     let regex = /^(?=.[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+){8,}$/;
//     let result = password.match(regex);
//     if (result) {
//       ageInput.style.color = "green";
//     } else {
//       ageInput.style.color = "red";
//     }
//   });
//   repasswordIput.addEventListener("input", () => {
//     let repassword = repasswordIput.value;
//     let regex = passwordIput.value;
//     let result = repassword.match(regex);
//     if (result) {
//       ageInput.style.color = "green";
//     } else {
//       ageInput.style.color = "red";
//     }
//   });
// }

function showingcontact() {
  root.innerHTML = `
    <div class="contact">
      <div class="form">
        <div class="inp">
          <input type="text" placeholder="Enter Your Name" data-input="name" />
          <span>Special characters and numbers not allowed</span>
        </div>
        <div class="inp">
          <input
            type="email"
            placeholder="Enter Your Email"
            data-input="email"
          />
          <span>Email not valid *exemple@yyy.zzz</span>
        </div>
        <div class="inp">
          <input
            type="text"
            placeholder="Enter Your Phone"
            data-input="phone"
          />
          <span>Enter valid Phone Number</span>
        </div>
        <div class="inp">
          <input type="number" placeholder="Enter Your Age" data-input="age" />
          <span>Minumum Age 20</span>
        </div>
        <div class="inp">
          <input
            type="password"
            placeholder="Enter Your Password"
            data-input="pass"
          />
          <span>
            Enter valid password *Minimum eight characters, at least one letter
            and one number:*
          </span>
        </div>
        <div class="inp">
          <input type="password" placeholder="Repassword" data-input="repass" />
          <span>Two passwords don't match</span>
        </div>
        <button>Sumbit</button>
      </div>
    </div>
  `;
  // ! regex // alo alo
  let inps = Array.from(document.querySelectorAll(".contact .form .inp input"));
  let btn = document.querySelector(".contact .form button");
  // * shw error function
  function showError(input, res) {
    if (res) {
      input.nextElementSibling.classList.remove("active");
    } else {
      input.nextElementSibling.classList.add("active");
    }
  }

  // * loop on inputs
  inps.map((inp) => {
    inp.addEventListener("input", (e) => {
      // * name regex
      if (inp.dataset.input == "name") {
        let name = inp.value;
        let regex = /^[a-z]{1,}/;
        let result = name.match(regex);
        showError(inp, result);
      }
      // * email regex
      else if (inp.dataset.input == "email") {
        let email = inp.value;
        let regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
        let result = email.match(regex);

        showError(inp, result);
      }
      // * phone regex
      else if (inp.dataset.input == "phone") {
        let phone = inp.value;
        let regex = /^\d{10,11}$/;
        let result = phone.match(regex);
        showError(inp, result);
      }
      // * age regex
      else if (inp.dataset.input == "age") {
        let age = inp.value;
        let result = age > 20;
        showError(inp, result);
      }
      // * pass regex
      else if (inp.dataset.input == "pass") {
        let pass = inp.value;
        let regex = /^(?=.[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+){8,}$/;
        let result = pass.match(regex);
        showError(inp, result);
      }
      // * repass regex
      else if (inp.dataset.input == "repass") {
        let result = false;
        inps.map((inpt) => {
          if (inpt.dataset.input == "pass") {
            result = true ? inpt.value == inp.value : false;
          }
        });
        showError(inp, result);
      }
    });
  });
}
