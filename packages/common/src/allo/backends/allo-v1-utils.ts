import { Project } from "../../types";

export const getProjectURIComponents = (id: string) => {
  const split = id.split(":");
  return {
    chainId: split[0],
    registryAddress: split[1],
    id: split[2],
  };
};

export const metadataToProject = (
  m: Record<string, any>,
  lastUpdated: number
): Project => {
  const p: Project = {
    lastUpdated,
    createdAt: m.createdAt,
    id: String(m.id),
    title: m.title,
    description: m.description,
    website: m.website,
    bannerImg: m.bannerImg!,
    logoImg: m.logoImg!,
    metaPtr: {
      protocol: String(m.protocol),
      pointer: m.pointer,
    },
    userGithub: m.userGithub,
    projectGithub: m.projectGithub,
    projectTwitter: m.projectTwitter,
    credentials: m.credentials,
  };

  return p;
};
