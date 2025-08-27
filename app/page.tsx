'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import styles from '../styles/Home.module.css';

function Tabs(props: React.PropsWithChildren<{}>) {
  const searchParams = useSearchParams();
  const tabIndex = searchParams?.get('tab') === 'custom' ? 1 : 0;

  const router = useRouter();
  function onTabSelected(index: number) {
    const tab = index === 1 ? 'custom' : 'demo';
    router.push(`/?tab=${tab}`);
  }

  let tabs = React.Children.map(props.children, (child, index) => {
    return (
      <button
        className="lk-button"
        onClick={() => {
          if (onTabSelected) {
            onTabSelected(index);
          }
        }}
        aria-pressed={tabIndex === index}
      >
        {/* @ts-ignore */}
        {child?.props.label}
      </button>
    );
  });

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabSelect}>{tabs}</div>
      {/* @ts-ignore */}
      {props.children[tabIndex]}
    </div>
  );
}

function DemoMeetingTab(props: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };
  return (
    <div className={styles.tabContent}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img 
          src="/images/rtc-labs-home.svg" 
          alt="RTC Labs" 
          width="120" 
          height="15" 
          style={{ marginBottom: '0.5rem' }}
        />
        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>
          Experience RTC Labs advanced WebRTC platform with our live demo.
        </p>
      </div>
      <button style={{ marginTop: '1rem' }} className="lk-button" onClick={startMeeting}>
        Start Meeting
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CustomConnectionTab(props: { label: string }) {
  const router = useRouter();

  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const serverUrl = formData.get('serverUrl');
    const token = formData.get('token');
    if (e2ee) {
      router.push(
        `/custom/?liveKitUrl=${serverUrl}&token=${token}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/custom/?liveKitUrl=${serverUrl}&token=${token}`);
    }
  };
  return (
    <form className={styles.tabContent} onSubmit={onSubmit}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img 
          src="/images/rtc-labs-home.svg" 
          alt="RTC Labs" 
          width="120" 
          height="15" 
          style={{ marginBottom: '0.5rem' }}
        />
        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>
          Connect RTC Labs with a custom server using our advanced WebRTC infrastructure.
        </p>
      </div>
      <input
        id="serverUrl"
        name="serverUrl"
        type="url"
        placeholder="RTC Labs Server URL: wss://*.rtclabs.cloud"
        required
      />
      <textarea
        id="token"
        name="token"
        placeholder="Token"
        required
        rows={5}
        style={{ padding: '1px 2px', fontSize: 'inherit', lineHeight: 'inherit' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>

      <hr
        style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.15)', marginBlock: '1rem' }}
      />
      <button
        style={{ paddingInline: '1.25rem', width: '100%' }}
        className="lk-button"
        type="submit"
      >
        Connect
      </button>
    </form>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className={styles.twoColumnLayout}>
          {/* Left Column - Header and Logo */}
          <div className={styles.leftColumn}>
            <div className={styles.header}>
              <img src="/images/rtc-labs-home.svg" alt="RTC Labs" width="360" height="45" />
              <h2>
                Advanced WebRTC platform built on cutting-edge technology and{' '}
                <a href="https://github.com/rtclabs/platform?ref=rtclabs" rel="noopener">
                  RTC&nbsp;Labs&nbsp;Core
                </a>
                ,{' '}
                <a href="https://rtclabs.io/cloud?ref=rtclabs" rel="noopener">
                  RTC&nbsp;Labs&nbsp;Cloud
                </a>{' '}
                and Next.js.
              </h2>
            </div>
          </div>
          
          {/* Right Column - Form Tabs */}
          <div className={styles.rightColumn}>
            <Suspense fallback="Loading">
              <Tabs>
                <DemoMeetingTab label="Demo" />
                <CustomConnectionTab label="Custom" />
              </Tabs>
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
