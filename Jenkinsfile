pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('AKIAUPMYNCMKTNVYFFFM')
        AWS_SECRET_ACCESS_KEY = credentials('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')
        AWS_REGION = 'ap-south-1'
        EB_ENV = 'my-ci-cd-web-app'
        EB_APP = 'my-ci-cd-web-app'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/swapnilyavalkar/My-Node-JS-Web-Application.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install express'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test' // Optional: only if you have tests
            }
        }
        
        stage('Deploy to Elastic Beanstalk') {
            steps {
                sh '''
                eb init -p node.js $EB_APP --region $AWS_REGION
                eb use $EB_ENV
                eb deploy
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
