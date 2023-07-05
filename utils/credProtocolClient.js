export const getCreditScore = async (ethAddress) => {
    const apiKey = process.env.CREDPROTOCOL_API_KEY;  
    const requestUrl = `https://beta.credprotocol.com/api/score/address/${ethAddress}`;
  
    try {
      console.log("GETTING...");
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${apiKey}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 422) {
          alert("You have insufficient on-chain data to have a credit-score. Try connecting a wallet with more on-chain activity, then try again.");
        } else {
          throw new Error('Failed to fetch credit score from cred protocol:');
        }
      }
  
      const data = await response.json();
      console.log('data', data);
      return data;
      
    } catch (error) {
      console.error('Failed to fetch credit score from cred protocol:', error);
      throw error;
    }

  };
