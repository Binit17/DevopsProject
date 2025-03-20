pipeline {
    agent any

    environment {
        PROJECT_DIR = "Devops"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/Binit17/DevopsProject.git', branch: 'main'
            }
        }

        stage('Build Containers') {
            steps {
                script {
                    sh "docker build -t backend-app ./backend"
                    sh "docker build -t frontend-app ./frontend"
                    sh "docker build -t database-app ./database"
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Verify App is Running') {
            steps {
                script {
                    sh 'docker ps'
                    sh 'curl -I http://localhost:8002 || echo "Frontend not reachable"'
                    sh 'curl -I http://localhost:3003/books || echo "Backend API not reachable"'
                }
            }
        }

        stage('Verify Prometheus') {
            steps {
                script {
                    sh 'sleep 10'
                    sh 'curl http://localhost:9091/metrics || echo "Prometheus not reachable"'
                }
            }
        }
    }
}
