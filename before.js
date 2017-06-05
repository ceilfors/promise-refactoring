const request = require('request')
const fs = require('fs')

const getRepoInfo = (repo) => new Promise((resolve, reject) => {
  const option = {
    uri: `https://api.github.com/repos/${repo}`,
    headers: { 'User-Agent': 'request' }
  }
  request(option, (error, response, body) => {
    if (error) reject(error)
    else resolve(JSON.parse(body))
  })
})

const calculateStargazers = (repoInfo) => new Promise((resolve, reject) => {
  console.log('Calculating stargazers. Heavy operations on going..')
  setTimeout(() => {
    resolve(repoInfo.stargazers_count)
  }, 2000)
})

const getPopularity = (stargazers) => new Promise((resolve, reject) => {
  if (!stargazers) {
    return reject(new Error('Stargazers info is not available'))
  }
  resolve(stargazers > 30000 ? 'very popular' : 'not popular')
})

const savePopularity = (popularity) => new Promise((resolve, reject) => {
  fs.writeFile('result.txt', popularity, (err) => {
    if (err) reject(err)
    else resolve()
  })
})

getRepoInfo('nodejs/node')
  .then(calculateStargazers)
  .then(getPopularity)
  .then(savePopularity)
  .catch((err) => console.log(err))
