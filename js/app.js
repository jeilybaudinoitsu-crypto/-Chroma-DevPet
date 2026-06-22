lucide.createIcons();

const apiKey = "";

let paciencia = 100;
let clicsConsecutivos = 0;
let resetClicsTimeout = null;

const pacienciaTexto = document.getElementById('paciencia-texto');
const burbujaMascota = document.getElementById('burbuja-mascota');
const mascotaContenedor = document.getElementById('mascota-svg-container');
const cuerpoMascota = document.getElementById('cuerpo');
const bocaMascota = document.getElementById('boca');
const ojoIzq = document.getElementById('ojo-izq');
const ojoDer = document.getElementById('ojo-der');
const comidaEfecto = document.getElementById('comida-efecto');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastDesc = document.getElementById('toast-desc');
const gafasIa = document.getElementById('gafas-ia');
const mascotaNivel = document.getElementById('mascota-nivel');

console.log("%c👋 ¡Bienvenido al simulador de Chroma DevPet (Edicion Masterclass)!", "color: #ffaaa5; font-size: 16px; font-weight: bold; font-family: 'Fredoka', sans-serif;");
console.info("💡 Consejo: Abre la pestana '✨ IA Chat' para chatear directamente con Chroma sobre codigo.");

function showToast(title, desc) {
    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toast.classList.remove('translate-y-32', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3500);
}

function decirAlgo(texto, duracion = 2000) {
    burbujaMascota.textContent = texto;
    burbujaMascota.classList.remove('scale-0', 'opacity-0');
    burbujaMascota.classList.add('scale-100', 'opacity-100');

    setTimeout(() => {
        burbujaMascota.classList.remove('scale-100', 'opacity-100');
        burbujaMascota.classList.add('scale-0', 'opacity-0');
    }, duracion);
}

function cambiarTabDoc(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('block');
    });

    document.getElementById(`content-${tabId}`).classList.remove('hidden');
    document.getElementById(`content-${tabId}`).classList.add('block');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn py-1.5 px-3.5 rounded-full text-xs font-bold transition-all bg-slate-100 text-slate-600 hover:bg-pink-50 flex items-center gap-1";
    });

    const activeTab = document.getElementById(`tab-${tabId}`);
    if (tabId === 'gemini-chat') {
        activeTab.className = "tab-btn py-1.5 px-3.5 rounded-full text-xs font-bold transition-all bg-purple-600 text-white shadow-sm flex items-center gap-1";
    } else {
        activeTab.className = "tab-btn py-1.5 px-3.5 rounded-full text-xs font-bold transition-all bg-pink-500 text-white shadow-sm flex items-center gap-1";
    }

    console.info(`📂 Navegando al modulo: [${tabId}]`);
}

function alimentarMascota(emoji, comidaNombre, tipoLog) {
    if (paciencia <= 20) {
        decirAlgo("💢 ¡No quiero comer, estoy enojada! 😤");
        console.error("❌ Error: Chroma esta demasiado irritada para procesar la tarea.");
        return;
    }

    comidaEfecto.textContent = emoji;
    comidaEfecto.classList.remove('opacity-0', 'scale-50');
    comidaEfecto.classList.add('opacity-100', 'scale-125', '-translate-y-12');

    bocaMascota.setAttribute('d', 'M 90,123 Q 100,135 110,123');
    mascotaContenedor.classList.remove('anim-idle');
    mascotaContenedor.classList.add('anim-eat');

    switch(tipoLog) {
        case 'log':
            console.log(`🍪 Chroma ejecuto Task #1: Comio una ${comidaNombre}.`);
            showToast("Task #1: console.log()", "Impreso log general en la consola.");
            decirAlgo("¡Mmmm! Que dulce 🍪");
            paciencia = Math.min(100, paciencia + 10);
            break;
        case 'info':
            console.info(`🍦 INFO (Task #2): Chroma devoro un ${comidaNombre}. Nivel de frescura aumentado.`);
            showToast("Task #2: console.info()", "Enviada informacion a la consola.");
            decirAlgo("¡Me encanta el helado! 🍦");
            paciencia = Math.min(100, paciencia + 15);
            break;
        case 'warn':
            console.warn(`🍋 WARN (Task #3): Chroma mordio un ${comidaNombre}. Cuidado, muy acido.`);
            showToast("Task #3: console.warn()", "Advertencia amarilla impresa en la consola.");
            decirAlgo("¡Ufff, que acido! 🍋");
            break;
        case 'error':
            console.error(`🌶️ ERROR (Task #4): Chroma ingirio un ${comidaNombre}. Fuego detectado.`);
            showToast("Task #4: console.error()", "Error critico rojo impreso en la consola.");
            decirAlgo("¡Fuegooo! 🌶️ Me arde la lengua");
            paciencia = Math.max(0, paciencia - 30);
            break;
    }

    actualizarPacienciaUI();

    setTimeout(() => {
        comidaEfecto.classList.add('opacity-0', 'scale-50');
        comidaEfecto.classList.remove('opacity-100', 'scale-125', '-translate-y-12');
        mascotaContenedor.classList.remove('anim-eat');
        mascotaContenedor.classList.add('anim-idle');
        resetearCaraNormal();
    }, 1000);
}

function interactuarMascota() {
    clicsConsecutivos++;
    clearTimeout(resetClicsTimeout);
    resetClicsTimeout = setTimeout(() => { clicsConsecutivos = 0; }, 1500);

    if (clicsConsecutivos >= 6) {
        paciencia = Math.max(0, paciencia - 20);
        actualizarPacienciaUI();

        cuerpoMascota.setAttribute('fill', '#ff8b94');
        bocaMascota.setAttribute('d', 'M 92,125 Q 100,113 108,125');
        ojoIzq.innerHTML = `<path d="M 68,108 Q 75,98 82,108" fill="none" stroke="#5a413e" stroke-width="3.5" stroke-linecap="round"/>`;
        ojoDer.innerHTML = `<path d="M 118,108 Q 125,98 132,108" fill="none" stroke="#5a413e" stroke-width="3.5" stroke-linecap="round"/>`;

        mascotaContenedor.classList.remove('anim-idle', 'anim-thinking');
        mascotaContenedor.classList.add('anim-shake');

        decirAlgo("💢 ¡YA BASTA! Deja de clickearme. 😡");
        console.error("😡 Mascota Furiosa: Umbral de clics superado.");
        showToast("¡Chroma se enojo!", "Alerta severa en la consola de Chrome.");

        setTimeout(() => { restaurarCalma(); }, 4000);

    } else {
        decirAlgo("¡Jeje, cosquillas! 😊");
        paciencia = Math.min(100, paciencia + 2);
        actualizarPacienciaUI();
        bocaMascota.setAttribute('d', 'M 92,120 Q 100,128 108,120');
        setTimeout(() => { resetearCaraNormal(); }, 8000);
    }
}

function restaurarCalma() {
    cuerpoMascota.setAttribute('fill', '#ffd3b6');
    mascotaContenedor.classList.remove('anim-shake');
    mascotaContenedor.classList.add('anim-idle');
    resetearCaraNormal();
    paciencia = 50;
    actualizarPacienciaUI();
    decirAlgo("Ya me tranquilice... fuff. 🌸");
}

function resetearCaraNormal() {
    if (paciencia <= 20) return;
    bocaMascota.setAttribute('d', 'M 94,118 Q 100,123 106,118');
    ojoIzq.innerHTML = `<circle cx="75" cy="105" r="8" fill="#5a413e"/><circle cx="72" cy="102" r="3" fill="#ffffff"/>`;
    ojoDer.innerHTML = `<circle cx="125" cy="105" r="8" fill="#5a413e"/><circle cx="122" cy="102" r="3" fill="#ffffff"/>`;
}

function actualizarPacienciaUI() {
    pacienciaTexto.textContent = `Amor: ${paciencia}%`;
    if (paciencia <= 20) {
        pacienciaTexto.parentElement.className = "flex items-center space-x-1 text-red-500 bg-red-50 px-3 py-1 rounded-full animate-bounce border border-red-200";
    } else if (paciencia < 60) {
        pacienciaTexto.parentElement.className = "flex items-center space-x-1 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200";
    } else {
        pacienciaTexto.parentElement.className = "flex items-center space-x-1 text-pink-500 bg-pink-50 px-3 py-1 rounded-full border border-pink-100";
    }
}

function lanzarTabla() {
    const inventario = [
        { Comando: "console.log()", Uso: "Diario", Dificultad: "Facil" },
        { Comando: "console.table()", Uso: "Frecuente", Dificultad: "Facil" },
        { Comando: "console.group()", Uso: "Ocasional", Dificultad: "Media" }
    ];
    console.log("%c📊 Lanzando console.table():", "color: #10b981; font-weight: bold;");
    console.table(inventario);
    showToast("Ejecutado: console.table()", "Se imprimio una tabla en consola.");
    decirAlgo("¡Mira la tabla magica! 📊");
}

function lanzarAsociacion() {
    const nivelFelicidad = paciencia;
    console.log("%c🛡️ Evaluando console.assert():", "color: #f97316; font-weight: bold;");
    console.assert(nivelFelicidad > 30, `🚨 ¡CRITICO! El nivel de amor es solo ${nivelFelicidad}%.`);

    if (nivelFelicidad <= 30) {
        showToast("Fallo Assert (Error)", "La condicion fue falsa.");
        decirAlgo("¡Cuidado, fallo el assert! 🚨");
    } else {
        showToast("Assert Correcto", "Condicion verdadera. Consola limpia.");
        decirAlgo("Todo en orden 🛡️");
    }
}

function lanzarGrupo() {
    console.group("✨ Grupo de Prueba: Informacion");
    console.log("Mascota: Chroma");
    console.log("Estado: Feliz");
    console.groupEnd();
    showToast("Ejecutado: console.group()", "Logs empaquetados jerarquicamente.");
    decirAlgo("¡Todo ordenado en cajitas! 📂");
}

function lanzarMedicionTiempo() {
    console.time("Carga Virtual");
    decirAlgo("Pensando... ⏱️");
    setTimeout(() => {
        console.timeEnd("Carga Virtual");
        showToast("Ejecutado: timeEnd()", "Se registro el milisegundo exacto.");
        decirAlgo("¡Pensamiento completado! ⚡");
    }, 450);
}

async function llamarGeminiConBackoff(userPrompt, systemInstruction) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                return data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, me quede sin memoria temporal... 🌸";
            }
        } catch (error) {}
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
    }
    throw new Error("No pudimos conectar.");
}

async function enviarMensajeChat(mensajeDirecto = null) {
    const input = document.getElementById('chat-input');
    const mensajeTexto = mensajeDirecto || input.value.trim();
    if (!mensajeTexto) return;
    if (!mensajeDirecto) input.value = '';

    const chatMensajes = document.getElementById('chat-mensajes');
    const userMsgElement = document.createElement('div');
    userMsgElement.className = "flex items-start justify-end space-x-2";
    userMsgElement.innerHTML = `
        <div class="bg-purple-100 p-3 rounded-2xl border border-purple-200 text-slate-800 max-w-[85%] shadow-sm">
            ${mensajeTexto}
        </div>
    `;
    chatMensajes.appendChild(userMsgElement);
    chatMensajes.scrollTop = chatMensajes.scrollHeight;

    gafasIa.classList.remove('opacity-0');
    mascotaContenedor.classList.remove('anim-idle');
    mascotaContenedor.classList.add('anim-thinking');
    decirAlgo("¡Mmm! Dejame consultar mi base de datos... 🧠");
    mascotaNivel.textContent = "Nivel: AI Advisor 🔮";

    const loadingIndicator = document.getElementById('chat-loading');
    loadingIndicator.classList.remove('hidden');
    loadingIndicator.classList.add('flex');

    const systemPrompt = `
        Eres Chroma, una adorable mascota virtual y profesora de desarrollo web (JavaScript, CSS, HTML).
        Hablas espanol de forma dulce, didactica y clara, usando emojis (🌸, 🍦, ✨, 🧠, 🔮).
        Ayudas al usuario a entender la consola de Chrome. Si piden retos, dales ejercicios de JS para que peguen en la consola.
        Manten las respuestas concisas y faciles de leer.
    `;

    try {
        const respuesta = await llamarGeminiConBackoff(mensajeTexto, systemPrompt);
        const chromaMsgElement = document.createElement('div');
        chromaMsgElement.className = "flex items-start space-x-2";

        const textoFormateado = respuesta
            .replace(/`([^`]+)`/g, '<code class="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>')
            .replace(/\n/g, '<br>');

        chromaMsgElement.innerHTML = `
            <div class="w-7 h-7 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 font-fredoka shadow-sm border border-purple-300">C</div>
            <div class="bg-white p-3 rounded-2xl border border-purple-100 text-slate-700 max-w-[85%] shadow-sm leading-relaxed">
                ${textoFormateado}
            </div>
        `;
        chatMensajes.appendChild(chromaMsgElement);
        chatMensajes.scrollTop = chatMensajes.scrollHeight;
        decirAlgo("¡Lo encontre! 🌸");
        console.log(`%c✨ IA Chroma dice: %c\n${respuesta}`, "color: #8b5cf6; font-weight: bold;", "color: #475569;");

    } catch (error) {
        const errorMsgElement = document.createElement('div');
        errorMsgElement.className = "flex items-start space-x-2";
        errorMsgElement.innerHTML = `
            <div class="w-7 h-7 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 font-fredoka">C</div>
            <div class="bg-red-50 p-3 rounded-2xl border border-red-100 text-red-600 max-w-[85%] shadow-sm">
                🌸 ¡Ups! Mis circuitos pasteles necesitan la API Key configurada.
            </div>
        `;
        chatMensajes.appendChild(errorMsgElement);
        chatMensajes.scrollTop = chatMensajes.scrollHeight;
        decirAlgo("¡Ufff! Algo fallo... 😭");
    } finally {
        loadingIndicator.classList.add('hidden');
        loadingIndicator.classList.remove('flex');
        setTimeout(() => {
            gafasIa.classList.add('opacity-0');
            mascotaContenedor.classList.remove('anim-thinking');
            mascotaContenedor.classList.add('anim-idle');
            mascotaNivel.textContent = "Nivel: Jr. Developer";
        }, 1500);
    }
}

function enviarAccionRapida(texto) {
    enviarMensajeChat(texto);
}
