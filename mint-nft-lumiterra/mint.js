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
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    },
    {
        address: 'Masukan adress disini',
        privateKey: 'Masukan Private key disini'
    }
];

const inviteCode = "your-invite-code";

async function main() {
    for (const wallet of wallets) {
        await claimNFT(wallet, inviteCode);
    }
}

main().catch(console.error);
