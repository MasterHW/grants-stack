import { Chain } from "wagmi/chains";
import {
  __deprecated_RoundsQueryVariables,
  __deprecated_TimestampVariables,
  useRounds,
} from "../../api/rounds";
import { createRoundsStatusFilter } from "../utils/createRoundsStatusFilter";
import { ROUND_PAYOUT_MERKLE } from "common";
import { SWRResponse } from "swr";
import { OrderByRounds, RoundGetRound } from "data-layer";

export type RoundFilterParams = {
  type: string;
  status: string;
  network: string;
};

export type RoundSortParams = {
  orderBy: OrderByRounds;
};

export type RoundSelectionParams = RoundSortParams & RoundFilterParams;

export type RoundSortUiOption = {
  label: string;
  orderBy: OrderByRounds;
};

export type RoundFilterUiOption = {
  label: string;
  value: string;
  hide?: boolean;
  children?: RoundFilterUiOption[];
};

export enum RoundStatus {
  active = "active",
  taking_applications = "taking_applications",
  finished = "finished",
  ending_soon = "ending_soon",
}

export const ACTIVE_ROUNDS_FILTER: RoundSelectionParams = {
  orderBy: "MATCH_AMOUNT_DESC",
  status: RoundStatus.active,
  type: ROUND_PAYOUT_MERKLE,
  network: "",
};

export const ROUNDS_ENDING_SOON_FILTER: RoundSelectionParams & {
  first: number;
} = {
  first: 3,
  orderBy: "DONATIONS_END_TIME_ASC",
  type: "",
  network: "",
  status: RoundStatus.ending_soon,
};

export const useFilterRounds = (
  filter: RoundSelectionParams,
  chains: Chain[]
): SWRResponse<RoundGetRound[]> => {
  const chainIds =
    filter.network === undefined || filter.network.trim() === ""
      ? chains.map((c) => c.id)
      : filter.network.split(",").map(parseInt);
  const statusFilter = createRoundsStatusFilter(filter.status);
  const strategyNames =
    filter.type === undefined || filter.type.trim() === ""
      ? []
      : filter.type.split(",");
  const where = createRoundWhereFilter(statusFilter, strategyNames);
  const orderBy =
    filter.orderBy === undefined ? "CREATED_AT_BLOCK_DESC" : filter.orderBy;

  return useRounds({ orderBy, filter }, chainIds);
};

const createRoundWhereFilter = (
  statusFilter: __deprecated_TimestampVariables[],
  strategyNames: string[]
): __deprecated_RoundsQueryVariables["filter"] => {
  const payoutStrategy = strategyNames.length
    ? strategyNames.map((strategyName) => ({ strategyName }))
    : undefined;

  return {
    and: [
      // Find rounds that match both statusFilter and round type
      { or: statusFilter },
      { payoutStrategy_: payoutStrategy ? { or: payoutStrategy } : undefined },
    ],
  };
};

export const getRoundSelectionParamsFromUrlParams = (
  params: URLSearchParams
): RoundSelectionParams => {
  // TODO parse url params explicitly
  const filter = Object.fromEntries(params) as RoundSortParams &
    RoundFilterParams;

  return filter;
};
