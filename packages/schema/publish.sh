if [ $# -eq 0 ];
then
  echo "$0: Please provide npm version - patch | major | minor"
  exit 1
else 
    echo "Building package"
    npm run build

    npm version $1 --force
    echo "$1 version patched"

    mv package.json /dist
    echo "Copied package json to dist"

    echo "Publishing package"
    cd dist && npm publish

    mv /dist/package.json /

fi