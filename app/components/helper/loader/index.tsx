import React from 'react';

type Props = {
  show: boolean;
};

export default function Loader(props: Props) {
  const { show } = props;

  const isLoaderShown = () => {
    if (show) {
      return '';
    }
    return 'is-invisible';
  };

  return (
    <div className={isLoaderShown()}>
      <div className="spinner">
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
        <div className="spinner-blade" />
      </div>
    </div>
  );
}
