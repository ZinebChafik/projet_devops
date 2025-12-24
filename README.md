# 🚀 Projet DevOps : Pipeline CI/CD & Déploiement Kubernetes

Bienvenue sur le dépôt de mon projet DevOps. Ce projet démontre la mise en place d'une chaîne d'intégration et de déploiement continus (CI/CD) complète pour une application web, utilisant les standards de l'industrie.

## 📋 Description du Projet
L'objectif est d'automatiser le cycle de vie d'une application (developpement, test, sécurité, déploiement) en utilisant une approche **DevSecOps**.

L'application est conteneurisée avec **Docker**, orchestrée par **Kubernetes**, et pilotée par un pipeline **GitHub Actions**.

## 🛠️ Stack Technique
Voici les outils et technologies utilisés :

* **Application :** Python (Backend) & HTML/CSS (Frontend)
* **Conteneurisation :** Docker
* **Orchestration :** Kubernetes (Testé sur Minikube)
* **CI/CD :** GitHub Actions
* **Registry :** Docker Hub
* **Qualité de Code :** Flake8
* **Sécurité :** Trivy (Scan de vulnérabilités)
* **Performance :** K6 (Tests de charge)

## ⚙️ Le Pipeline CI/CD (GitHub Actions)
Chaque "Push" sur la branche `main` déclenche automatiquement un pipeline composé de 4 jobs :

1.  **🔍 Code Quality & Tests :**
    * Analyse statique du code Python avec **Flake8**.
    * Exécution des tests unitaires avec **Pytest**.
2.  **🐳 Build, Scan & Push :**
    * Construction de l'image Docker.
    * Scan de sécurité critique avec **Trivy** (DevSecOps).
    * Push automatique de l'image sur **Docker Hub**.
3.  **☸️ Kubernetes Check :**
    * Vérification de l'intégrité des fichiers de déploiement (Manifestes YAML).
4.  **⚡ Performance Test :**
    * Simulation de charge utilisateurs avec **K6** pour valider la robustesse.

## 🚀 Comment lancer le projet localement

### Prérequis
* Docker & Minikube installés.

### Installation
1.  Cloner le dépôt :
    ```bash
    git clone [https://github.com/ZinebChafik/projet_devops.git](https://github.com/ZinebChafik/projet_devops.git)
    cd projet_devops
    ```

2.  Lancer sur Kubernetes :
    ```bash
    kubectl apply -f k8s/
    ```

3.  Accéder à l'application :
    ```bash
    minikube service frontend-service
    ```

---
**Auteur :** Zineb Chafik
*Projet réalisé dans le cadre du module DevOps - 2025*
