pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "haideralimalikk/my-node-app"
        GIT_REPO = "https://github.com/haideralimalikk/my-nopde-app.git"
        GIT_BRANCH = "master"
        CONTAINER_NAME = "test-container-${BUILD_NUMBER}"  // Unique name per build
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    url: "${env.GIT_REPO}",
                    branch: "${env.GIT_BRANCH}",
                    credentialsId: 'github-token'
                )
            }
        }

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

        stage('Test') {
            steps {
                script {
                    // Clean up any previous containers first
                    sh "docker stop ${env.CONTAINER_NAME} || true"
                    sh "docker rm ${env.CONTAINER_NAME} || true"
                    
                    // Run new container with unique name
                    sh """
                        docker run -d --name ${env.CONTAINER_NAME} -p 8081:8081 ${env.DOCKER_IMAGE}
                        sleep 15  // Increased wait time
                        
                        // Add debugging commands
                        docker ps -a
                        docker logs ${env.CONTAINER_NAME}
                        
                        // Health check
                        curl -v http://localhost:8081
                        curl -s http://localhost:8081 | grep 'Coursework 2' || exit 1
                    """
                }
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',
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

        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'production-server-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh """
                        ssh -i ${SSH_KEY} ${SSH_USER}@ec2-3-89-136-251.compute-1.amazonaws.com \
                        "kubectl set image deployment/node-app-deployment node-app=haideralimalikk/my-node-app:latest && \
                         kubectl rollout restart deployment/node-app-deployment"
                    """
                }
            }
        }
    }  // <-- THIS WAS MISSING (closing brace for stages)

    post {
        always {
            script {
                // Clean up containers after pipeline completes
                sh "docker stop ${env.CONTAINER_NAME} || true"
                sh "docker rm ${env.CONTAINER_NAME} || true"
            }
        }
    }
}
