pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''npm i
npm run build
cp -rf dist/ /var/www/html/front-end-project/'''
      }
    }
  }
}