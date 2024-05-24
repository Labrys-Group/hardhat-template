import { task } from "hardhat/config";

task("verify", "Verifies all deployed contracts for a network", async (_taskArgs, hre) => {
  const deployments = await hre.deployments.all();

  await Promise.all(
    Object.entries(deployments).map(async ([name, { address, args }]) => {
      console.log(name, ":", address, args);

      await hre.run("verify:verify", {
        address,
        constructorArguments: args,
      });
    }),
  );
});
