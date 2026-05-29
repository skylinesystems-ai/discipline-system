const missions = [
  {
    id: 1,
    title: 'Treino Completo',
    xp: 20,
  },
  {
    id: 2,
    title: 'Leitura Bíblica',
    xp: 10,
  },
  {
    id: 3,
    title: '2 Litros de Água',
    xp: 10,
  },
  {
    id: 4,
    title: 'Cardio Diário',
    xp: 15,
  },
  {
    id: 5,
    title: 'Dormir Antes das 23h',
    xp: 15,
  },
  {
    id: 6,
    title: 'Sem Pornografia',
    xp: 30,
  },
]

const aiMessages = [
  'Você não precisa sentir vontade. Precisa continuar.',
  'Disciplina é fazer mesmo sem motivação.',
  'O homem disciplinado vence no silêncio.',
  'Seu futuro depende do que você faz hoje.',
  'A dor da disciplina pesa menos que a dor do arrependimento.',
]

const missionsContainer = document.getElementById('missions-container')
const missionsCompleted = document.getElementById('missions-completed')
const dailyXp = document.getElementById('daily-xp')
const xpTotal = document.getElementById('xp-total')
const aiMessage = document.getElementById('ai-message')
const checkoutBtn = document.getElementById('checkout-btn')

let completedMissions =
  JSON.parse(localStorage.getItem('completedMissions')) || []

function renderMissions() {
  missionsContainer.innerHTML = ''

  missions.forEach((mission) => {
    const completed = completedMissions.includes(mission.id)

    const missionElement = document.createElement('div')

    missionElement.classList.add('mission-card')

    if (completed) {
      missionElement.classList.add('completed')
    }

    missionElement.innerHTML = `
      <div>
        <h3>${mission.title}</h3>
        <p>+${mission.xp} XP</p>
      </div>

      <div class="mission-check">
        ${completed ? '✓' : '!'}
      </div>
    `

    missionElement.addEventListener('click', () => {
      toggleMission(mission.id)
    })

    missionsContainer.appendChild(missionElement)
  })

  updateStats()
}

function toggleMission(id) {
  if (completedMissions.includes(id)) {
    completedMissions = completedMissions.filter(
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
  missionsCompleted.textContent = completedMissions.length

  const totalDailyXp = missions
    .filter((mission) => completedMissions.includes(mission.id))
    .reduce((acc, mission) => acc + mission.xp, 0)

  dailyXp.textContent = totalDailyXp

  xpTotal.textContent = 2480 + totalDailyXp
}

function generateAIMessage() {
  const randomMessage =
    aiMessages[Math.floor(Math.random() * aiMessages.length)]

  aiMessage.textContent = randomMessage
}

checkoutBtn.addEventListener('click', () => {
  window.location.href =
    'https://pay.kiwify.com.br/SEU-LINK'
})

renderMissions()
generateAIMessage()
