import React from "react";
import { IGapGrant } from "../../api/gap";
import { Flex } from "@chakra-ui/react";

interface CompletionBadgeProps {
  milestones: IGapGrant["milestones"];
}

export const GrantCompletionBadge: React.FC<CompletionBadgeProps> = ({
  milestones,
}) => {
  const percent =
    milestones.length > 0
      ? Math.floor(
          (milestones.reduce((acc, cur) => (acc += +!!cur.completed), 0) /
            milestones.length) *
            100
        )
      : 0;

  return (
    <Flex
      bg={percent === 100 ? "green.200" : "gray.200"}
      borderRadius="3xl"
      px={3}
      py={1}
      mb="1px"
      alignItems="center"
    >
      <small>{percent}% Complete</small>
    </Flex>
  );
};
