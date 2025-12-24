# 1. On utilise l'image COMPLETE (pas slim) pour éviter les problèmes de compilation
FROM python:3.9

# 2. On installe juste le nécessaire pour MySQL
RUN apt-get update && apt-get install -y default-libmysqlclient-dev

# 3. Dossier de travail
WORKDIR /app

# 4. Installation des dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# On installe le connecteur MySQL explicitement
RUN pip install mysqlclient

# 5. Copie du code
COPY . .

# 6. Lancement
WORKDIR /app/API_Project
EXPOSE 8000
CMD ["gunicorn", "API_Project.wsgi:application", "--bind", "0.0.0.0:8000"]
