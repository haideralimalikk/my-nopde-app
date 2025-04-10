pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "haideralimalikk/my-node-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/haideralimalikk/my-nopde-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Application') {
            steps {
                script {
                    // Optional: Can be skipped in CI if not testing runtime behavior
                    sh 'node server.js & sleep 5 && kill $!' 
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Ensure you're logged in to Docker Hub or use Jenkins credentials
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
    }
}

