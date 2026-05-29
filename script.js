/* =========================================
   PROJETO DISCIPLINA - SCRIPT COMPLETO
========================================= */

/* =========================================
   APP STATE
========================================= */

const appState = {
  xp: parseInt(localStorage.getItem('xp')) || 0,

  streak:
    parseInt(localStorage.getItem('streak')) || 0,

  level:
    parseInt(localStorage.getItem('level')) || 1,

  completedToday:
    JSON.parse(
      localStorage.getItem('completedToday')
    ) || [],

  completedDays:
    JSON.parse(
      localStorage.getItem('completedDays')
    ) || [],

  trainingMode:
    localStorage.getItem('trainingMode') ||
    'gym',
}

/* =========================================
   DOM
========================================= */

const missionsContainer =
  document.getElementById(
    'missions-container'
  )

const xpTotal =
  document.getElementById('xp-total')

const levelTotal =
  document.getElementById('level-total')

const dailyXp =
  document.getElementById('daily-xp')

const streakCount =
  document.getElementById('streak-count')

const missionsCompleted =
  document.getElementById(
    'missions-completed'
  )

const aiMessage =
  document.getElementById('ai-message')

const dailyVerse =
  document.getElementById('daily-verse')

const dailyCardio =
  document.getElementById('daily-cardio')

const calendarGrid =
  document.getElementById('calendar-grid')

const gymWorkout =
  document.getElementById('gym-workout')

const homeWorkout =
  document.getElementById('home-workout')

const trainingTitle =
  document.getElementById(
    'training-title'
  )

const todayTitle =
  document.getElementById(
    'today-title'
  )

const gymModeBtn =
  document.getElementById('gym-mode')

const homeModeBtn =
  document.getElementById('home-mode')

/* =========================================
   DATE
========================================= */

const today = new Date()

const currentDay = today.getDay()

const currentDate = today.getDate()

const currentMonth = today.getMonth()

const currentYear = today.getFullYear()

/* =========================================
   DAYS
========================================= */

const days = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

todayTitle.textContent =
  days[currentDay]

/* =========================================
   AI MESSAGES
========================================= */

const aiMessages = [
  'Você não precisa sentir vontade. Precisa continuar.',

  'Seu futuro depende do que você faz hoje.',

  'A dor da disciplina pesa menos que a dor do arrependimento.',

  'Controle seus impulsos. Controle sua vida.',

  'Homens fortes são construídos em silêncio.',

  'Disciplina vence motivação.',

  'O homem disciplinado domina a própria mente.',
]

/* =========================================
   VERSES
========================================= */

const verses = [
  'Filipenses 4:13 — Tudo posso naquele que me fortalece.',

  'Josué 1:9 — Seja forte e corajoso.',

  'Romanos 12:2 — Transformai-vos pela renovação da mente.',

  'Provérbios 3:5 — Confia no Senhor.',

  'Isaías 40:31 — Renovarão suas forças.',

  '2 Timóteo 1:7 — Deus não nos deu espírito de medo.',
]

/* =========================================
   CARDIO
========================================= */

const cardioIdeas = [
  'Corrida de 5km',

  'Caminhada acelerada',

  'Pular corda 20 minutos',

  'HIIT intenso',

  'Escada por 15 minutos',

  'Bike intensa',

  'Corrida intervalada',

  'Treino funcional',
]

/* =========================================
   TRAINING SYSTEM
========================================= */

const trainingDays = {
  1: {
    title: 'Peito + Tríceps',

    gym: [
      'Supino reto',
      'Supino inclinado',
      'Crucifixo',
      'Crossover',
      'Tríceps pulley',
      'Tríceps francês',
    ],

    home: [
      'Flexão tradicional',
      'Flexão inclinada',
      'Flexão diamante',
      'Mergulho cadeira',
      'Tríceps banco',
      'Flexão lenta',
    ],
  },

  2: {
    title: 'Costas + Bíceps',

    gym: [
      'Puxada frontal',
      'Remada baixa',
      'Remada curvada',
      'Rosca direta',
      'Rosca martelo',
    ],

    home: [
      'Superman',
      'Remada mochila',
      'Barra fixa',
      'Rosca mochila',
      'Isometria costas',
    ],
  },

  3: {
    title: 'Pernas Completo',

    gym: [
      'Agachamento',
      'Leg press',
      'Stiff',
      'Cadeira extensora',
      'Panturrilha',
    ],

    home: [
      'Agachamento livre',
      'Avanço',
      'Agachamento isométrico',
      'Elevação panturrilha',
      'Afundo',
    ],
  },

  4: {
    title: 'Ombro + Abdômen',

    gym: [
      'Desenvolvimento',
      'Elevação lateral',
      'Elevação frontal',
      'Abdominal infra',
      'Prancha',
    ],

    home: [
      'Pike push-up',
      'Elevação lateral mochila',
      'Prancha',
      'Abdominal',
      'Mountain climber',
    ],
  },

  5: {
    title: 'Full Body + Cardio',

    gym: [
      'Supino',
      'Agachamento',
      'Remada',
      'Desenvolvimento',
      '20min cardio',
    ],

    home: [
      'Flexão',
      'Agachamento',
      'Burpee',
      'Abdominal',
      'Corrida',
    ],
  },

  6: {
    title: 'Cardio + Mobilidade',

    gym: [
      'Esteira',
      'Bike',
      'Alongamento',
      'Mobilidade',
    ],

    home: [
      'Corrida',
      'Pular corda',
      'Alongamento',
      'Yoga',
    ],
  },

  0: {
    title: 'Descanso + Espiritual',

    gym: [
      'Alongamento',
      'Leitura',
      'Oração',
    ],

    home: [
      'Leitura bíblica',
      'Oração',
      'Descanso mental',
    ],
  },
}

/* =========================================
   DAILY MISSIONS
========================================= */

const dailyMissions = [
  {
    id: 1,
    title: 'Treino completo',
    xp: 50,
  },

  {
    id: 2,
    title: '2 Litros de água',
    xp: 20,
  },

  {
    id: 3,
    title: 'Sem pornografia',
    xp: 80,
  },

  {
    id: 4,
    title: 'Sem refrigerante',
    xp: 20,
  },

  {
    id: 5,
    title: 'Sem doces',
    xp: 25,
  },

  {
    id: 6,
    title: 'Leitura bíblica',
    xp: 30,
  },

  {
    id: 7,
    title: '10 minutos oração',
    xp: 30,
  },

  {
    id: 8,
    title: 'Dormir antes das 23h',
    xp: 25,
  },

  {
    id: 9,
    title: 'Sem procrastinar',
    xp: 35,
  },

  {
    id: 10,
    title: 'Cardio do dia',
    xp: 35,
  },
]

/* =========================================
   RENDER TRAINING
========================================= */

function renderTraining() {
  const training =
    trainingDays[currentDay]

  trainingTitle.textContent =
    training.title

  gymWorkout.innerHTML = ''

  homeWorkout.innerHTML = ''

  training.gym.forEach((exercise) => {
    const li =
      document.createElement('li')

    li.textContent = `✓ ${exercise}`

    gymWorkout.appendChild(li)
  })

  training.home.forEach((exercise) => {
    const li =
      document.createElement('li')

    li.textContent = `✓ ${exercise}`

    homeWorkout.appendChild(li)
  })
}

/* =========================================
   RENDER MISSIONS
========================================= */

function renderMissions() {
  missionsContainer.innerHTML = ''

  dailyMissions.forEach((mission) => {

    const completed =
      appState.completedToday.includes(
        mission.id
      )

    const card =
      document.createElement('div')

    card.classList.add('mission-card')

    if (completed) {
      card.classList.add('completed')
    }

    card.innerHTML = `
      <div class="mission-info">

        <h3>
          ${mission.title}
        </h3>

        <p>
          Complete essa missão hoje.
        </p>

        <span>
          +${mission.xp} XP
        </span>

      </div>

      <div class="mission-check">
        ${completed ? '✓' : '!'}
      </div>
    `

    card.addEventListener(
      'click',
      () => toggleMission(mission.id)
    )

    missionsContainer.appendChild(card)
  })

  updateStats()
}

/* =========================================
   TOGGLE MISSIONS
========================================= */

function toggleMission(id) {

  if (
    appState.completedToday.includes(id)
  ) {

    appState.completedToday =
      appState.completedToday.filter(
        (missionId) =>
          missionId !== id
      )

  } else {

    appState.completedToday.push(id)
  }

  localStorage.setItem(
    'completedToday',
    JSON.stringify(
      appState.completedToday
    )
  )

  calculateXP()

  renderMissions()
}

/* =========================================
   XP SYSTEM
========================================= */

function calculateXP() {

  let totalXP = 0

  dailyMissions.forEach((mission) => {

    if (
      appState.completedToday.includes(
        mission.id
      )
    ) {

      totalXP += mission.xp
    }
  })

  dailyXp.textContent = totalXP

  appState.xp = totalXP

  xpTotal.textContent =
    appState.xp

  localStorage.setItem(
    'xp',
    appState.xp
  )

  calculateLevel()
}

/* =========================================
   LEVEL SYSTEM
========================================= */

function calculateLevel() {

  const level =
    Math.floor(
      appState.xp / 300
    ) + 1

  appState.level = level

  levelTotal.textContent =
    level

  document.getElementById(
    'user-level'
  ).textContent =
    `Nível ${level}`

  localStorage.setItem(
    'level',
    level
  )
}

/* =========================================
   STREAK SYSTEM
========================================= */

function updateStreak() {

  streakCount.textContent =
    `${appState.streak} dias`
}

/* =========================================
   DAILY CONTENT
========================================= */

function generateDailyContent() {

  const randomAI =
    aiMessages[
      Math.floor(
        Math.random() *
          aiMessages.length
      )
    ]

  aiMessage.textContent =
    randomAI

  const randomVerse =
    verses[
      Math.floor(
        Math.random() *
          verses.length
      )
    ]

  dailyVerse.textContent =
    randomVerse

  const randomCardio =
    cardioIdeas[
      Math.floor(
        Math.random() *
          cardioIdeas.length
      )
    ]

  dailyCardio.textContent =
    randomCardio
}

/* =========================================
   CALENDAR
========================================= */

function renderCalendar() {

  calendarGrid.innerHTML = ''

  const totalDays = 31

  for (
    let i = 1;
    i <= totalDays;
    i++
  ) {

    const day =
      document.createElement('div')

    day.classList.add(
      'calendar-day'
    )

    if (i === currentDate) {
      day.classList.add('today')
    }

    if (
      appState.completedDays.includes(i)
    ) {
      day.classList.add(
        'completed'
      )
    }

    day.textContent = i

    calendarGrid.appendChild(day)
  }
}

/* =========================================
   MODE SYSTEM
========================================= */

gymModeBtn.addEventListener(
  'click',
  () => {

    appState.trainingMode =
      'gym'

    gymModeBtn.classList.add(
      'active'
    )

    homeModeBtn.classList.remove(
      'active'
    )

    localStorage.setItem(
      'trainingMode',
      'gym'
    )
  }
)

homeModeBtn.addEventListener(
  'click',
  () => {

    appState.trainingMode =
      'home'

    homeModeBtn.classList.add(
      'active'
    )

    gymModeBtn.classList.remove(
      'active'
    )

    localStorage.setItem(
      'trainingMode',
      'home'
    )
  }
)

/* =========================================
   MISSIONS COUNT
========================================= */

function updateMissionCount() {

  missionsCompleted.textContent =
    appState.completedToday.length
}

/* =========================================
   CHECKOUT
========================================= */

document
  .getElementById(
    'checkout-btn'
  )
  .addEventListener(
    'click',
    () => {

      window.location.href =
        'https://pay.kiwify.com.br/SEU-LINK'
    }
  )

/* =========================================
   INIT
========================================= */

function init() {

  renderTraining()

  renderMissions()

  generateDailyContent()

  renderCalendar()

  updateMissionCount()

  updateStreak()

  calculateXP()
}

init()
