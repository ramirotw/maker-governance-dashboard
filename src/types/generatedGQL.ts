/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGovernanceInfo
// ====================================================

export interface GetGovernanceInfo_governanceInfo {
  __typename: 'GovernanceInfo'
  id: string
  countProxies: any
  countAddresses: any
  countSlates: any
  countSpells: any
  countLock: any
  countFree: any
  countPolls: any
  locked: any
  lastBlock: any
  lastSynced: any
  hat: any
}

export interface GetGovernanceInfo {
  governanceInfo: GetGovernanceInfo_governanceInfo | null
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExecutiveVotesInfo
// ====================================================

export interface GetExecutiveVotesInfo_governanceInfo {
  __typename: 'GovernanceInfo'
  countSpells: any
}

export interface GetExecutiveVotesInfo {
  governanceInfo: GetExecutiveVotesInfo_governanceInfo | null
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExecutivesVotesData
// ====================================================

export interface GetExecutivesVotesData_spells {
  __typename: 'Spell'
  /**
   *  ID represent the contract address
   */
  id: string
  /**
   *  Timestamp when the spell voted by the first time
   */
  timestamp: any
  /**
   *  Timestamp when the spell is casted
   */
  casted: any | null
  /**
   *  How much MKR it has when the spell is casted
   */
  castedWith: any | null
  /**
   *  Timestamp when the spell is casted
   */
  lifted: any | null
  /**
   *  How much MKR it has when the spell is lifted to hat
   */
  liftedWith: any | null
}

export interface GetExecutivesVotesData {
  spells: GetExecutivesVotesData_spells[]
}

export interface GetExecutivesVotesDataVariables {
  executives: number
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPolls
// ====================================================

export interface GetPolls_polls {
  __typename: 'Poll'
  id: string
  creator: any | null
  url: string | null
  pollId: any
  startDate: any
  endDate: any
}

export interface GetPolls {
  polls: GetPolls_polls[]
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHomeData
// ====================================================

export interface getHomeData_polls {
  __typename: 'Poll'
  id: string
  creator: any | null
  url: string | null
  pollId: any
  startDate: any
  endDate: any
}

export interface getHomeData_executives {
  __typename: 'Spell'
  /**
   *  ID represent the contract address
   */
  id: string
  /**
   *  Timestamp when the spell voted by the first time
   */
  timestamp: any
  /**
   *  Timestamp when the spell is casted
   */
  casted: any | null
  /**
   *  How much MKR it has when the spell is casted
   */
  castedWith: any | null
  /**
   *  Timestamp when the spell is casted
   */
  lifted: any | null
  /**
   *  How much MKR it has when the spell is lifted to hat
   */
  liftedWith: any | null
}

export interface getHomeData_voters {
  __typename: 'Action'
  id: string
  /**
   *  Action timestamp as seconds (time)
   */
  timestamp: any
  /**
   *  Action value (arg)
   */
  wad: any | null
  /**
   *  Action name (act)
   */
  type: ActionType
}

export interface getHomeData_lock {
  __typename: 'Action'
  id: string
  /**
   *  Action timestamp as seconds (time)
   */
  timestamp: any
  /**
   *  Action value (arg)
   */
  wad: any | null
  /**
   *  Action name (act)
   */
  type: ActionType
}

export interface getHomeData_free {
  __typename: 'Action'
  id: string
  /**
   *  Action timestamp as seconds (time)
   */
  timestamp: any
  /**
   *  Action value (arg)
   */
  wad: any | null
  /**
   *  Action name (act)
   */
  type: ActionType
}

export interface getHomeData {
  polls: getHomeData_polls[]
  executives: getHomeData_executives[]
  voters: getHomeData_voters[]
  lock: getHomeData_lock[]
  free: getHomeData_free[]
}

export interface getHomeDataVariables {
  voters: number
  executives: number
  polls: number
  lock: number
  free: number
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GovernanceInfo
// ====================================================

export interface GovernanceInfo_governanceInfo {
  __typename: 'GovernanceInfo'
  id: string
  countProxies: any
  countAddresses: any
  countSlates: any
  countSpells: any
  countLock: any
  countFree: any
  countPolls: any
  locked: any
  lastBlock: any
  lastSynced: any
  hat: any
}

export interface GovernanceInfo {
  governanceInfo: GovernanceInfo_governanceInfo | null
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPollsInfo
// ====================================================

export interface GetPollsInfo_governanceInfo {
  __typename: 'GovernanceInfo'
  countPolls: any
}

export interface GetPollsInfo {
  governanceInfo: GetPollsInfo_governanceInfo | null
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPollsData
// ====================================================

export interface GetPollsData_polls {
  __typename: 'Poll'
  id: string
  creator: any | null
  url: string | null
  pollId: any
  startDate: any
  endDate: any
}

export interface GetPollsData {
  polls: GetPollsData_polls[]
}

export interface GetPollsDataVariables {
  polls: number
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: executivesDetail
// ====================================================

export interface executivesDetail {
  __typename: 'Spell'
  /**
   *  ID represent the contract address
   */
  id: string
  /**
   *  Timestamp when the spell voted by the first time
   */
  timestamp: any
  /**
   *  Timestamp when the spell is casted
   */
  casted: any | null
  /**
   *  How much MKR it has when the spell is casted
   */
  castedWith: any | null
  /**
   *  Timestamp when the spell is casted
   */
  lifted: any | null
  /**
   *  How much MKR it has when the spell is lifted to hat
   */
  liftedWith: any | null
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: makerGovernanceDetail
// ====================================================

export interface makerGovernanceDetail {
  __typename: 'GovernanceInfo'
  id: string
  countProxies: any
  countAddresses: any
  countSlates: any
  countSpells: any
  countLock: any
  countFree: any
  countPolls: any
  locked: any
  lastBlock: any
  lastSynced: any
  hat: any
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: actionsDetail
// ====================================================

export interface actionsDetail {
  __typename: 'Action'
  id: string
  /**
   *  Action timestamp as seconds (time)
   */
  timestamp: any
  /**
   *  Action value (arg)
   */
  wad: any | null
  /**
   *  Action name (act)
   */
  type: ActionType
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: pollsDetail
// ====================================================

export interface pollsDetail {
  __typename: 'Poll'
  id: string
  creator: any | null
  url: string | null
  pollId: any
  startDate: any
  endDate: any
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ActionType {
  CRETATE_EXECUTIVE_VOTE = 'CRETATE_EXECUTIVE_VOTE',
  CRETATE_POLL_VOTE = 'CRETATE_POLL_VOTE',
  FREE = 'FREE',
  LIFT = 'LIFT',
  LOCK = 'LOCK',
  VOTE = 'VOTE',
  VOTER = 'VOTER',
}

//==============================================================
// END Enums and Input Objects
//==============================================================
