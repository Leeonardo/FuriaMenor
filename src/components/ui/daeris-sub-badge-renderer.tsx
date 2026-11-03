import React from "react";
import {
  DaerisInstitucionalBadge,
  DaerisFutbol7Badge,
  DaerisMaster50Badge,
  DaerisLibreParqueCaraboboBadge,
  DaerisInfantilPrimeraBadge,
  DaerisInfantilSegundaBadge,
} from "@/components/ui/daeris-sub-badges";
import { DaerisSubId } from "@/data/daeris-subtournaments";

interface BadgeRendererProps {
  badgeKey: DaerisSubId | string;
  size?: number;
  className?: string;
}

export function DaerisBadgeRenderer({ badgeKey, size = 64, className = "" }: BadgeRendererProps) {
  switch (badgeKey) {
    case "infantil-1ra":
    case "infantil-1ra-division":
      return <DaerisInfantilPrimeraBadge size={size} className={className} />;
    case "infantil-2da":
    case "infantil-2da-division":
      return <DaerisInfantilSegundaBadge size={size} className={className} />;
    case "institucional":
      return <DaerisInstitucionalBadge size={size} className={className} />;
    case "futbol7":
    case "futbol-7-institucional":
      return <DaerisFutbol7Badge size={size} className={className} />;
    case "master50":
    case "master-50":
      return <DaerisMaster50Badge size={size} className={className} />;
    case "libre-parquecarabobo":
    case "libre-parque-carabobo":
      return <DaerisLibreParqueCaraboboBadge size={size} className={className} />;
    default:
      return <DaerisInfantilPrimeraBadge size={size} className={className} />;
  }
}
