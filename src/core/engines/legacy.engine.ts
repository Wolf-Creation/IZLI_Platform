type ID = string

export interface ILegacyEngine {
  getArchive(id: ID): Promise<{ id: ID; name: string; status: string; keeperCount: number } | null>
  listArchives(filters?: { status?: string }): Promise<Array<{ id: ID; name: string; status: string; keeperCount: number }>>
  getKeeper(memberId: ID): Promise<{ id: ID; memberId: ID; level: string; points: number; archiveIds: ID[] } | null>
  createKeeper(memberId: ID, archiveId: ID): Promise<{ keeperId: ID; level: string }>
  getVotingSession(id: ID): Promise<{ id: ID; archiveId: ID; status: string; totalVotes: number } | null>
  submitVote(sessionId: ID, memberId: ID, option: string): Promise<{ success: boolean }>
  levelUpKeeper(keeperId: ID): Promise<{ newLevel: string; pointsAwarded: number }>
  grantBadge(memberId: ID, badgeId: ID): Promise<{ success: boolean }>
  grantReward(memberId: ID, rewardId: ID): Promise<{ success: boolean }>
}

class LegacyEngineImpl implements ILegacyEngine {
  async getArchive(id: ID) {
    return { id, name: 'Mock Archive', status: 'active', keeperCount: 5 }
  }

  async listArchives(filters?: { status?: string }) {
    return [
      { id: 'archive-1', name: 'Founding Collection', status: filters?.status ?? 'active', keeperCount: 8 },
      { id: 'archive-2', name: 'Heritage Series', status: filters?.status ?? 'active', keeperCount: 3 },
    ]
  }

  async getKeeper(memberId: ID) {
    return { id: `keeper-${memberId}`, memberId, level: 'guardian', points: 450, archiveIds: ['archive-1', 'archive-2'] }
  }

  async createKeeper(memberId: ID, archiveId: ID) {
    return { keeperId: `keeper-${memberId}-${archiveId}`, level: 'apprentice' }
  }

  async getVotingSession(id: ID) {
    return { id, archiveId: 'archive-1', status: 'open', totalVotes: 27 }
  }

  async submitVote(_sessionId: ID, _memberId: ID, _option: string) {
    return { success: true }
  }

  async levelUpKeeper(_keeperId: ID) {
    return { newLevel: 'guardian', pointsAwarded: 100 }
  }

  async grantBadge(_memberId: ID, _badgeId: ID) {
    return { success: true }
  }

  async grantReward(_memberId: ID, _rewardId: ID) {
    return { success: true }
  }
}

export const LegacyEngine: ILegacyEngine = new LegacyEngineImpl()
