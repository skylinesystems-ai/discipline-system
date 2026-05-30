import { firebaseSettings } from "./firebase-config.js";

const FIREBASE_VERSION = "12.14.0";
const STORAGE_KEY = "discipline-system-mvp";
const todayKey = new Date().toISOString().slice(0, 10);

const defaultState = {
  userId: "local-user",
  profile: {
    name: "Fundador",
    goal: "Construir disciplina real em 90 dias",
    dailyMinutes: 30,
    energy: 6,
    focus: "foco",
    blocker: "Perco consistência quando o dia fica cheio.",
  },
  stats: {
    xp: 0,
    streak: 0,
    level: 1,
    lastCompletionDate: "",
  },
  missions: [],
  skills: [
    {
      id: crypto.randomUUID(),
      name: "Foco profundo",
      reason: "Executar tarefas importantes sem depender de motivação.",
      level: 1,
      xp: 20,
      nodes: ["Ambiente", "Timer", "Bloqueio de distrações", "Revisão"],
    },
    {
      id: crypto.randomUUID(),
      name: "Comunicação",
      reason: "Explicar ideias com clareza, presença e influência.",
      level: 1,
      xp: 0,
      nodes: ["Clareza", "Escuta", "Storytelling", "Apresentação"],
    },
    {
      id: crypto.randomUUID(),
      name: "Aprendizado acelerado",
      reason: "Aprender melhor usando recuperação ativa e prática espaçada.",
      level: 1,
      xp: 0,
      nodes: ["Mapas", "Revisão", "Teste ativo", "Intercalação"],
    },
  ],
  challenges: [
    {
      id: crypto.randomUUID(),
      name: "Duelo do Bloco Sagrado",
      type: "Duelo",
      rule: "Vence quem fizer mais blocos de 45 minutos de foco com prova escrita do resultado.",
      score: "10 XP por bloco validado",
      participants: ["Você", "Amigo"],
      active: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Boss Fight da Semana",
      type: "Boss fight",
      rule: "O grupo precisa somar 25 missões concluídas até domingo.",
      score: "Bônus coletivo de 80 XP se todos contribuírem",
      participants: ["Time Alfa"],
      active: true,
    },
    {
      id: crypto.randomUUID(),
      name: "7 Dias de Coragem Social",
      type: "Grupo",
      rule: "Todos fazem uma ação social desconfortável por dia e registram aprendizado.",
      score: "Pontuação por consistência, não por exposição",
      participants: ["Grupo"],
      active: true,
    },
  ],
  reviews: [],
};

const missionLibrary = {
  foco: [
    mission("Bloco sagrado de foco", "Foco", "Trabalhe 25 minutos em uma tarefa importante sem trocar de contexto.", "Média", 25, "Print, resumo ou entrega criada", "competência"),
    mission("Ambiente sem atrito", "Foco", "Remova uma distração real do seu ambiente antes de começar o trabalho.", "Fácil", 7, "Foto ou descrição do ajuste", "intenção de implementação"),
    mission("Tarefa única", "Foco", "Escolha uma única entrega que torna o dia vitorioso e finalize uma parte visível dela.", "Difícil", 40, "Link, arquivo ou resumo objetivo", "prática deliberada"),
  ],
  comunicacao: [
    mission("Vídeo de clareza", "Comunicação", "Grave 2 minutos explicando uma ideia sem roteiro longo.", "Média", 12, "Link do vídeo ou transcrição", "recuperação ativa"),
    mission("Escuta ativa", "Comunicação", "Converse com alguém e faça 3 perguntas antes de dar sua opinião.", "Média", 15, "Resumo da conversa", "pertencimento"),
    mission("Storytelling curto", "Comunicação", "Conte uma história em 5 frases: contexto, problema, virada, ação e aprendizado.", "Fácil", 10, "Texto da história", "prática deliberada"),
  ],
  saude: [
    mission("Caminhada de energia", "Saúde", "Faça 15 minutos de caminhada e registre como sua energia mudou.", "Fácil", 15, "Foto, timer ou nota", "regulação fisiológica"),
    mission("Sono protegido", "Saúde", "Defina um horário de desligamento e prepare o ambiente para dormir melhor.", "Média", 10, "Checklist do ambiente", "design de ambiente"),
    mission("Refeição consciente", "Saúde", "Faça uma refeição sem tela e registre fome, saciedade e energia.", "Fácil", 20, "Nota curta", "atenção plena"),
  ],
  carreira: [
    mission("Ativo de carreira", "Carreira", "Crie uma pequena evidência pública de competência: post, portfólio ou estudo de caso.", "Difícil", 45, "Link ou rascunho", "capital de carreira"),
    mission("Contato estratégico", "Carreira", "Envie uma mensagem útil para alguém da sua área sem pedir favor direto.", "Média", 12, "Resumo da mensagem", "rede social"),
    mission("Aprendizado aplicado", "Carreira", "Aprenda um conceito e aplique em uma entrega real no mesmo dia.", "Média", 30, "Antes e depois", "transferência"),
  ],
  estudos: [
    mission("Teste sem consulta", "Estudos", "Estude um tema e depois escreva tudo que lembra sem consultar.", "Média", 25, "Texto do teste", "retrieval practice"),
    mission("Revisão espaçada", "Estudos", "Revise algo visto há 2 ou mais dias e corrija lacunas.", "Fácil", 15, "Resumo corrigido", "spacing effect"),
    mission("Ensine para alguém", "Estudos", "Explique um conceito para uma pessoa ou grave um áudio ensinando.", "Média", 20, "Áudio ou resumo", "efeito protégé"),
  ],
  financas: [
    mission("Auditoria de gasto", "Finanças", "Revise os últimos gastos e encontre um vazamento que pode ser reduzido.", "Fácil", 15, "Lista do ajuste", "feedback imediato"),
    mission("Regra de compra", "Finanças", "Crie uma regra se-então para compras impulsivas nesta semana.", "Média", 10, "Regra escrita", "intenção de implementação"),
    mission("Ativo de renda", "Finanças", "Faça uma ação pequena que pode gerar renda, economia ou oportunidade.", "Difícil", 40, "Evidência da ação", "ação orientada a ativo"),
  ],
};

const universalMissions = [
  mission("Missão de recuperação", "Recuperação", "Faça 10 minutos de pausa intencional sem tela e volte com uma próxima ação clara.", "Fácil", 10, "Nota de energia antes/depois", "recuperação"),
  mission("Coragem mínima", "Social", "Faça uma ação pequena que você está evitando por desconforto social.", "Média", 12, "O que fez e o que aprendeu", "exposição gradual"),
  mission("Revisão de identidade", "Reflexão", "Complete: eu sou o tipo de pessoa que faz ___ mesmo quando ___.", "Fácil", 5, "Frase escrita", "identidade"),
  mission("Plano se-então", "Planejamento", "Crie uma regra: se meu obstáculo aparecer, então farei uma versão de 5 minutos.", "Fácil", 5, "Regra escrita", "intenção de implementação"),
];

let state = structuredClone(defaultState);
let backend = null;
let activeMissionId = null;
let missionFilter = "all";

const elements = {
  viewTitle: document.querySelector("#viewTitle"),
  currentDate: document.querySelector("#currentDate"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  missionList: document.querySelector("#missionList"),
  skillGrid: document.querySelector("#skillGrid"),
  challengeGrid: document.querySelector("#challengeGrid"),
  xpStat: document.querySelector("#xpStat"),
  streakStat: document.querySelector("#streakStat"),
  todayStat: document.querySelector("#todayStat"),
  levelStat: document.querySelector("#levelStat"),
  levelText: document.querySelector("#levelText"),
  seasonProgress: document.querySelector("#seasonProgress"),
  seasonText: document.querySelector("#seasonText"),
  backendStatus: document.querySelector("#backendStatus"),
  toast: document.querySelector("#toast"),
  missionDialog: document.querySelector("#missionDialog"),
  missionForm: document.querySelector("#missionForm"),
  dialogArea: document.querySelector("#dialogArea"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogDescription: document.querySelector("#dialogDescription"),
  proofInput: document.querySelector("#proofInput"),
  reflectionInput: document.querySelector("#reflectionInput"),
  skillDialog: document.querySelector("#skillDialog"),
  skillForm: document.querySelector("#skillForm"),
  challengeDialog: document.querySelector("#challengeDialog"),
  challengeForm: document.querySelector("#challengeForm"),
  profileForm: document.querySelector("#profileForm"),
  reviewTimeline: document.querySelector("#reviewTimeline"),
  expertPrompt: document.querySelector("#expertPrompt"),
  coachOutput: document.querySelector("#coachOutput"),
};

bootstrap();

async function bootstrap() {
  setDateLabel();
  bindEvents();
  hydrateProfileForm();
  await setupBackend();
  await loadState();
  ensureDailyMissions();
  renderAll();
}

function mission(title, area, description, difficulty, minutes, proof, principle) {
  return {
    id: crypto.randomUUID(),
    title,
    area,
    description,
    difficulty,
    minutes,
    proof,
    principle,
    xp: difficulty === "Difícil" ? 45 : difficulty === "Média" ? 30 : 15,
    date: todayKey,
    done: false,
    completedAt: "",
    proofText: "",
    reflection: "",
  };
}

async function setupBackend() {
  if (!firebaseSettings.useFirebase || !isValidFirebaseConfig(firebaseSettings.config)) {
    backend = createLocalBackend();
    elements.backendStatus.textContent = "Modo demo local: dados salvos no navegador.";
    return;
  }

  try {
    const appModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`);
    const authModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`);
    const firestoreModule = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);

    const app = appModule.initializeApp(firebaseSettings.config);
    const auth = authModule.getAuth(app);
    const db = firestoreModule.getFirestore(app);
    const credential = await ensureFirebaseUser(authModule, auth);
    state.userId = credential.uid;
    backend = createFirebaseBackend(db, firestoreModule, credential.uid);
    elements.backendStatus.textContent = `Firebase ativo. Usuário: ${credential.email || credential.uid}`;
  } catch (error) {
    console.error(error);
    backend = createLocalBackend();
    elements.backendStatus.textContent = "Firebase falhou. O app voltou para o modo demo local.";
    showToast("Não consegui conectar ao Firebase. Verifique a configuração.");
  }
}

async function ensureFirebaseUser(authModule, auth) {
  const existing = await new Promise((resolve) => {
    const unsubscribe = authModule.onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  if (existing) return existing;

  const email = prompt("E-mail para entrar no Discipline System:");
  const password = prompt("Senha com pelo menos 6 caracteres:");

  try {
    const result = await authModule.signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch {
    const result = await authModule.createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  }
}

function isValidFirebaseConfig(config) {
  return Boolean(config?.apiKey && config?.authDomain && config?.projectId && config?.appId);
}

function createLocalBackend() {
  return {
    async load() {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    },
    async save(nextState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    },
  };
}

function createFirebaseBackend(db, firestore, uid) {
  const userDoc = firestore.doc(db, "users", uid);
  return {
    async load() {
      const snapshot = await firestore.getDoc(userDoc);
      return snapshot.exists() ? snapshot.data() : null;
    },
    async save(nextState) {
      await firestore.setDoc(
          userDoc,
          {
            ...nextState,
            updatedAt: firestore.serverTimestamp(),
          },
          { merge: true }
      );
    },
  };
}

async function loadState() {
  const loaded = await backend.load();
  if (loaded) {
    state = {
      ...structuredClone(defaultState),
      ...loaded,
      profile: { ...defaultState.profile, ...loaded.profile },
      stats: { ...defaultState.stats, ...loaded.stats },
      missions: loaded.missions || [],
      skills: loaded.skills?.length ? loaded.skills : structuredClone(defaultState.skills),
      challenges: loaded.challenges?.length ? loaded.challenges : structuredClone(defaultState.challenges),
      reviews: loaded.reviews || [],
    };
  }
  hydrateProfileForm();
}

async function persist() {
  await backend.save(state);
}

function ensureDailyMissions() {
  const todaysMissions = state.missions.filter((item) => item.date === todayKey);
  if (todaysMissions.length >= 6) return;
  generateDailyMissions(false);
}

function generateDailyMissions(force = true) {
  const focus = state.profile.focus || "foco";
  const pool = [...(missionLibrary[focus] || missionLibrary.foco), ...universalMissions];
  const energy = Number(state.profile.energy);
  const dailyMinutes = Number(state.profile.dailyMinutes);
  const limit = dailyMinutes <= 15 ? 4 : dailyMinutes <= 30 ? 6 : 8;
  const adjusted = pool.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    date: todayKey,
    done: false,
    completedAt: "",
    proofText: "",
    reflection: "",
  }));

  let selected = adjusted
      .sort((a, b) => scoreMission(a, energy) - scoreMission(b, energy))
      .slice(0, limit);

  if (!selected.some((item) => item.area === "Recuperação")) {
    selected[selected.length - 1] = {
      ...universalMissions[0],
      id: crypto.randomUUID(),
      date: todayKey,
      done: false,
    };
  }

  state.missions = force
      ? [...state.missions.filter((item) => item.date !== todayKey), ...selected]
      : [...state.missions, ...selected].filter(uniqueById);

  persist();
  renderAll();
  showToast("Missões de hoje atualizadas.");
}

function scoreMission(item, energy) {
  const difficultyScore = item.difficulty === "Difícil" ? 3 : item.difficulty === "Média" ? 2 : 1;
  const energyTarget = energy >= 8 ? 3 : energy >= 5 ? 2 : 1;
  return Math.abs(difficultyScore - energyTarget) + Math.random();
}

function uniqueById(item, index, list) {
  return list.findIndex((candidate) => candidate.id === item.id) === index;
}

function bindEvents() {
  elements.navItems.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  document.querySelector("#generateMissionsButton").addEventListener("click", () => generateDailyMissions(true));
  document.querySelector("#syncButton").addEventListener("click", async () => {
    await persist();
    showToast("Dados sincronizados.");
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      missionFilter = button.dataset.filter;
      renderMissions();
    });
  });

  elements.missionForm.addEventListener("submit", completeMission);
  document.querySelector("#addSkillButton").addEventListener("click", () => elements.skillDialog.showModal());
  elements.skillForm.addEventListener("submit", addSkill);
  document.querySelector("#createChallengeButton").addEventListener("click", () => elements.challengeDialog.showModal());
  elements.challengeForm.addEventListener("submit", addChallenge);
  elements.profileForm.addEventListener("submit", saveProfile);
  document.querySelector("#saveReviewButton").addEventListener("click", saveReview);
  document.querySelector("#coachButton").addEventListener("click", renderCoachAnalysis);
  document.querySelector("#copyPromptButton").addEventListener("click", copyExpertPrompt);
  document.querySelectorAll(".close-button").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
}

function switchView(view) {
  const titles = {
    dashboard: "Plano de hoje",
    skills: "Árvore de habilidades",
    challenges: "Arena social",
    coach: "Coach IA",
    review: "Revisão semanal",
    profile: "Perfil e diagnóstico",
  };

  elements.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  elements.views.forEach((section) => section.classList.remove("is-visible"));
  document.querySelector(`#${view}View`).classList.add("is-visible");
  elements.viewTitle.textContent = titles[view];
}

function renderAll() {
  calculateLevel();
  renderStats();
  renderMissions();
  renderSkills();
  renderChallenges();
  renderReviews();
  renderExpertPrompt();
  renderCoachAnalysis(false);
}

function renderStats() {
  const todaysMissions = state.missions.filter((item) => item.date === todayKey);
  const doneToday = todaysMissions.filter((item) => item.done).length;
  const seasonPercent = Math.min(100, Math.round((doneToday / Math.max(todaysMissions.length, 1)) * 100));

  elements.xpStat.textContent = state.stats.xp;
  elements.streakStat.textContent = state.stats.streak;
  elements.todayStat.textContent = `${doneToday}/${todaysMissions.length}`;
  elements.levelStat.textContent = state.stats.level;
  elements.levelText.textContent = getLevelName(state.stats.level);
  elements.seasonProgress.style.width = `${seasonPercent}%`;
  elements.seasonText.textContent = `${seasonPercent}% da temporada concluída`;
}

function renderMissions() {
  const todaysMissions = state.missions.filter((item) => item.date === todayKey);
  const visibleMissions = todaysMissions.filter((missionItem) => {
    if (missionFilter === "open") return !missionItem.done;
    if (missionFilter === "done") return missionItem.done;
    return true;
  });

  elements.missionList.innerHTML = visibleMissions
      .map(
          (item) => `
        <article class="mission-card ${item.done ? "is-done" : ""}">
          <div>
            <div class="mission-meta">
              <span class="pill brand">${item.area}</span>
              <span class="pill gold">${item.difficulty}</span>
              <span class="pill blue">${item.minutes} min</span>
              <span class="pill">${item.xp} XP</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="mission-meta">
              <span class="pill">Prova: ${escapeHtml(item.proof)}</span>
              <span class="pill">Base: ${escapeHtml(item.principle)}</span>
            </div>
          </div>
          <div class="mission-actions">
            <button class="complete-button" data-complete="${item.id}" ${item.done ? "disabled" : ""}>
              ${item.done ? "Concluída" : "Concluir"}
            </button>
          </div>
        </article>
      `
      )
      .join("");

  document.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => openMissionDialog(button.dataset.complete));
  });

  if (!visibleMissions.length) {
    elements.missionList.innerHTML = `<article class="mission-card"><p>Nenhuma missão neste filtro.</p></article>`;
  }
}

function renderSkills() {
  elements.skillGrid.innerHTML = state.skills
      .map((skill) => {
        const progress = Math.min(100, skill.xp % 100);
        return `
        <article class="skill-card">
          <div class="skill-header">
            <div>
              <span class="eyebrow">Trilha</span>
              <h3>${escapeHtml(skill.name)}</h3>
            </div>
            <div class="skill-level">${skill.level}</div>
          </div>
          <p>${escapeHtml(skill.reason)}</p>
          <div class="mission-meta">
            ${skill.nodes.map((node) => `<span class="pill">${escapeHtml(node)}</span>`).join("")}
          </div>
          <div class="progress-track">
            <span style="width:${progress}%"></span>
          </div>
          <div class="card-footer">
            <small>${skill.xp} XP na habilidade</small>
            <button class="tiny-button" data-train="${skill.id}">Treinar +10 XP</button>
          </div>
        </article>
      `;
      })
      .join("");

  document.querySelectorAll("[data-train]").forEach((button) => {
    button.addEventListener("click", () => trainSkill(button.dataset.train));
  });
}

function renderChallenges() {
  elements.challengeGrid.innerHTML = state.challenges
      .map(
          (challenge) => `
        <article class="challenge-card">
          <div class="challenge-meta">
            <span class="pill brand">${escapeHtml(challenge.type)}</span>
            <span class="pill">${challenge.active ? "Ativo" : "Pausado"}</span>
          </div>
          <h3>${escapeHtml(challenge.name)}</h3>
          <p>${escapeHtml(challenge.rule)}</p>
          <div class="card-footer">
            <small>${escapeHtml(challenge.score)}</small>
            <button class="tiny-button" data-challenge-win="${challenge.id}">Registrar vitória</button>
          </div>
        </article>
      `
      )
      .join("");

  document.querySelectorAll("[data-challenge-win]").forEach((button) => {
    button.addEventListener("click", () => registerChallengeWin(button.dataset.challengeWin));
  });
}

function renderReviews() {
  elements.reviewTimeline.innerHTML = state.reviews
      .slice()
      .reverse()
      .map(
          (review) => `
        <article class="timeline-item">
          <time>${new Date(review.createdAt).toLocaleString("pt-BR")}</time>
          <p><strong>Vitórias:</strong> ${escapeHtml(review.wins)}</p>
          <p><strong>Obstáculos:</strong> ${escapeHtml(review.obstacles)}</p>
          <p><strong>Ajuste:</strong> ${escapeHtml(review.adjustment)}</p>
          <p><strong>Compromisso:</strong> ${escapeHtml(review.commitment)}</p>
        </article>
      `
      )
      .join("");
}

function renderCoachAnalysis(showNotification = true) {
  const todaysMissions = state.missions.filter((item) => item.date === todayKey);
  const done = todaysMissions.filter((item) => item.done).length;
  const completion = todaysMissions.length ? Math.round((done / todaysMissions.length) * 100) : 0;
  const hardOpen = todaysMissions.filter((item) => item.difficulty === "Difícil" && !item.done);
  const recommendations = [];

  if (completion < 40) {
    recommendations.push({
      title: "Reduza a fricção hoje",
      text: "Escolha uma missão de 5 a 10 minutos e faça antes de pensar no plano completo. O objetivo é preservar identidade e sequência.",
    });
  } else {
    recommendations.push({
      title: "Você já tem tração",
      text: "Use o estado atual para concluir uma missão média. Quando existe movimento, aumentar dificuldade fica mais barato.",
    });
  }

  if (hardOpen.length) {
    recommendations.push({
      title: "Quebre a missão difícil",
      text: `Transforme "${hardOpen[0].title}" em uma primeira ação ridiculamente clara de 5 minutos.`,
    });
  }

  if (state.profile.blocker) {
    recommendations.push({
      title: "Plano se-então",
      text: `Se aparecer "${state.profile.blocker}", então execute a versão mínima da missão por 5 minutos.`,
    });
  }

  recommendations.push({
    title: "Desafio social útil",
    text: "Convide um amigo para validar uma prova de trabalho hoje. Pertencimento aumenta compromisso quando a regra é saudável.",
  });

  elements.coachOutput.innerHTML = recommendations
      .map(
          (item) => `
        <div class="coach-note">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.text)}</span>
        </div>
      `
      )
      .join("");

  if (showNotification) showToast("Análise comportamental atualizada.");
}

function renderExpertPrompt() {
  const context = {
    profile: state.profile,
    stats: state.stats,
    todayMissions: state.missions.filter((item) => item.date === todayKey),
    skills: state.skills,
    challenges: state.challenges,
    latestReviews: state.reviews.slice(-3),
  };

  elements.expertPrompt.value = `Você é um conselho de especialistas em desenvolvimento pessoal, ciência comportamental, aprendizagem, prática deliberada, comunidades e produto digital.

Analise o usuário abaixo e gere:
1. diagnóstico comportamental;
2. 8 missões para amanhã;
3. um desafio social justo;
4. um ajuste de hábito;
5. uma prática deliberada para a habilidade mais importante;
6. uma mensagem curta de coach.

Regras:
- nada genérico;
- cada missão precisa de prova de execução;
- use dificuldade ajustada ao tempo e energia;
- inclua pelo menos uma missão social e uma de recuperação;
- evite comparação tóxica;
- gere planos se-então para obstáculos.

Contexto do usuário:
${JSON.stringify(context, null, 2)}`;
}

function openMissionDialog(id) {
  const item = state.missions.find((missionItem) => missionItem.id === id);
  if (!item) return;
  activeMissionId = id;
  elements.dialogArea.textContent = item.area;
  elements.dialogTitle.textContent = item.title;
  elements.dialogDescription.textContent = `${item.description} Prova esperada: ${item.proof}.`;
  elements.proofInput.value = "";
  elements.reflectionInput.value = "";
  elements.missionDialog.showModal();
}

async function completeMission(event) {
  event.preventDefault();
  const item = state.missions.find((missionItem) => missionItem.id === activeMissionId);
  if (!item) return;

  item.done = true;
  item.completedAt = new Date().toISOString();
  item.proofText = elements.proofInput.value.trim();
  item.reflection = elements.reflectionInput.value.trim();
  state.stats.xp += item.xp;
  updateStreak();
  calculateLevel();
  rewardRelatedSkill(item.area, item.xp);

  await persist();
  elements.missionDialog.close();
  renderAll();
  showToast(`Missão concluída. +${item.xp} XP.`);
}

function updateStreak() {
  if (state.stats.lastCompletionDate === todayKey) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);
  state.stats.streak = state.stats.lastCompletionDate === yesterdayKey ? state.stats.streak + 1 : 1;
  state.stats.lastCompletionDate = todayKey;
}

function calculateLevel() {
  state.stats.level = Math.max(1, Math.floor(state.stats.xp / 250) + 1);
}

function rewardRelatedSkill(area, xp) {
  const normalizedArea = area.toLowerCase();
  const skill = state.skills.find((item) => item.name.toLowerCase().includes(normalizedArea));
  if (!skill) return;
  skill.xp += Math.ceil(xp / 2);
  skill.level = Math.max(1, Math.floor(skill.xp / 100) + 1);
}

async function trainSkill(skillId) {
  const skill = state.skills.find((item) => item.id === skillId);
  if (!skill) return;
  skill.xp += 10;
  skill.level = Math.max(1, Math.floor(skill.xp / 100) + 1);
  state.stats.xp += 5;
  calculateLevel();
  await persist();
  renderAll();
  showToast(`Treino registrado em ${skill.name}.`);
}

async function registerChallengeWin(challengeId) {
  const challenge = state.challenges.find((item) => item.id === challengeId);
  if (!challenge) return;
  state.stats.xp += 35;
  calculateLevel();
  await persist();
  renderAll();
  showToast(`Vitória registrada: ${challenge.name}. +35 XP.`);
}

async function addSkill(event) {
  event.preventDefault();
  const name = document.querySelector("#skillNameInput").value.trim();
  const reason = document.querySelector("#skillReasonInput").value.trim();
  if (!name) return;

  state.skills.push({
    id: crypto.randomUUID(),
    name,
    reason: reason || "Habilidade criada para evolução prática e mensurável.",
    level: 1,
    xp: 0,
    nodes: ["Fundamentos", "Prática", "Feedback", "Projeto real"],
  });

  await persist();
  elements.skillDialog.close();
  elements.skillForm.reset();
  renderAll();
  showToast("Nova habilidade adicionada.");
}

async function addChallenge(event) {
  event.preventDefault();
  const name = document.querySelector("#challengeNameInput").value.trim();
  const type = document.querySelector("#challengeTypeInput").value;
  const rule = document.querySelector("#challengeRuleInput").value.trim();
  if (!name) return;

  state.challenges.push({
    id: crypto.randomUUID(),
    name,
    type,
    rule: rule || "Concluir a missão combinada e enviar prova de execução.",
    score: "Pontuação por evidência e consistência",
    participants: ["Você"],
    active: true,
  });

  await persist();
  elements.challengeDialog.close();
  elements.challengeForm.reset();
  renderAll();
  showToast("Desafio criado.");
}

async function saveProfile(event) {
  event.preventDefault();
  state.profile = {
    name: document.querySelector("#nameInput").value.trim() || "Fundador",
    goal: document.querySelector("#goalInput").value.trim(),
    dailyMinutes: Number(document.querySelector("#timeInput").value),
    energy: Number(document.querySelector("#energyInput").value),
    focus: document.querySelector("#focusInput").value,
    blocker: document.querySelector("#blockInput").value.trim(),
  };
  await persist();
  generateDailyMissions(true);
  renderAll();
  showToast("Perfil salvo e missões recalibradas.");
}

function hydrateProfileForm() {
  document.querySelector("#nameInput").value = state.profile.name;
  document.querySelector("#goalInput").value = state.profile.goal;
  document.querySelector("#timeInput").value = state.profile.dailyMinutes;
  document.querySelector("#energyInput").value = state.profile.energy;
  document.querySelector("#focusInput").value = state.profile.focus;
  document.querySelector("#blockInput").value = state.profile.blocker;
}

async function saveReview() {
  const review = {
    id: crypto.randomUUID(),
    wins: document.querySelector("#winsInput").value.trim(),
    obstacles: document.querySelector("#obstaclesInput").value.trim(),
    adjustment: document.querySelector("#adjustInput").value.trim(),
    commitment: document.querySelector("#commitmentInput").value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!review.wins && !review.obstacles && !review.adjustment && !review.commitment) {
    showToast("Escreva pelo menos um campo da revisão.");
    return;
  }

  state.reviews.push(review);
  state.stats.xp += 25;
  calculateLevel();
  await persist();
  document.querySelector("#winsInput").value = "";
  document.querySelector("#obstaclesInput").value = "";
  document.querySelector("#adjustInput").value = "";
  document.querySelector("#commitmentInput").value = "";
  renderAll();
  showToast("Revisão salva. +25 XP.");
}

async function copyExpertPrompt() {
  await navigator.clipboard.writeText(elements.expertPrompt.value);
  showToast("Prompt copiado.");
}

function setDateLabel() {
  elements.currentDate.textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function getLevelName(level) {
  if (level >= 20) return "elite operacional";
  if (level >= 12) return "executor avançado";
  if (level >= 6) return "consistente";
  return "iniciante estratégico";
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}

function escapeHtml(value = "") {
  return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
}
