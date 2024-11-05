import React from 'react';
import Head from 'next/head';
import styles from './maintenance.module.css'

const Maintenance = () => {
  return (
    <>
      <Head>
        <title>Maintenance Mode</title>
        <meta name="description" content="Our site is currently under maintenance." />
      </Head>
      <div className={styles.maintenanceContainer}>
        <h1>We&apos;ll Be Back Soon!</h1>
        <p>Our website is currently undergoing scheduled maintenance.</p>
        <p>We apologize for any inconvenience caused.</p>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
};

export default Maintenance;