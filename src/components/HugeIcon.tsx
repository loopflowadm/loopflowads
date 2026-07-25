import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

interface HugeIconProps {
  icon: any;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export const HugeIcon: React.FC<HugeIconProps> = ({
  icon,
  size = 20,
  className = '',
  color = 'currentColor',
  strokeWidth = 1.5,
}) => {
  if (!icon) return null;

  // Suporte a componentes legados ou customizados
  if (typeof icon === 'function' || (typeof icon === 'object' && (icon as any).$$typeof)) {
    const Component = icon;
    return <Component className={className} size={size} color={color} strokeWidth={strokeWidth} />;
  }

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export default HugeIcon;
