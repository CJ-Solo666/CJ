const CONFIG = {
  birthday: "2026-08-15T00:00:00+08:00",
  metAt: "2025-10-01T00:00:00+08:00",
  loveAt: "2025-10-25T17:10:00+08:00",
  photos: [
    ["./assets/photos/photo01.jpg", "那天之后，普通的风景也开始有了意义。"],
    ["./assets/photos/photo07.jpg", "把喜欢藏进日常，把想念放进照片。"],
    ["./assets/photos/photo12.jpg", "和你在一起，时间总是走得很温柔。"],
    ["./assets/photos/photo18.jpg", "我们慢慢收集，后来回头看全是宝物。"],
    ["./assets/photos/photo23.jpg", "每一次见面，都像生活给我的小惊喜。"],
    ["./assets/photos/photo29.jpg", "我想把所有好天气，都留给你。"],
    ["./assets/photos/photo34.jpg", "这一页，写着我最舍不得忘记的你。"]
  ],
  timeline: [
    ["初见", "第一次认识", "故事从一个很轻的瞬间开始。", "./assets/photos/photo03.jpg"],
    ["聊天", "第一次聊天", "一句一句聊着，心就慢慢靠近了。", "./assets/photos/photo08.jpg"],
    ["见面", "第一次见面", "我记得那天，也记得看见你的心情。", "./assets/photos/photo18.jpg"],
    ["牵手", "第一次牵手", "从那一刻开始，我更确定想陪你很久。", "./assets/photos/photo30.jpg"]
  ],
  quiz: [
    { q: "谁先表白？", a: "男朋友", options: ["男朋友", "宝宝", "是命运先表白"] },
    { q: "第一次约会去哪？", a: "一起散步", options: ["一起散步", "看电影", "吃火锅"] },
    { q: "谁更爱吃醋？", a: "都爱一点", options: ["男朋友", "宝宝", "都爱一点"] }
  ],
  memories: [
    "第一次认真等你消息的时候，我就知道自己有点完了。",
    "你笑起来的时候，我会下意识想多看一会儿。",
    "有些话没说出口，但我每次见你都很开心。",
    "我喜欢和你一起浪费时间，因为那不算浪费。",
    "你出现以后，很多小事都变得值得期待。",
    "我想记住你每一次撒娇，也记住你每一次认真。",
    "我喜欢你靠近我时，世界安静下来的感觉。",
    "和你聊天的时候，时间会偷偷加速。",
    "我希望你永远被偏爱，也永远知道自己值得。",
    "你不用一直懂事，在我这里可以做小朋友。",
    "我想陪你过很多节日，也陪你过很多普通日子。",
    "你是我生活里最温柔也最明亮的部分。",
    "每次想起你，心里都会亮一下。",
    "我愿意把耐心、偏爱和认真都给你。",
    "有你的照片，才像真正的回忆。",
    "我们还有很多地方没去，还有很多故事没写。",
    "你不用成为谁的标准答案，你就是我的答案。",
    "我喜欢现在的我们，也期待未来的我们。",
    "生日快乐，我最想祝你自由、漂亮、快乐。",
    "下一段故事，我还想和你一起翻页。"
  ],
  wishes: [
    "愿你新的一岁，永远漂亮、自由、被爱包围。",
    "愿你每天都有小惊喜，也有很多很多安全感。",
    "愿你想要的都慢慢实现，不想要的都离你远一点。",
    "愿我能一直把你放在心上，也放进未来里。",
    "愿今天的你比昨天更开心，明天的你比今天更闪闪发光。"
  ],
  letter:
    "宝宝，生日快乐。\n\n我一直觉得，遇见你之后，生活多了一种很具体的温柔。不是很夸张的那种浪漫，而是想到你会笑，见到你会安心，和你说话会觉得今天值得。\n\n我想把这个网页送给你，不是因为它有多厉害，而是因为我想认真地告诉你：你对我来说很重要。你的开心、你的委屈、你的小脾气、你的可爱，我都想接住。\n\n未来也许会有很多普通的日子，但只要是和你一起，我就愿意慢慢过。希望你新的一岁，被爱包围，被好运照顾，也被我一直偏爱。\n\n未来的每一个生日，我都希望陪你一起过。"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let sceneIndex = 0;
let photoIndex = 0;
let quizIndex = 0;
let heartCount = 0;
let touchStart = null;
let pointerStart = null;
let lastWheelAt = 0;
let birthdayTreeStarted = false;

const scenes = $$(".scene");
const bgm = $("#bgm");

function setViewportHeight() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}

function setScene(index) {
  sceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
  scenes.forEach((scene, i) => scene.classList.toggle("is-active", i === sceneIndex));
  if (sceneIndex === scenes.length - 1) launchFireworks();
}

function nextScene() {
  setScene(sceneIndex + 1);
}

function prevScene() {
  setScene(sceneIndex - 1);
}

function initLoading() {
  const bar = $("#progressBar");
  const text = $("#loadingText");
  let value = 0;
  const timer = setInterval(() => {
    value += Math.random() * 13 + 5;
    bar.style.width = `${Math.min(value, 100)}%`;
    if (value > 45) text.textContent = "正在打开那些舍不得忘记的瞬间";
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(nextScene, 520);
    }
  }, 180);
}

function updateCountdown() {
  const target = new Date(CONFIG.birthday).getTime();
  const diff = Math.max(0, target - Date.now());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const values = [
    Math.floor(diff / day),
    Math.floor((diff % day) / hour),
    Math.floor((diff % hour) / minute),
    Math.floor((diff % minute) / 1000)
  ];
  $$("#countdown strong").forEach((node, index) => {
    node.textContent = String(values[index]).padStart(index === 0 ? 1 : 2, "0");
  });
}

function initTimeline() {
  $("#timeline").innerHTML = CONFIG.timeline
    .map(
      ([mark, title, text, photo], index) => `
        <div class="time-item" style="animation-delay:${index * 120}ms">
          <div class="time-dot"><img src="${photo}" alt="${title}" /><span>${mark}</span></div>
          <div class="time-copy"><strong>${title}</strong><span>${text}</span></div>
        </div>`
    )
    .join("");
}

function renderPhoto() {
  const [src, caption] = CONFIG.photos[photoIndex];
  const img = $("#galleryImage");
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = src;
    $("#galleryCaption").textContent = caption;
    img.style.opacity = "1";
    img.style.transform = "scale(1.04)";
    requestAnimationFrame(() => {
      img.style.transform = "scale(1.015)";
    });
  }, 160);
}

function changePhoto(step) {
  photoIndex = (photoIndex + step + CONFIG.photos.length) % CONFIG.photos.length;
  renderPhoto();
}

function renderQuiz() {
  const item = CONFIG.quiz[quizIndex];
  $("#quiz").innerHTML = `
    <div class="question">${item.q}</div>
    <div class="answers">
      ${item.options.map((option) => `<button class="answer">${option}</button>`).join("")}
    </div>
    <p class="quiz-note"></p>
  `;
  $$(".answer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const note = $(".quiz-note");
      if (btn.textContent === item.a) {
        note.textContent = "答对啦，这颗心奖励给你。";
        burst(innerWidth / 2, innerHeight / 2, "heart");
        quizIndex = (quizIndex + 1) % CONFIG.quiz.length;
        setTimeout(renderQuiz, 900);
      } else {
        note.textContent = "不许太认真，恋爱里的正确答案是宝宝开心。";
      }
    });
  });
}

function initMemoryStars() {
  const field = $("#memoryStars");
  field.querySelectorAll(".memory-star").forEach((star) => star.remove());
  CONFIG.memories.forEach((memory, index) => {
    const star = document.createElement("button");
    star.className = "memory-star";
    star.style.left = `${9 + ((index * 31) % 78)}%`;
    star.style.top = `${10 + ((index * 47) % 70)}%`;
    star.style.animationDelay = `${(index % 7) * 0.18}s`;
    star.style.transform = `scale(${0.72 + (index % 5) * 0.1})`;
    star.setAttribute("aria-label", `记忆星星 ${index + 1}`);
    star.addEventListener("click", () => openMemory(index, memory));
    field.appendChild(star);
  });
  requestAnimationFrame(drawConstellation);
}

function drawConstellation() {
  const canvas = $("#constellation");
  const field = $("#memoryStars");
  if (!canvas || !field) return;
  const ctx = canvas.getContext("2d");
  const box = field.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.floor(box.width * dpr);
  canvas.height = Math.floor(box.height * dpr);
  canvas.style.width = `${box.width}px`;
  canvas.style.height = `${box.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, box.width, box.height);
  const points = $$(".memory-star").map((star) => {
    const rect = star.getBoundingClientRect();
    return {
      x: rect.left - box.left + rect.width / 2,
      y: rect.top - box.top + rect.height / 2
    };
  });
  ctx.strokeStyle = "rgba(155, 215, 255, 0.18)";
  ctx.lineWidth = 1;
  const links = [[0, 2], [2, 5], [5, 8], [1, 4], [4, 7], [7, 11], [3, 6], [6, 10], [10, 14], [9, 12], [12, 16], [13, 17], [15, 18], [18, 19]];
  links.forEach(([a, b]) => {
    if (!points[a] || !points[b]) return;
    ctx.beginPath();
    ctx.moveTo(points[a].x, points[a].y);
    ctx.lineTo(points[b].x, points[b].y);
    ctx.stroke();
  });
}

function openMemory(index, memory) {
  $("#modalTitle").textContent = `第 ${index + 1} 颗星`;
  $("#modalText").textContent = memory;
  $("#memoryModal").classList.add("is-open");
  $("#memoryModal").setAttribute("aria-hidden", "false");
}

function closeMemory() {
  $("#memoryModal").classList.remove("is-open");
  $("#memoryModal").setAttribute("aria-hidden", "true");
}

function initGift() {
  $("#gift").addEventListener("click", () => {
    $("#gift").classList.add("is-open");
    $("#giftMessage").classList.add("is-visible");
    burst(innerWidth / 2, innerHeight * 0.45, "spark");
  });
}

function initBirthdayTree() {
  const canvas = $("#birthdayTree");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const points = [];
  const flakes = [];
  let width = 0;
  let height = 0;
  let angle = 0;

  function addPoint(x, y, z, color, size = 1.9) {
    points.push({ x, y, z, color, size });
  }

  function buildPoints() {
    points.length = 0;
    const treeHeight = 7.8;
    for (let i = 0; i < 1250; i++) {
      const u = Math.random();
      const h = Math.pow(u, 1.45);
      const layer = 1 + Math.max(0, Math.sin((h * 6.2 + 0.18) * Math.PI * 2)) * 0.34;
      const radius = Math.pow(1 - h, 1.15) * 2.65 * layer;
      const spiral = u * Math.PI * 2 * 7.2;
      const a = spiral + (Math.random() - 0.5) * 0.36;
      const r = radius * (0.78 + Math.random() * 0.34);
      addPoint(Math.cos(a) * r, h * treeHeight - 3.5, Math.sin(a) * r, `rgba(255, ${175 + Math.random() * 55}, ${210 + Math.random() * 38}, 0.92)`, 1.7);
    }
    for (let i = 0; i < 420; i++) {
      const h = Math.pow(Math.random(), 1.9);
      const radius = Math.pow(1 - h, 1.1) * 2.9 * Math.sqrt(Math.random());
      const a = Math.random() * Math.PI * 2;
      addPoint(Math.cos(a) * radius, h * treeHeight - 3.5, Math.sin(a) * radius, `rgba(${210 + Math.random() * 45}, ${205 + Math.random() * 45}, 255, 0.74)`, 1.45);
    }
    for (let i = 0; i < 260; i++) {
      const r = 2.9 + Math.random() * 2.5;
      const a = Math.random() * Math.PI * 2;
      addPoint(Math.cos(a) * r, 4.8 + Math.random() * 3.4, Math.sin(a) * r, "rgba(255,255,255,0.72)", 1.1);
    }
    for (let i = 0; i < 280; i++) {
      const t = Math.random() * Math.PI * 2;
      const x = 0.62 * 16 * Math.pow(Math.sin(t), 3) / 16;
      const y = -(0.62 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16);
      addPoint(x, y - 4.36, (Math.random() - 0.5) * 0.18, "rgba(255,170,205,0.96)", 1.65);
    }
    flakes.length = 0;
    for (let i = 0; i < 18; i++) {
      flakes.push({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 2.4, s: 0.001 + Math.random() * 0.0025 });
    }
  }

  function resizeTreeCanvas() {
    const box = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(point) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = point.x * cos - point.z * sin;
    const z = point.x * sin + point.z * cos + 8.5;
    const y = point.y;
    const scale = Math.min(width, height) * 0.9 / z;
    return {
      x: width / 2 + x * scale,
      y: height * 0.56 + y * scale,
      d: z,
      s: Math.max(0.7, point.size * (10 / z)),
      color: point.color
    };
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createRadialGradient(width * 0.52, height * 0.44, 0, width * 0.52, height * 0.44, width * 0.7);
    gradient.addColorStop(0, "rgba(143,124,255,0.18)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const projected = points.map(project).sort((a, b) => b.d - a.d);
    for (const p of projected) {
      if (p.x < -8 || p.x > width + 8 || p.y < -8 || p.y > height + 8) continue;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    for (const flake of flakes) {
      flake.y += flake.s;
      if (flake.y > 1.06) {
        flake.y = -0.08;
        flake.x = Math.random();
      }
      ctx.beginPath();
      ctx.arc(flake.x * width, flake.y * height, flake.r, 0, Math.PI * 2);
      ctx.fill();
    }

    angle += 0.006;
    requestAnimationFrame(frame);
  }

  buildPoints();
  resizeTreeCanvas();
  window.addEventListener("resize", resizeTreeCanvas);
  if (!birthdayTreeStarted) {
    birthdayTreeStarted = true;
    frame();
  }
}

function initLetter() {
  $("#startLetter").addEventListener("click", () => {
    $("#startLetter").style.display = "none";
    const target = $("#typewriter");
    target.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      target.textContent += CONFIG.letter[i] || "";
      i++;
      if (i >= CONFIG.letter.length) clearInterval(timer);
    }, 48);
  });
}

function initWish() {
  const button = $("#drawWish");
  const text = $("#wishText");
  if (!button || !text) return;
  let index = 0;
  button.addEventListener("click", () => {
    index = (index + 1) % CONFIG.wishes.length;
    text.style.opacity = "0";
    text.style.transform = "translateY(10px)";
    setTimeout(() => {
      text.textContent = CONFIG.wishes[index];
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
      burst(innerWidth / 2, innerHeight * 0.46, "spark");
    }, 180);
  });
}

function initCake() {
  const cake = $("#cake");
  const wish = $("#cakeWish");
  if (!cake || !wish) return;
  cake.addEventListener("click", () => {
    cake.classList.add("is-wished");
    wish.textContent = "愿望已经替宝宝收好，接下来交给我慢慢实现。";
    burst(innerWidth / 2, innerHeight * 0.42, "heart");
  });
}

function initEnvelope() {
  const envelope = $("#envelope");
  if (!envelope) return;
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("is-open");
    if (envelope.classList.contains("is-open")) {
      burst(innerWidth / 2, innerHeight * 0.45, "spark");
    }
  });
}

function initStats() {
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;
  const metDays = Math.max(1, Math.floor((now - new Date(CONFIG.metAt)) / day));
  const loveDays = Math.max(1, Math.floor((now - new Date(CONFIG.loveAt)) / day));
  const hours = Math.max(1, Math.floor((now - new Date(CONFIG.loveAt)) / 3600000));
  $("#stats").innerHTML = `
    <div class="stat"><strong>${metDays}</strong><span>认识天数</span></div>
    <div class="stat"><strong>${loveDays}</strong><span>恋爱天数</span></div>
    <div class="stat"><strong>${hours}</strong><span>一起小时</span></div>
  `;
}

function initMusic() {
  $("#musicBtn").addEventListener("click", async () => {
    try {
      if (bgm.paused) {
        await bgm.play();
        $("#musicState").textContent = "Ⅱ";
      } else {
        bgm.pause();
        $("#musicState").textContent = "♪";
      }
    } catch {
      $("#musicState").textContent = "!";
    }
  });
}

function initGestures() {
  window.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY, at: Date.now() };
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 54 && Math.abs(dx) > Math.abs(dy)) {
      if (sceneIndex === 2) changePhoto(dx < 0 ? 1 : -1);
      else setScene(sceneIndex + (dx < 0 ? 1 : -1));
    }
    if (Math.abs(dy) > 62 && Math.abs(dy) > Math.abs(dx)) {
      dy < 0 ? nextScene() : prevScene();
    }
    touchStart = null;
  }, { passive: true });

  let pressTimer = null;
  $("#memoryStars").addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => openMemory(20, "长按也被发现了。你看，我藏起来的喜欢比星星还多。"), 720);
  }, { passive: true });
  $("#memoryStars").addEventListener("touchend", () => clearTimeout(pressTimer), { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  window.addEventListener("pointerup", (event) => {
    if (!pointerStart || event.pointerType === "touch") return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      if (sceneIndex === 2) changePhoto(dx < 0 ? 1 : -1);
      else setScene(sceneIndex + (dx < 0 ? 1 : -1));
    }
    if (Math.abs(dy) > 54 && Math.abs(dy) > Math.abs(dx)) {
      dy < 0 ? nextScene() : prevScene();
    }
    pointerStart = null;
  });

  window.addEventListener("wheel", (event) => {
    const now = Date.now();
    if (now - lastWheelAt < 780) return;
    if (Math.abs(event.deltaY) < 18) return;
    lastWheelAt = now;
    event.deltaY > 0 ? nextScene() : prevScene();
  }, { passive: true });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "PageDown") nextScene();
    if (event.key === "ArrowUp" || event.key === "PageUp") prevScene();
    if (event.key === "ArrowRight") sceneIndex === 2 ? changePhoto(1) : nextScene();
    if (event.key === "ArrowLeft") sceneIndex === 2 ? changePhoto(-1) : prevScene();
  });
}

function initButtons() {
  $("#prevPhoto").addEventListener("click", () => changePhoto(-1));
  $("#nextPhoto").addEventListener("click", () => changePhoto(1));
  $("#closeModal").addEventListener("click", closeMemory);
  $("#replay").addEventListener("click", () => setScene(0));
  $("#jumpGallery").addEventListener("click", () => setScene(2));
  $("#heartTap").addEventListener("click", (event) => {
    heartCount++;
    burst(event.clientX, event.clientY, "heart");
    if (heartCount >= 10) {
      $("#secretPage").classList.add("is-open");
      $("#secretPage").setAttribute("aria-hidden", "false");
      heartCount = 0;
    }
  });
  $("#closeSecret").addEventListener("click", () => {
    $("#secretPage").classList.remove("is-open");
    $("#secretPage").setAttribute("aria-hidden", "true");
  });
}

const fx = $("#fx");
const fctx = fx.getContext("2d");
let particles = [];

function resizeCanvas() {
  [$("#stars"), fx].forEach((canvas) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
  });
}

function drawStars() {
  const canvas = $("#stars");
  const ctx = canvas.getContext("2d");
  const dots = Array.from({ length: 90 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.3 + 0.3,
    a: Math.random() * 0.45 + 0.2
  }));
  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    dots.forEach((dot) => {
      dot.a += (Math.random() - 0.5) * 0.025;
      dot.a = Math.max(0.15, Math.min(0.75, dot.a));
      ctx.fillStyle = `rgba(255,255,255,${dot.a})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
}

function burst(x, y, type = "spark") {
  const count = type === "heart" ? 24 : 36;
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: Math.cos((Math.PI * 2 * i) / count) * (Math.random() * 3 + 1),
      vy: Math.sin((Math.PI * 2 * i) / count) * (Math.random() * 3 + 1),
      life: 60,
      type,
      color: type === "heart" ? "#f2a7c7" : ["#f2a7c7", "#8f7cff", "#9bd7ff"][i % 3]
    });
  }
}

function launchFireworks() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => burst(Math.random() * innerWidth, innerHeight * (0.18 + Math.random() * 0.3), "spark"), i * 420);
  }
}

function animateFx() {
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.035;
    p.life--;
    fctx.globalAlpha = p.life / 60;
    fctx.fillStyle = p.color;
    if (p.type === "heart") {
      fctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
      fctx.fillText("❤️", p.x, p.y);
    } else {
      fctx.beginPath();
      fctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      fctx.fill();
    }
  });
  fctx.globalAlpha = 1;
  requestAnimationFrame(animateFx);
}

function initShake() {
  let last = 0;
  window.addEventListener("devicemotion", (event) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;
    const power = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
    const now = Date.now();
    if (power > 38 && now - last > 1600) {
      last = now;
      openMemory(21, "摇一摇也有惊喜：今天的你要比昨天更快乐。");
      burst(innerWidth / 2, innerHeight / 2, "spark");
    }
  });
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("resize", setViewportHeight);
window.addEventListener("resize", drawConstellation);
window.addEventListener("orientationchange", () => setTimeout(setViewportHeight, 250));
window.addEventListener("orientationchange", () => setTimeout(drawConstellation, 280));
setViewportHeight();
resizeCanvas();
drawStars();
animateFx();
updateCountdown();
setInterval(updateCountdown, 1000);
initLoading();
initTimeline();
renderPhoto();
renderQuiz();
initMemoryStars();
initGift();
initBirthdayTree();
initWish();
initCake();
initEnvelope();
initLetter();
initStats();
initMusic();
initGestures();
initButtons();
initShake();
