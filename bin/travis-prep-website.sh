#!/bin/bash

set -e

DIR_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."
cd $DIR_ROOT

if [ ! -d ./packages/apps-components/target/storybook ]; then
  echo "Missing: packages/components/target/storybook"
  echo "Did you build first?"
  exit 1
fi

if [ ! -d ./packages/apps-style/website/build/style ]; then
  echo "Missing: packages/style/website/build/style"
  echo "Did you build first?"
  exit 1
fi

if [ -d ./target/gh-pages ]; then
  rm -rf ./target/gh-pages
fi

mkdir -p ./target/gh-pages

mv ./packages/apps-components/target/storybook ./target/gh-pages/components
mv ./packages/apps-style/website/build/style ./target/gh-pages/style

cat << EOF > ./target/gh-pages/index.html
<html>
<head>
  <title>Deskpro Apps Components</title>
  <link rel="stylesheet" href="style/css/main.css" />
</head>
<body>
  <div class="homeContainer">
    <div class="homeSplashFade">
      <div class="wrapper homeWrapper">
        <div class="inner">
          <h2 class="projectTitle">Apps Components</h2>

          <div class="section promoSection">
            <div class="promoRow">
              <div class="pluginRowBlock">
                <div class="pluginWrapper buttonWrapper">
                  <a class="button" href="./style/">CSS and Styling</a>
                </div>

                <div class="pluginWrapper buttonWrapper">
                  <a class="button" href="./components/">React Components</a>
                </div>

                <div class="pluginWrapper buttonWrapper">
                  <a class="button" href="https://github.com/deskpro/apps-components">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
EOF

echo ""
echo "gh-pages directory is ready for publishing"
echo ""
