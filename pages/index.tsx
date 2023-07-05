import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import { issueCredential } from "../utils/discoClient";
import { getCreditScore } from "../utils/credProtocolClient";

import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

import 'react-toastify/dist/ReactToastify.css';



const Home: NextPage = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [creditScore, setCreditScore] = useState('');
  const [creditRating, setCreditRating] = useState('');
  const [summary, setSummary] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    issueCreditCredential(recipient || '', creditScore, creditRating)
  };

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
        setModalIsOpen(true);
      }
  
    } catch (error) {
      console.error('Failed to issue credential:', error);
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
          Cred Protocol Digital Asset Credit Score
        </h1> 
        <h3> 
          Click the button to get your score. The Cred Score is a decentralized credit score is based on your onchain activity. 
          <br/>
          This score quantifies your onchain creditworthiness. Your score will be private until you make it public in Disco.
        </h3>

        <Button loading={false} onClick={() => fetchCredit(accountData?.address || "")}> 
          Get my Score
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
          <div> <strong>{summary} </strong> </div>
        </div>
      </Layout>

      

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
        content: {
          width: '50%',
          margin: '0 auto',
        },
      }}>
        <button onClick={() => setModalIsOpen(false)} className="close-button">
            x
        </button>
        <h2> {summary} </h2>
        {modalContent}
      </Modal>
    </>
  );
};

export default Home;




const modalContent = (
  <div>
    <h1 className="header">
        Manage your score in{' '}
        <a href="https://app.disco.xyz" className="text-blue-500">
          Disco.
        </a>
      </h1>
      <br/>
      <p>Remember to mark your credential PUBLIC to use it in other apps!</p>
  </div>
);