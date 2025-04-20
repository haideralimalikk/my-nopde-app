pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "haideralimalikk/my-node-app:${env.BUILD_NUMBER}" # Versioned
        GIT_REPO = "https://github.com/haideralimalikk/my-nopde-app.git"
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
                sh """
                    docker build -t ${env.DOCKER_IMAGE} .
                    docker tag ${env.DOCKER_IMAGE} haideralimalikk/my-node-app:stable
                """
            }
        }

        stage('Test') {
            steps {
                sh """
                    docker run -d --name test-container -p 8081:8081 ${env.DOCKER_IMAGE}
                    sleep 10
                    curl -s http://localhost:8081 | grep 'Coursework 2' || exit 1
                    docker stop test-container && docker rm test-container
                """
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
                        docker push haideralimalikk/my-node-app:stable
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'production-server-ssh',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh """
                        chmod 600 \$SSH_KEY
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ubuntu@ec2-3-89-136-251.compute-1.amazonaws.com \
                          "kubectl set image deployment/node-app-deployment node-app=${env.DOCKER_IMAGE}"
                    """
                }
            }
        }
    }
}
