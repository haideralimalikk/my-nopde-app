pipeline {
    agent any

    environment {
        // Customize these values:
        DOCKER_IMAGE = "haideralimalikk/my-node-app"  // Your DockerHub image
        GIT_REPO = "https://github.com/haideralimalikk/my-nopde-app.git"
        GIT_BRANCH = "main"  // Or your branch name
    }

    stages {
        // Stage 3a: GitHub triggers automatically
        stage('Checkout') {
            steps {
                git(
                    url: "${env.GIT_REPO}",
                    branch: "${env.GIT_BRANCH}",
                    credentialsId: 'github-token'  // From Jenkins credentials
                )
            }
        }

        // Stage 3b: Build Docker image
        stage('Build') {
            steps {
                script {
                    sh """
                        docker build -t ${env.DOCKER_IMAGE} .
                        docker images | grep ${env.DOCKER_IMAGE}
                    """
                }
            }
        }

        // Stage 3c: Test container (health check)
        stage('Test') {
            steps {
                script {
                    sh """
                        docker run -d --name test-container -p 8081:8081 ${env.DOCKER_IMAGE}
                        sleep 10  # Wait for app to start
                        curl -s http://localhost:8081 | grep 'Coursework 2' || exit 1
                        docker stop test-container && docker rm test-container
                    """
                }
            }
        }

        // Stage 3d: Push to DockerHub
        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',  // From Jenkins credentials
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${env.DOCKER_IMAGE}
                    """
                }
            }
        }

        // Stage 3e: Deploy to Kubernetes
        stage('Deploy') {
            steps {
                sshagent(['production-server-ssh']) {  // From Jenkins credentials
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@ec2-54-90-119-157.compute-1.amazonaws.com \
                        "kubectl set image deployment/node-app-deployment node-app=${env.DOCKER_IMAGE}"
                    """
                }
            }
        }
    }
}
