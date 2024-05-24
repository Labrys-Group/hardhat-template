import { parseEther } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const NAME = "MyToken";
const SYMBOL = "MTT";
const TOTAL_SUPPLY = parseEther("1000000");

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const token = await deploy("Token", {
    from: deployer,
    args: [NAME, SYMBOL, TOTAL_SUPPLY],
    log: true,
  });

  console.log(`${NAME}(${SYMBOL}):`, token.address);
};
export default func;
func.tags = ["testbed", "Token"];
