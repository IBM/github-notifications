import { getPrUrl, findJiraTickets } from '../utils/details';
import { githubCliEnterprise } from './index';

export async function getCommits(url = '') {
  try {
    const pr = getPrUrl(url);
    const { repo, number } = pr;
    const results = await githubCliEnterprise.getData({path:`/repos/${repo}/pulls/${number}/commits`});
    const { commits, jira } = findJiraTickets(results);
    return { commits, pr: number, jira };
  } catch (error) {
    console.log(error);
    return error;
  }
}
