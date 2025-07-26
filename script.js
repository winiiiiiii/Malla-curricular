// ----------------------
// DATOS DE LA MALLA
// ----------------------
const malla = {
    "Semestre 1": [
        "BIO-017 Biología Básica",
        "OSI-100 Orientación Institucional",
        "FIL-011 Introducción a la Filosofía",
        "FIS-017 Física Básica",
        "LET-011 Lengua Española Básica I",
        "MAT-014 Matemática Básica",
        "QUI-014 Química Básica",
        "SOC-010 Introducción a las Ciencias Sociales"
    ],
    "Semestre 2": [
        "BAN-002 Introducción al Bioanálisis",
        "BAN-003 Lab de Bioanálisis",
        "CMO-210 Anatomía Aplicada",
        "CMO-230 Histología General",
        "CMO-231 Lab de Histología General",
        "EFI-012 Educación Física",
        "EST-133 Bioestadística",
        "HIS-011 Fund. de Historia Social Dominicana",
        "LET-012 Lengua Española Básica II",
        "QUI-122 Química Orgánica"
    ],
    "Semestre 3": [
        "BAN-004 Bioanálisis y Tecnología",
        "BAN-005 Lab Bioanálisis y Tecnología",
        "CFI-123 Genética Médica",
        "CFI-124 Lab Genética Médica",
        "CFI-233 Bioquímica I",
        "CFI-234 Lab Bioquímica I",
        "CFI-317 Fisiología General",
        "CFI-318 Lab Fisiología General",
        "IDI-114 Inglés Aplicado",
        "QUI-117 Química Inorgánica Cualitativa"
    ],
    // Puedes continuar agregando los semestres 4 a 8 e Internado...
};

const requisitos = {
    "BAN-003 Lab de Bioanálisis": ["BAN-002 Introducción al Bioanálisis", "MAT-014 Matemática Básica"],
    "CMO-210 Anatomía Aplicada": ["BIO-017 Biología Básica", "QUI-014 Química Básica"],
    "LET-012 Lengua Española Básica II": ["LET-011 Lengua Española Básica I"],
    "QUI-122 Química Orgánica": ["QUI-014 Química Básica"],
    "CFI-124 Lab Genética Médica": ["CFI-123 Genética Médica"],
    "CFI-234 Lab Bioquímica I": ["CFI-233 Bioquímica I"],
    "QUI-117 Química Inorgánica Cualitativa": ["QUI-014 Química Básica"]
};

// Mensajes motivacionales
const mensajes = [
    "Un nuevo comienzo, una nueva oportunidad. ¡Vamos con todo!",
    "Sigue avanzando, cada paso te acerca a tu meta.",
    "Tu esfuerzo construye tu futuro. No te detengas.",
    "Ya estás más cerca del título que ayer. ¡Ánimo!"
];

// ----------------------
// FUNCIONES PRINCIPALES
// ----------------------
const contenedor = document.getElementById("malla-container");
const mensajeBloqueo = document.getElementById("mensaje-bloqueo");

function cargarMalla() {
    contenedor.innerHTML = "";
    let semestreIndex = 0;
    for (let semestre in malla) {
        const divSem = document.createElement("div");
        divSem.classList.add("semestre");
        const titulo = document.createElement("h2");
        titulo.textContent = `${semestre}`;
        divSem.appendChild(titulo);

        // Mensaje motivacional
        const msg = document.createElement("p");
        msg.className = "motivacional";
        msg.textContent = mensajes[semestreIndex % mensajes.length];
        divSem.appendChild(msg);

        malla[semestre].forEach(ramo => {
            const divRamo = document.createElement("div");
            divRamo.classList.add("ramo");
            divRamo.textContent = ramo;
            if (estaAprobado(ramo)) divRamo.classList.add("aprobado");

            divRamo.addEventListener("click", () => toggleAprobado(ramo, divRamo));
            divSem.appendChild(divRamo);
        });

        contenedor.appendChild(divSem);
        semestreIndex++;
    }
}

function estaAprobado(ramo) {
    const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
    return aprobados.includes(ramo);
}

function toggleAprobado(ramo, elemento) {
    if (!cumpleRequisitos(ramo)) return;
    let aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
    if (aprobados.includes(ramo)) {
        aprobados = aprobados.filter(r => r !== ramo);
        elemento.classList.remove("aprobado");
    } else {
        aprobados.push(ramo);
        elemento.classList.add("aprobado");
    }
    localStorage.setItem("aprobados", JSON.stringify(aprobados));
}

function cumpleRequisitos(ramo) {
    const reqs = requisitos[ramo];
    if (!reqs) return true;

    const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");
    const faltantes = reqs.filter(r => !aprobados.includes(r));

    if (faltantes.length > 0) {
        mostrarMensaje(`No puedes aprobar "${ramo}" aún. Faltan: ${faltantes.join(", ")}`);
        return false;
    }
    return true;
}

function mostrarMensaje(texto) {
    mensajeBloqueo.textContent = texto;
    mensajeBloqueo.style.display = "block";
    setTimeout(() => mensajeBloqueo.style.display = "none", 4000);
}

// ----------------------
// INICIAR
// ----------------------
document.addEventListener("DOMContentLoaded", cargarMalla);

