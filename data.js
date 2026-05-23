/* REDIBAI Orizaba — Demo data layer.
   Deterministic seed so every reload shows the same 400-student academy. */
(function (global) {
  // ---------- RNG ----------
  function seed(n) {
    const x = Math.sin(n * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }
  function pick(arr, n) { return arr[Math.floor(seed(n) * arr.length)]; }
  function rand(min, max, n) { return min + seed(n) * (max - min); }

  // ---------- Name pools ----------
  const FIRST_M = ['Diego','Alejandro','Luis','Carlos','Miguel','Jorge','Andrés','Roberto','Daniel','Fernando','Javier','Ricardo','Eduardo','Sebastián','Manuel','Iván','Rodrigo','Emilio','Antonio','Mauricio','Pablo','Hugo','Joaquín','Cristián','Octavio','Raúl','Arturo','Tomás','César','Adrián','Felipe','Gerardo','Héctor','Ignacio','Leonardo','Marco','Nicolás','Óscar','Ramón','Samuel','Tadeo','Ulises','Vicente','Wilfrido','Xavier','Yael','Zeferino','Bruno','Damián','Esteban'];
  const FIRST_F = ['Ana','María','Sofía','Valeria','Lucía','Daniela','Carolina','Camila','Andrea','Paula','Mariana','Renata','Fernanda','Regina','Ximena','Adriana','Patricia','Verónica','Laura','Diana','Mónica','Isabel','Gabriela','Natalia','Sara','Elena','Karla','Beatriz','Alejandra','Claudia','Brenda','Cecilia','Dulce','Estela','Fabiola','Guadalupe','Hilda','Irene','Julia','Karina','Liliana','Magdalena','Nadia','Olivia','Pamela','Quetzalli','Rosa','Silvia','Teresa','Yolanda'];
  const LAST = ['García','Martínez','Hernández','López','González','Rodríguez','Pérez','Sánchez','Ramírez','Cruz','Flores','Gómez','Morales','Vázquez','Jiménez','Reyes','Díaz','Mendoza','Aguilar','Torres','Romero','Castillo','Ortiz','Ramos','Ruiz','Álvarez','Salazar','Domínguez','Mejía','Cabrera','Vargas','Castro','Núñez','Ibarra','Velázquez','Espinoza','Guerrero','Rivera','Medina','Solís','Contreras','Ávila','Acosta','Bautista','Cervantes','Delgado','Estrada','Figueroa','Galván','Herrera'];

  // ---------- Locations (sedes) ----------
  const LOCATIONS = [
    { id:'loc-ori',  name:'Sede Orizaba',     city:'Orizaba',          state:'Veracruz', address:'Av. Oriente 6 #284, Centro',           color:'#e9c349', lat:18.8516, lng:-97.0996, isHQ:true  },
    { id:'loc-cor',  name:'Sede Córdoba',     city:'Córdoba',          state:'Veracruz', address:'Calle 5 Norte #412, Centro',           color:'#b9c7e4', lat:18.8946, lng:-96.9322 },
    { id:'loc-ver',  name:'Sede Veracruz',    city:'Veracruz',         state:'Veracruz', address:'Blvd. Ávila Camacho #1234',            color:'#bcc7dc', lat:19.1738, lng:-96.1342 },
    { id:'loc-pue',  name:'Sede Puebla',      city:'Puebla',           state:'Puebla',   address:'Av. Juárez #2510, La Paz',             color:'#ffe088', lat:19.0414, lng:-98.2063 },
    { id:'loc-cdmx', name:'Sede CDMX',        city:'Ciudad de México', state:'CDMX',     address:'Av. Insurgentes Sur #800, Del Valle',  color:'#e9c349', lat:19.3927, lng:-99.1581 },
    { id:'loc-xal',  name:'Sede Xalapa',      city:'Xalapa',           state:'Veracruz', address:'Av. Lázaro Cárdenas #901',             color:'#b9c7e4', lat:19.5438, lng:-96.9102 },
    { id:'loc-vir',  name:'Campus Virtual',   city:'Remoto',           state:'—',        address:'Plataforma REDIBAI Online',            color:'#bcc7dc', lat:null,    lng:null    }
  ];

  // ---------- Programs / Groups ----------
  const GROUPS = [
    { id:'g6',  name:'Grupo 6',  type:'maestria',  program:'Maestría en Ciencias de la Educación',   cohort:'2024-A', locationId:'loc-ori',  size:62, color:'#e9c349' },
    { id:'g7',  name:'Grupo 7',  type:'maestria',  program:'Maestría en Innovación Pedagógica',      cohort:'2024-B', locationId:'loc-cor',  size:58, color:'#b9c7e4' },
    { id:'g8',  name:'Grupo 8',  type:'maestria',  program:'Maestría en Liderazgo Educativo',        cohort:'2025-A', locationId:'loc-ori',  size:65, color:'#ffe088' },
    { id:'g9',  name:'Grupo 9',  type:'maestria',  program:'Maestría en Tecnología Educativa',       cohort:'2025-A', locationId:'loc-ver',  size:56, color:'#bcc7dc' },
    { id:'g10', name:'Grupo 10', type:'maestria',  program:'Maestría en Investigación Educativa',    cohort:'2025-B', locationId:'loc-pue',  size:59, color:'#e9c349' },
    { id:'d1',  name:'Doctorado I',   type:'doctorado', program:'Doctorado en Educación',            cohort:'2023',  locationId:'loc-ori',   size:34, color:'#ffe088' },
    { id:'d2',  name:'Doctorado II',  type:'doctorado', program:'Doctorado en Investigación Educativa', cohort:'2024', locationId:'loc-cdmx', size:34, color:'#b9c7e4' },
    { id:'d3',  name:'Doctorado III', type:'doctorado', program:'Doctorado en Política Educativa',   cohort:'2025',  locationId:'loc-xal',   size:32, color:'#bcc7dc' }
    // 62+58+65+56+59+34+34+32 = 400
  ];

  // ---------- Teachers ----------
  const TEACHER_FIRST = ['Luis','Patricia','Roberto','Cecilia','Francisco','Adriana','Gerardo','Verónica','Jorge','Mariana','Rafael','Beatriz','Octavio','Silvia','Héctor','Gabriela','Manuel','Teresa','Arturo','Diana'];
  const TEACHER_TITLES = ['Dr.','Dra.','Mtro.','Mtra.'];
  const SPECIALTIES = ['Pedagogía Crítica','Investigación Cualitativa','Estadística Educativa','Política Pública','Didáctica','Currículum','Evaluación','Tecnología Educativa','Filosofía de la Educación','Sociología','Psicología del Aprendizaje','Liderazgo','Gestión Escolar','Innovación','Métodos Mixtos','Diseño Instruccional','Educación Inclusiva','Neuroeducación','Ética Profesional','Investigación Acción'];
  const TEACHERS = TEACHER_FIRST.map((fn, i) => ({
    id: `t${String(i+1).padStart(2,'0')}`,
    name: `${TEACHER_TITLES[i % 4]} ${fn} ${LAST[(i*3)%LAST.length]} ${LAST[(i*5+1)%LAST.length]}`,
    specialty: SPECIALTIES[i % SPECIALTIES.length],
    locationId: LOCATIONS[i % (LOCATIONS.length-1)].id,
    rating: +(4.2 + seed(i*7) * 0.8).toFixed(1)
  }));

  // ---------- Courses (3 per group = 24) ----------
  const COURSE_CATALOG = {
    maestria: [
      ['Metodología de la Investigación','MTI'],
      ['Teorías del Aprendizaje','TAP'],
      ['Diseño Curricular','DCU'],
      ['Estadística Aplicada','EST'],
      ['Innovación Educativa','INE'],
      ['Liderazgo y Gestión','LGE'],
      ['Tecnologías Emergentes','TEM'],
      ['Evaluación del Aprendizaje','EVA'],
      ['Política Educativa','POL']
    ],
    doctorado: [
      ['Seminario de Tesis I','STE1'],
      ['Epistemología','EPI'],
      ['Métodos Cuantitativos Avanzados','MCA'],
      ['Métodos Cualitativos Avanzados','MQA'],
      ['Investigación Acción Participativa','IAP'],
      ['Producción Científica','PCI']
    ]
  };
  const COURSES = [];
  GROUPS.forEach((g, gi) => {
    const pool = COURSE_CATALOG[g.type];
    for (let i = 0; i < 3; i++) {
      const [name, code] = pool[(gi + i*2) % pool.length];
      COURSES.push({
        id: `c-${g.id}-${i+1}`,
        groupId: g.id,
        teacherId: TEACHERS[(gi*3 + i) % TEACHERS.length].id,
        name, code: `${code}-${g.id.toUpperCase()}`,
        schedule: ['Lun/Mié 18:00','Mar/Jue 17:00','Vie 16:00 / Sáb 09:00','Sáb 09:00-13:00'][i % 4],
        progress: Math.floor(rand(28, 95, gi*10 + i)),
        enrolled: g.size,
        assignmentsPending: Math.floor(rand(0, 5, gi*7 + i)),
        avgGrade: +(7.6 + seed(gi*11 + i) * 2.0).toFixed(2)
      });
    }
  });

  // ---------- Students (400, deterministic) ----------
  function generateStudents() {
    const out = [];
    let id = 1;
    for (const g of GROUPS) {
      for (let i = 0; i < g.size; i++, id++) {
        const isMale = seed(id) < 0.5;
        const pool = isMale ? FIRST_M : FIRST_F;
        const fn = pool[Math.floor(seed(id*7) * pool.length)];
        const ln1 = LAST[Math.floor(seed(id*11) * LAST.length)];
        const ln2 = LAST[Math.floor(seed(id*13) * LAST.length)];
        const gpa = +(7.4 + seed(id*17) * 2.5).toFixed(2);
        const credits = Math.floor(40 + seed(id*19) * 160);
        const attendance = +(75 + seed(id*23) * 25).toFixed(0);
        const online = seed(id*29) > 0.68;
        const lastSeenMin = Math.floor(seed(id*31) * 60*24*3); // up to 3 days ago
        const status = gpa>=9.2 ? 'destacado' : gpa>=8.2 ? 'al corriente' : gpa>=7.6 ? 'regular' : 'en riesgo';
        const slug = (str) => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
        out.push({
          id: `u${String(id).padStart(3,'0')}`,
          name: `${fn} ${ln1} ${ln2}`,
          firstName: fn,
          email: `${slug(fn)}.${slug(ln1)}${id}@redibai.edu.mx`,
          groupId: g.id,
          locationId: g.locationId,
          gpa, credits, attendance, status, online,
          lastSeenMinAgo: lastSeenMin,
          hue: Math.floor(seed(id*37) * 360),
          tuitionPaid: seed(id*41) > 0.18,
          assignments: { pending: Math.floor(seed(id*43)*5), submitted: Math.floor(seed(id*47)*30+10), graded: Math.floor(seed(id*53)*25+5) }
        });
      }
    }
    return out;
  }
  const STUDENTS = generateStudents();

  // ---------- Calendar events (next 30 days) ----------
  const EVENTS = [];
  const EVENT_TYPES = [
    { type:'clase',    label:'Clase magistral',       icon:'school',    color:'#b9c7e4' },
    { type:'entrega',  label:'Entrega de tarea',      icon:'assignment',color:'#e9c349' },
    { type:'examen',   label:'Examen parcial',        icon:'quiz',      color:'#ffb4ab' },
    { type:'webinar',  label:'Webinar',               icon:'videocam',  color:'#ffe088' },
    { type:'reunion',  label:'Reunión académica',     icon:'forum',     color:'#bcc7dc' },
    { type:'tutoria',  label:'Tutoría individual',    icon:'support_agent', color:'#b9c7e4' }
  ];
  for (let i = 0; i < 60; i++) {
    const t = EVENT_TYPES[i % EVENT_TYPES.length];
    const c = COURSES[i % COURSES.length];
    const dayOffset = Math.floor(seed(i*3) * 28) - 3;
    const date = new Date(); date.setDate(date.getDate() + dayOffset);
    const hour = 8 + Math.floor(seed(i*5) * 12);
    date.setHours(hour, [0,15,30,45][i%4], 0, 0);
    EVENTS.push({
      id:`e${i+1}`, type:t.type, label:t.label, icon:t.icon, color:t.color,
      title: `${t.label}: ${c.name}`, courseId:c.id, groupId:c.groupId,
      locationId: GROUPS.find(g=>g.id===c.groupId).locationId,
      date: date.toISOString(),
      durationMin: 60 + ([0,30,60][i%3])
    });
  }
  EVENTS.sort((a,b) => a.date.localeCompare(b.date));

  // ---------- Initial live activity feed ----------
  const ACTIVITY_TEMPLATES = [
    { type:'submit',   icon:'task_alt',     color:'#e9c349', text: s => `${s.name} entregó tarea en ${s.courseName}` },
    { type:'grade',    icon:'grade',        color:'#ffe088', text: s => `Calificación publicada para ${s.name}: <b>${s.grade}</b> en ${s.courseName}` },
    { type:'join',     icon:'login',        color:'#b9c7e4', text: s => `${s.name} ingresó al campus` },
    { type:'forum',    icon:'forum',        color:'#bcc7dc', text: s => `${s.name} publicó en el foro de ${s.courseName}` },
    { type:'webinar',  icon:'videocam',     color:'#ffe088', text: s => `${s.name} se unió al webinar en vivo` },
    { type:'enroll',   icon:'how_to_reg',   color:'#b9c7e4', text: s => `Nueva inscripción confirmada: ${s.name} (${s.groupName})` },
    { type:'pay',      icon:'payments',     color:'#e9c349', text: s => `Pago de colegiatura recibido: ${s.name}` },
    { type:'message',  icon:'mark_chat_unread', color:'#bcc7dc', text: s => `Nuevo mensaje de ${s.teacherName} en ${s.courseName}` },
    { type:'alert',    icon:'warning',      color:'#ffb4ab', text: s => `Alerta: ${s.name} bajó del 75% de asistencia` }
  ];
  function buildActivityEvent(i, msAgo) {
    const tpl = ACTIVITY_TEMPLATES[i % ACTIVITY_TEMPLATES.length];
    const stu = STUDENTS[Math.floor(seed(i*97 + 13) * STUDENTS.length)];
    const course = COURSES.find(c => c.groupId === stu.groupId) || COURSES[0];
    const teacher = TEACHERS.find(t => t.id === course.teacherId);
    const group = GROUPS.find(g => g.id === stu.groupId);
    const ctx = {
      name: stu.name, courseName: course.name, teacherName: teacher.name, groupName: group.program,
      grade: (7.5 + seed(i*101) * 2.4).toFixed(1)
    };
    return {
      id: `act-${Date.now()}-${i}`,
      type: tpl.type, icon: tpl.icon, color: tpl.color,
      html: tpl.text(ctx),
      studentId: stu.id, courseId: course.id, groupId: stu.groupId,
      atMs: Date.now() - msAgo
    };
  }
  const ACTIVITY = [];
  for (let i = 0; i < 25; i++) ACTIVITY.push(buildActivityEvent(i, i * 1000 * (30 + Math.floor(seed(i*5)*120))));
  ACTIVITY.sort((a,b) => b.atMs - a.atMs);

  // ---------- Announcements / messages ----------
  const ANNOUNCEMENTS = [
    { id:'a1', icon:'campaign', title:'Cierre de inscripciones USICAMM', body:'Las inscripciones para el proceso 2026 cierran el 31 de mayo. Tramita en línea desde tu panel.', daysAgo:0, priority:'alta' },
    { id:'a2', icon:'event',    title:'Asamblea Académica Anual', body:'Convocamos a alumnos, profesores y directivos a la asamblea del 5 de junio en la Sede Orizaba.', daysAgo:1, priority:'media' },
    { id:'a3', icon:'verified', title:'Acreditación SEP 2026', body:'REDIBAI Orizaba ha sido reacreditada por la SEP con la máxima calificación del sistema.', daysAgo:3, priority:'alta' },
    { id:'a4', icon:'school',   title:'Nuevo Doctorado en Política Educativa', body:'Abrimos la cohorte 2025 del Doctorado III con sede Xalapa. 32 lugares disponibles.', daysAgo:5, priority:'media' },
    { id:'a5', icon:'wifi',     title:'Mantenimiento del Campus Virtual', body:'El sábado 25 de mayo de 02:00 a 04:00 habrá mantenimiento programado.', daysAgo:6, priority:'baja' }
  ];

  // ---------- Messages (recent threads) ----------
  const MESSAGES = STUDENTS.slice(0, 18).map((s, i) => {
    const t = TEACHERS[i % TEACHERS.length];
    const minAgo = Math.floor(seed(i*61) * 240);
    const unread = seed(i*67) > 0.6;
    return {
      id:`m${i+1}`,
      withId: i % 2 ? s.id : t.id,
      withName: i % 2 ? s.name : t.name,
      withRole: i % 2 ? 'Alumno' : 'Profesor',
      preview: [
        'Hola, ¿podemos revisar la sección 3 del proyecto?',
        'Adjunto la rúbrica actualizada para la entrega del viernes.',
        'Gracias por la retroalimentación, ya hice las correcciones.',
        '¿Tendremos sesión presencial esta semana?',
        'El acceso al webinar está habilitado, te espero a las 19:00.',
        'Subí el ensayo a la plataforma, confírmame si llegó.',
        '¿Cuál es la fecha límite del avance 2?',
        'Te comparto las lecturas para el próximo seminario.'
      ][i % 8],
      minAgo, unread,
      hue: s.hue
    };
  });

  // ---------- Demo session (overridable from login) ----------
  const SESSION = {
    role: 'admin', // 'admin' | 'docente' | 'alumno'
    user: {
      id: 'u-admin',
      name: 'Mtra. Sofía Hernández Ruiz',
      email: 'admin@redibai.edu.mx',
      role: 'Director Académico',
      locationId: 'loc-ori'
    }
  };

  // ---------- Aggregates ----------
  function aggregate() {
    const total = STUDENTS.length;
    const online = STUDENTS.filter(s => s.online).length;
    const atRisk = STUDENTS.filter(s => s.status === 'en riesgo').length;
    const outstanding = STUDENTS.filter(s => s.status === 'destacado').length;
    const avgGpa = +(STUDENTS.reduce((a,s)=>a+s.gpa,0)/total).toFixed(2);
    const avgAttendance = Math.round(STUDENTS.reduce((a,s)=>a+s.attendance,0)/total);
    const tuitionOk = STUDENTS.filter(s=>s.tuitionPaid).length;
    return { total, online, atRisk, outstanding, avgGpa, avgAttendance, tuitionOk, tuitionPct: Math.round(tuitionOk*100/total) };
  }

  // ---------- Helpers ----------
  function getGroup(id) { return GROUPS.find(g => g.id === id); }
  function getLocation(id) { return LOCATIONS.find(l => l.id === id); }
  function getStudent(id) { return STUDENTS.find(s => s.id === id); }
  function getCourse(id) { return COURSES.find(c => c.id === id); }
  function getTeacher(id) { return TEACHERS.find(t => t.id === id); }
  function studentsOfGroup(gid) { return STUDENTS.filter(s => s.groupId === gid); }
  function studentsOfLocation(lid) { return STUDENTS.filter(s => s.locationId === lid); }
  function coursesOfGroup(gid) { return COURSES.filter(c => c.groupId === gid); }

  global.REDIBAI = {
    LOCATIONS, GROUPS, TEACHERS, COURSES, STUDENTS, EVENTS, ACTIVITY, ANNOUNCEMENTS, MESSAGES, SESSION,
    aggregate, getGroup, getLocation, getStudent, getCourse, getTeacher,
    studentsOfGroup, studentsOfLocation, coursesOfGroup,
    buildActivityEvent, seed, pick, rand
  };
})(window);
