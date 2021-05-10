import { githubCliEnterprise } from './index';

export async function getCommits(url = '') {
  try {
    const pr = getPrUrl(url);
    const { repo, number } = pr;
    const commits = await githubCliEnterprise.getData({path:`/repos/${repo}/pulls/${number}/commits`});
    return { commits: commits.data, pr: number };
  } catch (error) {
    console.log(error);
    return error;
  }
}

function getPrUrl(url) {
  const parseUrl = new URL(url);
  const pathname = parseUrl.pathname;
  const path = pathname.split('/');
  const repo = `${path[1]}/${path[2]}`;
  const number = path[4];
  console.log(repo);
  return { repo, number };
}
