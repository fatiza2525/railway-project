// app-init.js

/* ================== NAVIGATION ================== */

function hideAllSections() {
  const sections = document.querySelectorAll("#content section");
  sections.forEach(sec => {
    sec.style.display = "none";
  });
}

function showSection(sectionId) {
  hideAllSections();
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = "block";
  }
}

function initSidebarNavigation() {
  const links = document.querySelectorAll("#sidebar nav a[data-section]");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      window.location.hash = sectionId;
      showSection(sectionId);
    });
  });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.substring(1) || "welcome";
    showSection(id);
  });
}

/* ============ OUTIL GÉNÉRIQUE LISTE + DELETE ============ */

function initListeGenerique(config) {
  const { btnId, tableBodySelector, url, idField, colonnes } = config;

  const btn = document.getElementById(btnId);
  const tbody = document.querySelector(tableBodySelector);

  if (!btn || !tbody) return;

  async function charger() {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        alert("Erreur lors du chargement : " + url);
        return;
      }
      const data = await resp.json();
      tbody.innerHTML = "";

      data.forEach(item => {
        const tr = document.createElement("tr");

        // colonnes données
        colonnes.forEach(c => {
          const td = document.createElement("td");
          td.textContent = item[c] ?? "";
          tr.appendChild(td);
        });

        // colonne actions
        const tdAction = document.createElement("td");
        const bDel = document.createElement("button");
        bDel.textContent = "Supprimer";
        bDel.className = "btn-supprimer";
        bDel.dataset.id = item[idField];
        tdAction.appendChild(bDel);
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
      });

      // click sur Supprimer
      const buttons = tbody.querySelectorAll(".btn-supprimer");
      buttons.forEach(b => {
        b.addEventListener("click", async () => {
          const id = b.dataset.id;
          if (!confirm("Supprimer l'enregistrement " + id + " ?")) return;

          try {
            const r = await fetch(url + "/" + id, { method: "DELETE" });
            if (r.status !== 204) {
              alert("Erreur lors de la suppression (" + url + ")");
              return;
            }
            charger();
          } catch (e) {
            console.error(e);
            alert("Erreur réseau lors de la suppression");
          }
        });
      });

    } catch (e) {
      console.error(e);
      alert("Erreur réseau lors du chargement (" + url + ")");
    }
  }

  btn.addEventListener("click", charger);
}

/* ================== INIT LISTES ================== */

function initToutesLesListes() {

  // SITE
  initListeGenerique({
    btnId: "btn-charger-sites",
    tableBodySelector: "#table-sites tbody",
    url: "http://localhost:3000/api/sites",
    idField: "id_site",
    colonnes: ["id_site", "nom_site", "type_site", "ville"]
  });

  // DEPOT
  initListeGenerique({
    btnId: "btn-charger-depots",
    tableBodySelector: "#table-depots tbody",
    url: "http://localhost:3000/api/depots",
    idField: "id_depot",
    colonnes: ["id_depot", "nom_depot", "id_site"]
  });

  // WAGON
  initListeGenerique({
    btnId: "btn-charger-wagons",
    tableBodySelector: "#table-wagons tbody",
    url: "http://localhost:3000/api/wagons",
    idField: "id_wagon",
    colonnes: ["id_wagon", "capacite", "statut", "type"]
  });

  // CONDUCTEUR
  initListeGenerique({
    btnId: "btn-charger-conducteurs",
    tableBodySelector: "#table-conducteurs tbody",
    url: "http://localhost:3000/api/conducteurs",
    idField: "id_conducteur",
    colonnes: ["id_conducteur", "nom", "prenom", "telephone"]
  });

  // TRAJET
  initListeGenerique({
    btnId: "btn-charger-trajets",
    tableBodySelector: "#table-trajets tbody",
    url: "http://localhost:3000/api/trajets",
    idField: "id_trajet",
    colonnes: [
      "id_trajet",
      "date_depart",
      "date_arrivee",
      "distance",
      "id_site_depart",
      "id_site_arrivee"
    ]
  });

  // INCIDENT
  initListeGenerique({
    btnId: "btn-charger-incidents",
    tableBodySelector: "#table-incidents tbody",
    url: "http://localhost:3000/api/incidents",
    idField: "id_incident",
    colonnes: ["id_incident", "date_incident", "gravite", "statut", "id_wagon"]
  });

  // ALERTE
  initListeGenerique({
    btnId: "btn-charger-alertes",
    tableBodySelector: "#table-alertes tbody",
    url: "http://localhost:3000/api/alertes",
    idField: "id_alerte",
    colonnes: ["id_alerte", "date_alerte", "id_incident"]
  });
}

/* ================== DOM READY ================== */

document.addEventListener("DOMContentLoaded", () => {
  const id = window.location.hash.substring(1) || "welcome";
  showSection(id);
  initSidebarNavigation();
  initToutesLesListes();
});
