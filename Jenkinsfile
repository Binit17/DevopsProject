pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Fix Database Connection') {
            steps {
                sh '''
                sed -i '' 's/mongodb:\\/\\/localhost:27017\\/bookdb/mongodb:\\/\\/mongodb:27017\\/bookdb/g' database/init.js
                '''
            }
        }
        
        stage('Build and Deploy') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
        
        stage('Verify Deployment') {
            steps {
                sh 'docker-compose ps'
                sh 'curl -s http://localhost:8000'
                sh 'curl -s http://localhost:3001/books'
            }
        }
    }
    
    post {
        failure {
            sh 'docker-compose logs'
        }
        always {
            sh 'docker system prune -f'
        }
    }
}
