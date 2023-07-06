# Disco x Cred Protocol Digital Asset Score Demo 🕺🔮

<!-- ### Check out the live demo 👉 [NextJS wagmi](https://nextjs-wagmi.vercel.app/) -->

## Overview
Simple next.js app which pings the [Cred Protocol](https://www.credprotocol.com/) API and fetches details about an account's on-chain score (value + value rating), and issues this as a Digital Asset [Credential](https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/DigitalAssetScoreCredential/1-0-0.json) to the connected wallet's Disco Data Backpack.

## How to use this template

### 1. Clone this app
```
git clone https://github.com/discoxyz/.git
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Grab Disco API Key

Self-service API keys are now available to profiles with organization credentials. Steps to generating a key are [here](https://disco.mirror.xyz/8AkcZERU2amKqb5cQj3GLoFDtxDm0uwi-Zp_m5_L5hM).

Add this to .env.local:

```bash
DISCO_API_KEY=<insert api key>
```

### 4. Credential Issuance
In index.ts, replace the following line with the schema URL of your choice. If there is metadata, pass in a `subjectData: {}` JSON object as the third argument to issueCredential.

```javascript
55 const schemaUrl = 'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/DigitalAssetScoreCredential/1-0-0.json';
```
All schemas can be found here: https://github.com/discoxyz/disco-schemas.

In `discoClient.js`, we are making the request to the Disco API, feel free to modify the request/response logic here.

### 5. Start the local development environment
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Connect Wallet, and Click Issue GM Credential! Go to [app.disco.xyz](app.disco.xyz) to see the credential in your inbox, almost instantaneously.

## Resources

- [Learn about Disco](https://docs.disco.xyz) - all things Disco!
- [Disco API reference](https://docs.disco.xyz/v2/for-developers/get-started-with-discos-api/) - Disco API Reference
- [Disco Bounties and References ](https://docs.disco.xyz/v2/for-developers/bounties-and-examples) - Bounties and Reference Apps
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

<!-- UP NEXT!! ## Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSeth-McKilla%2Fnextjs-wagmi&env=NEXT_PUBLIC_INFURA_ID)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. --> 
