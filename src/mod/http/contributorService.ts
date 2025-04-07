// contributorService.ts

// 定义贡献者数据类型
export interface Contributor {
    id: string;
    avatarUrl: string;
  }
  
  // 定义 GitHub API 响应类型
  interface GitHubContributor {
    login: string;
    avatar_url: string;
    [key: string]: any; // 其他未使用的字段
  }
  
  export class ContributorService {
    private readonly baseUrl: string;
    private readonly headers: HeadersInit;
  
    constructor() {
      this.baseUrl = 'https://api.github.com';
      this.headers = {
        Accept: 'application/vnd.github.v3+json',
        // 如需认证可取消注释（替换YOUR_TOKEN）
        // Authorization: `Bearer ${YOUR_TOKEN}`
      };
    }
  
    /**
     * 获取项目贡献者列表
     * @param owner 仓库所有者
     * @param repo 仓库名称
     * @param maxCount 最大获取数量（默认30）
     */
    async getContributors(
      owner: string,
      repo: string,
      maxCount: number = 30
    ): Promise<Contributor[]> {
      const url = new URL(`/repos/${owner}/${repo}/contributors`, this.baseUrl);
      url.searchParams.set('per_page', maxCount.toString());
  
      try {
        const response = await fetch(url, {
          headers: this.headers,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: GitHubContributor[] = await response.json();
        
        return data.map(contributor => ({
          id: contributor.login,
          avatarUrl: contributor.avatar_url,
        }));
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error('Network error: Failed to fetch contributors');
        }
        throw new Error(`Failed to get contributors: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  
  // 使用示例
  // const service = new ContributorService();
  // service.getContributors('ant-design', 'ant-design')
  //   .then(contributors => console.log(contributors))
  //   .catch(error => console.error(error));