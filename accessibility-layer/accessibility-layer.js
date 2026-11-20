
// pulsante di accessibilità
const accessibilityButton = document.createElement("button");

// caratteristiche del pulsante
accessibilityButton.id = "accessibility-button";
accessibilityButton.type = "button";
accessibilityButton.setAttribute("aria-label", "Apri il pannello di accessibilità");
accessibilityButton.setAttribute("aria-controls", "accessibility-panel");
accessibilityButton.setAttribute("aria-expanded", "false");

// icona
accessibilityButton.textContent = "!";

// pulsante subito dopo Salta al contenuto principale
const skipLink = document.querySelector(".skip-link");

if (skipLink) {
    skipLink.insertAdjacentElement("afterend", accessibilityButton);
} else {
    document.body.appendChild(accessibilityButton);
}
// Per la configurazione del sito ospitante

const accessibilityConfig = {
    contentSelector: "#main-content",
    glossaryPath: "accessibility-layer/data/glossary.json",
    summariesPath: "accessibility-layer/data/summaries.json"
};
// salva le preferenze

const accessibilityStorageKey = "accessibilityLayerPreferences";

let isRestoringPreferences = false;

function saveAccessibilityPreferences() {

    if (isRestoringPreferences) {
        return;
    }

    const preferences = {
        fontFamily: fontSelector.value,
        textSize: currentTextSize,
        lineSpacing: currentLineSpacing,
        textSpacing: textSpacingIsActive,
        contrast: contrastSelector.value
    };

    try {
        localStorage.setItem(
            accessibilityStorageKey,
            JSON.stringify(preferences)
        );
    } catch (error) {
        console.warn("Impossibile salvare le preferenze:", error);
    }

}

// Individua contenuto principale

const mainContent = document.querySelector(
    accessibilityConfig.contentSelector
);
if (mainContent) {
    mainContent.classList.add("accessibility-content");
}

//contenitore principale
const accessibilityPanel = document.createElement("div");

accessibilityPanel.id = "accessibility-panel";
accessibilityPanel.setAttribute("role", "region");
accessibilityPanel.setAttribute("aria-labelledby", "accessibility-panel-title");
accessibilityPanel.setAttribute("aria-hidden", "true");


//  titolo
const panelTitle = document.createElement("h2");
panelTitle.id = "accessibility-panel-title"
panelTitle.textContent = "Strumenti di accessibilità";

// tittolo nel pannello
accessibilityPanel.appendChild(panelTitle);

// PULSANTE PER CHIUDERE IL PANNELLO

const closePanelButton = document.createElement("button");
closePanelButton.type = "button";
closePanelButton.id = "close-accessibility-panel";
closePanelButton.textContent = "×";
closePanelButton.setAttribute("aria-label", "Chiudi il pannello di accessibilità");

accessibilityPanel.appendChild(closePanelButton);

// Chiusura del pannello
closePanelButton.addEventListener("click", function () {

    accessibilityPanel.setAttribute("aria-hidden", "true");
    accessibilityButton.setAttribute("aria-expanded", "false");

    accessibilityButton.focus();

});

// personalizza testo

const textSettings = document.createElement("section");
textSettings.id = "text-settings";

const textTitle = document.createElement("h3");
textTitle.textContent = "Personalizzazione del testo";

textSettings.appendChild(textTitle);

// selezione del carattere

const fontLabel = document.createElement("label");
fontLabel.htmlFor = "font-selector";
fontLabel.textContent = "Carattere tipografico";

const fontSelector = document.createElement("select");
fontSelector.id = "font-selector";

const fontOptions = [
    { value: "original", text: "Originale" },
    { value: "serif", text: "Serif" },
    { value: "sans-serif", text: "Sans serif" },
    { value: "atkinson", text: "Atkinson Hyperlegible" }
];

fontOptions.forEach(function (optionData) {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    fontSelector.appendChild(option);
});

// inserimento nel pannello
textSettings.appendChild(fontLabel);

textSettings.appendChild(fontSelector);

// funzione per modificare il carattere

function changeFontFamily(font) {

    // Rimuove le personalizzazioni precedenti
    mainContent.classList.remove(
        "font-serif",
        "font-sans-serif",
        "font-atkinson"
    );

    // Applica la nuova scelta
    if (font !== "original") {
        mainContent.classList.add("font-" + font);
    }
    saveAccessibilityPreferences();

}

// rileva scelta dell'utente
fontSelector.addEventListener("change", function () {

    changeFontFamily(fontSelector.value);

});

// dimensione testo progressiva

const textControls = document.createElement("div");
textControls.id = "text-controls";

const decreaseTextButton = document.createElement("button");
decreaseTextButton.type = "button";
decreaseTextButton.textContent = "−";
decreaseTextButton.setAttribute(
    "aria-label",
    "Diminuisci dimensione del testo"
);

const textSizeLabel = document.createElement("span");
textSizeLabel.id = "text-size-label";
textSizeLabel.textContent = "Normale";

const increaseTextButton = document.createElement("button");
increaseTextButton.type = "button";
increaseTextButton.textContent = "+";
increaseTextButton.setAttribute(
    "aria-label",
    "Aumenta dimensione del testo"
);

textControls.appendChild(decreaseTextButton);
textControls.appendChild(textSizeLabel);
textControls.appendChild(increaseTextButton);

textSettings.appendChild(textControls);

// interlinea progressiva

const lineSpacingTitle = document.createElement("h3");
lineSpacingTitle.textContent = "Spaziatura tra le righe";

const lineSpacingControls = document.createElement("div");
lineSpacingControls.id = "line-spacing-controls";

const decreaseSpacingButton = document.createElement("button");
decreaseSpacingButton.type = "button";
decreaseSpacingButton.textContent = "−";
decreaseSpacingButton.setAttribute(
    "aria-label",
    "Diminuisci interlinea"
);

const lineSpacingLabel = document.createElement("span");
lineSpacingLabel.id = "line-spacing-label";
lineSpacingLabel.textContent = "Normale";

const increaseSpacingButton = document.createElement("button");
increaseSpacingButton.type = "button";
increaseSpacingButton.textContent = "+";
increaseSpacingButton.setAttribute(
    "aria-label",
    "Aumenta interlinea"
);

lineSpacingControls.appendChild(decreaseSpacingButton);
lineSpacingControls.appendChild(lineSpacingLabel);
lineSpacingControls.appendChild(increaseSpacingButton);

textSettings.appendChild(lineSpacingTitle);
textSettings.appendChild(lineSpacingControls);

// spaziatura

const textSpacingTitle = document.createElement("h3");
textSpacingTitle.textContent = "Spaziatura del testo";

const textSpacingButton = document.createElement("button");
textSpacingButton.id = "text-spacing-button";
textSpacingButton.type = "button";
textSpacingButton.textContent = "Aumenta spaziatura";
textSpacingButton.setAttribute("aria-pressed", "false");

textSettings.appendChild(textSpacingTitle);
textSettings.appendChild(textSpacingButton);

// ripristino impostazioni

const resetSettingsButton = document.createElement("button");
resetSettingsButton.type = "button";
resetSettingsButton.id = "reset-settings-button";
resetSettingsButton.textContent = "Ripristina impostazioni";


// personalizzazione del testo nel pannello
accessibilityPanel.appendChild(textSettings);

// contrasto

const contrastSettings = document.createElement("section");
contrastSettings.id = "contrast-settings";

const contrastTitle = document.createElement("h3");
contrastTitle.textContent = "Contrasto";

const contrastLabel = document.createElement("label");
contrastLabel.htmlFor = "contrast-selector";
contrastLabel.textContent = "Modalità di contrasto";

const contrastSelector = document.createElement("select");
contrastSelector.id = "contrast-selector";

const contrastOptions = [
    { value: "original", text: "Originale" },
    { value: "high", text: "Contrasto elevato" },
    { value: "inverted", text: "Contrasto invertito" }
];

contrastOptions.forEach(function (optionData) {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    contrastSelector.appendChild(option);
});

contrastSettings.appendChild(contrastTitle);
contrastSettings.appendChild(contrastLabel);
contrastSettings.appendChild(contrastSelector);
contrastSettings.appendChild(resetSettingsButton);

accessibilityPanel.appendChild(contrastSettings);

// modificare contrasto
const contrastOriginalStyles = new Map();

function restoreContrastBackgrounds() {
    contrastOriginalStyles.forEach(function (original, element) {
        if (original.value) {
            element.style.setProperty(
                "background-color",
                original.value,
                original.priority
            );
        } else {
            element.style.removeProperty("background-color");
        }
    });

    contrastOriginalStyles.clear();
}

function applyContrastBackgrounds(mode) {
    if (!mainContent) return;

    const backgroundColor = mode === "high" ? "#FFFFFF" : "#000000";

    const elements = [mainContent, ...mainContent.querySelectorAll("*")];

    elements.forEach(function (element) {
        const computedStyle = window.getComputedStyle(element);

        // non modifica elementi con immagini 
        if (computedStyle.backgroundImage !== "none") return;

        const originalBackground = computedStyle.backgroundColor;

        // ignora gli sfondi trasparenti.
        if (
            !originalBackground ||
            originalBackground === "transparent" ||
            originalBackground === "rgba(0, 0, 0, 0)"
        ) {
            return;
        }

        // verifica trasparenza in formato rgba/rgb.
        const alphaMatch = originalBackground.match(
            /\/\s*([\d.]+)%?\s*\)|,\s*([\d.]+)\s*\)$/
        );

        if (alphaMatch) {
            const alpha = Number(alphaMatch[1] ?? alphaMatch[2]);
            if (alpha === 0) return;
        }

        contrastOriginalStyles.set(element, {
            value: element.style.getPropertyValue("background-color"),
            priority: element.style.getPropertyPriority("background-color")
        });

        element.style.setProperty(
            "background-color",
            backgroundColor,
            "important"
        );
    });
}

function changeContrastMode(mode) {
    document.body.classList.remove(
        "accessibility-contrast-high",
        "accessibility-contrast-inverted"
    );

    //  ripristinasempre gli sfondi originali
    restoreContrastBackgrounds();

    if (mode === "original" || !mainContent) {
    saveAccessibilityPreferences();
    return;
    }

    if (mode === "high") {
        document.body.classList.add("accessibility-contrast-high");
    } else if (mode === "inverted") {
        document.body.classList.add("accessibility-contrast-inverted");
    }

    applyContrastBackgrounds(mode);
    saveAccessibilityPreferences();
}

// rileva modalità selezionata

contrastSelector.addEventListener("change", function () {
    changeContrastMode(contrastSelector.value);
});

// registra elementi interlinea

let currentLineSpacing = "normal";

const originalLineHeights = new Map();

function registerLineSpacingElement(element) {

    if (originalLineHeights.has(element)) {
        return;
    }

    originalLineHeights.set(element, element.style.lineHeight);

    if (currentLineSpacing !== "normal") {
        element.style.lineHeight = currentLineSpacing;
    }

}

// registra elementi già presenti nella pagina

const adjustableTextSelector =
    "p, li, td, th, blockquote, figcaption, dd";
const lineSpacingElements = mainContent.querySelectorAll(
    adjustableTextSelector
);

lineSpacingElements.forEach(function (element) {
    registerLineSpacingElement(element);
});

let textSpacingIsActive = false;

// registra elementi spaziatura

const originalTextSpacing = new Map();

function registerTextSpacingElement(element) {

    if (originalTextSpacing.has(element)) {
        return;
    }

    originalTextSpacing.set(element, {
        letterSpacing: element.style.letterSpacing,
        wordSpacing: element.style.wordSpacing,
        marginBottom: element.tagName === "P"
            ? element.style.marginBottom
            : null
    });

    if (textSpacingIsActive) {
        element.style.letterSpacing = "0.12em";
        element.style.wordSpacing = "0.16em";

        if (element.tagName === "P") {
            element.style.marginBottom = "2em";
        }
    }

}

// registrazione degli elementi già presenti nella pagina

const textSpacingElements = mainContent.querySelectorAll(
    adjustableTextSelector
);

textSpacingElements.forEach(function (element) {
    registerTextSpacingElement(element);
});

// modificare spaziatura

function changeTextSpacing(isActive) {

    textSpacingIsActive = isActive;

    originalTextSpacing.forEach(function (original, element) {

        if (isActive) {

            element.style.letterSpacing = "0.12em";
            element.style.wordSpacing = "0.16em";

        if (element.tagName === "P") {
            element.style.marginBottom = "2em";
    
            }

        } else {

            element.style.letterSpacing = original.letterSpacing;
            element.style.wordSpacing = original.wordSpacing;

        if (element.tagName === "P") {
        element.style.marginBottom = original.marginBottom;
    }

}

    });

    textSpacingButton.setAttribute(
        "aria-pressed",
        String(isActive)
    );

    textSpacingButton.textContent = isActive
        ? "Ripristina spaziatura"
        : "Aumenta spaziatura";

    saveAccessibilityPreferences();

}

// pulsante spaziatura

textSpacingButton.addEventListener("click", function () {

    changeTextSpacing(!textSpacingIsActive);

});



// modifica interlinea


function changeLineSpacing(spacing) {

    currentLineSpacing = spacing;

    // modifica interlinea di tutti gli elementi registrati
    originalLineHeights.forEach(function (originalLineHeight, element) {

        if (spacing === "normal") {
        element.style.lineHeight = originalLineHeight;
        } else {
        element.style.lineHeight = spacing;
        }

});
    // modifica anche le definizioni del glossrio
    const glossaryDefinitions = mainContent.querySelectorAll(
        ".glossary-definition"
    );

    glossaryDefinitions.forEach(function (definition) {

        definition.style.lineHeight =
            spacing === "normal" ? "1.5" : spacing;

    });
    saveAccessibilityPreferences();

}
// aggiornamento controlli interlinea

function updateLineSpacingControls() {

    if (currentLineSpacing === "normal") {
        lineSpacingLabel.textContent = "Normale";
    } else if (currentLineSpacing === "1.9") {
        lineSpacingLabel.textContent = "Ampia";
    } else {
        lineSpacingLabel.textContent = "Molto ampia";
    }

    decreaseSpacingButton.disabled =
        currentLineSpacing === "normal";

    increaseSpacingButton.disabled =
        currentLineSpacing === "2.2";

}

// eventi pulsanti interlinea

increaseSpacingButton.addEventListener("click", function () {

    if (currentLineSpacing === "normal") {
        changeLineSpacing("1.9");
    } else {
        changeLineSpacing("2.2");
    }

    updateLineSpacingControls();

});

decreaseSpacingButton.addEventListener("click", function () {

    if (currentLineSpacing === "2.2") {
        changeLineSpacing("1.9");
    } else {
        changeLineSpacing("normal");
    }

    updateLineSpacingControls();

});

// stato iniziale dei controlli
updateLineSpacingControls();

// ripristino personalizzazione

resetSettingsButton.addEventListener("click", function () {

    // ripristina la dimensione del testo
    changeTextSize(1);
    updateTextSizeControls();

    // ripristina l'interlinea
    changeLineSpacing("normal");
    updateLineSpacingControls();

    //ripristina la spaziatura
    changeTextSpacing(false);
    
    // ripristina il carattere originale
    fontSelector.value = "original";
    changeFontFamily("original");

    // Ripristina il contrasto originale
    contrastSelector.value = "original";
    changeContrastMode("original");

});



 // GLOSSARIO 

const glossarySection = document.createElement("section");
glossarySection.id = "glossary-section";

const glossaryTitle = document.createElement("h3");
glossaryTitle.textContent = "Glossario";

const showGlossaryButton = document.createElement("button");
showGlossaryButton.type = "button";
showGlossaryButton.textContent = "Visualizza glossario";
showGlossaryButton.setAttribute("aria-expanded", "false");

const glossaryList = document.createElement("div");
glossaryList.id = "glossary-list";
glossaryList.hidden = true;

glossarySection.appendChild(glossaryTitle);
glossarySection.appendChild(showGlossaryButton);
glossarySection.appendChild(glossaryList);

accessibilityPanel.appendChild(glossarySection);

// RIASSUNTI

const summariesSection = document.createElement("section");
summariesSection.id = "summaries-section";

const summariesTitle = document.createElement("h3");
summariesTitle.textContent = "Riassunti";

const toggleSummariesButton = document.createElement("button");
toggleSummariesButton.type = "button";
toggleSummariesButton.textContent = "Attiva riassunti";
toggleSummariesButton.setAttribute("aria-pressed", "false");

summariesSection.appendChild(summariesTitle);
summariesSection.appendChild(toggleSummariesButton);

accessibilityPanel.appendChild(summariesSection);

// STATO DEI RIASSUNTI

let summariesData = [];
let summariesAreActive = false;

// riconoscimento pagina corrente

const currentPage = window.location.pathname.endsWith("/")
    ? "index"
    : window.location.pathname.split("/").pop().replace(/\.html$/, "");


// caricamento riassunti 

fetch(accessibilityConfig.summariesPath)
    .then(function (response) {

        if (!response.ok) {
            throw new Error("Impossibile caricare i riassunti");
        }

        return response.json();

    })
    .then(function (data) {

        summariesData = data.summaries;

        console.log("Riassunti caricati:", summariesData);

        if (summariesAreActive) {
            displaySummaries();
        }

    })
    .catch(function (error) {

        console.error("Errore nel caricamento dei riassunti:", error);

    });


// visualizzazione riassunti 

function displaySummaries() {

    // rimuove riassunti già presenti e cancella i riferimenti dalle Map
    mainContent.querySelectorAll(".summary-accordion").forEach(function (item) {

        item.querySelectorAll("h3, p").forEach(function (element) {
            originalFontSizes.delete(element);
            originalLineHeights.delete(element);
            originalTextSpacing.delete(element);
        });

        item.remove();

    });

    // seleziona riassunti della pagina corrente
    const pageSummaries = summariesData.filter(function (item) {
        return item.page === currentPage;
    });

    pageSummaries.forEach(function (item, index) {

        // individua la sezione a cui associare il riassunto
        const targetSection = item.section === "placeholder"
            ? mainContent
            : document.getElementById(item.section);

        if (!targetSection || !mainContent.contains(targetSection)) {
            return;
        }

        // contenitore del riassunto
        const summaryContainer = document.createElement("div");
        summaryContainer.classList.add("summary-accordion");

        // pulsante di apertura
        const summaryButton = document.createElement("button");
        summaryButton.type = "button";
        summaryButton.classList.add("summary-toggle");
        summaryButton.textContent = "Mostra riassunto";

        summaryButton.id = "summary-button-" + index;

        // contenuto del riassunto
        const summaryContent = document.createElement("div");
        summaryContent.classList.add("summary-content");
        summaryContent.id = "summary-content-" + index;
        summaryContent.hidden = true;
        summaryContent.setAttribute("role", "region");
        summaryContent.setAttribute("aria-labelledby", summaryButton.id);

        const summaryTitle = document.createElement("h3");
        summaryTitle.textContent = item.title;

        const summaryText = document.createElement("p");
        summaryText.textContent = item.content;
        

        summaryContent.appendChild(summaryTitle);
        summaryContent.appendChild(summaryText);

        summaryButton.setAttribute("aria-expanded", "false");
        summaryButton.setAttribute("aria-controls", summaryContent.id);

        // apertura e chiusura dell'accordion
        summaryButton.addEventListener("click", function () {

            const isOpen = !summaryContent.hidden;

            summaryContent.hidden = isOpen;

            summaryButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            summaryButton.textContent = isOpen
                ? "Mostra riassunto"
                : "Nascondi riassunto";

        });

        summaryContainer.appendChild(summaryButton);
        summaryContainer.appendChild(summaryContent);

        // riassunto dopo il contenuto originale
        targetSection.appendChild(summaryContainer);

        // Registra testi riassunto per personalizzazioni

    const summaryTextElements = summaryContainer.querySelectorAll("h3, p");

    summaryTextElements.forEach(function (element) {

    const originalSize = window.getComputedStyle(element).fontSize;

    originalFontSizes.set(element, {
        size: parseFloat(originalSize),
        inlineSize: element.style.fontSize
    });

    if (currentTextSize !== 1) {
        element.style.fontSize =
            (parseFloat(originalSize) * currentTextSize) + "px";
    }

});

    // registra i paragrafi per la personalizzazione dell'interlinea

    const summaryParagraphs = summaryContainer.querySelectorAll("p");

    summaryParagraphs.forEach(function (element) {

    originalLineHeights.set(element, element.style.lineHeight);

    if (currentLineSpacing !== "normal") {
        element.style.lineHeight = currentLineSpacing;
    }

});

    // registra gli elementi per la personalizzazione della spaziatura

    summaryTextElements.forEach(function (element) {
    registerTextSpacingElement(element);
});

    });

}


// attiva e disattiva riassunti

toggleSummariesButton.addEventListener("click", function () {

    summariesAreActive = !summariesAreActive;

    toggleSummariesButton.setAttribute(
        "aria-pressed",
        String(summariesAreActive)
    );

    toggleSummariesButton.textContent = summariesAreActive
        ? "Disattiva riassunti"
        : "Attiva riassunti";

    if (summariesAreActive) {

        displaySummaries();

    } else {

    mainContent.querySelectorAll(".summary-accordion").forEach(function (item) {

        item.querySelectorAll("h3, p").forEach(function (element) {
            originalFontSizes.delete(element);
            originalLineHeights.delete(element);
            originalTextSpacing.delete(element);
        });

        item.remove();

    });

}

});


// termine del glossario

function displayGlossary() {

    glossaryList.innerHTML = "";

    glossaryData.forEach(function (item) {

        const glossaryEntry = document.createElement("article");
        glossaryEntry.classList.add("glossary-entry");

        const termTitle = document.createElement("h4");
        termTitle.textContent = item.term;

        const termDefinition = document.createElement("p");
        termDefinition.textContent = item.definition;

        glossaryEntry.appendChild(termTitle);
        glossaryEntry.appendChild(termDefinition);

        glossaryList.appendChild(glossaryEntry);

    });

}

// apri e chiudi glossario

showGlossaryButton.addEventListener("click", function () {

    const isHidden = glossaryList.hidden;

    if (isHidden) {
        displayGlossary();
        glossaryList.hidden = false;
        showGlossaryButton.setAttribute("aria-expanded", "true");
    } else {
        glossaryList.hidden = true;
        showGlossaryButton.setAttribute("aria-expanded", "false");
    }

});

// attivare il glossario nel testo
const activateGlossaryButton = document.createElement("button");
activateGlossaryButton.type = "button";
activateGlossaryButton.textContent = "Attiva glossario";
activateGlossaryButton.setAttribute("aria-pressed", "false");

// STATO DEL GLOSSARIO 

let glossaryIsActive = false;

// inserimento nel pannello
glossarySection.appendChild(activateGlossaryButton);

// attivazione e disattivazione del glossario

activateGlossaryButton.addEventListener("click", function () {

    glossaryIsActive = !glossaryIsActive;

    activateGlossaryButton.setAttribute(
        "aria-pressed",
        String(glossaryIsActive)
    );

    activateGlossaryButton.textContent = glossaryIsActive
        ? "Disattiva glossario"
        : "Attiva glossario";

    if (glossaryIsActive) {

        // attiva le evidenziazioni
        highlightGlossaryTerms();

    } else {

        // chiude definizione aperta
        if (activeGlossaryDefinition !== null) {
            activeGlossaryDefinition.definition.hidden = true;
            activeGlossaryDefinition.button.setAttribute(
                "aria-expanded",
                "false"
            );
            activeGlossaryDefinition = null;
        }

        // rimuove evidenziazioni e ripristina testo
        const glossaryContainers = mainContent.querySelectorAll(
            ".glossary-popover-container"
        );

        glossaryContainers.forEach(function (container) {

            const termButton = container.querySelector(".glossary-term");

            if (termButton) {
                container.replaceWith(
                    document.createTextNode(termButton.textContent)
                );
            }

        });

    }

});

// ELEMENTI DELLA PAGINA DA PERSONALIZZARE


const textElements = mainContent.querySelectorAll(
    "p, h1, h2, h3, h4, li, td, th, blockquote, figcaption, dt, dd, .eyebrow, .hero-description, .card-category, .author-dates, .author-subtitle, .work-subtitle, .breadcrumb"
);

// salva dimensioni originali
const originalFontSizes = new Map();

textElements.forEach(function (element) {

    const originalSize = window.getComputedStyle(element).fontSize;

    originalFontSizes.set(element, {
        size: parseFloat(originalSize),
        inlineSize: element.style.fontSize
    });

});


// MODIFICARE LA DIMENSIONE DEL TESTO

let currentTextSize = 1;

function changeTextSize(scale) {

    currentTextSize = Math.max(1, Math.min(1.30, Number(scale.toFixed(2))));

    originalFontSizes.forEach(function (original, element) {

        if (currentTextSize === 1) {
            element.style.fontSize = original.inlineSize;
        } else {
            element.style.fontSize =
                (original.size * currentTextSize) + "px";
        }

    });
    saveAccessibilityPreferences();

}

//PULSANTI DIMENSIONE
function updateTextSizeControls() {
    if (currentTextSize <= 1) {
        textSizeLabel.textContent = "Normale";
    } else if (currentTextSize >= 1.30) {
        textSizeLabel.textContent = "Molto grande";
    } else {
        textSizeLabel.textContent = "Grande";
    }

    decreaseTextButton.disabled = currentTextSize <= 1;
    increaseTextButton.disabled = currentTextSize >= 1.30;
}

// EVENTI DEI PULSANTI

increaseTextButton.addEventListener("click", function () {
    changeTextSize(currentTextSize + 0.15);
    updateTextSizeControls();
});

decreaseTextButton.addEventListener("click", function () {
    changeTextSize(currentTextSize - 0.15);
    updateTextSizeControls();
});

// INDICE DEI CONTENUTI

// contenitore dell'indice
const accessibilityNavigation = document.createElement("nav");
accessibilityNavigation.id = "accessibility-index";
accessibilityNavigation.setAttribute("aria-label", "Indice dei contenuti");

// contenitore espandibile
const indexDisclosure = document.createElement("details");
indexDisclosure.id = "accessibility-index-disclosure";

// titolo per aprire e chiudere l'indice
const indexTitle = document.createElement("summary");
indexTitle.textContent = "Indice dei contenuti";

// lista con i collegamenti
const indexList = document.createElement("ul");

// Inserimento degli elementi
indexDisclosure.appendChild(indexTitle);
indexDisclosure.appendChild(indexList);
accessibilityNavigation.appendChild(indexDisclosure);
accessibilityPanel.appendChild(accessibilityNavigation);


// trova i titoli presenti nella pagina
const headings = document.querySelectorAll("h1, h2, h3");

let headingCounter = 0;

// crea collegamenti dei collegamenti
headings.forEach(function (heading) {

    // no titoli nei pannelli
    if (accessibilityPanel.contains(heading)) {
        return;
    }

    headingCounter++;

    // se il titolo non ha un ID, ne viene generato uno
    if (!heading.id) {
        let generatedId = "accessibility-heading-" + headingCounter;
        let suffix = 1;

        // Evita di assegnare un ID già utilizzato nella pagina
        while (document.getElementById(generatedId)) {
            generatedId = "accessibility-heading-" + headingCounter + "-" + suffix;
            suffix++;
        }

        heading.id = generatedId;
    }

    // creazione del collegamento
    const indexItem = document.createElement("li");
    const indexLink = document.createElement("a");

    indexLink.href = "#" + heading.id;
    indexLink.textContent = heading.textContent.trim();

    // classe distingue livelli dei titoli
    indexItem.classList.add("accessibility-" + heading.tagName.toLowerCase());

    indexItem.appendChild(indexLink);
    indexList.appendChild(indexItem);

});


// messaggio nel caso in cui la pagina non contenga titoli
if (headingCounter === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Non sono presenti titoli da mostrare nell'indice.";
    indexDisclosure.appendChild(emptyMessage);
}



// pannello nella pagina
document.body.appendChild(accessibilityPanel);


// APERTURA E CHIUSURA DEL PANNELLO

accessibilityButton.addEventListener("click", function () {

    const isOpen = accessibilityPanel.getAttribute("aria-hidden") === "false";

    if (isOpen) {

        accessibilityPanel.setAttribute("aria-hidden", "true");
        accessibilityButton.setAttribute("aria-expanded", "false");

    } else {

        // chiude definizione aperta
        if (activeGlossaryDefinition !== null) {

            activeGlossaryDefinition.definition.hidden = true;

            activeGlossaryDefinition.button.setAttribute(
                "aria-expanded",
                "false"
            );

            activeGlossaryDefinition = null;

        }

        accessibilityPanel.setAttribute("aria-hidden", "false");
        accessibilityButton.setAttribute("aria-expanded", "true");
        closePanelButton.focus();

    }

});
// CHIUSURA DEL PANNELLO CON IL TASTO ESC

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        accessibilityPanel.getAttribute("aria-hidden") === "false"
    ) {

        accessibilityPanel.setAttribute("aria-hidden", "true");
        accessibilityButton.setAttribute("aria-expanded", "false");

        accessibilityButton.focus();

    }

});

// GLOSSARIO

let glossaryData = [];

// tiene traccia della definizione attualmente aperta

let activeGlossaryDefinition = null;

// chiama il file JSON

fetch(accessibilityConfig.glossaryPath)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Impossibile caricare il glossario");
        }

        return response.json();
    })
    .then(function (data) {

        glossaryData = data.terms;

        console.log("Glossario caricato:", glossaryData);

        if (glossaryIsActive) {
        highlightGlossaryTerms();
}
    })

   

    .catch(function (error) {

        console.error("Errore nel caricamento del glossario:", error);

    });


// RICONOSCIMENTO DEI TERMINI DEL GLOSSARIO

function highlightGlossaryTerms() {


    if (!mainContent) {
        return;
    }

    // vede solo paragrafi principale
const paragraphs = mainContent.querySelectorAll("p");

const textNodes = [];

paragraphs.forEach(function (paragraph) {

    const walker = document.createTreeWalker(
        paragraph,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {

                // no testo dei link
                if (node.parentElement.closest("a")) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;

            }
        }
    );

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

});

 if (terms.length === 0) {
        return;
    }
// esamina ogni nodo di testo
let definitionCounter = 0;

const terms = glossaryData
        .map(function (item) {
            return item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        })
        .sort(function (a, b) {
            return b.length - a.length;
        });

textNodes.forEach(function (node) {

    const text = node.textContent;

    
    const regex = new RegExp(terms.join("|"), "gi");

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {

        fragment.appendChild(
            document.createTextNode(
                text.slice(lastIndex, match.index)
            )
        );

        const matchedTerm = match[0];

        const glossaryItem = glossaryData.find(function (item) {
            return item.term.toLowerCase() === matchedTerm.toLowerCase();
        });

        // contenitore termine e definizione
        const glossaryContainer = document.createElement("span");
        glossaryContainer.classList.add("glossary-popover-container");

        // pulsante del termine
        const termButton = document.createElement("button");
        termButton.type = "button";
        termButton.classList.add("glossary-term");
        termButton.textContent = matchedTerm;
        termButton.id = "glossary-term-" + (++definitionCounter);

        // scheda con la definizione
        const definition = document.createElement("div");
        definition.classList.add("glossary-definition");
        definition.id = "glossary-definition-" + definitionCounter;
        definition.textContent = glossaryItem.definition;
        definition.hidden = true;
        definition.setAttribute("role", "region");
        definition.setAttribute("aria-labelledby", termButton.id);

        termButton.setAttribute("aria-expanded", "false");
        termButton.setAttribute("aria-controls", definition.id);

    
// apertura e chiusura della definizione
function toggleDefinition() {

    // se la definizione è già aperta --> la chiude
    if (!definition.hidden) {
        definition.hidden = true;
        termButton.setAttribute("aria-expanded", "false");
        activeGlossaryDefinition = null;
        return;
    }

    // se il pannello è aperto --> chiude
    const panelIsOpen =
        accessibilityPanel.getAttribute("aria-hidden") === "false";

    if (panelIsOpen) {
        accessibilityPanel.setAttribute("aria-hidden", "true");
        accessibilityButton.setAttribute("aria-expanded", "false");
    }

    // chiude un'eventuale altra definizione aperta
    if (activeGlossaryDefinition !== null) {
        activeGlossaryDefinition.definition.hidden = true;
        activeGlossaryDefinition.button.setAttribute("aria-expanded", "false");
    }

    // apre la definizione selezionata
    definition.hidden = false;

    definition.style.lineHeight =
        currentLineSpacing === "normal"
            ? "1.5"
            : currentLineSpacing;

    termButton.setAttribute("aria-expanded", "true");

    activeGlossaryDefinition = {
        definition: definition,
        button: termButton
    };

// mantiene la definizione entro i bordi orizzontali dello schermo

definition.style.left = "0px";
definition.style.right = "auto";

const buttonRect = termButton.getBoundingClientRect();
const containerRect = termButton.parentElement.getBoundingClientRect();
const definitionRect = definition.getBoundingClientRect();

const margin = 16;
const viewportWidth = document.documentElement.clientWidth;

// calcola la posizione desiderata rispetto allo schermo
let desiredLeft = buttonRect.left;

// evita che la definizione esca dal bordo destro
desiredLeft = Math.min(
    desiredLeft,
    viewportWidth - margin - definitionRect.width
);

// evita che esca dal bordo sinistro
desiredLeft = Math.max(margin, desiredLeft);

// converte la posizione in coordinate relative al contenitore
definition.style.left =
    (desiredLeft - containerRect.left) + "px";
}

        termButton.addEventListener("click", toggleDefinition);

        // chiusura con il tasto esc
        termButton.addEventListener("keydown", function (event) {

            if (event.key === "Escape" && !definition.hidden) {
                event.preventDefault();
                definition.hidden = true;
                termButton.setAttribute("aria-expanded", "false");
            }

        });

        glossaryContainer.appendChild(termButton);
        glossaryContainer.appendChild(definition);

        fragment.appendChild(glossaryContainer);

        lastIndex = match.index + matchedTerm.length;
    }

    fragment.appendChild(
        document.createTextNode(text.slice(lastIndex))
    );

    if (lastIndex > 0) {
        node.parentNode.replaceChild(fragment, node);
    }

});

} //questa chiude highlight glossary term

// CARICAMENTO DELLE PREFERENZE DI ACCESSIBILITÀ

function loadAccessibilityPreferences() {
    let preferences;

    try {
        const savedPreferences = localStorage.getItem(accessibilityStorageKey);

        if (!savedPreferences) {
            return;
        }

        preferences = JSON.parse(savedPreferences);

    } catch (error) {
        console.warn("Impossibile caricare le preferenze:", error);
        return;
    }

    isRestoringPreferences = true;

    try {

        // RIPRISTINO DEL TIPO DI CARATTERE

            if (
                ["original", "serif", "sans-serif", "atkinson"].includes(
                    preferences.fontFamily
                )
        ) {
        fontSelector.value = preferences.fontFamily;
        changeFontFamily(preferences.fontFamily);
    }
    // RIPRISTINO DELLA DIMENSIONE DEL TESTO

    const savedTextSize = Number(preferences.textSize);

    if ([1, 1.15, 1.3].includes(savedTextSize)) {
    changeTextSize(savedTextSize);
    updateTextSizeControls();
    }
    // RIPRISTINO DELL'INTERLINEA

    if (["normal", "1.9", "2.2"].includes(preferences.lineSpacing)) {
        changeLineSpacing(preferences.lineSpacing);
        updateLineSpacingControls();
    }
    // RIPRISTINO DELLA SPAZIATURA DEL TESTO

    changeTextSpacing(preferences.textSpacing === true);

    // RIPRISTINO DEL CONTRASTO

    if (["original", "high", "inverted"].includes(preferences.contrast)) {
    contrastSelector.value = preferences.contrast;
    changeContrastMode(preferences.contrast);
    }
        } finally {
            isRestoringPreferences = false;
        }
    }
    // ESECUZIONE DEL RIPRISTINO DELLE PREFERENZE

    loadAccessibilityPreferences();

