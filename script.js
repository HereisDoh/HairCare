let hairProfile = {
  texture: "",
  thickness: "",
  scalp: "",
  concerns: "",
  goals: [],
  effort: ""
};


// PAGE NAVIGATION

function showPage(pageName) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageName).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (pageName === "products") {
    generateProducts();
  }

  if (pageName === "routine") {
    generateRoutine();
  }
}


// PHOTO UPLOAD

function previewPhoto(event) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    const preview = document.getElementById("photoPreview");
    const uploadContent = document.getElementById("uploadContent");

    preview.src = e.target.result;
    preview.style.display = "block";
    uploadContent.style.display = "none";

  };

  reader.readAsDataURL(file);
}


// HAIR PROFILE

function selectChoice(button, category, value) {

  const buttons = button.parentElement.querySelectorAll(".choice");

  buttons.forEach(btn => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");

  hairProfile[category] = value;
}


// GOALS

function toggleGoal(button, goal) {

  button.classList.toggle("selected");

  if (hairProfile.goals.includes(goal)) {

    hairProfile.goals =
      hairProfile.goals.filter(item => item !== goal);

  } else {

    hairProfile.goals.push(goal);

  }
}


// EFFORT

function selectEffort(button, effort) {

  document.querySelectorAll(".effort-choice")
    .forEach(btn => btn.classList.remove("selected"));

  button.classList.add("selected");

  hairProfile.effort = effort;
}


// CREATE PLAN

function createPlan() {

  const concerns =
    document.getElementById("concerns").value;

  hairProfile.concerns = concerns;

  localStorage.setItem(
    "hairProfile",
    JSON.stringify(hairProfile)
  );

  showPage("products");
}


// PRODUCT RECOMMENDATIONS

function generateProducts() {

  const container =
    document.getElementById("productResults");

  let products = [];

  const goals = hairProfile.goals;

  if (goals.includes("Less frizz")) {

    products.push({
      icon: "✨",
      name: "Anti-Frizz Leave-In",
      description:
        "A lightweight leave-in product can help with softness and manageability."
    });

    products.push({
      icon: "🌿",
      name: "Smoothing Serum",
      description:
        "A small amount of a smoothing product can help tame flyaways."
    });
  }

  if (goals.includes("More waves")) {

    products.push({
      icon: "〰️",
      name: "Lightweight Mousse",
      description:
        "A lightweight styling product can help enhance natural-looking waves."
    });
  }

  if (goals.includes("More curl")) {

    products.push({
      icon: "🌀",
      name: "Curl Cream",
      description:
        "A curl cream can help add definition while providing conditioning."
    });

    products.push({
      icon: "💧",
      name: "Leave-In Conditioner",
      description:
        "A leave-in can provide additional moisture and slip."
    });
  }

  if (goals.includes("More moisture")) {

    products.push({
      icon: "💧",
      name: "Deep Conditioner",
      description:
        "A conditioning treatment can be useful when your hair feels dry."
    });
  }

  if (goals.includes("More volume")) {

    products.push({
      icon: "🔊",
      name: "Volumizing Mousse",
      description:
        "A lightweight mousse can add body without necessarily making hair feel heavy."
    });
  }

  if (goals.includes("More shine")) {

    products.push({
      icon: "✨",
      name: "Lightweight Shine Serum",
      description:
        "A small amount can add shine and smooth the appearance of the hair."
    });
  }

  if (goals.includes("Less breakage")) {

    products.push({
      icon: "🛡️",
      name: "Heat Protectant",
      description:
        "Use an appropriate heat protectant when using hot styling tools."
    });

    products.push({
      icon: "🌱",
      name: "Gentle Conditioner",
      description:
        "Conditioning can make hair easier to detangle and manage."
    });
  }

  if (products.length === 0) {

    products = [
      {
        icon: "🧴",
        name: "Gentle Shampoo",
        description:
          "Choose a shampoo appropriate for your scalp and how frequently you need to wash."
      },
      {
        icon: "💧",
        name: "Conditioner",
        description:
          "A conditioner can help improve softness and manageability."
      },
      {
        icon: "✨",
        name: "Leave-In Conditioner",
        description:
          "A leave-in may help with softness, especially when hair feels dry or tangled."
      }
    ];

  }

  products = removeDuplicates(products);

  container.innerHTML = products.map(product => `

    <div class="product-card">

      <div class="product-icon">
        ${product.icon}
      </div>

      <h2>${product.name}</h2>

      <p>${product.description}</p>

    </div>

  `).join("");
}


// REMOVE DUPLICATES

function removeDuplicates(array) {

  const seen = new Set();

  return array.filter(item => {

    if (seen.has(item.name)) {
      return false;
    }

    seen.add(item.name);

    return true;

  });

}


// ROUTINE

function generateRoutine() {

  const profile =
    document.getElementById("profileSummary");

  profile.innerHTML = `

    <h2>Your Hair Profile</h2>

    <div class="profile-tags">

      <span class="tag">
        ${hairProfile.texture || "Texture not selected"}
      </span>

      <span class="tag">
        ${hairProfile.thickness || "Thickness not selected"}
      </span>

      <span class="tag">
        ${hairProfile.scalp || "Scalp not selected"}
      </span>

      ${
        hairProfile.goals.length
          ? hairProfile.goals
              .map(goal => `<span class="tag">${goal}</span>`)
              .join("")
          : `<span class="tag">No goals selected</span>`
      }

    </div>

  `;


  let steps = [

    {
      title: "🚿 Wash Day",
      text:
        "Use a shampoo appropriate for your scalp and hair. Apply conditioner through the lengths of your hair and rinse according to the product instructions."
    },

    {
      title: "✨ Styling",
      text:
        "Apply styling products to damp hair when appropriate. Choose products that match your goals rather than using lots of products at once."
    }

  ];


  if (hairProfile.scalp === "Oily") {

    steps.push({
      title: "✨ Scalp Care",
      text:
        "Focus cleansing on your scalp and be mindful of using heavy styling products directly at the roots."
    });

  }


  if (hairProfile.scalp === "Dry") {

    steps.push({
      title: "💧 Moisture",
      text:
        "Consider a gentle cleansing routine and focus conditioner on the lengths of your hair."
    });

  }


  if (hairProfile.goals.includes("Less frizz")) {

    steps.push({
      title: "✨ Frizz",
      text:
        "Try applying a leave-in or smoothing product to damp hair and handle your hair gently while styling."
    });

  }


  if (hairProfile.goals.includes("More waves")) {

    steps.push({
      title: "〰️ Waves",
      text:
        "A lightweight styling product and gentle scrunching can help encourage the appearance of natural waves."
    });

  }


  if (hairProfile.goals.includes("More curl")) {

    steps.push({
      title: "🌀 Curl Definition",
      text:
        "Apply curl-friendly styling products to damp hair and avoid excessive brushing after your curls have formed."
    });

  }


  steps.push({

    title: "🔥 Heat Protection",

    text:
      "If you use heat styling tools, use an appropriate heat protectant and avoid unnecessary excessive heat."

  });


  const routine =
    document.getElementById("routineResults");

  routine.innerHTML = steps.map((step, index) => `

    <div class="routine-step">

      <h3>${index + 1}. ${step.title}</h3>

      <p>${step.text}</p>

    </div>

  `).join("");
}


// LOAD SAVED PROFILE

window.addEventListener("load", () => {

  const saved =
    localStorage.getItem("hairProfile");

  if (saved) {

    hairProfile = JSON.parse(saved);

  }

});
