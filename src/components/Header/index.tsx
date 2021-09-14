import React from 'react';
import {SignInButton} from '../SignInButton';
import Link from 'next/link'

import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';

const Header: React.FC = () => {
  const { asPath } = useRouter()

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ignews" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton/>
      </div>
    </header>
  )
}

export {Header};