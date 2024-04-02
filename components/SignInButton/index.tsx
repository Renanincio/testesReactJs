import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();
  const user = session ? session.user : null ;

  return user ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
     
      {user.name}
     
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
     
      Sign in with Github
    </button>
  );
}