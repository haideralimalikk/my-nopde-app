pipeline {
    agent any

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

        stage('Build') {
            steps {
                script {
                    // You can add a build step if you need to run a build script.
                    // For example, if you use a bundler or transpiler:
                    // sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // You can add test steps here if needed.
                    // Example: Run unit tests with Mocha or Jest
                    // sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Add deployment steps here.
                    // For example, deploying to AWS EC2, running a Docker container, etc.
                    echo 'Deploying app to server...'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment Successful!'
        }
        failure {
            echo 'Build or Deployment Failed!'
        }
    }
}
