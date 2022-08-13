pipeline {
    agent any
    environment {
        APP_REGISTRY_CREDENTIALS_ID = 'registry-siposdani87-com'
        APP_SSH_CREDENTIALS_ID = 'digital-ocean-droplet-server'
        APP_CONTAINER_REGISTRY = 'registry.siposdani87.com'
        APP_SERVER_IP = '165.22.90.228'
        APP_DOCKER_DIR = '/mnt/volume_fra1_01/docker'

        APP_IMAGE_NAME = 'siposdani87-sui'
        APP_TAG_NAME = 'latest'
        APP_CONTAINER_NAME = 'siposdani87_sui'

        APP_TARGET_PLATFORMS = 'linux/arm64,linux/amd64'
    }
    stages {
        stage('Prepare') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
        stage('Build') {
            steps {
                script {
                    def output = env.BRANCH_NAME == 'master' ? 'push' : 'rm'
                    docker.withRegistry("https://${env.APP_CONTAINER_REGISTRY}", env.APP_REGISTRY_CREDENTIALS_ID) {
                        sh 'docker buildx create --name multibuilder --use'
                        sh "docker buildx build -t ${env.APP_CONTAINER_REGISTRY}/${env.APP_IMAGE_NAME}:${env.APP_TAG_NAME} --platform ${env.APP_TARGET_PLATFORMS} --${output} ."
                    }
                }
            }
        }
        stage('Deploy') {
            when { 
                branch 'master'
            }
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: env.APP_SSH_CREDENTIALS_ID, keyFileVariable: 'identityFile', usernameVariable: 'user')]) {
                        def remote = [:]
                        remote.name = env.APP_SERVER_IP
                        remote.host = env.APP_SERVER_IP
                        remote.allowAnyHosts = true
                        remote.user = user
                        remote.identityFile = identityFile

                        sshCommand remote: remote, command: "cd ${env.APP_DOCKER_DIR} && ./login-registry.sh"
                        sshCommand remote: remote, command: "cd ${env.APP_DOCKER_DIR} && docker pull ${env.APP_CONTAINER_REGISTRY}/${env.APP_IMAGE_NAME}:${env.APP_TAG_NAME}"
                        sshCommand remote: remote, command: "cd ${env.APP_DOCKER_DIR} && docker-compose up --force-recreate --detach ${env.APP_CONTAINER_NAME}"
                    }
                }
            }
        }
    }
}
