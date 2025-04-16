pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "haideralimalikk/my-node-app"
        K8S_SERVER = "ec2-54-90-119-157.compute-1.amazonaws.com"  // Your production server
    }

    stages {
        // Stage 3a: GitHub triggers automatically (via webhook)
        stage('Checkout') {
            steps {
                git url: 'https://github.com/haideralimalikk/my-node-app.git', 
                    branch: 'main'  // Explicit branch
            }
        }

        // Stage 3b: Build Docker image
        stage('Build') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        // Stage 3c: Test container (build test)
        stage('Test') {
            steps {
                script {
                    // Run container and verify it starts
                    def testContainer = docker.run(
                        "${DOCKER_IMAGE}:latest",
                        "-d -p 8081:8081 --name test-app"  // Match your app's port
                    )
                    sleep(10)  // Wait for app to start
                    sh '''
                        curl -s http://localhost:8081 | grep "Coursework 2" || exit 1
                    '''
                    sh "docker stop test-app && docker rm test-app"
                }
            }
        }

        // Stage 3d: Push to DockerHub
        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',  // Must match Jenkins credential ID
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        docker push "${DOCKER_IMAGE}:latest"
                    """
                }
            }
        }

        // Stage 3e: Deploy to Kubernetes (without downtime)
        stage('Deploy') {
            steps {
                sshagent(['production-server-ssh']) {  // Jenkins SSH credential ID
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${K8S_SERVER} \
                        "kubectl set image deployment/node-app-deployment node-app=${DOCKER_IMAGE}:latest"
                    """
                }
            }
        }
    }
}
