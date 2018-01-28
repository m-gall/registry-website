import json
import sqlite3

with open('cpipe-2.3-main.json') as json_file:
    data = json.load(json_file)

temp = json.dumps(data, indent=4)


conn = sqlite3.connect('/Users/mailie/PycharmProjects/registry-v1/registry-v1.db')
cursor = conn.cursor()

cursor.execute('''UPDATE workflow SET workflow_sb_json = ? WHERE id=13''', [temp])

conn.commit()
conn.close()