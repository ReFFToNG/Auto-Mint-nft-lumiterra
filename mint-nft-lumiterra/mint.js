const ethers = require('ethers');

const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "inviteCode",
                "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "userDailyMintLimit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "config",
        "outputs": [
            {
                "internalType": "contract IConfig",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0x19f70ecd63f40f11716c3ce2b50a6d07491c12fe";

async function claimNFT(wallet, inviteCode) {
    const provider = new ethers.providers.JsonRpcProvider("https://api.roninchain.com/rpc");
    const signer = new ethers.Wallet(wallet.privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const gasEstimate = await contract.estimateGas.mint(inviteCode);
        const gasPrice = await provider.getGasPrice();
        
        const tx = await contract.mint(inviteCode, {
            gasLimit: gasEstimate,
            gasPrice: gasPrice.mul(2)
        });

        console.log(`Transaksi dikirim dari wallet ${wallet.address}: ${tx.hash}`);
        await tx.wait();
        console.log(`Transaksi dari wallet ${wallet.address} berhasil dikonfirmasi`);
    } catch (err) {
        console.error(`Gagal klaim NFT untuk wallet ${wallet.address}:`, err);
        setTimeout(() => {
            claimNFT(wallet, inviteCode);
        }, 30000);
    }
}

const wallets = [
    {
        address: '0x3050feb6757f2942bfb592e211b447c6eaad13a1',
        privateKey: '0xe47ecbd693ce45b9fc30d57c36e09855c8eeea1e44ace441121136caf0507a10'
    },
    {
        address: '0xd3a51665061e1424530d403aba589cb827395421',
        privateKey: '0x602a4a312563a621016f7c10c223241a3b91e6b35d782beaaf9c7abc65e0b86d'
    },
    {
        address: '0x018f3e2d38132938753e16d973ab4fc71abc53a8',
        privateKey: '0x4e746a06cdb0eb4ecb7f251da8485eafe0206ef6532f93bea0a1d1ebdb6a5141'
    },
    {
        address: '0xcc2a2dd8874dbebe21cf784fe8623e8707b2685d',
        privateKey: '0xeee19d1cd2536fc6be4f0e6097d026d45149f16456f6d1a3a3171629bae448ff'
    },
    {
        address: '0x1fbaf5308e025749987a5ea9c76d88fc08e68ace',
        privateKey: '0x56a0de274915414ed3e81fc6e14daea4af520a6ae2da662ab63b8e49146de551'
    },
    {
        address: '0xc1dbbbad6133241e3efc0bb74e8d62b639db84d1',
        privateKey: '0x2241a0a85f3cdd13ca353272fedaef8d46a1c4c023600ffb30f303efe6879813'
    },
    {
        address: '0x1f5243e117f38dc6ae29acefef2bbc17e5f0c72c',
        privateKey: '0x705e4ab0e320189964d824e906af097ef674db8205a74ccabd0944cb45050fd2'
    }
];

const inviteCode = "your-invite-code";

async function main() {
    for (const wallet of wallets) {
        await claimNFT(wallet, inviteCode);
    }
}

main().catch(console.error);
