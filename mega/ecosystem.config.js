module.exports = {
  apps : [{
    name   : "View",
    script : "services/View.js",
    watch: true
  },
{
name : "Auth",
script : "services/Authentication.js",
watch : true,
},
{
name : "Deploy",
script : "services/Deployment.js",
watch : true
}

]
}
