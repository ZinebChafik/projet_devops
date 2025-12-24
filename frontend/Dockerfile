# 1. Utiliser l'image Nginx légère
FROM nginx:alpine

# 2. Copier notre configuration Nginx personnalisée (on va la créer juste après)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Supprimer le site par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# 4. Copier ton site compilé (le dossier dist) vers le dossier de Nginx
# Le * permet de trouver le dossier quel que soit le nom du projet
COPY dist/*/browser /usr/share/nginx/html

# 5. Ouvrir le port 80
EXPOSE 80

# 6. Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
