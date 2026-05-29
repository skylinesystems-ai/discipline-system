/* =========================================
   PROJETO DISCIPLINA - SCRIPT PROFISSIONAL
========================================= */

/* =========================================
   STORAGE
========================================= */

const today = new Date()

const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

/* =========================================
   APP STATE
========================================= */

const appState = {
  xp:
    parseInt(localStorage.getItem('xp')) || 0,

  level:
    parseInt(localStorage.getItem('level')) || 1,

  streak:
    parseInt(localStorage.getItem('streak')) || 0,

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

  lastAccess:
    localStorage.getItem('lastAccess') ||
    todayKey,
}

/* =========================================
   DAILY RESET
========================================= */

function checkNewDay() {

  if (appState.lastAccess !== todayKey) {

    appState.completedToday = []

    localStorage.setItem(
      'completedToday',
      JSON.stringify([])
    )

    appState.lastAccess = todayKey

    localStorage.setItem(
      'lastAccess',
      todayKey
    )
  }
}

checkNewDay()

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
   DAYS
========================================= */

const currentDay = today.getDay()

const currentDate = today.getDate()

const currentMonth = today.getMonth()

const currentYear = today.getFullYear()

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
   MOTIVATION
========================================= */

const aiMessages = [
  'Você não precisa sentir vontade. Precisa continuar.',
  'Seu futuro depende do que você faz hoje.',
  'Disciplina vence motivação.',
  'Controle seus impulsos.',
  'Homens fortes são construídos em silêncio.',
]

const verses = [
  'Filipenses 4:13',
  'Josué 1:9',
  'Romanos 12:2',
  'Provérbios 3:5',
]

const cardioIdeas = [
  'Corrida 5km',
  'Bike intensa',
  'HIIT 20min',
  'Pular corda',
]

/* =========================================
   TRAINING
========================================= */

const trainingDays = {
  1: {
    title: 'Peito + Tríceps',

    gym: [
      'Supino reto',
      'Supino inclinado',
      'Crossover',
    ],

    home: [
      'Flexão',
      'Flexão diamante',
      'Mergulho cadeira',
    ],
  },

  2: {
    title: 'Costas + Bíceps',

    gym: [
      'Remada',
      'Puxada',
      'Rosca direta',
    ],

    home: [
      'Barra fixa',
      'Remada mochila',
      'Rosca mochila',
    ],
  },

  3: {
    title: 'Pernas',

    gym: [
      'Agachamento',
      'Leg press',
      'Panturrilha',
    ],

    home: [
      'Agachamento livre',
      'Afundo',
      'Panturrilha',
    ],
  },

  4: {
    title: 'Ombro + Abdômen',

    gym: [
      'Desenvolvimento',
      'Elevação lateral',
      'Prancha',
    ],

    home: [
      'Pike push-up',
      'Abdominal',
      'Prancha',
    ],
  },

  5: {
    title: 'Full Body',

    gym: [
      'Supino',
      'Agachamento',
      'Remada',
    ],

    home: [
      'Flexão',
      'Burpee',
      'Corrida',
    ],
  },

  6: {
    title: 'Cardio + Mobilidade',

    gym: [
      'Esteira',
      'Bike',
      'Alongamento',
    ],

    home: [
      'Corrida',
      'Corda',
      'Alongamento',
    ],
  },

  0: {
    title: 'Descanso + Espiritual',

    gym: [
      'Leitura',
      'Oração',
    ],

    home: [
      'Leitura bíblica',
      'Oração',
    ],
  },
}

/* =========================================
   MISSIONS
========================================= */

const dailyMissions = [
  {
    id: 1,
    title: 'Treino completo',
    xp: 50,
    category: 'discipline',
  },

  {
    id: 2,
    title: 'Sem pornografia',
    xp: 80,
    category: 'mindset',
  },

  {
    id: 3,
    title: 'Leitura bíblica',
    xp: 30,
    category: 'spiritual',
  },

  {
    id: 4,
    title: 'Cardio',
    xp: 30,
    category: 'discipline',
  },

  {
    id: 5,
    title: 'Sem refrigerante',
    xp: 20,
    category: 'mindset',
  },
]

/* =========================================
   TRAINING RENDER
========================================= */

function renderTraining() {

  const training =
    trainingDays[currentDay]

  trainingTitle.textContent =
    training.title

  gymWorkout.innerHTML = ''

  homeWorkout.innerHTML = ''

  training.gym.forEach((item) => {

    const li =
      document.createElement('li')

    li.textContent = `✓ ${item}`

    gymWorkout.appendChild(li)
  })

  training.home.forEach((item) => {

    const li =
      document.createElement('li')

    li.textContent = `✓ ${item}`

    homeWorkout.appendChild(li)
  })
}

/* =========================================
   MISSIONS RENDER
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

    card.className =
      `mission-card ${
        completed ? 'completed' : ''
      }`

    card.innerHTML = `
      <div class="mission-info">

        <h3>${mission.title}</h3>

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

  updateMissionCount()
}

/* =========================================
   TOGGLE MISSIONS
========================================= */

function toggleMission(id) {

  const alreadyCompleted =
    appState.completedToday.includes(id)

  if (alreadyCompleted) {

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

  updateXP()

  updateProgressBars()

  updateMissionCount()

  checkCompletedDay()

  renderMissions()
}

/* =========================================
   XP
========================================= */

function updateXP() {

  let total = 0

  dailyMissions.forEach((mission) => {

    if (
      appState.completedToday.includes(
        mission.id
      )
    ) {

      total += mission.xp
    }
  })

  dailyXp.textContent = total

  xpTotal.textContent =
    appState.xp + total

  calculateLevel()
}

/* =========================================
   LEVEL
========================================= */

function calculateLevel() {

  const currentXP =
    parseInt(xpTotal.textContent)

  const level =
    Math.floor(currentXP / 300) + 1

  levelTotal.textContent = level

  document.getElementById(
    'user-level'
  ).textContent =
    `Nível ${level}`
}

/* =========================================
   PROGRESS BARS
========================================= */

function updateProgressBars() {

  let disciplineXP = 0
  let mindsetXP = 0
  let spiritualXP = 0

  dailyMissions.forEach((mission) => {

    if (
      appState.completedToday.includes(
        mission.id
      )
    ) {

      if (
        mission.category ===
        'discipline'
      ) {

        disciplineXP += mission.xp
      }

      if (
        mission.category ===
        'mindset'
      ) {

        mindsetXP += mission.xp
      }

      if (
        mission.category ===
        'spiritual'
      ) {

        spiritualXP += mission.xp
      }
    }
  })

  const discipline =
    Math.min(
      Math.floor(disciplineXP),
      100
    )

  const mindset =
    Math.min(
      Math.floor(mindsetXP),
      100
    )

  const spiritual =
    Math.min(
      Math.floor(spiritualXP),
      100
    )

  document.querySelector(
    '.discipline-fill'
  ).style.width =
    `${discipline}%`

  document.querySelector(
    '.mentality-fill'
  ).style.width =
    `${mindset}%`

  document.querySelector(
    '.spiritual-fill'
  ).style.width =
    `${spiritual}%`

  document.getElementById(
    'discipline-percent'
  ).textContent =
    `${discipline}%`
}

/* =========================================
   CALENDAR
========================================= */

function renderCalendar() {

  calendarGrid.innerHTML = ''

  const totalDays =
    new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate()

  for (
    let i = 1;
    i <= totalDays;
    i++
  ) {

    const day =
      document.createElement('div')

    day.classList.add('calendar-day')

    if (i === currentDate) {
      day.classList.add('today')
    }

    if (
      appState.completedDays.includes(i)
    ) {

      day.classList.add('completed')
    }

    day.textContent = i

    calendarGrid.appendChild(day)
  }
}

/* =========================================
   COMPLETE DAY
========================================= */

function checkCompletedDay() {

  if (
    appState.completedToday.length >= 5
  ) {

    if (
      !appState.completedDays.includes(
        currentDate
      )
    ) {

      appState.completedDays.push(
        currentDate
      )

      localStorage.setItem(
        'completedDays',
        JSON.stringify(
          appState.completedDays
        )
      )

      appState.streak += 1

      localStorage.setItem(
        'streak',
        appState.streak
      )

      renderCalendar()

      updateStreak()
    }
  }
}

/* =========================================
   STREAK
========================================= */

function updateStreak() {

  streakCount.textContent =
    `${appState.streak} dias`
}

/* =========================================
   DAILY CONTENT
========================================= */

function generateDailyContent() {

  aiMessage.textContent =
    aiMessages[
      Math.floor(
        Math.random() *
          aiMessages.length
      )
    ]

  dailyVerse.textContent =
    verses[
      Math.floor(
        Math.random() *
          verses.length
      )
    ]

  dailyCardio.textContent =
    cardioIdeas[
      Math.floor(
        Math.random() *
          cardioIdeas.length
      )
    ]
}

/* =========================================
   MENU NAVIGATION
========================================= */

const menuItems =
  document.querySelectorAll('.menu-item')

menuItems.forEach((item) => {

  item.addEventListener(
    'click',
    () => {

      menuItems.forEach((btn) => {
        btn.classList.remove('active')
      })

      item.classList.add('active')

      const target =
        item.dataset.target

      if (!target) return

      if (target === 'top') {

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        return
      }

      const section =
        document.getElementById(target)

      if (section) {

        section.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  )
})

/* =========================================
   MODE SYSTEM
========================================= */

function loadTrainingMode() {

  if (
    appState.trainingMode === 'home'
  ) {

    homeModeBtn.classList.add(
      'active'
    )

    gymModeBtn.classList.remove(
      'active'
    )

  } else {

    gymModeBtn.classList.add(
      'active'
    )

    homeModeBtn.classList.remove(
      'active'
    )
  }
}

gymModeBtn.addEventListener(
  'click',
  () => {

    appState.trainingMode = 'gym'

    localStorage.setItem(
      'trainingMode',
      'gym'
    )

    loadTrainingMode()
  }
)

homeModeBtn.addEventListener(
  'click',
  () => {

    appState.trainingMode = 'home'

    localStorage.setItem(
      'trainingMode',
      'home'
    )

    loadTrainingMode()
  }
)

/* =========================================
   MISSION COUNT
========================================= */

function updateMissionCount() {

  missionsCompleted.textContent =
    appState.completedToday.length
}


/* =========================================
   INIT
========================================= */

function init() {

  renderTraining()

  renderMissions()

  renderCalendar()

  generateDailyContent()

  updateXP()

  updateStreak()

  updateProgressBars()

  loadTrainingMode()
}

init()
