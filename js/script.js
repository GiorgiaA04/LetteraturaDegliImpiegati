// Accordion
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const symbol = btn.querySelector("span");

    if (content.style.display === "block") {
      content.style.display = "none";
      symbol.textContent = "+";
    } else {
      content.style.display = "block";
      symbol.textContent = "−";
    }
  });
});

// Torna su
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll('.theme-bubble').forEach(span => {
    span.addEventListener('click', () => {
        const themeId = 'modal-' + span.dataset.theme;
        const modal = document.getElementById(themeId);
        modal.style.display = 'block';
    });
});

//modali
document.querySelectorAll('.theme-bubble').forEach(span => {
    span.addEventListener('click', () => {
        const themeId = 'modal-' + span.dataset.theme;
        const modal = document.getElementById(themeId);
        if(modal) modal.style.display = 'block';
    });
});

document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', e => {
    if(e.target.classList.contains('modal')){
        e.target.style.display = 'none';
    }
});


// Searchbar temi


const searchInput = document.getElementById("textSearch");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("searchResults");

// Lista dei testi e link
const testi = [
  { titolo: "Gli impiegati - Honorè de Balzac", autore: "Honoré de Balzac", anno: 1844, link: "Balzac.html" },
  { titolo: "Bartleby lo scrivano - Herman Melville", autore: "Herman Melville", anno: 1853, link: "Melville.html" },
  { titolo: "La morte dell'impiegato - Anton Cechov", autore: "Anton Čechov", anno: 1883, link: "Cechov.html" },
  { titolo: "Regi impiegati - Emilio - De Marchi", autore: "Emilio De Marchi", anno: 1892, link: "DeMarchi.html" },
  { titolo: "Rivalsa in Gente di Dublino- James Joyce", autore: "James Joyce", anno: 1914, link: "Dubliners.html" },
  { titolo: "Gino Bianchi - Piero Jahier", autore: "Piero Jahier", anno: 1915, link: "GinoBianchi.html" },
  { titolo: "Il processo - Franz Kafka", autore: "Franz Kafka", anno: 1925, link: "Processo.html" },
  { titolo: "Il castello - Franz Kafka", autore: "Franz Kafka", anno: 1926, link: "Castello.html" },
  { titolo: "1984 - George Orwell", autore: "George Orwell", anno: 1949, link: "1984.html" }
];

// Stato iniziale
resultsContainer.innerHTML = "";

// Funzione per mostrare i risultati
function showSearchResults(query) {
    resultsContainer.innerHTML = "";

    // input vuoto 
    if (!query.trim()) {
        return;
    }

    const filtered = testi.filter(item =>
        item.titolo.toLowerCase().includes(query.toLowerCase())
    );

    // nessun risultato
    if (filtered.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "Nessun risultato trovato.";
        msg.classList.add("no-results");
        resultsContainer.appendChild(msg);
        return;
    }

    // risultati trovati
    const ul = document.createElement("ul");
    ul.classList.add("search-list");

    filtered.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.titolo;
        li.appendChild(a);
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}

// Ricerca 
searchInput.addEventListener("input", function () {
    showSearchResults(searchInput.value);
});


if (searchBtn) {
    searchBtn.addEventListener("click", function () {
        showSearchResults(searchInput.value);
    });
}
//Sort testi
const row = document.querySelector("main .row.g-4"); // seleziona solo la row dentro main
const sortButtons = document.querySelectorAll(".sort-btn");
let currentSort = ""; // bottone attivo

function sortCards(criteria) {
  const cols = Array.from(row.querySelectorAll(".col-12.col-sm-6.col-md-4"));

  //  reset
  if (currentSort === criteria) {
    resetCardOrder();
    currentSort = ""; //  azzera lo stato
    updateActiveButton();
    return;
  }

  // Ordina
  cols.sort((a, b) => {
    let aVal = a.querySelector(".catalog-card").dataset[criteria];
    let bVal = b.querySelector(".catalog-card").dataset[criteria];

    
    if (criteria === "anno") {
      aVal = parseInt(aVal);
      bVal = parseInt(bVal);
    } else {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });

    // ordine CSS
  cols.forEach((col, i) => col.style.order = i);

  currentSort = criteria;
  updateActiveButton();
}


// reset 
function resetCardOrder() {
  const cols = Array.from(row.querySelectorAll(".col-12.col-sm-6.col-md-4"));
  cols.sort((a, b) => parseInt(a.querySelector(".catalog-card").dataset.originalOrder));
  cols.forEach((col, i) => col.style.order = i);
}


function updateActiveButton() {
  sortButtons.forEach(btn => {
    if (currentSort && btn.dataset.sort === currentSort) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}


sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sortCards(btn.dataset.sort);
  });
});




/// Funzione per ordinare la tabella in dati.html
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("catalogo");
    switching = true;
    dir = "asc"; 
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) { // parte dal secondo elemento
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // confronto
            if (dir == "asc") {
                if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
