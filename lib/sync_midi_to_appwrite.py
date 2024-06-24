from azure.storage.blob import BlobServiceClient
from appwrite.client import Client
from appwrite.services.databases import Databases
import sqlite3
import pandas as pd

# Charger les variables d'environnement
appwrite_endpoint = "https://cloud.appwrite.io/v1"
appwrite_project_id = "66350ea30005c932e398"
appwrite_api_key = "31838b1f4c23f2e62f2462d2588f118a67fffb311b339fb7e8fc74b4d2e43937df2f28d6ab779370c71f6819844abdde0769d64ea922e789d3c181e01d1b02263fa3ec647eef8bdf45926a39b5dc8ee29f5d4a665fd1f27c592137e28f93edc106a9f40764d390e52ae6304f35200ec51f44b19fb3fb2db4e1f8e086aaa66e33"
appwrite_database_id = "66350faa001f11941c81"
appwrite_collection_id = "66350fda0031fe070178"

client = Client()
client.set_endpoint(appwrite_endpoint)
client.set_project(appwrite_project_id)
client.set_key(appwrite_api_key)

database = Databases(client)

conn = sqlite3.connect('midi_repertoire.db')

midi_songs_data_query = "SELECT * FROM midi_songs;" 
midi_songs_data = pd.read_sql(midi_songs_data_query, conn)
print("type", midi_songs_data)

def create_document(row):
    document_data = {
        'title': row['name'],
        'artiste': row['author'],
        'difficulty': None,
        'partition': row['path'],
        'partition_texte': None,
        'image': None,
        'played': 0,
        'genre': row['genre']
    }
    print("doc :", document_data)
    
    database.create_document(
        database_id=appwrite_database_id,
        collection_id=appwrite_collection_id,
        document_id='unique()',
        data=document_data
    )

for index, row in midi_songs_data.iterrows():
    create_document(row)