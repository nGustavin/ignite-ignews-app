import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'

type SubscribeButtonProps = {
  priceId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({priceId}) => {
  const [session] = useSession()
  const router = useRouter()

  const handleSubscribe = async () => {
    if(!session){
      signIn('github')
      return
    }

    if(!session?.activeSubscription){
      return router.push('/posts')
    }

    try{
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId: sessionId})
    } catch (err){
      alert(err.message)
    }
  }

  return(
    <>
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
    </>
  );
}

export default SubscribeButton;