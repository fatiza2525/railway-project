console.log("Chargement de server.js");

const express = require('express');
const mysql   = require('mysql2');

const app  = express();
const port = 3000;

// ------------- Connexion MySQL -------------
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',     // adapte selon ton MySQL
  password: 'fati.2005', // adapte selon ton MySQL
  database: 'railway_db'
});

// Pour lire les données des formulaires (POST x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Pour servir index.html, style.css, app-init.js depuis /public
app.use(express.static('public'));

// Route de test
app.get('/ping', (req, res) => {
  res.send('Backend Node OK');
});

/* ============= ROUTES API ============= */
/* ************* SITE ************* */

// INSERT SITE
app.post('/api/sites', (req, res) => {
  const { nom_site, type_site, ville } = req.body;

  if (!nom_site || !type_site || !ville) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = 'INSERT INTO site (nom_site, type_site, ville) VALUES (?, ?, ?)';
  db.query(sql, [nom_site, type_site, ville], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion du site");
    }
    res.redirect('/#welcome');
  });
});

// LISTE SITES
app.get('/api/sites', (req, res) => {
  const sql = 'SELECT * FROM site';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des sites");
    }
    res.json(rows);
  });
});

// DELETE SITE
app.delete('/api/sites/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM site WHERE id_site = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du site");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Site introuvable");
    }
    res.status(204).send();
  });
});

/* ************* DEPOT ************* */

// INSERT DEPOT
app.post('/api/depots', (req, res) => {
  const { nom_depot, id_site } = req.body;

  if (!nom_depot || !id_site) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = 'INSERT INTO depot (nom_depot, id_site) VALUES (?, ?)';
  db.query(sql, [nom_depot, id_site], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion du dépôt");
    }
    res.redirect('/#welcome');
  });
});

// LISTE DEPOTS
app.get('/api/depots', (req, res) => {
  const sql = 'SELECT * FROM depot';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des dépôts");
    }
    res.json(rows);
  });
});

// DELETE DEPOT
app.delete('/api/depots/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM depot WHERE id_depot = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du dépôt");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Dépôt introuvable");
    }
    res.status(204).send();
  });
});

/* ************* WAGON ************* */

// INSERT WAGON
app.post('/api/wagons', (req, res) => {
  const { capacite, statut, type } = req.body;

  if (!capacite || !statut || !type) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = 'INSERT INTO wagon (capacite, statut, type) VALUES (?, ?, ?)';
  db.query(sql, [capacite, statut, type], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion du wagon");
    }
    res.redirect('/#welcome');
  });
});

// LISTE WAGONS
app.get('/api/wagons', (req, res) => {
  const sql = 'SELECT * FROM wagon';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des wagons");
    }
    res.json(rows);
  });
});

// DELETE WAGON
app.delete('/api/wagons/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM wagon WHERE id_wagon = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du wagon");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Wagon introuvable");
    }
    res.status(204).send();
  });
});

/* ************* CONDUCTEUR ************* */

// INSERT CONDUCTEUR
app.post('/api/conducteurs', (req, res) => {
  const { nom, prenom, telephone } = req.body;

  if (!nom || !prenom || !telephone) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = 'INSERT INTO conducteur (nom, prenom, telephone) VALUES (?, ?, ?)';
  db.query(sql, [nom, prenom, telephone], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion du conducteur");
    }
    res.redirect('/#welcome');
  });
});

// LISTE CONDUCTEURS
app.get('/api/conducteurs', (req, res) => {
  const sql = 'SELECT * FROM conducteur';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des conducteurs");
    }
    res.json(rows);
  });
});

// DELETE CONDUCTEUR
app.delete('/api/conducteurs/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM conducteur WHERE id_conducteur = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du conducteur");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Conducteur introuvable");
    }
    res.status(204).send();
  });
});

/* ************* TRAJET ************* */

// INSERT TRAJET
app.post('/api/trajets', (req, res) => {
  const { date_depart, date_arrivee, distance, id_site_depart, id_site_arrivee } = req.body;

  if (!date_depart || !date_arrivee || !distance || !id_site_depart || !id_site_arrivee) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = `
    INSERT INTO trajet (date_depart, date_arrivee, distance, id_site_depart, id_site_arrivee)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [date_depart, date_arrivee, distance, id_site_depart, id_site_arrivee], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion du trajet");
    }
    res.redirect('/#welcome');
  });
});

// LISTE TRAJETS
app.get('/api/trajets', (req, res) => {
  const sql = 'SELECT * FROM trajet';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des trajets");
    }
    res.json(rows);
  });
});

// DELETE TRAJET
app.delete('/api/trajets/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM trajet WHERE id_trajet = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression du trajet");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Trajet introuvable");
    }
    res.status(204).send();
  });
});

/* ************* INCIDENT ************* */

// INSERT INCIDENT + ALERTE auto
app.post('/api/incidents', (req, res) => {
  const { date_incident, gravite, statut, id_wagon } = req.body;

  if (!date_incident || !gravite || !statut || !id_wagon) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sqlIncident = `
    INSERT INTO incident (date_incident, gravite, statut, id_wagon)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sqlIncident, [date_incident, gravite, statut, id_wagon], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion de l'incident");
    }

    const idIncident = result.insertId;

    const sqlAlerte = `
      INSERT INTO alerte (date_alerte, id_incident)
      VALUES (?, ?)
    `;
    db.query(sqlAlerte, [date_incident, idIncident], (err2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).send("Incident créé, mais erreur lors de la création de l'alerte");
      }
      res.redirect('/#welcome');
    });
  });
});

// LISTE INCIDENTS
app.get('/api/incidents', (req, res) => {
  const sql = 'SELECT * FROM incident';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des incidents");
    }
    res.json(rows);
  });
});

// DELETE INCIDENT
app.delete('/api/incidents/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM incident WHERE id_incident = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression de l'incident");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Incident introuvable");
    }
    res.status(204).send();
  });
});

/* ************* ALERTE ************* */

// INSERT ALERTE seule (optionnel)
app.post('/api/alertes', (req, res) => {
  const { date_alerte, id_incident } = req.body;

  if (!date_alerte || !id_incident) {
    return res.status(400).send("Champs obligatoires manquants");
  }

  const sql = 'INSERT INTO alerte (date_alerte, id_incident) VALUES (?, ?)';
  db.query(sql, [date_alerte, id_incident], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de l'insertion de l'alerte");
    }
    res.redirect('/#welcome');
  });
});

// LISTE ALERTES
app.get('/api/alertes', (req, res) => {
  const sql = 'SELECT * FROM alerte';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des alertes");
    }
    res.json(rows);
  });
});

// DELETE ALERTE
app.delete('/api/alertes/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM alerte WHERE id_alerte = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la suppression de l'alerte");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Alerte introuvable");
    }
    res.status(204).send();
  });
});

/* ======================================= */

app.listen(port, () => {
  console.log(`Serveur Node démarré sur http://localhost:${port}`);
});
