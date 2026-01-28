import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const defaultTitle = "Sun Robotics & AI";
const defaultDescription =
  "Building the future of industrial automation with cutting-edge AI and robotics solutions for enterprises worldwide.";

export const SEO = ({
  title,
  description = defaultDescription,
  canonical,
  ogImage = "/og-image.png",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* No Index */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};
