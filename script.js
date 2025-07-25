const scamTypes = {
  investment: {
    risky: [
      "Guaranteed high returns",
      "No risk at all!",
      "Exclusive secret opportunity",
      "They rushed me to invest"
    ],
    safe: [
      "I read the T&Cs",
      "I checked MAS alerts",
      "I spoke to a licensed advisor",
      "They didn’t guarantee profits"
    ]
  },
  gois: {
    risky: [
      "Said from the Police, but used WhatsApp",
      "Threatened me with arrest",
      "Demanded payment to clear a case",
      "Asked for bank details urgently"
    ],
    safe: [
      "Checked official police line",
      "No threats or urgency",
      "Was told to visit in person",
      "Communication used gov.sg email"
    ]
  },
  job: {
    risky: [
      "Promised fast cash for tasks",
      "Asked me to pay for a job",
      "Interviewed only via Telegram",
      "No company name or website"
    ],
    safe: [
      "Received job offer via official email",
      "Had an in-person interview",
      "Employer was listed on LinkedIn",
      "No request for money upfront"
    ]
  },
  ecommerce: {
    risky: [
      "Seller asked to pay outside platform",
      "Item price was too good to be true",
      "Refused to meet in person",
      "Rushed me to transfer immediately"
    ],
    safe: [
      "Used official platform for payment",
      "I checked seller reviews",
      "Received item before payment",
      "I didn't feel rushed to buy"
    ]
  }
};

let currentScamData = scamTypes["investment"]; // Default

let timer = 60;
let score = 0;
let interval;

function changeScamType() {
  const selected = document.getElementById("scam-select").value;
  currentScamData = scamTypes[selected];

  // Save to localStorage
  localStorage.setItem("scamType", selected);
}

function getFixedRatioTiles(n = 4) {
  const selected = [];

  const riskyPool = [...currentScamData.risky];
  const safePool = [...currentScamData.safe];

  riskyPool.sort(() => 0.5 - Math.random());
  safePool.sort(() => 0.5 - Math.random());

  selected.push({ text: riskyPool[0], isRisky: true });

  for (let i = 0; i < n - 1; i++) {
    selected.push({ text: safePool[i], isRisky: false });
  }

  return selected.sort(() => 0.5 - Math.random());
}

function updateTiles() {
  const container = document.getElementById("tile-container");
  container.innerHTML = "";
  const tiles = getFixedRatioTiles(4);
  tiles.forEach(tile => {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.textContent = tile.text;
    div.onclick = () => {
      if (tile.isRisky) {
        score += 1;
        div.classList.add("correct");
        showFeedback("✅ Scam!");
      } else {
        score -= 1;
        div.classList.add("wrong");
        showFeedback("❌ Legit");
      }

      document.getElementById("score").textContent = score;
      setTimeout(updateTiles, 500);
          };
          container.appendChild(div);
        });
      }

      // Save to localStorage
      localStorage.setItem("score", score);
      localStorage.setItem("scamType", document.getElementById("scam-select").value);
      
function showFeedback(text) {
  const fb = document.getElementById("feedback");
  fb.textContent = text;
  setTimeout(() => fb.textContent = "", 800);
}

let savedScore = localStorage.getItem("score");
let savedScamType = localStorage.getItem("scamType");

// Use defaults if not set
score = savedScore ? parseInt(savedScore) : 0;
currentScamData = savedScamType ? scamTypes[savedScamType] : scamTypes["investment"];

// Update UI if needed
document.getElementById("score").textContent = score;
document.getElementById("scam-select").value = savedScamType || "investment";

function startGame() {
  score = 0;
  timer = 60;

document.getElementById("instructions").style.display = "none";
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timer;
    
document.getElementById("start-button").textContent = "Play Again";
  updateTiles();
  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = timer;
    if (timer === 0) {
      clearInterval(interval);
      document.getElementById("tile-container").innerHTML = "<h3>⏱️ Time's up! </h3><p> Your score: " + score + "</p>";
    }
  }, 1000);
}