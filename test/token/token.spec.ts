import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers";
import { ethers } from "hardhat";

import { Token__factory } from "../../types";

describe("Token", () => {
  let deployer: SignerWithAddress;
  let tokenFactory: Token__factory;

  before(async () => {
    [deployer] = await ethers.getSigners();
    tokenFactory = (await ethers.getContractFactory("Token")) as Token__factory;
  });

  describe("constructor", () => {
    it("should deploy with token name", async () => {
      const token = await tokenFactory.deploy("MyToken", "MTT", parseEther("1000000"));
      await token.waitForDeployment();

      expect(await token.name()).to.equal("MyToken");
    });

    it("should deploy with token symbol", async () => {
      const token = await tokenFactory.deploy("MyToken", "MTT", parseEther("1000000"));
      await token.waitForDeployment();

      expect(await token.symbol()).to.equal("MTT");
    });

    it("should deploy with token total supply", async () => {
      const token = await tokenFactory.deploy("MyToken", "MTT", parseEther("1000000"));
      await token.waitForDeployment();

      expect(await token.totalSupply()).to.equal(parseEther("1000000"));
    });

    it("should mint supply to caller", async () => {
      const token = await tokenFactory.deploy("MyToken", "MTT", parseEther("1000000"));
      await token.waitForDeployment();

      expect(await token.balanceOf(deployer.address)).to.equal(parseEther("1000000"));
    });
  });
});
