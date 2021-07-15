import { getPrUrl, findJiraTicketForCommits, formatCommits } from '../utils/details';
import { githubCliEnterprise } from './index';

export async function getCommits(url = '') {
  try {
    const pr = getPrUrl(url);
    const { repo, number } = pr;
    const results = await githubCliEnterprise.getData({path:`/repos/${repo}/pulls/${number}/commits`});
    const jira = findJiraTicketForCommits(results);
    const commits = formatCommits(results);
    return { commits, pr: number, jira };
  } catch (error) {
    console.log(error);
    return error;
  }
}
