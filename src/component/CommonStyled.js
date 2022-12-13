import styled from "styled-components";

export const HiddenText = styled.div`
  width: 0;
  height: 0;
  z-index: -1;
  position: absolute;
  overflow: hidden;
  opacity: 0;
`;

export const InfoBox = styled.div`
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 10px;
  background: #f2f2f2;
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #3182ce;
    padding-left: 12px;
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 3px;
      height: 16px;
      background: #3182ce;
      position: absolute;
      left: 0;
      top: 2px;
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 15px;
  }
  ul {
    padding-left: 25px;
    li {
      list-style: disc;
      color: #666;
    }
  }
  p {
    color: #666;
  }
`;

export const H2Style = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

export const TagListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: sticky;
  top: 60px;
  background: #fff;
  padding: 15px 0;
  z-index: 10;
  button {
    font-size: 14px;
  }
  @media screen and (max-width: 1024px) {
    position: relative;
    top: 0;
    button {
      font-size: 12px;
    }
  }
`;

export const EmoticonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    display: flex;
    align-items: stretch;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 5px;
    transition: all 0.1s;
    &:hover {
      background: #fff;
      transform: scale(1.3);
    }
    button {
      border: 0;
      background: none;
      cursor: pointer;
      &:hover {
        background: #f9f9f9;
      }
    }
    .btn_emo {
      padding: 8px 12px;
    }
    .btn_favor {
      border: 0;
      padding-top: 5px;
      padding: 5px 8px 0 8px;
      background: none;
      color: #c53030;
      font-size: 16px;
      border-left: 1px solid #ddd;
    }
  }
  @media screen and (max-width: 1024px) {
    li {
      .btn_emo {
        padding: 5px 8px;
      }
    }
  }
`;

export const ApplyList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
  li {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.ready {
    }
    &.finish {
      background: #f5f5f5;
      color: #888;
    }
    button {
      color: #fff;
    }
  }
  .state {
    font-size: 13px;
    margin-right: 1rem;
  }
  .desc {
    display: flex;
    flex-direction: column;
  }
  .emo {
    font-weight: bold;
  }
  .date {
    color: #999;
    font-size: 12px;
  }
`;

export const CommonPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  animation: fadeIn 0.2s forwards;
  opacity: 0;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.25);
  }
  .con_box {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    transform: translateY(30px);
    width: 100%;
    max-width: 400px;
    z-index: 10;
    animation: fadeUp 0.2s forwards;
  }
  h2.title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  @keyframes fadeUp {
    to {
      transform: translateY(0);
    }
  }
`;

export const Notice = styled.div`
  margin: 25px auto 0 auto;
  width: 90%;
  max-width: 1200px;
`;

export const BtnTop = styled.button`
  background: #fff;
  border: 1px solid #3182ce;
  border-radius: 5px;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #3182ce;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  &:hover {
    font-size: 24px;
  }
  @media screen and (max-width: 1024px) {
    width: 34px;
    height: 34px;
    font-size: 18px;
    &:hover {
      font-size: 18px;
    }
  }
`;
