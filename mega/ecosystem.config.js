module.exports = {
  apps : [{
    name   : "View",
    script : "cd services/View.js",
    watch: true
  },
{
name : "Auth",
script : "cd services/Authentication.js",
watch : true,
},
{
name : "Deploy",
script : "cd services/Deployment.js",
watch : true
}

]
}
