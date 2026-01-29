/**
 * Utility functions để format tọa độ theo nhiều định dạng khác nhau
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Format tọa độ thập phân (Decimal Degrees)
 * Ví dụ: 16.047079, 108.206230
 */
export function formatDecimal(coords: Coordinates, precision: number = 6): string {
  return `${coords.latitude.toFixed(precision)}°, ${coords.longitude.toFixed(precision)}°`;
}

/**
 * Format tọa độ độ-phút-giây (DMS - Degrees Minutes Seconds)
 * Ví dụ: 16°02'49.5"N, 108°12'22.4"E
 */
export function formatDMS(coords: Coordinates): string {
  const latDMS = convertToDMS(coords.latitude, true);
  const lngDMS = convertToDMS(coords.longitude, false);
  return `${latDMS}, ${lngDMS}`;
}

/**
 * Format tọa độ độ-phút thập phân (DDM - Degrees Decimal Minutes)
 * Ví dụ: 16°02.825'N, 108°12.374'E
 */
export function formatDDM(coords: Coordinates): string {
  const latDDM = convertToDDM(coords.latitude, true);
  const lngDDM = convertToDDM(coords.longitude, false);
  return `${latDDM}, ${lngDDM}`;
}

/**
 * Convert decimal degrees to DMS
 */
function convertToDMS(decimal: number, isLatitude: boolean): string {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesDecimal = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = ((minutesDecimal - minutes) * 60).toFixed(1);
  
  let direction: string;
  if (isLatitude) {
    direction = decimal >= 0 ? 'N' : 'S';
  } else {
    direction = decimal >= 0 ? 'E' : 'W';
  }
  
  return `${degrees}°${minutes}'${seconds}"${direction}`;
}

/**
 * Convert decimal degrees to DDM
 */
function convertToDDM(decimal: number, isLatitude: boolean): string {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = ((absolute - degrees) * 60).toFixed(3);
  
  let direction: string;
  if (isLatitude) {
    direction = decimal >= 0 ? 'N' : 'S';
  } else {
    direction = decimal >= 0 ? 'E' : 'W';
  }
  
  return `${degrees}°${minutes}'${direction}`;
}

/**
 * Format cho Google Maps URL
 */
export function formatForGoogleMaps(coords: Coordinates): string {
  return `${coords.latitude},${coords.longitude}`;
}

/**
 * Format cho hiển thị ngắn gọn
 */
export function formatShort(coords: Coordinates): string {
  return `${coords.latitude.toFixed(4)}°, ${coords.longitude.toFixed(4)}°`;
}

/**
 * Parse tọa độ từ string
 */
export function parseCoordinates(coordString: string): Coordinates | null {
  try {
    const parts = coordString.split(',').map(s => s.trim());
    if (parts.length !== 2) return null;
    
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);
    
    if (isNaN(latitude) || isNaN(longitude)) return null;
    if (latitude < -90 || latitude > 90) return null;
    if (longitude < -180 || longitude > 180) return null;
    
    return { latitude, longitude };
  } catch {
    return null;
  }
}

/**
 * Tính khoảng cách giữa 2 điểm (Haversine formula)
 * Trả về khoảng cách tính bằng mét
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371e3; // Bán kính trái đất tính bằng mét
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Format khoảng cách cho dễ đọc
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters.toFixed(0)}m`;
  } else {
    return `${(meters / 1000).toFixed(2)}km`;
  }
}
