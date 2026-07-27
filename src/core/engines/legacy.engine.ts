type ID = string
import { coreApi } from '../api'

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
    return coreApi.get<{ id: ID; name: string; status: string; keeperCount: number } | null>(`/resources/archives/${id}`)
  }

  async listArchives(filters?: { status?: string }) {
    const archives = await coreApi.get<Array<{ id: ID; name: string; status: string; keeperCount: number }>>('/resources/archives')
    return filters?.status ? archives.filter(archive => archive.status === filters.status) : archives
  }

  async getKeeper(memberId: ID) {
    return coreApi.get<{ id: ID; memberId: ID; level: string; points: number; archiveIds: ID[] } | null>(`/resources/keepers/${memberId}`)
  }

  async createKeeper(memberId: ID, archiveId: ID) {
    const keeper = await coreApi.post<{ id: ID; level: string }>(`/resources/keepers`, { memberId, archiveIds: [archiveId], level: 'apprentice', points: 0 })
    return { keeperId: keeper.id, level: keeper.level }
  }

  async getVotingSession(id: ID) {
    return coreApi.get<{ id: ID; archiveId: ID; status: string; totalVotes: number } | null>(`/resources/votingSessions/${id}`)
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
