import { Link } from 'react-router-dom';

export default function BrandLogo({ small = false, asDiv = false }) {
  const Tag = asDiv ? 'div' : Link;
  const extra = asDiv ? {} : { to: '/', 'aria-label': 'Blueside Digital home' };
  return (
    <Tag className={`blueside-logo${small ? ' blueside-logo--sm' : ''}`} {...extra}>
      <span className="blueside-wordmark">
        <span className="blueside-blue">blue</span><span className="blueside-side">side</span>
      </span>
      <span className="blueside-descriptor">DIGITAL</span>
    </Tag>
  );
}
