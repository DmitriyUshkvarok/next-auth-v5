export const getUserDeviceInfo = (userAgent: string) => {
  const ua = userAgent.toLowerCase();

  // Определение ОС (iPhone/iPad должны идти раньше macOS!)
  let os = 'Unknown OS';
  if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  else if (ua.includes('macintosh') || ua.includes('mac os x')) os = 'macOS';
  else if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('linux')) os = 'Linux';

  // Определение браузера
  let browser = 'Unknown Browser';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    const match = userAgent.match(/Chrome\/([\d.]+)/);
    browser = match ? `Chrome ${match[1]}` : 'Chrome';
  } else if (ua.includes('edg')) {
    const match = userAgent.match(/Edg\/([\d.]+)/);
    browser = match ? `Edge ${match[1]}` : 'Edge';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    const match = userAgent.match(/Version\/([\d.]+)/);
    browser = match ? `Safari ${match[1]}` : 'Safari';
  } else if (ua.includes('firefox')) {
    const match = userAgent.match(/Firefox\/([\d.]+)/);
    browser = match ? `Firefox ${match[1]}` : 'Firefox';
  }

  return `${browser} on ${os}`;
};
