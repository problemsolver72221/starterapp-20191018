
#!/bin/bash
set -euo pipefail

function help() {
    echo "Please specify which service you would like to deploy"
    exit -1
}

IMAGE_NAME=""
IMAGE_PATH=""

# Compose local properties with flag options
while [ "$#" -ne 0 ] ; do
    case "$1" in
        deploy)
            IMAGE_NAME="alialfredji/smart-link:${2:-"latest"}"
            IMAGE_PATH="./services/webapp"
            
            echo ""
            echo "Image to deploy: ${IMAGE_NAME} ?"
            echo ""
            enterToContinue
            shift
            ;;
        -h|--help)
            help
            shift
            ;;
        *)
            shift
            ;;
    esac
done

echo "Deploying image ${IMAGE_NAME}..."
docker build -t $IMAGE_NAME $IMAGE_PATH
#docker login
docker push $IMAGE_NAME
echo "Successfully push image to docker"
