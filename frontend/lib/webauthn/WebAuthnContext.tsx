import { DEPLOY_PRIVATE_KEY, provider } from "./constants/ethers";
import metadata from "./contracts/WebauthnWalletABI.json";
import { BigNumber, ethers } from "ethers";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import * as CBOR from "./utils/cbor";
import * as Helper from "./utils/helpers";

export interface IWebAuthnContext {
  wAddress: string | null;
  uuid: string | null;
  chanllenge: string | null;
  signIn: () => Promise<PublicKeyCredential>;
  signOut: () => void;
}

export const WebAuthnContext = createContext({} as IWebAuthnContext);

export const useWebAuthn = () => useContext(WebAuthnContext);

export const WebAuthnProvider = ({ children }: PropsWithChildren) => {
  const [wAddress, setAddress] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("wallet_address")
  );
  const [uuid, setUUID] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("webauthn.uuid")
  );
  const [chanllenge, setChanllenge] = useState(
    typeof window !== "undefined" &&
      window.localStorage.getItem("webauthn.chanllenge")
  );

  const value: IWebAuthnContext = {
    //@ts-ignore
    wAddress,
    //@ts-ignore
    uuid,
    //@ts-ignore
    chanllenge,
    signIn: async () => {
      // if (window.localStorage.getItem("webauthn.chanllenge")) {
      //   alert("Credential exists");

      //   throw new Error("Credential exists");
      // }

      const private_key = DEPLOY_PRIVATE_KEY;
      const wallet = new ethers.Wallet(private_key, provider);

      const price = ethers.utils.formatUnits(
        await provider.getGasPrice(),
        "gwei"
      );

      console.log(price);
      console.log(metadata);

      const factory = new ethers.ContractFactory(
        metadata.abi,
        metadata.bytecode.object,
        wallet
      );

      const uuid = crypto.randomUUID();
      const chanllenge = crypto.randomUUID();

      const publicKeyCredential = await navigator.credentials.create({
        publicKey: {
          challenge: Uint8Array.from(chanllenge, (c) => c.charCodeAt(0)),
          rp: {
            name: "Porton Wallet",
          },
          user: {
            id: Uint8Array.from(uuid, (c) => c.charCodeAt(0)),
            name: "portonwallet",
            displayName: "Porton Wallet",
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "none",
        },
      });

      if (publicKeyCredential === null) {
        alert("Failed to get credential");

        throw new Error("Failed to create credential");
      }

      console.log("SUCCESS", publicKeyCredential);

      //console.log('ClientDataJSON: ', bufferToString(newCredentialInfo.response.clientDataJSON))
      let attestationObject = CBOR.decode(
        (publicKeyCredential as any).response.attestationObject,
        undefined,
        undefined
      );

      //console.log('AttestationObject: ', attestationObject)
      let authData = Helper.parseAuthData(attestationObject.authData);

      console.log("AuthData: ", authData);
      console.log("CredID: ", Helper.bufToHex(authData.credID));
      console.log("AAGUID: ", Helper.bufToHex(authData.aaguid));

      let pubk = CBOR.decode(
        authData.COSEPublicKey.buffer,
        undefined,
        undefined
      );

      console.log("PublicKey", pubk);
      console.log("Q[0]", pubk["-2"]);
      console.log("Q[1]", pubk["-3"]);
      console.log(publicKeyCredential);

      const q0 = BigNumber.from(pubk["-2"]);
      const q1 = BigNumber.from(pubk["-3"]);

      const contract = await factory.deploy(
        "0x1b98F08dB8F12392EAE339674e568fe29929bC47",
        "0xb0c31b1f9EB2cAB7AaD5b62Ce56c66D4218924a1",
        "0x16367BB04F0Bb6D4fc89d2aa31c32E0ddA609508",
        [q0, q1]
      );

      console.log("contract address:", contract);
      console.log("contract dep tx", contract.deployTransaction);

      window.localStorage.setItem("wallet_address", contract.address);
      window.localStorage.setItem("webauthn.uuid", uuid);
      window.localStorage.setItem("webauthn.chanllenge", chanllenge);

      setAddress(contract.address);
      setUUID(uuid);
      setChanllenge(chanllenge);

      return publicKeyCredential as PublicKeyCredential;
    },
    signOut: () => {
      window.localStorage.removeItem("wallet_address");
      window.localStorage.removeItem("webauthn.uuid");
      window.localStorage.removeItem("webauthn.chanllenge");

      setAddress(null);
      setUUID(null);
      setChanllenge(null);
    },
  };

  return (
    <WebAuthnContext.Provider value={value}>
      {children}
    </WebAuthnContext.Provider>
  );
};
