import React from "react";
import PagesWrapper from "../../../components/PagesWrapper/PagesWrapper";
import { styled } from "styled-components";
import Button from "../../../components/Button/Button";

const BelowTitleElementWrapper = styled.section`
  & .below-title-text {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    margin-top: 8px;
  }
  & .below-title-text--left {
    color: rgba(0, 0, 0, 0.7);
  }

  & .below-title-text--right {
    // font-size: 16px;
    display: flex;
    justify-content: center;
    font-weight: 600;
  }
  & span {
    display: inline-block;
  }
`;

const BelowTitleElement = () => {
  return (
    <BelowTitleElementWrapper>
      <p className="below-title-text">
        <span className="below-title-text--left">Location: </span>
        <span className="below-title-text--right">
          Johannesburg , South African
        </span>
      </p>
      <p className="below-title-text">
        <span className="below-title-text--left">Date: </span>
        <span className="below-title-text--right">16th March, 2024</span>
      </p>
      <p className="below-title-text">
        <span className="below-title-text--left">Time: </span>
        <span className="below-title-text--right">10 : 00PM ( GMT + 1 )</span>
      </p>
    </BelowTitleElementWrapper>
  );
};

const MainContentWrapper = styled.section`
  text-align: initial;
  padding: 20px 0;

  .sub-section {
    margin: 30px 0;
    padding: 20px 0;
    // background: purple;
  }

  .after-desc {
    color: #1a5d1a;
    font-size: 16px;
    & p {
      background: rgba(255, 255, 255, 0.4);
      display: inline-block;
      padding: 12px 15px;
      border-radius: 4px;

      backdrop-filter: blur(80px);
      -webkit-backdrop-filter: blur(200px); /* For Safari */
    }
  }

  @media (min-width: 769px) {
    width: 90%;
    line-height: 1.5rem;
    max-width: 900px;
    & .desc {
      font-size: 18px;
      margin: 0 auto;

      & p {
        text-align: justify;
        backdrop: filter(200);
      }
    }
  }
`;

const ViewEvent = () => {
  return (
    <PagesWrapper
      title={"Introduction to Sui Ecosystem"}
      elementBelowTitle={<BelowTitleElement />}
    >
      <MainContentWrapper>
        <section className="sub-section">
          <h4>Description </h4>
          <p>
            The Sui Ecosystem is a blockchain platform developed by Mysten Labs,
            designed for high-performance decentralized applications (dApps) and
            digital assets. Utilizing the Move programming language, originally
            from Facebook's Diem project, Sui offers high throughput and low
            latency through novel consensus mechanisms and parallel transaction
            execution. Its architecture supports horizontal scalability,
            ensuring robust performance even with increased transactions and
            users. Emphasizing interoperability, Sui facilitates seamless
            integration with other blockchain networks. Additionally, it
            provides developer-friendly tools, including comprehensive
            documentation, SDKs, and APIs, to simplify dApp creation and
            deployment. The ecosystem aims to deliver a secure, scalable, and
            efficient platform for next-generation blockchain applications.
          </p>
          <section className="after-desc">
            <p className="success text">You are already an attendee</p>
            <div>
              <Button>Register For Event</Button>
            </div>
          </section>
        </section>

        <section className="sub-section">
          <h4>📸 Snaps from the Event </h4>
          <div>
            <Button>Take a snapshot</Button>
          </div>
        </section>
      </MainContentWrapper>
    </PagesWrapper>
  );
};

export default ViewEvent;
