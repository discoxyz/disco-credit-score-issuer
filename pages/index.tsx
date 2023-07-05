import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import { issueCredential } from "../utils/discoClient";
import { getCreditScore } from "../utils/credProtocolClient";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [creditScore, setCreditScore] = useState('');
  const [creditRating, setCreditRating] = useState('');

  const [summary, setSummary] = useState('');
  const loading = (accountLoading);

  const fetchCredit = async (recipient: string) => {
    const data = await getCreditScore(recipient);
    
    if (data.value && data.value_rating) {
      setCreditScore(data.value as string);
      setCreditRating(data.value_rating);
    } else {
      setCreditRating("N/A");
      setCreditScore("N/A");
    }
  };

  useEffect(() => {
    console.log({ creditScore });
    console.log({ creditRating });
    
    setSummary(`Your credit score is: ${creditScore} with a rating of ${creditRating}`);
  }, [creditScore, creditRating]);

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
  

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Welcome to the Disco Digital Asset Demo.
        </h1> 
        <h3> 
          Click the button below to check your Digital Asset Score
        </h3>

        <Button loading={false} onClick={() => fetchCredit(accountData?.address || "")}> 
          Click to check Digital Asset Credit Score
        </Button>

        <Button
          loading={accountLoading}
          onClick={() => issueCreditCredential(accountData?.address || '', creditScore, creditRating)}
        >
          Receive Digital Asset Score Credential
        </Button>
      </>
    );
  };

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
          <div> {summary} </div>
        </div>
      </Layout>

      

      <ToastContainer />
    </>
  );
};

export default Home;


const issueCreditCredential = async (recipient: string, creditScore: string, creditRating: string): Promise<void> => {
  const schemaUrl = 'https://raw.githubusercontent.com/discoxyz/disco-schemas/e2e3d4817aa769194e42470bf67d4b30ae3585f9/json/DigitalAssetScoreCredential/1-0-0.json';
  console.log(typeof(creditScore));
  const subjectData = {
    value: `${creditScore}`,
    valueRating: creditRating
  };

  try {
    console.log(`Issuing digital asset score cred to: ${recipient}`);

    const credential = await issueCredential(schemaUrl, recipient, subjectData);
    // console.log('Issued credential:', credential);
    if (credential) { 
      displayToast();
    }

  } catch (error) {
    console.error('Failed to issue credential:', error);
  }
};


const displayToast = () => {
  toast.info(
    <div>
      Credential issued successfully! Visit your data backpack {''}
      <a href="https://app.disco.xyz" className="text-blue-500">
        here
      </a>{' '}
      to see it.
    </div>,
    {
      autoClose: 10000, // Duration in milliseconds (10 seconds)
    }
  );
}