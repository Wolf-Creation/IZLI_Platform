type ID = string
type ISODate = string

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
    return { id, name: 'Mock Member', role: 'member', joinedAt: '2024-01-15T00:00:00Z' }
  }

  async listMembers(filters?: { role?: string }) {
    return [
      { id: 'member-1', name: 'Alice Durand', role: filters?.role ?? 'member' },
      { id: 'member-2', name: 'Bashir Okafor', role: filters?.role ?? 'keeper' },
    ]
  }

  async getChallenge(id: ID) {
    return { id, title: 'Heritage Photo Challenge', status: 'active', submissionCount: 42 }
  }

  async listChallenges(filters?: { status?: string }) {
    return [
      { id: 'challenge-1', title: 'Heritage Photo Challenge', status: filters?.status ?? 'active' },
      { id: 'challenge-2', title: 'Story Craft Challenge', status: filters?.status ?? 'active' },
    ]
  }

  async submitChallenge(challengeId: ID, memberId: ID, _content: string) {
    return { submissionId: `submission-${challengeId}-${memberId}` }
  }

  async getLabProject(id: ID) {
    return { id, title: 'Mock Lab Project', status: 'in-progress' }
  }

  async createReferral(referrerId: ID, _inviteeEmail: string) {
    return { code: `REF-${referrerId.toUpperCase().slice(0, 6)}`, referralId: `referral-${referrerId}` }
  }
}

export const CommunityEngine: ICommunityEngine = new CommunityEngineImpl()
