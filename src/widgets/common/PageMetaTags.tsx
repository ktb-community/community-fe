import { Helmet } from 'react-helmet-async';
import { ENV } from '@/shared/config/env.ts';

const MetaTags = () => {
  return (
    <Helmet>
      <meta name="description" content={ENV.SITE_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={ENV.LOGO_TEXT} />
      <meta property="og:title" content={ENV.LOGO_TEXT} />
      <meta property="og:url" content={ENV.BASE_URL} />
      <meta property="og:image" content={ENV.BASE_URL + "/salgu2.jpg"} />
      <meta property="og:description" content={ENV.SITE_DESCRIPTION} />
      <link rel="canonical" href={ENV.BASE_URL} />
    </Helmet>
  )
}

export default MetaTags;