import { gql } from "graphql-request";

/**
 * Manager: Get all the programs that a user is a part of
 * @param $address - The address of the user
 * @param $chainId - The network ID of the chain
 * @param $tag - The tag of the program
 *
 * @returns The programs
 */
export const getProgramsByUserAndTag = gql`
  query ($userAddress: String!, $chainId: Int!, $tags: [String!]!) {
    projects(
      filter: {
        tags: { contains: $tags }
        chainId: { equalTo: $chainId }
        roles: { some: { address: { equalTo: $userAddress } } }
      }
    ) {
      id
      chainId
      metadata
      metadataCid
      tags
      createdByAddress
      roles {
        address
        role
        createdAtBlock
      }
    }
  }
`;

/**
 * Get a program by its programId
 * @param $alloVersion - The version of Allo
 * @param $programId - The ID of the program
 * @param $chainId - The network ID of the chain
 *
 * @returns The programs
 */
export const getProgramById = gql`
  query ($programId: String!, $chainId: Int!) {
    projects(
      filter: { id: { equalTo: $programId }, chainId: { equalTo: $chainId } }
    ) {
      id
      chainId
      metadata
      metadataCid
      tags
      createdByAddress
      roles {
        address
        role
        createdAtBlock
      }
    }
  }
`;

/**
 * Get a project by its ID
 * @param $alloVersion - The version of Allo
 * @param $projectId - The ID of the project
 *
 * @returns The project
 */
export const getProjectById = gql`
  query ($alloVersion: [String!]!, $projectId: String!) {
    projects(
      filter: {
        tags: { equalTo: $alloVersion }
        not: { tags: { contains: "program" } }
        id: { equalTo: $projectId }
      }
    ) {
      id
      chainId
      metadata
      metadataCid
      name
      nodeId
      projectNumber
      registryAddress
      tags
      nonce
      anchorAddress
      projectType
      roles {
        address
        role
        createdAtBlock
      }
    }
  }
`;

/**
 * Get a project by its ID and chainId
 * @param $projectId - The ID of the project
 * @param $chainId - The chainId
 *
 * @returns The project
 */
export const getProjectAnchorByIdAndChainId = gql`
  query ($projectId: String!, $chainId: Int!) {
    project(id: $projectId, chainId: $chainId) {
      anchorAddress
    }
  }
`;

/**
 * Get a getLegacyProjectId by its ID
 * @param $projectId - The Allo v2 ID of the project
 *
 * @returns The project
 */
export const getLegacyProjectId = gql`
  query ($projectId: String!) {
    legacyProjects(filter: { v2ProjectId: { equalTo: $projectId } }) {
      v1ProjectId
    }
  }
`;

/**
 * Get projects by their address
 * @param $alloVersion - The version of Allo
 * @param $first - The number of projects to return
 * @param $chainId - The network ID of the chain
 *
 * @returns The project[]
 */
export const getProjects = gql`
  query getProjectsQuery(
    $alloVersion: [String!]!
    $first: Int!
    $chainId: Int!
  ) {
    projects(
      filter: {
        tags: { equalTo: $alloVersion }
        not: { tags: { contains: "program" } }
      }
      first: $first
      condition: { chainId: $chainId }
    ) {
      id
      chainId
      metadata
      metadataCid
      name
      nodeId
      projectNumber
      registryAddress
      tags
      nonce
      anchorAddress
      projectType
    }
  }
`;

export const getApplicationsByProjectIds = gql`
  query getApplicationsByProjectIds(
    $projectIds: [String!]!
    $chainIds: [Int!]!
  ) {
    applications(
      filter: { projectId: { in: $projectIds }, chainId: { in: $chainIds } }
    ) {
      id
      projectId
      chainId
      roundId
      status
      metadataCid
      metadata
      totalDonationsCount
      totalAmountDonatedInUsd
      uniqueDonorsCount
      round {
        applicationsStartTime
        applicationsEndTime
        donationsStartTime
        donationsEndTime
        roundMetadata
        strategyName
      }
    }
  }
`;

export const getApplicationsForManager = gql`
  query getApplicationsForManager($chainId: Int!, $roundId: String!) {
    applications(
      filter: { roundId: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
    ) {
      id
      projectId
      chainId
      roundId
      status
      metadataCid
      metadata
      distributionTransaction
      statusSnapshots
      round {
        strategyName
        strategyAddress
      }
      canonicalProject {
        roles {
          address
        }
      }
    }
  }
`;

export const getApplicationStatusByRoundIdAndCID = gql`
  query getApplicationStatusByRoundIdAndCID(
    $roundId: String!
    $chainId: Int!
    $metadataCid: String!
  ) {
    applications(
      filter: {
        roundId: { equalTo: $roundId }
        chainId: { equalTo: $chainId }
        metadataCid: { equalTo: $metadataCid }
      }
    ) {
      status
    }
  }
`;

export const getApplication = gql`
  query Application(
    $chainId: Int!
    $applicationId: String!
    $roundId: String!
  ) {
    application(chainId: $chainId, id: $applicationId, roundId: $roundId) {
      id
      chainId
      roundId
      projectId
      status
      totalAmountDonatedInUsd
      uniqueDonorsCount
      round {
        strategyName
        donationsStartTime
        donationsEndTime
        applicationsStartTime
        applicationsEndTime
        matchTokenAddress
        roundMetadata
      }
      metadata
      project {
        tags
        id
        metadata
      }
    }
  }
`;

export const getApplicationsByRoundIdAndProjectIds = gql`
  query Application(
    $chainId: Int!
    $roundId: String!
    $projectIds: [String!]!
  ) {
    applications(
      filter: {
        chainId: { equalTo: $chainId }
        roundId: { equalTo: $roundId }
        projectId: { in: $projectIds }
      }
    ) {
      id
      projectId
      chainId
      roundId
      status
      metadataCid
      metadata
      round {
        applicationsStartTime
        applicationsEndTime
        donationsStartTime
        donationsEndTime
        roundMetadata
      }
    }
  }
`;

/**
 * Get projects by their address
 * @param $address - The address of the project
 * @param $chainId - The network ID of the chain
 * @param $role - The role of the project
 *
 * @returns The project[]
 */
// todo: add version
export const getProjectsByAddress = gql`
  query getProjectsByAddressQuery(
    $address: String!
    $chainId: Int!
    $role: ProjectRoleName!
    $version: String!
  ) {
    projectRoles(
      condition: { address: $address, chainId: $chainId, role: $role }
    ) {
      projectId
      project {
        chainId
        createdAtBlock
        registryAddress
        projectNumber
        tags
        nonce
        anchorAddress
        projectType
      }
    }
  }
`;

export const getProjectsAndRolesByAddress = gql`
  query getProjectsAndRolesByAddressQuery(
    $address: String!
    $version: [String!]!
    $chainIds: [Int!]!
  ) {
    projects(
      filter: {
        roles: { every: { address: { equalTo: $address } } }
        tags: { contains: $version }
        not: { tags: { contains: "program" } }
        chainId: { in: $chainIds }
        rolesExist: true
      }
    ) {
      roles {
        role
        address
        projectId
      }
      name
      registryAddress
      chainId
      metadata
      metadataCid
      projectNumber
      tags
      id
      nonce
      anchorAddress
      projectType
      createdAtBlock
      applications {
        id
        metadata
      }
    }
  }
`;

export const getBlockNumberQuery = gql`
  query getBlockNumberQuery($chainId: Int!) {
    {
      subscriptions(
        filter: { chainId: { equalTo: $chainId }, toBlock: { equalTo: "latest" } }
      ) {
        chainId
        indexedToBlock
      }
    }
  }
`;

export const getRoundsQuery = gql`
  query GetRounds(
    $first: Int
    $orderBy: [RoundsOrderBy!]
    $filter: RoundFilter
  ) {
    rounds(first: $first, orderBy: $orderBy, filter: $filter) {
      id
      chainId
      tags
      roundMetadata
      roundMetadataCid
      applicationsStartTime
      applicationsEndTime
      donationsStartTime
      donationsEndTime
      matchAmountInUsd
      matchAmount
      matchTokenAddress
      strategyId
      strategyName
      strategyAddress
      applications(first: 1000, filter: { status: { equalTo: APPROVED } }) {
        id
      }
    }
  }
`;

export const getRoundByIdAndChainId = gql`
  query getRoundByIdAndChainId($roundId: String!, $chainId: Int!) {
    rounds(
      filter: { id: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
    ) {
      id
      chainId
      applicationsStartTime
      applicationsEndTime
      donationsStartTime
      donationsEndTime
      matchTokenAddress
      roundMetadata
      roundMetadataCid
      applicationMetadata
      applicationMetadataCid
      strategyAddress
      strategyName
      readyForPayoutTransaction
      projectId
      roles {
        role
        address
      }
      project {
        id
        name
        metadata
      }
      tags
    }
  }
`;

export const getRoundWithApplications = gql`
  query getRoundWithApplications($roundId: String!, $chainId: Int!) {
    round(id: $roundId, chainId: $chainId) {
      id
      chainId
      applicationsStartTime
      applicationsEndTime
      donationsStartTime
      donationsEndTime
      matchTokenAddress
      roundMetadata
      roundMetadataCid
      applicationMetadata
      applicationMetadataCid
      strategyAddress
      strategyName
      readyForPayoutTransaction
      applications {
        id
        status
        projectId
        metadata
      }
      project {
        id
      }
      roles {
        role
        address
      }
      strategyId
      strategyAddress
      strategyName
      project {
        id
        name
      }
    }
  }
`;

const getRoundForManagerFields = `
  id
  chainId
  applicationsStartTime
  applicationsEndTime
  donationsStartTime
  donationsEndTime
  matchTokenAddress
  roundMetadata
  roundMetadataCid
  applicationMetadata
  applicationMetadataCid
  strategyAddress
  strategyName
  readyForPayoutTransaction
  projectId
  matchAmount
  matchAmountInUsd
  createdByAddress
  fundedAmount
  fundedAmountInUsd
  matchingDistribution
  roles {
    role
    address
    createdAtBlock
  }
  tags
  project {
    id
    name
    metadata
  }
`;

export const getRoundForManager = gql`
  query getRoundForManager($roundId: String!, $chainId: Int!) {
    rounds(
      filter: { id: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
    ) {
      ${getRoundForManagerFields}
    }
  }
`;

export const getRoundsForManager = gql`
  query getRoundsForManager($chainId: Int!, $programId: String!) {
    rounds(
      filter: {
        chainId: { equalTo: $chainId }
        projectId: { equalTo: $programId }
      }
    ) {
      ${getRoundForManagerFields}
    }
  }
`;

export const getRoundByIdAndChainIdWithApprovedApplications = gql`
  query getRoundByIdAndChainIdWithApprovedApplications(
    $roundId: String!
    $chainId: Int!
  ) {
    rounds(
      filter: { id: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
    ) {
      id
      chainId
      applicationsStartTime
      applicationsEndTime
      donationsStartTime
      donationsEndTime
      matchTokenAddress
      roundMetadata
      roundMetadataCid
      applicationMetadata
      applicationMetadataCid
      strategyId
      projectId
      strategyAddress
      strategyName
      readyForPayoutTransaction
      applications(filter: { status: { equalTo: APPROVED } }) {
        id
        projectId
        status
        metadata
        project {
          id
          metadata
          anchorAddress
        }
      }
    }
  }
`;
