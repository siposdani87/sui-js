pipeline {
    agent any
    environment {
        APP_REGISTRY_CREDENTIALS_ID = 'registry-siposdani87-com'
        APP_CONTAINER_REGISTRY = 'registry.siposdani87.com'

        APP_IMAGE_NAME = 'siposdani87-sui-js'
        APP_TAG_NAME = 'latest'

        APP_TARGET_PLATFORMS = 'linux/arm64,linux/amd64'

        // Coolify deploy (Hetzner) — az app mar Coolify-on fut, nem a DO-n.
        COOLIFY_API_URL = 'https://coolify.siposdani87.com'
        COOLIFY_APP_UUID = 'qbeyft05msmnx9j8fbv6lknm'
        COOLIFY_API_TOKEN_CREDENTIALS_ID = 'coolify-api-token'
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
                // A friss :latest image mar a registry-ben van (Build stage --push).
                // Ertesitjuk a Coolify-t, hogy huzza le es deployolja ujra az appot.
                withCredentials([string(credentialsId: env.COOLIFY_API_TOKEN_CREDENTIALS_ID, variable: 'COOLIFY_API_TOKEN')]) {
                    sh '''
                        curl --fail --silent --show-error \
                          --request GET "${COOLIFY_API_URL}/api/v1/deploy?uuid=${COOLIFY_APP_UUID}&force=true" \
                          --header "Authorization: Bearer ${COOLIFY_API_TOKEN}"
                    '''
                }
            }
        }
    }
}
