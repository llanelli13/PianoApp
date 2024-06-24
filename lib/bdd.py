import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('midi_repertoire.db')
cursor = conn.cursor()

# Exécution d'une requête
cursor.execute("SELECT DISTINCT genre FROM midi_songs")
rows = cursor.fetchall()

# Affichage des résultats
for row in rows:
    print(row)

# Fermeture de la connexion
conn.close()
