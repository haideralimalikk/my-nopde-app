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
                    // Optional runtime test
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

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }
    }
}
