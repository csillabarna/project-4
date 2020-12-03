import os
db_host = os.environ['POSTGRES_HOST']
db_port = os.environ['POSTGRES_PORT']
db_user = os.environ['POSTGRES_USER']
db_pass = os.environ['POSTGRES_PASS']
secret = os.environ['JWT_SECRET']
db_URI = f'postgres://{db_host}:{db_port}/heritage_db?user={db_user}&password={db_pass}'
