window.addEventListener("DOMContentLoaded", () => {
  let kinolar = movies;
  console.log(kinolar);
  let template = renderElement("template").content;
  let form = renderElement("form");
  let text = renderElement(".text");
  let card = renderElement(".card");
  let contjanr = renderElement(".cont");
  let sort = renderElement(".sort");
  console.log(sort);

  let result = [];
  const optionLoop = (arr) => {
    for (i = 0; i < arr.length; i++) {
      let categories = arr[i].categories;
      for (j = 0; j < categories.length; j++) {
        if (!result.includes(categories[j])) {
          result.push(categories[j]);
        }
      }
    }
    createOption(result);
  };
  optionLoop(kinolar);

  function createOption(arr) {
    for (i = 0; i < arr.length; i++) {
      let option = CreateTag("option");
      option.value = result;
      option.textContent = arr[i];
      contjanr.appendChild(option);
    }
  }

  const Errors = () => {
    let h1 = CreateTag("h1");
    h1.textContent = "Topilmadi !!!";
    text.appendChild(h1);
    console.log(text);
  };
  let map = [];
  const renders = (arr) => {
    if (arr.length === 0) {
      map = filter;
    }
    card.innerHTML = null;
    for (let i = 0; i < arr.length; i++) {
      text.innerHTML = null;
      let clone = template.cloneNode(true);
      let cards = clone.querySelector(".cards");
      let img = cards.querySelector("img");
      img.src = arr[i].bigPoster;
      let name = clone.querySelector("h1");
      name.textContent = arr[i].title;
      let year = clone.querySelector("h4");
      year.textContent = arr[i].year;
      let rating = clone.querySelector("h5");
      rating.textContent = arr[i].imdbRating;
      let haqida = clone.querySelector("p");
      haqida.textContent = arr[i].summary;
      let cat = clone.querySelector("h6");
      cat.textContent = arr[i].categories;
      card.appendChild(cards);
    }
  };

  let sortObject = {
    az: function (a, b) {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
    },
    za: function (a, b) {
      if (a.title > b.title) {
        return -1;
      } else {
        return 1;
      }
    },
    rating: function (a, b) {
      if (a.imdbRating < b.imdbRating) {
        return -1;
      } else {
        return 1;
      }
    },
    yil: function (a, b) {
      if (a.year < b.year) {
        return -1;
      } else {
        return 1;
      }
    },
  };

  let input = renderElement(".name");
  text.innerHTML = null;
  renders(kinolar);

  const handleSub = (event) => {
    card.innerHTML = null;
    text.innerHTML = null;
    event.preventDefault();
    let filter = [];
    let data = new FormData(event.target);
    let name = data.get("name");

    //search
    let rejex = new RegExp(name, "gi");
    filter = kinolar.filter((item) => item.title.match(rejex));
    if (input.value == "all") {
      filter = kinolar;
    } else if (input.value !== "all") {
      filter = kinolar.filter((item) => item.title.match(rejex));
    }
    filter = kinolar;
    console.log(filter);
    console.log(name);

    //janr
    let Valuejanr = contjanr.value;
    filter = kinolar.filter((item) => item.categories.includes(Valuejanr));

    //sortlash
    let selectsort = sort.value;
    filter = kinolar.sort(sortObject[selectsort]);

    input.value = null;
    renders(filter);
  };
  form.addEventListener("submit", handleSub);
});
