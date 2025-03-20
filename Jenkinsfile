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
                    sh "docker build -t backend-app ./${PROJECT_DIR}/backend"
                    sh "docker build -t frontend-app ./${PROJECT_DIR}/frontend"
                    sh "docker build -t database-app ./${PROJECT_DIR}/database"
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose down || true' // Ignore errors if containers are not running
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Verify App is Running') {
            steps {
                script {
                    sh 'docker ps'
                    sh 'curl -I http://localhost:8000 || echo "Frontend not reachable"'
                    sh 'curl -I http://localhost:3001/books || echo "Backend API not reachable"'
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Cleaning up unused Docker resources..."
                sh 'docker system prune -f || true'
            }
        }
    }
}
