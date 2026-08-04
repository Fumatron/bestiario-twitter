document.addEventListener("DOMContentLoaded", () => {
    cargarBestiario();
});

async function cargarBestiario() {
    try {
        const respuesta = await fetch("data/bestias.json");
        const bestias = await respuesta.json();
        
        const contenedor = document.getElementById("libro-container");
        contenedor.innerHTML = ""; // Limpiar contenido previo

        // 1. PÁGINA PORTADA
        contenedor.appendChild(crearPortada());

        // 2. GENERAR PÁGINAS DE CADA BESTIA
        bestias.forEach(bestia => {
            const hoja = document.createElement("div");
            hoja.className = "page hoja-pergamino";
            
            hoja.innerHTML = `
                <div class="encabezado-ficha">
                    <h2 class="titulo-bestia">${bestia.nombre}</h2>
                    <div class="subtitulo-bestia">${bestia.clase} — Alineamiento: ${bestia.alineamiento}</div>
                </div>

                <div class="contenedor-ilustracion">
                    <img src="${bestia.imagen}" alt="${bestia.nombre}" onerror="this.src='favicon.svg'">
                </div>

                <div class="grid-cajas">
                    <div class="caja-medieval">
                        <h4>Origen y Hábitat</h4>
                        <p><strong>Origen:</strong> ${bestia.origen}</p>
                        <p><strong>Hábitat:</strong> ${bestia.habitat}</p>
                    </div>

                    <div class="caja-medieval">
                        <h4>Descripción</h4>
                        <p>${bestia.descripcion}</p>
                    </div>

                    <div class="caja-medieval">
                        <h4>Comportamiento</h4>
                        <p>${bestia.comportamiento}</p>
                    </div>

                    ${bestia.hechizos && bestia.hechizos.length > 0 ? `
                        <div class="caja-medieval">
                            <h4>Hechizo: ${bestia.hechizos[0].nombre}</h4>
                            <p><strong>Efecto:</strong> ${bestia.hechizos[0].efecto}</p>
                        </div>
                    ` : ''}

                    <div class="caja-medieval">
                        <h4>Botín</h4>
                        <p><strong>Objeto:</strong> ${bestia.botin.item}</p>
                        <p><strong>Valor:</strong> ${bestia.botin.valor}</p>
                    </div>
                </div>
            `;
            contenedor.appendChild(hoja);
        });

        // 3. INICIALIZAR LIBRERÍA STPAGEFLIP
        const pageFlip = new St.PageFlip(contenedor, {
            width: 450,
            height: 600,
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,
            maxShadowOpacity: 0.5,
            showCover: true,
            mobileScrollSupport: false
        });

        pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    } catch (error) {
        console.error("Error al cargar el JSON del Bestiario:", error);
    }
}

function crearPortada() {
    const portada = document.createElement("div");
    portada.className = "page hoja-pergamino portada-estilo";
    portada.innerHTML = `
        <div style="text-align: center; padding-top: 80px;">
            <h1 style="font-family: 'Cinzel Decorative', serif; font-size: 2.5rem; color: #4a0e0e;">BESTIARIO DE TWITTER</h1>
            <p style="font-size: 1.2rem; margin-top: 20px;">Las Criaturas Viles de las Tierras Digitales</p>
            <p style="margin-top: 50px; font-weight: bold;">Dr. J.</p>
            <p style="font-size: 0.9rem; opacity: 0.8;">@Juanjo_de_akkad</p>
        </div>
    `;
    return portada;
}