echo "wait db server"
dockerize -wait tcp://db:3306 -timeout 30s

echo "start node server"
npm run Auth