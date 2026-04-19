import { GithubRepo } from "@/lib/types"

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repositories")
  }

  const data = await res.json()

  return data
    .filter((repo: GithubRepo) => !repo.fork)
    .sort((a: GithubRepo, b: GithubRepo) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}