type ID = string
type ISODate = string
import { coreApi } from '../api'

export interface ICommunityEngine {
  getMember(id: ID): Promise<{ id: ID; name: string; role: string; joinedAt: ISODate } | null>
  listMembers(filters?: { role?: string }): Promise<Array<{ id: ID; name: string; role: string }>>
  getChallenge(id: ID): Promise<{ id: ID; title: string; status: string; submissionCount: number } | null>
  listChallenges(filters?: { status?: string }): Promise<Array<{ id: ID; title: string; status: string }>>
  submitChallenge(challengeId: ID, memberId: ID, content: string): Promise<{ submissionId: ID }>
  getLabProject(id: ID): Promise<{ id: ID; title: string; status: string } | null>
  createReferral(referrerId: ID, inviteeEmail: string): Promise<{ code: string; referralId: ID }>
}

class CommunityEngineImpl implements ICommunityEngine {
  async getMember(id: ID) {
    const member = await coreApi.get<{ id: ID; displayName: string; level: number; joinedAt: ISODate } | null>(`/resources/community/${id}`)
    return member ? { id: member.id, name: member.displayName, role: `level-${member.level}`, joinedAt: member.joinedAt } : null
  }

  async listMembers(filters?: { role?: string }) {
    const members = await coreApi.get<Array<{ id: ID; displayName: string; level: number }>>('/resources/community')
    return members.map(member => ({ id: member.id, name: member.displayName, role: `level-${member.level}` }))
  }

  async getChallenge(id: ID) {
    const challenge = await coreApi.get<{ id: ID; title: string; status: string; submissionsCount: number } | null>(`/resources/challenges/${id}`)
    return challenge ? { id: challenge.id, title: challenge.title, status: challenge.status, submissionCount: challenge.submissionsCount } : null
  }

  async listChallenges(filters?: { status?: string }) {
    const challenges = await coreApi.get<Array<{ id: ID; title: string; status: string }>>('/resources/challenges')
    return filters?.status ? challenges.filter(challenge => challenge.status === filters.status) : challenges
  }

  async submitChallenge(challengeId: ID, memberId: ID, _content: string) {
    return { submissionId: `submission-${challengeId}-${memberId}` }
  }

  async getLabProject(id: ID) {
    return coreApi.get<{ id: ID; title: string; status: string } | null>(`/resources/labProjects/${id}`)
  }

  async createReferral(referrerId: ID, _inviteeEmail: string) {
    return { code: `REF-${referrerId.toUpperCase().slice(0, 6)}`, referralId: `referral-${referrerId}` }
  }
}

export const CommunityEngine: ICommunityEngine = new CommunityEngineImpl()
