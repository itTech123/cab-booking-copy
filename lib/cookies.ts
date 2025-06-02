"use client"

import Cookies from 'js-cookie';

type AuthCookies = {
  isVerified: boolean
}

export function getAuthCookies(): AuthCookies {
  // Only run on client side
  if (typeof window === 'undefined') {
    return { isVerified: false };
  }
  
  const verifiedCookie = Cookies.get('verified');

  return {
    isVerified: verifiedCookie === 'true',
  }
}