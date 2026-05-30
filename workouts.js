export const workoutPlaceLabels = {
    home: "Casa sem equipamentos",
    gym: "Academia",
};

export const workoutLevelLabels = {
    beginner: "Iniciante",
    intermediate: "Intermediario",
    advanced: "Avancado",
};

export const workoutGoalLabels = {
    strength: "Forca",
    muscle: "Hipertrofia",
    conditioning: "Condicionamento",
    mobility: "Mobilidade",
};

export const workoutSafetyNote =
    "Ajuste cargas e amplitude para manter tecnica limpa. Pare se sentir dor aguda, tontura ou falta de ar fora do normal. Se tiver lesao, doenca ou duvida clinica, procure um profissional de saude antes de treinar.";

export function getDailyWorkoutTemplate(place, level, goal, dateKey) {
    const safePlace = workoutLibrary[place] ? place : "home";
    const safeLevel = workoutLibrary[safePlace][level] ? level : "beginner";
    const list = workoutLibrary[safePlace][safeLevel];
    const offset = goal === "conditioning" ? 1 : goal === "mobility" ? 2 : goal === "muscle" ? 3 : 0;
    const index = (getDayOfYear(dateKey) + offset) % list.length;
    return clone(list[index]);
}

function getDayOfYear(dateKey) {
    const date = new Date(`${dateKey}T12:00:00`);
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function exercise(name, sets, reps, rest, cue, scale) {
    return { name, sets, reps, rest, cue, scale };
}

function block(title, method, exercises) {
    return { title, method, exercises };
}

const workoutLibrary = {
    home: {
        beginner: [
            {
                title: "Base total sem equipamentos",
                focus: "corpo inteiro, tecnica e consistencia",
                duration: 32,
                difficulty: "Media",
                xp: 35,
                equipment: "cadeira firme opcional",
                proof: "foto do timer + anotacao de series concluidas",
                warmup: [
                    "3 min de marcha no lugar",
                    "10 agachamentos curtos controlados",
                    "10 circulos de ombro para cada lado",
                    "8 inclinacoes de quadril com coluna neutra",
                ],
                blocks: [
                    block("Forca base", "3 voltas, descansando 60s ao final de cada volta", [
                        exercise("Agachamento para cadeira", "3", "10-12", "45s", "sente leve na cadeira e suba empurrando o chao", "use menos amplitude se perder controle"),
                        exercise("Flexao inclinada na parede ou mesa", "3", "8-12", "45s", "corpo alinhado, peito vai em direcao ao apoio", "quanto mais alto o apoio, mais facil"),
                        exercise("Ponte de gluteos", "3", "12-15", "40s", "contraia gluteos no topo por 1 segundo", "faca bilateral antes de tentar unilateral"),
                        exercise("Prancha alta com toque no ombro", "3", "8 por lado", "40s", "quadril parado, toque lento", "apoie joelhos se precisar"),
                    ]),
                    block("Nucleo de estabilidade", "2 voltas com controle", [
                        exercise("Dead bug", "2", "8 por lado", "30s", "lombar proxima do chao, movimento lento", "mova so pernas se ficar dificil"),
                        exercise("Prancha frontal", "2", "20-30s", "45s", "respire e mantenha costelas baixas", "apoie joelhos"),
                    ]),
                ],
                finisher: "Desafio: maior numero de agachamentos tecnicos em 2 minutos, sem perder postura.",
                cooldown: ["2 min respirando pelo nariz", "30s alongamento de peitoral", "30s alongamento de quadril por lado"],
                challenge: {
                    title: "Duelo da base perfeita",
                    rules: "vence quem completar todas as series com melhor prova de tecnica e anotacao honesta",
                    score: "1 ponto por serie completa + 2 pontos por video curto de tecnica",
                },
            },
            {
                title: "Condicionamento iniciante de baixo impacto",
                focus: "cardio leve, pernas e core",
                duration: 28,
                difficulty: "Facil",
                xp: 28,
                equipment: "sem equipamentos",
                proof: "print do cronometro + nota de energia antes/depois",
                warmup: ["2 min de caminhada no lugar", "10 elevacoes de joelho alternadas", "10 rotacoes de tronco", "10 agachamentos parciais"],
                blocks: [
                    block("Circuito ritmado", "4 voltas: 35s trabalhando, 25s descansando", [
                        exercise("Marcha rapida no lugar", "4", "35s", "25s", "bracos ativos e respiracao controlada", "reduza ritmo se perder fala"),
                        exercise("Agachamento curto", "4", "35s", "25s", "joelhos acompanham a linha dos pes", "use cadeira como alvo"),
                        exercise("Passada para tras curta", "4", "35s", "25s", "passo curto e tronco alto", "troque por toque alternado para tras"),
                        exercise("Prancha inclinada", "4", "25-35s", "25s", "apoie maos em mesa firme", "aumente inclinacao para facilitar"),
                    ]),
                ],
                finisher: "Desafio: complete a ultima volta mantendo o mesmo ritmo da primeira.",
                cooldown: ["1 min de caminhada lenta", "40s panturrilha por lado", "40s posterior de coxa por lado"],
                challenge: {
                    title: "Ritmo constante",
                    rules: "ganha quem terminar com menor queda de ritmo entre primeira e ultima volta",
                    score: "ate 10 pontos por consistencia percebida",
                },
            },
            {
                title: "Mobilidade forte para iniciantes",
                focus: "mobilidade, postura e controle corporal",
                duration: 25,
                difficulty: "Facil",
                xp: 25,
                equipment: "tapete opcional",
                proof: "foto do espaco de treino + resumo da maior melhoria percebida",
                warmup: ["1 min respiracao em pe", "8 movimentos de gato-vaca", "8 agachamentos lentos", "8 alcances de braco por lado"],
                blocks: [
                    block("Mobilidade ativa", "3 voltas sem pressa", [
                        exercise("Agachamento com pausa no fundo", "3", "20s", "30s", "mantenha calcanhares no chao se possivel", "segure em uma porta para apoio"),
                        exercise("Avanco de quadril ajoelhado", "3", "30s por lado", "20s", "contraia gluteo da perna de tras", "use almofada no joelho"),
                        exercise("Rotacao toracica deitado de lado", "3", "8 por lado", "20s", "olhe para a mao que abre", "reduza amplitude"),
                        exercise("Elevacao Y de bracos no chao", "3", "10", "30s", "polegares para cima, pescoco relaxado", "faca sentado se necessario"),
                    ]),
                ],
                finisher: "Desafio: 60s de prancha divididos em quantas pausas precisar.",
                cooldown: ["2 min respiracao lenta", "30s alongamento lateral por lado"],
                challenge: {
                    title: "Controle vence pressa",
                    rules: "vence quem fizer o treino inteiro com execucao lenta e registrar aprendizado",
                    score: "1 ponto por exercicio feito sem pressa",
                },
            },
        ],
        intermediate: [
            {
                title: "Circuito full body intermediario",
                focus: "forca, resistencia e core",
                duration: 38,
                difficulty: "Media",
                xp: 42,
                equipment: "sem equipamentos",
                proof: "timer + total de voltas completas",
                warmup: ["3 min polichinelo adaptado ou marcha rapida", "10 agachamentos", "8 flexoes inclinadas", "10 passadas alternadas"],
                blocks: [
                    block("Circuito principal", "5 voltas: 40s trabalho, 20s transicao, 90s descanso ao final da volta", [
                        exercise("Agachamento com tempo 3-1-1", "5", "40s", "20s", "desca em 3 segundos, pause 1, suba firme", "reduza amplitude"),
                        exercise("Flexao de braco", "5", "40s", "20s", "cotovelos a 30-45 graus do tronco", "apoie joelhos"),
                        exercise("Passada reversa alternada", "5", "40s", "20s", "joelho da frente estavel", "passo menor"),
                        exercise("Prancha com deslocamento curto", "5", "40s", "20s", "mova maos e pes pouco, quadril firme", "prancha normal"),
                    ]),
                    block("Core final", "3 series", [
                        exercise("Hollow hold adaptado", "3", "20-30s", "35s", "lombar controlada", "joelhos dobrados"),
                        exercise("Abdominal reverso", "3", "10-12", "35s", "suba quadril sem embalo", "menor amplitude"),
                    ]),
                ],
                finisher: "Desafio: maximo de flexoes tecnicas em 2 minutos, pausando quando precisar.",
                cooldown: ["40s quadriceps por lado", "40s peitoral", "1 min respiracao nasal"],
                challenge: {
                    title: "Flexoes honestas",
                    rules: "vence quem registrar mais repeticoes validas com amplitude consistente",
                    score: "repeticoes validas, nao repeticoes apressadas",
                },
            },
            {
                title: "Pernas e core sem equipamento",
                focus: "pernas, gluteos e estabilidade",
                duration: 36,
                difficulty: "Media",
                xp: 40,
                equipment: "cadeira opcional",
                proof: "anotacao de reps por exercicio + foto do treino",
                warmup: ["2 min mobilidade de tornozelo", "12 agachamentos", "10 pontes de gluteo", "8 passadas por lado"],
                blocks: [
                    block("Forca unilateral", "4 series por exercicio", [
                        exercise("Agachamento dividido", "4", "8-12 por lado", "60s", "tronco alto, desca controlando", "segure em apoio"),
                        exercise("Levantamento unilateral sem peso", "4", "8-10 por lado", "45s", "quadril vai para tras, coluna neutra", "toque a ponta do pe no chao"),
                        exercise("Ponte de gluteo unilateral", "4", "8-12 por lado", "45s", "quadril nivelado", "faca bilateral"),
                    ]),
                    block("Core anti-rotacao", "3 voltas", [
                        exercise("Prancha lateral", "3", "25-35s por lado", "30s", "corpo em linha reta", "joelho no chao"),
                        exercise("Dead bug lento", "3", "10 por lado", "30s", "controle antes de amplitude", "menor alcance"),
                    ]),
                ],
                finisher: "Desafio: 3 minutos de passadas alternadas, contando repeticoes tecnicas.",
                cooldown: ["45s gluteo por lado", "45s flexor de quadril por lado"],
                challenge: {
                    title: "Pernas de consistencia",
                    rules: "vitoria por completar todas as series e registrar a menor pausa extra",
                    score: "series completas + honestidade no descanso",
                },
            },
            {
                title: "Parte superior e postura",
                focus: "peito, ombros, costas sem carga e core",
                duration: 34,
                difficulty: "Media",
                xp: 38,
                equipment: "toalha opcional",
                proof: "video curto de 1 exercicio + resumo das series",
                warmup: ["10 circulos de ombro", "10 retracoes escapulares", "8 flexoes inclinadas", "10 elevacoes Y"],
                blocks: [
                    block("Empurrar e estabilizar", "4 series", [
                        exercise("Flexao com pausa embaixo", "4", "6-10", "60s", "pause 1 segundo mantendo alinhamento", "apoie joelhos"),
                        exercise("Pike push-up adaptado", "4", "6-10", "60s", "quadril alto, cabeca desce controlada", "maos em apoio alto"),
                        exercise("Prancha alta", "4", "30-40s", "45s", "empurre o chao e mantenha abdomen ativo", "joelhos no chao"),
                    ]),
                    block("Costas sem equipamento", "3 voltas lentas", [
                        exercise("Superman com pausa", "3", "10-12", "35s", "levante pouco e contraia costas", "levante apenas bracos"),
                        exercise("Remada isometrica com toalha", "3", "20-30s", "35s", "puxe a toalha contra sua propria resistencia", "menos forca"),
                    ]),
                ],
                finisher: "Desafio: acumule 90s de prancha alta em ate 4 tentativas.",
                cooldown: ["40s peitoral", "40s ombro posterior por lado", "1 min respiracao"],
                challenge: {
                    title: "Postura sob pressao",
                    rules: "vence quem acumular mais tempo de prancha sem perder alinhamento",
                    score: "segundos validos",
                },
            },
        ],
        advanced: [
            {
                title: "Forca avancada de corpo inteiro",
                focus: "tempo, unilateral e alta tensao",
                duration: 46,
                difficulty: "Dificil",
                xp: 55,
                equipment: "sem equipamentos",
                proof: "video curto + reps de cada bloco",
                warmup: ["4 min mobilidade dinamica", "10 agachamentos profundos", "8 flexoes", "8 passadas por lado", "20s prancha"],
                blocks: [
                    block("Tensao mecanica", "5 series, RPE 8 tecnico", [
                        exercise("Agachamento unilateral assistido", "5", "5-8 por lado", "75s", "controle total na descida", "segure em apoio"),
                        exercise("Flexao declinada ou diamante", "5", "6-12", "75s", "tronco firme e amplitude consistente", "flexao tradicional"),
                        exercise("Levantamento unilateral lento", "5", "8 por lado", "60s", "desca em 3 segundos", "toque pe livre no chao"),
                    ]),
                    block("Core forte", "4 voltas", [
                        exercise("Hollow hold", "4", "25-40s", "45s", "lombar controlada o tempo todo", "joelhos dobrados"),
                        exercise("Prancha lateral com elevacao de perna", "4", "8-10 por lado", "45s", "quadril alto e estavel", "sem elevar perna"),
                    ]),
                ],
                finisher: "Desafio: 8 minutos AMRAP de 8 flexoes, 12 agachamentos e 20s hollow.",
                cooldown: ["1 min caminhada leve", "45s quadril por lado", "45s peitoral"],
                challenge: {
                    title: "AMRAP tecnico",
                    rules: "vence quem fizer mais voltas validas em 8 minutos sem quebrar tecnica",
                    score: "voltas completas + reps extras",
                },
            },
            {
                title: "Condicionamento avancado sem impacto excessivo",
                focus: "resistencia muscular e capacidade cardiovascular",
                duration: 42,
                difficulty: "Dificil",
                xp: 52,
                equipment: "sem equipamentos",
                proof: "print do timer + voltas completas",
                warmup: ["3 min marcha rapida", "10 passadas reversas", "10 flexoes inclinadas", "20s prancha", "10 agachamentos"],
                blocks: [
                    block("Intervalos fortes", "6 voltas: 45s trabalho, 15s descanso", [
                        exercise("Agachamento com salto ou subida explosiva", "6", "45s", "15s", "aterrisse macio ou suba rapido sem salto", "sem salto"),
                        exercise("Flexao com liberacao de maos", "6", "45s", "15s", "peito toca leve no chao, maos soltam", "apoie joelhos"),
                        exercise("Passada alternada rapida", "6", "45s", "15s", "ritmo forte, joelho estavel", "passada reversa lenta"),
                        exercise("Escalador controlado", "6", "45s", "15s", "quadril baixo e abdomen ativo", "ritmo moderado"),
                    ]),
                ],
                finisher: "Desafio: 100 agachamentos tecnicos no menor tempo, parando antes de perder forma.",
                cooldown: ["2 min respiracao", "45s panturrilha por lado", "45s posterior por lado"],
                challenge: {
                    title: "100 reps limpas",
                    rules: "vence o menor tempo com todas as repeticoes validas",
                    score: "tempo final + penalidade por repeticao invalida",
                },
            },
            {
                title: "Controle avancado de pernas e core",
                focus: "estabilidade, mobilidade ativa e resistencia",
                duration: 44,
                difficulty: "Dificil",
                xp: 52,
                equipment: "cadeira opcional",
                proof: "reps por perna + percepcao de esforco de 1 a 10",
                warmup: ["2 min mobilidade de tornozelo", "10 agachamentos com pausa", "8 levantamentos unilaterais por lado", "20s prancha lateral por lado"],
                blocks: [
                    block("Unilateral avancado", "5 series por exercicio", [
                        exercise("Agachamento bulgaro", "5", "8-12 por lado", "75s", "joelho acompanha o pe, tronco firme", "passada reversa"),
                        exercise("Ponte de gluteo unilateral com pausa", "5", "10-12 por lado", "60s", "pause 2s no topo", "ponte bilateral"),
                        exercise("Panturrilha unilateral", "5", "12-20 por lado", "45s", "amplitude completa e controle", "bilateral"),
                    ]),
                    block("Core de resistencia", "3 voltas", [
                        exercise("Prancha frontal", "3", "45-70s", "45s", "sem elevar quadril", "divida em blocos menores"),
                        exercise("Abdominal reverso lento", "3", "12-15", "45s", "sem embalo", "menor amplitude"),
                    ]),
                ],
                finisher: "Desafio: 4 minutos de parede sentada, acumulando tempo.",
                cooldown: ["1 min caminhada", "60s flexor de quadril por lado", "45s gluteo por lado"],
                challenge: {
                    title: "Parede mental",
                    rules: "vence quem acumular mais tempo em parede sentada com joelhos seguros",
                    score: "segundos acumulados",
                },
            },
        ],
    },
    gym: {
        beginner: [
            {
                title: "Full body maquinas para iniciantes",
                focus: "aprender movimentos basicos com seguranca",
                duration: 45,
                difficulty: "Media",
                xp: 42,
                equipment: "maquinas, halteres leves e esteira/bicicleta",
                proof: "foto do treino + cargas usadas nos principais exercicios",
                warmup: ["5 min esteira ou bicicleta leve", "10 agachamentos sem carga", "10 remadas elastico ou maquina leve", "10 elevacoes de ombro sem carga"],
                blocks: [
                    block("Forca guiada", "3 series por exercicio, carga com 2-3 reps de reserva", [
                        exercise("Leg press", "3", "10-12", "75s", "pes firmes, joelhos acompanham os pes", "reduza carga"),
                        exercise("Supino maquina", "3", "10-12", "75s", "escapulas apoiadas, movimento controlado", "menor carga"),
                        exercise("Remada sentada", "3", "10-12", "75s", "puxe cotovelos para tras sem elevar ombros", "carga leve"),
                        exercise("Mesa flexora", "3", "10-12", "60s", "controle a volta", "amplitude confortavel"),
                    ]),
                    block("Core e postura", "2-3 series", [
                        exercise("Prancha frontal", "3", "20-35s", "45s", "respire sem perder alinhamento", "joelhos no chao"),
                        exercise("Face pull ou crucifixo inverso maquina", "2", "12-15", "45s", "ombros longe das orelhas", "carga baixa"),
                    ]),
                ],
                finisher: "Desafio: 8 min de bicicleta mantendo ritmo constante e respiracao controlada.",
                cooldown: ["3 min caminhada leve", "40s peitoral", "40s quadriceps por lado"],
                challenge: {
                    title: "Carga honesta",
                    rules: "vence quem registrar todas as cargas e manter tecnica limpa",
                    score: "series completas + registro de cargas",
                },
            },
            {
                title: "Inferior e core guiado",
                focus: "pernas, gluteos e estabilidade",
                duration: 42,
                difficulty: "Media",
                xp: 40,
                equipment: "maquinas e halteres leves",
                proof: "registro de carga do leg press + reps concluidas",
                warmup: ["5 min bicicleta", "12 agachamentos sem peso", "10 pontes de gluteo", "8 passadas sem carga por lado"],
                blocks: [
                    block("Pernas", "3 series por exercicio", [
                        exercise("Leg press", "3", "10-12", "75s", "desca ate amplitude segura", "carga leve"),
                        exercise("Cadeira extensora", "3", "12-15", "60s", "suba firme, desca controlando", "menor carga"),
                        exercise("Mesa flexora", "3", "12-15", "60s", "controle total", "menor carga"),
                        exercise("Elevacao pelvica com halter", "3", "10-12", "60s", "queixo levemente recolhido", "sem carga"),
                    ]),
                    block("Core", "3 series", [
                        exercise("Prancha lateral", "3", "20-30s por lado", "35s", "quadril alto", "joelho no chao"),
                        exercise("Abdominal na maquina ou no solo", "3", "10-15", "35s", "sem puxar o pescoco", "menor amplitude"),
                    ]),
                ],
                finisher: "Desafio: 50 repeticoes totais de cadeira extensora com carga leve e tecnica perfeita.",
                cooldown: ["3 min caminhada", "45s posterior de coxa por lado", "45s flexor de quadril por lado"],
                challenge: {
                    title: "Pernas sem ego",
                    rules: "vence quem manter amplitude e controle em todas as series",
                    score: "series validas",
                },
            },
            {
                title: "Superior iniciante completo",
                focus: "peito, costas, ombros e bracos",
                duration: 40,
                difficulty: "Media",
                xp: 38,
                equipment: "maquinas, cabos e halteres leves",
                proof: "foto ou anotacao de 4 cargas usadas",
                warmup: ["5 min eliptico leve", "10 remadas leves", "10 supinos leves", "10 rotacoes externas sem carga"],
                blocks: [
                    block("Empurrar e puxar", "3 series por exercicio", [
                        exercise("Supino maquina", "3", "10-12", "75s", "controle a descida", "carga leve"),
                        exercise("Puxada frontal", "3", "10-12", "75s", "puxe cotovelos para baixo", "carga leve"),
                        exercise("Desenvolvimento maquina", "3", "10-12", "60s", "nao arqueie lombar", "carga leve"),
                        exercise("Remada baixa", "3", "10-12", "60s", "peito aberto, ombros baixos", "carga leve"),
                    ]),
                    block("Bracos e core", "2 series", [
                        exercise("Rosca halter", "2", "12-15", "45s", "cotovelos parados", "menos carga"),
                        exercise("Triceps corda", "2", "12-15", "45s", "abra a corda ao final", "menos carga"),
                        exercise("Prancha", "2", "25-40s", "45s", "mantenha alinhamento", "joelhos no chao"),
                    ]),
                ],
                finisher: "Desafio: 6 min de remo ou bicicleta com ritmo sustentavel.",
                cooldown: ["40s dorsal por lado", "40s peitoral", "1 min respiracao"],
                challenge: {
                    title: "Registro completo",
                    rules: "vence quem registrar todas as cargas e uma melhoria para o proximo treino",
                    score: "cargas registradas + reflexao",
                },
            },
        ],
        intermediate: [
            {
                title: "Upper hipertrofia equilibrado",
                focus: "peito, costas, ombros e bracos",
                duration: 55,
                difficulty: "Media",
                xp: 50,
                equipment: "halteres, cabos e maquinas",
                proof: "registro de cargas + reps da ultima serie",
                warmup: ["5 min cardio leve", "2 series leves de supino", "2 series leves de remada", "10 rotacoes externas"],
                blocks: [
                    block("Compostos", "4 series com 1-2 reps de reserva", [
                        exercise("Supino reto com halteres", "4", "8-10", "90s", "escapulas firmes, controle a descida", "maquina supino"),
                        exercise("Remada baixa", "4", "8-10", "90s", "puxe com costas, nao com pescoco", "maquina guiada"),
                        exercise("Desenvolvimento sentado", "3", "8-10", "90s", "costelas baixas, amplitude segura", "maquina ombro"),
                    ]),
                    block("Volume", "3 series", [
                        exercise("Puxada frontal", "3", "10-12", "75s", "cotovelos para baixo", "carga moderada"),
                        exercise("Crucifixo maquina ou cabo", "3", "12-15", "60s", "alongue sem dor", "menor amplitude"),
                        exercise("Elevacao lateral", "3", "12-15", "45s", "sem impulso", "menos carga"),
                        exercise("Triceps corda + rosca halter", "3", "12 cada", "45s", "controle as duas fases", "series separadas"),
                    ]),
                ],
                finisher: "Desafio: maior total de reps tecnicas na ultima serie de puxada frontal.",
                cooldown: ["3 min leve", "45s peitoral", "45s dorsal por lado"],
                challenge: {
                    title: "Ultima serie limpa",
                    rules: "vence quem faz mais reps validas na ultima serie sem roubar",
                    score: "reps validas",
                },
            },
            {
                title: "Lower intermediario",
                focus: "quadriceps, posterior, gluteos e core",
                duration: 58,
                difficulty: "Dificil",
                xp: 55,
                equipment: "barra, maquinas e halteres",
                proof: "carga principal + RPE final",
                warmup: ["6 min bicicleta", "2 series leves de agachamento ou leg", "10 pontes de gluteo", "8 passadas por lado"],
                blocks: [
                    block("Forca principal", "4 series com tecnica solida", [
                        exercise("Agachamento livre ou hack", "4", "6-8", "120s", "coluna neutra, joelhos estaveis", "leg press"),
                        exercise("Levantamento romeno com halteres", "4", "8-10", "90s", "quadril para tras, costas neutras", "menos carga"),
                        exercise("Leg press", "3", "10-12", "90s", "amplitude controlada", "carga menor"),
                    ]),
                    block("Acessorios", "3 series", [
                        exercise("Cadeira extensora", "3", "12-15", "60s", "pause 1s no topo", "menos carga"),
                        exercise("Mesa flexora", "3", "12-15", "60s", "controle a volta", "menos carga"),
                        exercise("Panturrilha em pe ou sentado", "4", "12-20", "45s", "amplitude completa", "bilateral leve"),
                    ]),
                ],
                finisher: "Desafio: 3 series de prancha, tentando manter o mesmo tempo nas tres.",
                cooldown: ["4 min caminhada", "45s quadriceps por lado", "45s posterior por lado"],
                challenge: {
                    title: "RPE honesto",
                    rules: "vence quem registra cargas e RPE sem inflar resultado",
                    score: "registro completo + consistencia",
                },
            },
            {
                title: "Full body densidade",
                focus: "forca geral e condicionamento",
                duration: 50,
                difficulty: "Media",
                xp: 48,
                equipment: "halteres, maquinas e cardio",
                proof: "voltas concluidas + cargas escolhidas",
                warmup: ["5 min cardio leve", "10 agachamentos", "10 remadas leves", "10 flexoes inclinadas"],
                blocks: [
                    block("Densidade 20 minutos", "complete o maximo de voltas tecnicas em 20 min", [
                        exercise("Goblet squat", "AMRAP", "10", "conforme necessario", "tronco alto, cotovelos para baixo", "leg press 12 reps"),
                        exercise("Supino halteres", "AMRAP", "10", "conforme necessario", "controle a descida", "maquina supino"),
                        exercise("Remada unilateral", "AMRAP", "10 por lado", "conforme necessario", "quadril firme", "remada maquina"),
                        exercise("Levantamento romeno halteres", "AMRAP", "10", "conforme necessario", "quadril para tras", "menos carga"),
                    ]),
                    block("Core", "3 series", [
                        exercise("Prancha", "3", "40-60s", "45s", "respire sem perder postura", "menos tempo"),
                        exercise("Pallof press no cabo", "3", "10 por lado", "45s", "resista a rotacao", "menos carga"),
                    ]),
                ],
                finisher: "Desafio: 500m no remo ou 5 min bike buscando ritmo constante.",
                cooldown: ["3 min leve", "alongamento livre 3 min"],
                challenge: {
                    title: "20 minutos produtivos",
                    rules: "vence quem faz mais voltas tecnicas com cargas registradas",
                    score: "voltas + reps extras",
                },
            },
        ],
        advanced: [
            {
                title: "Lower avancado forca e posterior",
                focus: "forca, posterior de coxa e gluteos",
                duration: 70,
                difficulty: "Dificil",
                xp: 65,
                equipment: "barra, rack, maquinas e halteres",
                proof: "top set + back-off sets + RPE",
                warmup: ["7 min cardio leve", "mobilidade de tornozelo e quadril", "3 series progressivas do primeiro exercicio"],
                blocks: [
                    block("Forca", "top set tecnico + back-off", [
                        exercise("Agachamento livre ou hack", "1 + 3", "1x5 forte, depois 3x6-8", "150s", "pare com 1-2 reps de reserva", "leg press pesado"),
                        exercise("Levantamento romeno", "4", "6-8", "120s", "barra perto do corpo, quadril para tras", "halteres"),
                        exercise("Leg press pes medios", "4", "10-12", "90s", "controle profundo sem tirar quadril do banco", "menos carga"),
                    ]),
                    block("Acessorios densos", "3-4 series", [
                        exercise("Mesa flexora", "4", "10-12", "75s", "pause contraido", "menos carga"),
                        exercise("Afundo caminhando", "3", "10 por lado", "75s", "passo estavel", "passada reversa"),
                        exercise("Panturrilha", "5", "10-15", "45s", "2s alongado, 1s contraido", "menos carga"),
                    ]),
                ],
                finisher: "Desafio: parede sentada 2 tentativas, somando tempo total.",
                cooldown: ["5 min caminhada", "mobilidade leve de quadril", "respiracao 2 min"],
                challenge: {
                    title: "Top set responsavel",
                    rules: "vence quem registra melhor relacao carga-tecnica, nao so maior peso",
                    score: "carga x reps com RPE honesto",
                },
            },
            {
                title: "Push pull avancado",
                focus: "volume de superiores e performance",
                duration: 68,
                difficulty: "Dificil",
                xp: 62,
                equipment: "barra, halteres, cabos e maquinas",
                proof: "cargas dos 4 primeiros exercicios + reps finais",
                warmup: ["5 min remo leve", "rotacao externa 2x15", "series progressivas de supino e puxada"],
                blocks: [
                    block("Compostos pesados", "4-5 series", [
                        exercise("Supino reto barra", "5", "4-6", "150s", "escapulas fixas, pausa curta no peito", "halteres ou maquina"),
                        exercise("Barra fixa ou puxada pesada", "5", "5-8", "120s", "comece puxando escapulas", "puxada frontal"),
                        exercise("Desenvolvimento militar", "4", "6-8", "120s", "gluteos contraidos, sem hiperextensao", "maquina"),
                        exercise("Remada curvada ou maquina", "4", "6-8", "120s", "tronco firme, cotovelos para tras", "remada apoiada"),
                    ]),
                    block("Volume final", "3 series", [
                        exercise("Crucifixo cabo", "3", "12-15", "60s", "alongue com controle", "maquina"),
                        exercise("Elevacao lateral", "4", "12-20", "45s", "sem balanco", "menos carga"),
                        exercise("Rosca direta + triceps corda", "3", "10-12 cada", "45s", "execucao limpa", "series separadas"),
                    ]),
                ],
                finisher: "Desafio: 5 min de remo buscando distancia maxima sustentavel.",
                cooldown: ["45s peitoral", "45s dorsal por lado", "45s ombro posterior por lado"],
                challenge: {
                    title: "Distancia final",
                    rules: "vence maior distancia no remo apos completar o treino",
                    score: "metros em 5 minutos",
                },
            },
            {
                title: "Full body atletico avancado",
                focus: "forca, potencia controlada e condicionamento",
                duration: 64,
                difficulty: "Dificil",
                xp: 60,
                equipment: "halteres, kettlebell opcional, maquinas e cardio",
                proof: "tempo do circuito + cargas usadas",
                warmup: ["6 min cardio leve", "mobilidade dinamica", "2 series leves de cada padrao principal"],
                blocks: [
                    block("Forca em pares", "4 series por par", [
                        exercise("Terra com trap bar ou romeno", "4", "5-6", "120s", "coluna neutra e forca no chao", "halteres"),
                        exercise("Supino inclinado halteres", "4", "8-10", "90s", "controle total", "maquina"),
                        exercise("Agachamento frontal ou goblet pesado", "4", "6-8", "120s", "cotovelos altos, tronco firme", "leg press"),
                        exercise("Remada apoiada", "4", "8-10", "90s", "puxe com costas", "maquina remada"),
                    ]),
                    block("Condicionamento tecnico", "12 minutos AMRAP", [
                        exercise("Kettlebell swing ou levantamento romeno rapido", "AMRAP", "12", "conforme necessario", "quadril domina o movimento", "romeno com halteres leve"),
                        exercise("Flexao", "AMRAP", "10", "conforme necessario", "amplitude consistente", "inclinada"),
                        exercise("Bike ergometrica", "AMRAP", "10 calorias ou 45s", "conforme necessario", "ritmo forte controlado", "esteira inclinada"),
                    ]),
                ],
                finisher: "Desafio: registrar voltas tecnicas do AMRAP de 12 minutos.",
                cooldown: ["5 min leve", "mobilidade de quadril", "respiracao 2 min"],
                challenge: {
                    title: "AMRAP de performance",
                    rules: "vence quem soma mais voltas tecnicas, com cargas declaradas antes",
                    score: "voltas completas + reps extras",
                },
            },
        ],
    },
};
