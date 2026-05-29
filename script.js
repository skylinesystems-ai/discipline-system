/* =========================
SCRIPT.JS
========================= */

/* =========================
STATE
========================= */

const appState = {
  xp:
    parseInt(
      localStorage.getItem('xp')
    ) || 0,

  level:
    parseInt(
      localStorage.getItem('level')
    ) || 1,

  streak:
    parseInt(
      localStorage.getItem('streak')
    ) || 0,

  completedToday:
    JSON.parse(
      localStorage.getItem(
        'completedToday'
      )
    ) || [],

  completedDays:
    JSON.parse(
      localStorage.getItem(
        'completedDays'
      )
    ) || [],
}

/* =========================
DOM
========================= */

const missionsContainer =
  document.getElementById(
    'missions-container'
  )

const xpTotal =
  document.getElementById(
    'xp-total'
  )

const levelTotal =
  document.getElementById(
    'level-total'
  )

const dailyXp =
  document.getElementById(
    'daily-xp'
  )

const streakCount =
  document.getElementById(
    'streak-count'
  )

const missionsCompleted =
  document.getElementById(
    'missions-completed'
  )

const calendarGrid =
  document.getElementById(
    'calendar-grid'
  )

const aiMessage =
  document.getElementById(
    'ai-message'
  )

const dailyVerse =
  document.getElementById(
    'daily-verse'
  )

const dailyCardio =
  document.getElementById(
    'daily-cardio'
  )

const gymWorkout =
  document.getElementById(
    'gym-workout'
  )

const homeWorkout =
  document.getElementById(
    'home-workout'
  )

const trainingTitle =
  document.getElementById(
    'training-title'
  )

const todayTitle =
  document.getElementById(
    'today-title'
  )

/* =========================
DATE
========================= */

const today = new Date()

const currentDay =
  today.getDay()

const currentDate =
  today.getDate()

/* =========================
DAYS
========================= */

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

/* =========================
AI MESSAGES
========================= */

const aiMessages = [
  'Você não precisa sentir vontade. Precisa continuar.',

  'Disciplina vence motivação.',

  'Seu futuro depende do que você faz hoje.',

  'Controle seus impulsos.',

  'A dor da disciplina pesa menos que a do arrependimento.',

  'Constância cria homens fortes.',

  'Sem desculpas. Apenas evolução.',
]

/* =========================
VERSES
========================= */

const verses = [
  'Filipenses 4:13 — Tudo posso naquele que me fortalece.',

  'Josué 1:9 — Seja forte e corajoso.',

  'Romanos 12:2 — Transformai-vos pela renovação da mente.',

  'Isaías 40:31 — Renovarão suas forças.',

  'Provérbios 3:5 — Confia no Senhor.',
]

/* =========================
CARDIO
========================= */

const cardioIdeas = [
  'Corrida de 5km',

  'Bike intensa 20min',

  'HIIT 15min',

  'Pular corda 20min',

  'Escada intensa',

  'Corrida intervalada',

  'Caminhada acelerada',
]

/* =========================
TRAININGS
========================= */

const trainingDays = {

  1: {

    title:
      'Peito + Tríceps',

    gym: [
      'Supino reto',
      'Supino inclinado',
      'Crossover',
      'Tríceps pulley',
      'Tríceps francês',
    ],

    home: [
      'Flexão tradicional',
      'Flexão diamante',
      'Mergulho cadeira',
      'Flexão lenta',
    ],
  },

  2: {

    title:
      'Costas + Bíceps',

    gym: [
      'Puxada frontal',
      'Remada baixa',
      'Rosca direta',
      'Rosca martelo',
    ],

    home: [
      'Barra fixa',
      'Remada mochila',
      'Rosca mochila',
      'Superman',
    ],
  },

  3: {

    title:
      'Pernas',

    gym: [
      'Agachamento',
      'Leg press',
      'Stiff',
      'Panturrilha',
    ],

    home: [
      'Agachamento livre',
      'Afundo',
      'Panturrilha',
      'Avanço',
    ],
  },

  4: {

    title:
      'Ombro + Abdômen',

    gym: [
      'Desenvolvimento',
      'Elevação lateral',
      'Prancha',
      'Abdominal infra',
    ],

    home: [
      'Pike push-up',
      'Prancha',
      'Mountain climber',
      'Abdominal',
    ],
  },

  5: {

    title:
      'Full Body',

    gym: [
      'Supino',
      'Agachamento',
      'Remada',
      'Cardio',
    ],

    home: [
      'Flexão',
      'Agachamento',
      'Burpee',
      'Corrida',
    ],
  },

  6: {

    title:
      'Cardio + Mobilidade',

    gym: [
      'Esteira',
      'Bike',
      'Alongamento',
    ],

    home: [
      'Corrida',
      'Corda',
      'Yoga',
    ],
  },

  0: {

    title:
      'Descanso + Espiritual',

    gym: [
      'Leitura',
      'Oração',
      'Alongamento',
    ],

    home: [
      'Leitura bíblica',
      'Oração',
      'Descanso',
    ],
  },
}

/* =========================
MISSIONS
========================= */

const dailyMissions = [

  {
    id:1,
    title:'Treino completo',
    xp:50,
    category:'discipline',
  },

  {
    id:2,
    title:'2 litros de água',
    xp:20,
    category:'discipline',
  },

  {
    id:3,
    title:'Sem pornografia',
    xp:80,
    category:'mindset',
  },

  {
    id:4,
    title:'Sem refrigerante',
    xp:20,
    category:'mindset',
  },

  {
    id:5,
    title:'Leitura bíblica',
    xp:30,
    category:'spiritual',
  },

  {
    id:6,
    title:'10 minutos oração',
    xp:30,
    category:'spiritual',
  },

  {
    id:7,
    title:'Dormir antes das 23h',
    xp:25,
    category:'discipline',
  },

  {
    id:8,
    title:'Cardio do dia',
    xp:35,
    category:'discipline',
  },

  {
    id:9,
    title:'Sem procrastinar',
    xp:40,
    category:'mindset',
  },
]

/* =========================
TRAINING
========================= */

function renderTraining(){

  const training =
    trainingDays[currentDay]

  trainingTitle.textContent =
    training.title

  gymWorkout.innerHTML = ''

  homeWorkout.innerHTML = ''

  training.gym.forEach(
    (exercise)=>{

      const li =
        document.createElement('li')

      li.textContent =
        `✓ ${exercise}`

      gymWorkout.appendChild(li)
    }
  )

  training.home.forEach(
    (exercise)=>{

      const li =
        document.createElement('li')

      li.textContent =
        `✓ ${exercise}`

      homeWorkout.appendChild(li)
    }
  )
}

/* =========================
MISSIONS
========================= */

function renderMissions(){

  missionsContainer.innerHTML=''

  dailyMissions.forEach(
    (mission)=>{

      const completed =
        appState.completedToday.includes(
          mission.id
        )

      const card =
        document.createElement('div')

      card.classList.add(
        'mission-card'
      )

      if(completed){
        card.classList.add(
          'completed'
        )
      }

      card.innerHTML = `
        <div>
          <h3>${mission.title}</h3>
          <p>+${mission.xp} XP</p>
        </div>

        <div>
          ${completed ? '✓' : '!'}
        </div>
      `

      card.addEventListener(
        'click',
        ()=>toggleMission(
          mission.id
        )
      )

      missionsContainer.appendChild(
        card
      )
    }
  )

  updateMissionCount()
}

/* =========================
TOGGLE
========================= */

function toggleMission(id){

  if(
    appState.completedToday.includes(id)
  ){

    appState.completedToday =
      appState.completedToday.filter(
        missionId =>
        missionId !== id
      )

  }else{

    appState.completedToday.push(id)
  }

  localStorage.setItem(
    'completedToday',
    JSON.stringify(
      appState.completedToday
    )
  )

  calculateXP()

  updateProgressBars()

  renderMissions()
}

/* =========================
XP
========================= */

function calculateXP(){

  let totalXP = 0

  dailyMissions.forEach(
    (mission)=>{

      if(
        appState.completedToday.includes(
          mission.id
        )
      ){

        totalXP += mission.xp
      }
    }
  )

  appState.xp = totalXP

  xpTotal.textContent =
    totalXP

  dailyXp.textContent =
    totalXP

  localStorage.setItem(
    'xp',
    totalXP
  )

  calculateLevel()
}

/* =========================
LEVEL
========================= */

function calculateLevel(){

  const level =
    Math.floor(
      appState.xp / 300
    ) + 1

  appState.level =
    level

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

/* =========================
PROGRESS
========================= */

function updateProgressBars(){

  let disciplineXP = 0
  let mindsetXP = 0
  let spiritualXP = 0

  dailyMissions.forEach(
    (mission)=>{

      if(
        appState.completedToday.includes(
          mission.id
        )
      ){

        if(
          mission.category ===
          'discipline'
        ){

          disciplineXP +=
            mission.xp
        }

        if(
          mission.category ===
          'mindset'
        ){

          mindsetXP +=
            mission.xp
        }

        if(
          mission.category ===
          'spiritual'
        ){

          spiritualXP +=
            mission.xp
        }
      }
    }
  )

  const discipline =
    Math.min(
      Math.floor(
        disciplineXP / 2
      ),
      100
    )

  const mindset =
    Math.min(
      Math.floor(
        mindsetXP / 2
      ),
      100
    )

  const spiritual =
    Math.min(
      Math.floor(
        spiritualXP / 2
      ),
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

  document.getElementById(
    'mindset-percent'
  ).textContent =
    `${mindset}%`

  document.getElementById(
    'spiritual-percent'
  ).textContent =
    `${spiritual}%`
}

/* =========================
CALENDAR
========================= */

function renderCalendar(){

  calendarGrid.innerHTML=''

  for(
    let i = 1;
    i <= 31;
    i++
  ){

    const day =
      document.createElement('div')

    day.classList.add(
      'calendar-day'
    )

    if(i === currentDate){
      day.classList.add('today')
    }

    day.textContent = i

    calendarGrid.appendChild(day)
  }
}

/* =========================
CONTENT
========================= */

function generateDailyContent(){

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

/* =========================
MISSIONS COUNT
========================= */

function updateMissionCount(){

  missionsCompleted.textContent =
    appState.completedToday.length
}

/* =========================
STREAK
========================= */

function updateStreak(){

  streakCount.textContent =
    `${appState.streak} dias`
}

/* =========================
MENU
========================= */

const menuItems =
  document.querySelectorAll(
    '.menu-item'
  )

menuItems.forEach(
  (item)=>{

    item.addEventListener(
      'click',
      ()=>{

        menuItems.forEach(
          btn=>btn.classList.remove(
            'active'
          )
        )

        item.classList.add(
          'active'
        )

        const target =
          item.dataset.target

        if(target === 'top'){

          window.scrollTo({
            top:0,
            behavior:'smooth',
          })

          return
        }

        const section =
          document.getElementById(
            target
          )

        if(section){

          section.scrollIntoView({
            behavior:'smooth',
            block:'start',
          })
        }
      }
    )
  }
)

/* =========================
INIT
========================= */

function init(){

  renderTraining()

  renderMissions()

  calculateXP()

  updateProgressBars()

  renderCalendar()

  updateMissionCount()

  updateStreak()

  generateDailyContent()
}

init()
