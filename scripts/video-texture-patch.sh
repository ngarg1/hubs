if [ -d "./node_modules/" ]
then
  echo "downloading patch"

  # remove old vid texture file
  rm ./node_modules/build/three.module.js

  # download custom patched file
  curl https://raw.githubusercontent.com/honeyimholm/three.js/hubs/master/three.module.js > ./node_modules/three/build/three.module.js

  #TODO change the three.module.js directly!
  echo "done downloading"
fi
