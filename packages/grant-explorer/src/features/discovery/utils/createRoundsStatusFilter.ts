import { RoundStatus } from "../hooks/useFilterRounds";
import { TimeFilterVariables } from "data-layer";

export const createTimestamp = (timestamp = 0) => {
  const NOW_IN_SECONDS = Date.now();
  return new Date(Math.floor(NOW_IN_SECONDS + timestamp)).toISOString();
};

const ONE_DAY_IN_SECONDS = 3600 * 24;
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS * 365;

function getStatusFilter(status: string): TimeFilterVariables {
  const currentTimestamp = createTimestamp();
  const futureTimestamp = createTimestamp(ONE_YEAR_IN_SECONDS);

  switch (status) {
    case RoundStatus.active:
      return {
        // Round must have started and not ended yet
        donationsStartTime: { lessThan: currentTimestamp },
        donationsEndTime: {
          greaterThan: currentTimestamp,
          lessThan: futureTimestamp,
        },
      };
    case RoundStatus.taking_applications:
      return {
        applicationsStartTime: { lessThanOrEqualTo: currentTimestamp },
        applicationsEndTime: { greaterThanOrEqualTo: currentTimestamp },
      };

    case RoundStatus.finished:
      return {
        donationsEndTime: { lessThan: currentTimestamp },
      };
    case RoundStatus.ending_soon:
      return {
        donationsEndTime: {
          greaterThan: currentTimestamp,
          lessThan: createTimestamp(ONE_DAY_IN_SECONDS * 30),
        },
      };
    default:
      return {};
  }
}

export function createRoundsStatusFilter(
  status: string
): TimeFilterVariables[] {
  // Default to all filters
  const selectedFilters =
    status ||
    [
      RoundStatus.active,
      RoundStatus.taking_applications,
      RoundStatus.finished,
    ].join(",");

  // Build a filter array: [activeFilter, takingApplicationsFilter]
  return selectedFilters?.split(",").filter(Boolean).map(getStatusFilter);
}
