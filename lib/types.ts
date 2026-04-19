export type ManualProject = {
  id: string
  title: string
  subject: string
  description: string
  images?: string[]
  date: string
  githubUrl?: string
}

export type GithubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
  fork: boolean
}