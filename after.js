const request = require('request-promise')
const pify = require('pify')
const fs = pify(require('fs'))
const wait = pify((time, cb) => setTimeout(cb, time))

const getRepoInfo = (repo) => {
  return request({
    uri: `https://api.github.com/repos/${repo}`,
    json: true,
    headers: { 'User-Agent': 'request' }
  })
}

const calculateStargazers = (repoInfo) => {
  console.log('Calculating stargazers. Heavy operations on going..')
  return wait(2000).then(() => repoInfo.stargazers_count)
}

const getPopularity = (stargazers) => {
  if (!stargazers) {
    throw new Error('Stargazers info is not available')
  }
  return stargazers > 30000 ? 'very popular' : 'not popular'
}

Promise.resolve('nodejs/node')
  .then(repo => getRepoInfo(repo))
  .then(repoInfo => calculateStargazers(repoInfo))
  .then(stargazers => getPopularity(stargazers))
  .then(popularity => fs.writeFile('result.txt', popularity))
  .catch(err => console.log(err))
