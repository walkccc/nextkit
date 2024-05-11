import { freePlan, proPlan } from '@/config/subscriptions';
import { db } from '@/lib/db';
import { UserSubscriptionPlan } from '@/types';

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId !== null &&
    user.stripeCurrentPeriodEnd !== null &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();
  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripePriceId: user.stripePriceId || '',
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime() || 0,
    isPro,
  };
}
