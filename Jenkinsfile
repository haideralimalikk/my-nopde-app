pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git 'https://github.com/haideralimalikk/my-nopde-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies in the Node.js application
                    sh 'npm install'
                }
            }
        }

        stage('Run Application') {
            steps {
                script {
                    // Run the application (start the server)
                    sh 'node server.js'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t my-node-app .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to Docker Hub (or any other registry)
                    sh 'docker push my-node-app'
                }
            }
        }
    }
}

