import { vi } from "vitest";
import { AlloV1 } from "./allo-v1";
import { zeroAddress, Hex } from "viem";
import { createMockTransactionSender } from "../transaction-sender";
import { success } from "../common";
import { Allo } from "../allo";
import { AlloV2 } from "./allo-v2";

const ipfsUploader = vi.fn().mockResolvedValue(success("ipfsHash"));
const waitUntilIndexerSynced = vi.fn().mockResolvedValue(success(null));
const projectRegistryAddress = zeroAddress;
const chainId = 1;

const transactionSender = createMockTransactionSender();
export const zeroTxHash = ("0x" + "0".repeat(64)) as Hex;

export const alloV1: Allo = new AlloV1({
  chainId,
  projectRegistryAddress,
  ipfsUploader,
  transactionSender,
  waitUntilIndexerSynced,
});

export const alloV2: Allo = new AlloV2({
  chainId,
  projectRegistryAddress, // todo: not used
  ipfsUploader,
  transactionSender,
  waitUntilIndexerSynced,
});

export const getAllo = (version: string): Allo => {
  switch (version) {
    case "allo-v1":
      return alloV1;
    case "allo-v2":
      return alloV2;
    default:
      throw new Error(`Unknown Allo version: ${version}`);
  }
};
