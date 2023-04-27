# Dapp
简单Dapp开发，会议报名登记系统的基本功能与实现
实验六：简单Dapp的开发
一、实验概述 DApp（Decentralized Application）去中心化应用，自P2P网络出现以来就已经存在，是一种运行在计算机P2P网络而不是单个计算机上的应用程序。DApp以一种不受任何单个实体控制的方式存在于互联网中。在区块链技术产生之前，BitTorrent，Popcorn Time，BitMessage等都是运行在P2P网络上的DApp，随着区块链技术的产生和发展，DApp有了全新的载体和更广阔的发展前景。DApp应具备代码开源、激励机制、非中心化共识和无单点故障四个要素，而最为基本的DApp结构即为前端+智能合约形式。
本实验以以太坊为基础，首先用Solidity语言编写实现会议报名登记功能的智能合约，加深编写智能合约的能力；之后学习以太坊私有链的搭建、以及合约在私有链上的部署，从而脱离Remix，学习更为强大的Truffle开发组件；进而学习web3.js库，实现前端对智能合约的调用，构建完整的DApp；最后可对该DApp加入个性化机制，例如加入Token机制等，作为实验选做项。该实验实现了一个简单的DApp，但包含了DApp开发的必备流程，为将来在以太坊上进行应用开发打下了基础。 
实验内容概述如下：
A. 编写实现会议报名功能的智能合约（发起会议，注册，报名会议，委托报名，事件触发）
B. 利用Truffle套件将合约部署到以太坊私有链（私有链搭建，合约部署，合约测试）
C. 利用web3.js实现前端对合约的调用（账户绑定、合约ABI、RPC调用）
D. 拓展实验1：为DApp加入ETH抵押机制；
拓展实验2：实现n-m门限委托报名机制。
![PI_8F(4P6K{B_NCG Z6WSHJ](https://user-images.githubusercontent.com/69901557/234840533-fa17b842-ac0d-40e5-bc66-43c3ade072a9.png)
# DApp前端部分
需补充代码：
1. src/contracts/contract.js 补充合约信息

2. src/component/xx组件/index.js 补充web3交互代码，其中conflist和signup中有简单的样例

  

  补充完相应代码后，先运行：

  `npm install`

  安装好所有依赖后，再运行：

  `npm start`
  即可将该前端运行在浏览器上

