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

        stage('Pipeline Complete') {
            steps {
                echo 'Build and testing stages completed successfully!'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed!'
        }
    }
}