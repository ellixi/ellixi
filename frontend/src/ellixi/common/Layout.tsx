import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWebAuthn } from "../webauthn/WebAuthnContext";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import LoginModal from "./LoginLoading";
import { useProfileModal } from "./ProfileModal";
import { useLoginModal } from "./LoginModal";

function Layout() {
  const router = useRouter();
  const { address, signIn } = useWebAuthn();
  const { setShowProfileModal, ProfileModal } = useProfileModal();
  const { setShowLoginModal, LoginModal } = useLoginModal();

  const goHome = () => {
    router.push("/");
  };

  const goExplore = () => {
    router.push("/explore");
  };

  const goMypage = () => {
    setShowProfileModal(true);
    // router.push("/mypage");
  };

  const handleLogin = async () => {
    setShowLoginModal(true);
    await signIn();
  };

  return (
    <Wrap>
      <ProfileModal />
      <LoginModal />
      <Logo onClick={goHome}>Ellixi</Logo>
      <Right>
        <ExploreButton onClick={goExplore}>Explore</ExploreButton>
        {!address ? (
          <Login onClick={handleLogin}>Login</Login>
        ) : (
          <Profile onClick={goMypage}>
            <BsFillPersonFill className="profile-logo"></BsFillPersonFill>
          </Profile>
        )}
      </Right>
    </Wrap>
  );
}

export default Layout;

const Wrap = styled.div`
  height: 80px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 24px;
  margin-left: 20px;
`;

const Right = styled.div`
  display: flex;
`;

const ExploreButton = styled.div`
  width: 104px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = styled.div`
  width: 104px;
  height: 40px;

  border: 1px solid #ffffff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .profile-logo {
    width: 28px;
    height: 28px;
  }
`;
