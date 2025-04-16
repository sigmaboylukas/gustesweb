// Scene manager for a full journey experience
const scenes = [
  {
    title: "Nuotraukytes 😊",
    content: () => {
      return `
        <h2>Nuotraukytes 😊</h2>
        <div class="memory-gallery">
          <img src="images/memory1.jpg" alt="Memory 1">
          <img src="images/memory2.jpg" alt="Memory 2">
          <img src="images/memory3.jpg" alt="Memory 3">
		<img src="images/memory4.jpg" alt="Memory 4">
		<img src="images/memory5.jpg" alt="Memory 5">
		<img src="images/memory6.jpg" alt="Memory 6">
        </div>`;
    }
  },
  {
    title: "Kodėl aš tave myliu",
    content: () => {
      return `
        <h2>Kodėl aš tave myliu</h2>
        <ul class="reasons">
          <li>Tavo šypsena praskaidrina mano dieną ✨</li>
          <li>Tu visada palaikai mane ❤️</li>
          <li>Mes juokiamės kartu kaip niekas kitas 🤍</li>
          <li>Tavo širdis padaryta iš aukso 🌟</li>
        </ul>`;
    }
  },
  {
    title: "Paslaptinga žinutė",
    content: () => {
      return `
        <h2>Paslaptinga žinutė</h2>
        <textarea id="secretInput" placeholder="Tavo žinutė..."></textarea>
        <button id="revealBtn">Spustelk</button>
        <p id="revealedMsg"></p>`;
    }
  },
  {
    title: "Mūsų ateitis",
    content: () => {
      return `
        <h2>Mūsų svajonės kartu</h2>
        <p>Kiekviena diena yra naujas puslapis mūsų istorijoje. Aš MYLIU tave. Aš iš tikro tiesiog norėjau prasibandyti ir sukurti toki tiny website būtent TAU, nes aš myliu tave. Tikiuosi tau patiko, nes žinau, kad turbūt labai scuffed ir galimai paprasčiausiai per mažai dalykų, kad parodyt kažką įdomaus, bet tikiuosi vistiek tau patiko ☺. Aš myliu tave be galo be krašto Guste ir mylesiu tave amžinai ❤❤</p>
        <canvas id="starsCanvas"></canvas>`;
    }
  }
];

let currentScene = 0;

function renderScene(index) {
  const container = document.getElementById("journey");
  container.innerHTML = `<section class="section scene">${scenes[index].content()}</section>
    <div class="navigation">
      <button ${index === 0 ? 'disabled' : ''} id="prevBtn">Atgal</button>
      <button ${index === scenes.length - 1 ? 'disabled' : ''} id="nextBtn">Į priekį</button>
    </div>`;

  if (index === 2) bindSecretInput();
  if (index === 3) startStarCanvas();

  document.getElementById("prevBtn")?.addEventListener("click", () => navigateScene(-1));
  document.getElementById("nextBtn")?.addEventListener("click", () => navigateScene(1));
}

function navigateScene(direction) {
  const next = currentScene + direction;
  if (next >= 0 && next < scenes.length) {
    currentScene = next;
    renderScene(currentScene);
  }
}

function bindSecretInput() {
  document.getElementById("revealBtn")?.addEventListener("click", () => {
    const message = document.getElementById("secretInput").value.trim();
    const output = document.getElementById("revealedMsg");
    if (message.length === 0) {
      output.textContent = "Parašyk kažka iš savo širdies 💌";
      output.style.color = "#a94442";
    } else {
      output.textContent = `Tavo širdis kužda: "${message}"`;
      output.style.color = "#d6336c";
    }
  });
}

function startStarCanvas() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = 300;
  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    for (let s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".hero").style.display = "none";
  document.getElementById("journey").classList.remove("hidden");
  renderScene(currentScene);
});
