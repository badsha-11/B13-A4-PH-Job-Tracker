// amti array
let interviewList = [];
let rejectedList = [];

// ________________all elimats________________________

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");
let secoundTotal = document.getElementById("total-2");

const allCardsContainer = document.getElementById("all-cards");
const mainContainer = document.querySelector("main");
const filterdSection = document.querySelector(".filterd-section");

const allTrackerBtn = document.querySelector("#all-tracker-btn");
const interviewTrackerBtn = document.querySelector("#interview-tracker-btn");
const rejectedTrackerBtn = document.querySelector("#rejected-tracker-btn");

// _______________cards langth_______________

function calculateCount() {
  total.innerText = allCardsContainer.children.length;
  secoundTotal.innerText = allCardsContainer.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// ___________all, intervew/ reject/ button function______________
function togglestyle(id) {
  allTrackerBtn.className =
    "bg-[#ffffff] shadow px-[32px] py-[10px] rounded-md text-black";
  interviewTrackerBtn.className =
    "bg-[#ffffff] shadow px-[32px] py-[10px] rounded-md text-black";
  rejectedTrackerBtn.className =
    "bg-[#ffffff] shadow px-[32px] py-[10px] rounded-md text-black";

  let selected = document.getElementById(id);
  selected.className =
    "bg-[#3b82f6] text-white shadow px-[32px] py-[10px] rounded-md";

  if (id === "all-tracker-btn") {
    allCardsContainer.classList.remove("hidden");
    filterdSection.classList.add("hidden");
  } else if (id === "interview-tracker-btn") {
    allCardsContainer.classList.add("hidden");
    filterdSection.classList.remove("hidden");
    renderCards(interviewList, "green");
  } else if (id === "rejected-tracker-btn") {
    allCardsContainer.classList.add("hidden");
    filterdSection.classList.remove("hidden");
    renderCards(rejectedList, "red");
  }
}

// _________________--Delete, Interview, Rejected--________________________________

mainContainer.addEventListener("click", function (event) {
  let target = event.target;
  let card = target.closest(".card");
  if (!card) return;

  let companyName = card.querySelector("h2").innerText;

  // ____________-icon dilite cards____________\\
  if (target.closest(".fa-trash-can")) {
    if (card.parentElement.id === "all-cards") {
      card.remove();
    } else {
      removeFromLists(companyName);
      refreshView();
    }
    calculateCount();
    return;
  }

  // _________intervew btn______________\\

  if (target.classList.contains("interview-btn")) {
    removeFromLists(companyName);
    let data = getCardData(card, "Interview");
    interviewList.push(data);
    updateMainCardUI(card, "Interview", "green");
    refreshView();
  }

  //___________reject btn__________
  if (target.classList.contains("rejected-btn")) {
    removeFromLists(companyName);
    let data = getCardData(card, "Rejected");
    rejectedList.push(data);
    updateMainCardUI(card, "Rejected", "red");
    refreshView();
  }
});

// ____________data cline or dilite function____________

function removeFromLists(name) {
  // _______InterviewList_______\\

  let newInterviewList = [];
  for (let i = 0; i < interviewList.length; i++) {
    if (interviewList[i].name !== name) {
      newInterviewList.push(interviewList[i]);
    }
  }
  interviewList = newInterviewList;

  // ____________rejectedList_________\\
  let newRejectedList = [];
  for (let i = 0; i < rejectedList.length; i++) {
    if (rejectedList[i].name !== name) {
      newRejectedList.push(rejectedList[i]);
    }
  }
  rejectedList = newRejectedList;
}

//________card info function________

function getCardData(card, status) {
  let descElement =
    card.querySelector(".mt-1") || card.querySelector("p:last-of-type");
  return {
    name: card.querySelector("h2").innerText,
    title: card.querySelector(".job-titel").innerText,
    info: card.querySelector(".job-info").innerText,
    desc: descElement.innerText,
    status: status,
  };
}

//__________ubdate stetus function_____________

function updateMainCardUI(card, status, color) {
  let badge = card.querySelector(".stetas");
  if (badge) {
    badge.innerText = status;
    badge.className =
      "stetas py-1 px-2 rounded border border-" +
      color +
      "-500 text-" +
      color +
      "-700 bg-" +
      color +
      "-100 inline-flex text-sm";
  }
  calculateCount();
}

//_____________filter section____________\\
function refreshView() {
  if (interviewTrackerBtn.classList.contains("text-white")) {
    renderCards(interviewList, "green");
  } else if (rejectedTrackerBtn.classList.contains("text-white")) {
    renderCards(rejectedList, "red");
  }
}

// __________rendering card__________ \\
function renderCards(list, color) {
  filterdSection.innerHTML = "";

  if (list.length === 0) {
    filterdSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <img src="./jobs.png" alt="No jobs" class="w-24 mb-4 opacity-50">
                <h3 class="text-xl font-bold text-[#003057]">No jobs available</h3>
                <p class="text-gray-500">Check back soon for new job opportunities</p>
            </div>`;
    return;
  }

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let div = document.createElement("div");

    div.className =
      "card border-l-4 border-" +
      color +
      "-500 shadow p-[20px] rounded-xl mb-4 bg-white transition-all duration-300 hover:border-l-8 hover:bg-" +
      color +
      "-50";

    div.innerHTML = `
            <div class="flex justify-between">
                <h2 class="font-semibold text-xl">${item.name}</h2>
                <span class="p-1 border rounded-full text-neutral-400 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300 hover:rotate-12">
                    <i class="fa-regular fa-trash-can"></i>
                </span>
            </div>
            <p class="job-titel text-gray-400">${item.title}</p>
            <p class="job-info text-gray-400 my-2">${item.info}</p>
            <div class="mb-2">
                <span class="stetas py-1 px-2 rounded border border-${color}-500 text-${color}-700 bg-${color}-100 inline-flex text-sm">
                    ${item.status}
                </span>
            </div>
            <p class="mt-1 mb-4 text-[#323b49]">${item.desc}</p>
            <div class="flex gap-2">
                <button class="px-3 py-1 border font-semibold border-green-500 rounded-md text-green-500 interview-btn">Interview</button>
                <button class="px-3 py-1 border font-semibold border-red-500 rounded-md text-red-500 rejected-btn">Rejected</button>
            </div>`;
    filterdSection.appendChild(div);
  }
}
