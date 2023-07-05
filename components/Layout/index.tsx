import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Button, MenuDropdown, WalletOptionsModal } from "..";
import { useAccount } from "wagmi";

interface Props {
  children: ReactNode;
  showWalletOptions: boolean;
  setShowWalletOptions: (showWalletOptions: boolean) => void;
}

export default function Layout(props: Props) {
  const { children, showWalletOptions, setShowWalletOptions } = props;

  const [{ data: accountData, loading }, disconnect] = useAccount({
    fetchEns: true,
  });

  const renderLabel = () => {
    if (accountData?.ens) {
      return (
        <>
        </>
      );
    }

    return (
      <span className="truncate max-w-[150px]">{accountData?.address}</span>
    );
  };

  const renderButton = () => {
    if (accountData) {
      return (
        <MenuDropdown
          label={renderLabel()}
          options={[{ label: "Disconnect", onClick: disconnect }]}
        />
      );
    }

    return (
      <Button
        loading={loading || showWalletOptions}
        onClick={() => setShowWalletOptions(true)}
      >
        Connect Wallet
      </Button>
    );
  };

  return (
    <div>
      <Head>
        <title> Cred Protocol x Disco Integration </title>
        <meta name="description" content="Disco Wagmi Template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <div className="absolute w-screen bg-gradient-to-r from-indigo-500 from-10%">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h4 className="text-2xl font-bold text-white cursor-default">
            Cred Protocol x Disco Integration
            </h4>
          </div>
          {renderButton()}
        </div>
      </div>
      {children}
    </div>
  );
}
