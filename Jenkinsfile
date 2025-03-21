pipeline {
    agent any

    environment {
        PROJECT_DIR = "Devops"
        FRONTEND_PORT = "8003"
        BACKEND_PORT = "3004"
        PROMETHEUS_PORT = "9092"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/Binit17/DevopsProject.git', branch: 'main'
            }
        }

        stage('Build Images') {
            steps {
                script {
                    // Build images with tags that include a version or build number for better tracking
                    sh "docker build -t binit17/backend-app:latest ./backend"
                    sh "docker build -t binit17/frontend-app:latest ./frontend"
                    sh "docker build -t binit17/database-app:latest ./database"
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    // Stop and remove existing containers before starting new ones
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                    // Add a short sleep to allow containers to start
                    sleep 10
                }
            }
        }

        stage('Verify App is Running') {
            steps {
                script {
                    // Check container status
                    sh 'docker ps'

                    // Use curl with --fail to catch HTTP errors
                    sh "curl --fail http://localhost:${FRONTEND_PORT} || echo 'Frontend not reachable'"
                    sh "curl --fail http://localhost:${BACKEND_PORT} || echo 'Backend API not reachable'"
                }
            }
        }

        stage('Verify Prometheus') {
            steps {
                script {
                    // Wait longer for Prometheus to start
                    sleep 20
                    sh "curl --fail http://localhost:${PROMETHEUS_PORT}/metrics || echo 'Prometheus not reachable'"
                }
            }
        }
    }
}
