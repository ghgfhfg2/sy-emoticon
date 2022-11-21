import styled from "styled-components";

export const TagListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: sticky;
  top: 60px;
  background: #fff;
  padding: 15px 0;
  button {
    font-size: 14px;
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
    margin: 4px;
    button {
      border: 0;
      background: none;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
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
  width: 90vw;
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
`;
