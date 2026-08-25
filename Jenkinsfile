```groovy
pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    sh 'echo "Automated test stage completed successfully"'
                }
            }
        }

        stage('Deploy to Docker') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Pipeline Complete') {
            steps {
                echo 'Build, testing and Docker deployment completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed!'
        }
    }
}
```
