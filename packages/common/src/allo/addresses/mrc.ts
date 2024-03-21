import { ChainId } from "../../chain-ids";
import { Hex } from "viem";

export const MRC_CONTRACTS: Record<ChainId, Hex> = {
  // FIXME: update dev addresses when we deploy the contract to the local chain
  [ChainId.DEV1]: "0x0000000000000000000000000000000000000000",
  [ChainId.DEV2]: "0x0000000000000000000000000000000000000000",
  [ChainId.MAINNET]: "0x3bA9DF642f5e895DC76d3Aa9e4CE8291108E65b1",
  [ChainId.PGN]: "0x03506eD3f57892C85DB20C36846e9c808aFe9ef4",
  [ChainId.PGN_TESTNET]: "0x4268900E904aD87903De593AA5424406066d9ea2",
  [ChainId.FANTOM_MAINNET_CHAIN_ID]:
    "0x03506eD3f57892C85DB20C36846e9c808aFe9ef4",
  [ChainId.OPTIMISM_MAINNET_CHAIN_ID]:
    "0x15fa08599EB017F89c1712d0Fe76138899FdB9db",
  [ChainId.FANTOM_TESTNET_CHAIN_ID]:
    "0x62a850d7805f3Ae382C6eEf7eEB89A31f68Ce2d5",
  [ChainId.ARBITRUM_GOERLI]: "0x8e1bD5Da87C14dd8e08F7ecc2aBf9D1d558ea174",
  [ChainId.ARBITRUM]: "0x8e1bD5Da87C14dd8e08F7ecc2aBf9D1d558ea174",
  [ChainId.FUJI]: "0x8e1bD5Da87C14dd8e08F7ecc2aBf9D1d558ea174",
  [ChainId.AVALANCHE]: "0xe04d9e9CcDf65EB1Db51E56C04beE4c8582edB73",
  [ChainId.POLYGON]: "0xe04d9e9CcDf65EB1Db51E56C04beE4c8582edB73",
  [ChainId.POLYGON_MUMBAI]: "0x8e1bD5Da87C14dd8e08F7ecc2aBf9D1d558ea174",
  [ChainId.BASE]: "0x7C24f3494CC958CF268a92b45D7e54310d161794",
  [ChainId.SEPOLIA]: "0xa54A0c7Bcd37745f7F5817e06b07E2563a07E309",
  [ChainId.SCROLL]: "0x8Bd6Bc246FAF14B767954997fF3966CD1c0Bf0f5",
};
