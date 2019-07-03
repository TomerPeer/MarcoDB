pipeline {

    environment {
        registry = "fleeing/marcodb"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }

    agent { label 'marcodbjnlp' }

    stages {
        stage('Building Prod Image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Deploy Image to Docker Hub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

         stage('Deploy') {
            steps {
                sh './scripts/deploy.sh'
            }
        }

        stage('cleanup') {
            steps{
                sh './scripts/cleanup.sh'
            }
        }
    }
}