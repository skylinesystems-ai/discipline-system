const missions = [
  {
    id: 1,
    title: 'Treino Peito + Tríceps',
    description:
      '4 exercícios de peito + 3 de tríceps. Intensidade máxima.',
    xp: 40,
  },

  {
    id: 2,
    title: 'Treino Costas + Bíceps',
    description:
      'Foco em força, postura e resistência.',
    xp: 40,
  },

  {
    id: 3,
    title: 'Treino Pernas Completo',
    description:
      'Agachamento, leg press, stiff e panturrilha.',
    xp: 50,
  },

  {
    id: 4,
    title: 'Treino Ombro + Abdômen',
    description:
      'Fortaleça seu core e desenvolva estabilidade.',
    xp: 35,
  },

  {
    id: 5,
    title: 'Cardio 30 Minutos',
    description:
      'Corrida, bicicleta ou caminhada acelerada.',
    xp: 25,
  },

  {
    id: 6,
    title: 'HIIT Explosivo',
    description:
      '20 minutos de treino intenso sem pausas longas.',
    xp: 35,
  },

  {
    id: 7,
    title: '2 Litros de Água',
    description:
      'Hidratação é disciplina.',
    xp: 15,
  },

  {
    id: 8,
    title: 'Dormir Antes das 23h',
    description:
      'Recuperação física e mental.',
    xp: 20,
  },

  {
    id: 9,
    title: 'Sem Pornografia',
    description:
      'Controle mental e pureza.',
    xp: 60,
  },

  {
    id: 10,
    title: 'Sem Refrigerante',
    description:
      'Evite açúcar líquido e hábitos destrutivos.',
    xp: 20,
  },

  {
    id: 11,
    title: 'Sem Doces',
    description:
      'Controle seus impulsos.',
    xp: 25,
  },

  {
    id: 12,
    title: 'Sem Fast Food',
    description:
      'Coma comida de verdade.',
    xp: 25,
  },

  {
    id: 13,
    title: 'Leitura Bíblica',
    description:
      'Leia um versículo e reflita.',
    xp: 20,
  },

  {
    id: 14,
    title: '10 Minutos de Oração',
    description:
      'Fortaleça sua mente e espírito.',
    xp: 20,
  },

  {
    id: 15,
    title: 'Sem Reclamar',
    description:
      'Controle emocional e mentalidade forte.',
    xp: 30,
  },

  {
    id: 16,
    title: 'Arrumar o Quarto',
    description:
      'Ambiente organizado, mente organizada.',
    xp: 15,
  },

  {
    id: 17,
    title: 'Estudar 1 Hora',
    description:
      'Construa conhecimento todos os dias.',
    xp: 30,
  },

  {
    id: 18,
    title: 'Desligar Redes Sociais por 2h',
    description:
      'Foque na vida real.',
    xp: 20,
  },

  {
    id: 19,
    title: 'Alongamento Completo',
    description:
      'Mobilidade e prevenção de lesões.',
    xp: 15,
  },

  {
    id: 20,
    title: 'Acordar Sem Soneca',
    description:
      'Vença a primeira batalha do dia.',
    xp: 20,
  },
]

const verses = [
  'Filipenses 4:13 — Tudo posso naquele que me fortalece.',
  'Josué 1:9 — Seja forte e corajoso.',
  'Provérbios 3:5 — Confia no Senhor de todo o teu coração.',
  'Romanos 12:2 — Transformai-vos pela renovação da mente.',
  'Salmos 37:5 — Entrega o teu caminho ao Senhor.',
  '2 Timóteo 1:7 — Deus não nos deu espírito de medo.',
  'Mateus 19:26 — Para Deus tudo é possível.',
  'Isaías 40:31 — Os que esperam no Senhor renovarão as forças.',
]

const cardioIdeas = [
  'Corrida de 5km',
  'Caminhada acelerada',
  'Pular corda por 20 minutos',
  'HIIT em casa',
  'Escada por 15 minutos',
  'Bike intensa',
  'Corrida intervalada',
  'Treino funcional',
]

const aiMessages = [
  'Você não precisa sentir vontade. Precisa continuar.',
  'Disciplina é fazer mesmo sem motivação.',
  'O homem disciplinado vence no silêncio.',
  'Seu futuro depende do que você faz hoje.',
  'A dor da disciplina pesa menos que a dor do arrependimento.',
  'Seu corpo aguenta muito mais do que sua mente acredita.',
  'Quem domina os desejos domina a própria vida.',
  'Sacrifício hoje. Vitória amanhã.',
]

const missionsContainer =
  document.getElementById('missions-container')

const missionsCount =
  document.getElementById('missions-count')

const dailyXp =
  document.getElementById('daily-xp')

const xpTotal =
  document.getElementById('xp-total')

const aiMessage =
  document.getElementById('ai-message')

const checkoutBtn =
  document.getElementById('checkout-btn')

let completedMissions =
  JSON.parse(
    localStorage.getItem('completedMissions')
  ) || []

function renderMissions() {
  missionsContainer.innerHTML = ''

  missions.forEach((mission) => {
    const completed =
      completedMissions.includes(mission.id)

    const card =
      document.createElement('div')

    card.classList.add('mission-card')

    if (completed) {
      card.classList.add('completed')
    }

    card.innerHTML = `
      <div class="mission-info">
        <h3>${mission.title}</h3>

        <p>${mission.description}</p>

        <span>+${mission.xp} XP</span>
      </div>

      <div class="mission-check">
        ${completed ? '✓' : '!'}
      </div>
    `

    card.addEventListener('click', () => {
      toggleMission(mission.id)
    })

    missionsContainer.appendChild(card)
  })

  updateStats()
}

function toggleMission(id) {
  if (completedMissions.includes(id)) {
    completedMissions =
      completedMissions.filter(
        (missionId) => missionId !== id
      )
  } else {
    completedMissions.push(id)
  }

  localStorage.setItem(
    'completedMissions',
    JSON.stringify(completedMissions)
  )

  renderMissions()
}

function updateStats() {
  missionsCount.textContent =
    completedMissions.length

  const totalXp = missions
    .filter((mission) =>
      completedMissions.includes(mission.id)
    )
    .reduce(
      (accumulator, mission) =>
        accumulator + mission.xp,
      0
    )

  dailyXp.textContent = totalXp

  xpTotal.textContent =
    2480 + totalXp
}

function generateAIMessage() {
  const random =
    aiMessages[
      Math.floor(
        Math.random() *
          aiMessages.length
      )
    ]

  aiMessage.textContent = random
}

function generateVerse() {
  const verseBox =
    document.createElement('div')

  verseBox.classList.add('extra-box')

  const randomVerse =
    verses[
      Math.floor(
        Math.random() *
          verses.length
      )
    ]

  verseBox.innerHTML = `
    <h3>Versículo do Dia</h3>

    <p>${randomVerse}</p>
  `

  document.querySelector('.content')
    .appendChild(verseBox)
}

function generateCardioIdea() {
  const cardioBox =
    document.createElement('div')

  cardioBox.classList.add('extra-box')

  const randomCardio =
    cardioIdeas[
      Math.floor(
        Math.random() *
          cardioIdeas.length
      )
    ]

  cardioBox.innerHTML = `
    <h3>Cardio Sugerido</h3>

    <p>${randomCardio}</p>
  `

  document.querySelector('.content')
    .appendChild(cardioBox)
}

checkoutBtn.addEventListener(
  'click',
  () => {
    window.location.href =
      'https://pay.kiwify.com.br/SEU-LINK'
  }
)

renderMissions()

generateAIMessage()

generateVerse()

generateCardioIdea()
