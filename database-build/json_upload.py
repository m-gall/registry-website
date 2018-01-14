import json
import sqlite3

with open('test.json') as json_file:
    data = json.load(json_file)

temp = json.dumps(data, indent=4)

print(temp)

conn = sqlite3.connect('/Users/mailie/PycharmProjects/registry-v1/registry-v1.db')
cursor = conn.cursor()

cursor.execute('''UPDATE workflow SET workflow_json = '%s' WHERE id=14''' % temp)

conn.commit()
conn.close()