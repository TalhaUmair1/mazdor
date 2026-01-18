// Script to add services to the database
import Database from 'better-sqlite3';
import path from 'path';

// Import SVG icons for services
const plumbingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`;
const electricianSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 5.96-4.7 7.14-.27.11-.32-.27-.09-.42 1.46-.95 2.45-2.46 2.45-4.24 0-2.65-2.15-4.8-4.8-4.8-.75 0-1.47.17-2.11.48L12 9l-1.89-3.48A4.96 4.96 0 0 1 5.2 7.2c0 2.05 1.34 3.79 3.2 4.52.27.1.27.5 0 .6-.96.36-1.6.86-1.6 1.4 0 .88.72 1.6 1.6 1.6.28 0 .53-.07.77-.18.24.11.49.18.77.18.88 0 1.6-.72 1.6-1.6 0-.54-.64-1.04-1.6-1.4-.27-.1-.27-.5 0-.6.38-.14.73-.3 1.05-.48L13 11l.61 1.13c.32.18.67.34 1.05.48.27.1.27.5 0 .6-.96.36-1.6.86-1.6 1.4 0 .88.72 1.6 1.6 1.6.28 0 .53-.07.77-.18.24.11.49.18.77.18.88 0 1.6-.72 1.6-1.6 0-.54-.64-1.04-1.6-1.4-.27-.1-.27-.5 0-.6.95-.35 1.59-.85 1.59-1.39 0-.88-.72-1.6-1.6-1.6-.28 0-.53.07-.77.18-.24-.11-.49-.18-.77-.18z"/></svg>`;
const carpentrySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>`;
const masonrySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/><rect x="6" y="6" width="4" height="4"/><rect x="10" y="6" width="4" height="4"/><rect x="14" y="6" width="4" height="4"/><rect x="6" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="14" y="10" width="4" height="4"/><rect x="6" y="14" width="4" height="4"/><rect x="10" y="14" width="4" height="4"/><rect x="14" y="14" width="4" height="4"/></svg>`;
const paintingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.37 16.56l-2.9-2.9c.54-1.09.87-2.33.87-3.64 0-3.31-2.69-6-6-6-.35 0-.69.04-1 .12-1.54-.76-3.32-1.12-5.2-1.12-1.1 0-2 .9-2 2 0 .28.06.55.16.8-1.2.48-2.13 1.47-2.13 2.7 0 .5.13 1 .37 1.45l-1.7 1.7c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l1.7-1.7c.45.24.95.37 1.45.37 1.23 0 2.22-1.08 2.7-2.13.25.1.52.16.8.16 1.1 0 2-.9 2-2 0-1.88-.36-3.66-1.12-5.2.08-.31.12-.65.12-1 0-3.31-2.69-6-6-6-3.31 0-6 2.69-6 6 0 1.27.42 2.46 1.15 3.44l-1.7 1.7c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l1.7-1.7c.98.73 2.17 1.15 3.44 1.15 3.31 0 6-2.69 6-6 0-.35.04-.69.12-1 1.54.76 3.32 1.12 5.2 1.12 1.1 0 2-.9 2-2 0-.28-.06-.55-.16-.8 1.2-.48 2.13-1.47 2.13-2.7 0-.5-.13-1-.37-1.45l1.7-1.7c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0l-1.7 1.7c-.45-.24-.95-.37-1.45-.37-1.23 0-2.22 1.08-2.7 2.13-.25-.1-.52-.16-.8-.16-1.1 0-2 .9-2 2 0 1.88.36 3.66 1.12 5.2-.08.31-.12.65-.12 1 0 3.31 2.69 6 6 6 1.27 0 2.46-.42 3.44-1.15l1.7 1.7c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83l-1.7-1.7z"/></svg>`;
const tileSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`;
const marbleSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/></svg>`;
const concreteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h10v2H7z"/></svg>`;
const ceilingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>`;
const aluminumSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 7h10v10H7z"/></svg>`;
const glassSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/><path d="M6 6h12v12H6z"/></svg>`;
const weldingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/><path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h10v2H7z"/></svg>`;
const acSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-10 8c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const cleaningSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8H3v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8zm0 12H5v-2h8v2zm0-4H5v-2h8v2zm0-4H5V8h8v4zM21 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>`;
const mechanicSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/></svg>`;
const handymanSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>`;
const gardenerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 16c0 2.21-1.79 4-4 4s-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2zm-8-10c0-.55-.45-1-1-1s-1 .45-1 1H5c0 1.66 1.34 3 3 3s3-1.34 3-3H9zm10 0c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1h2zM9 8c0 1.66 1.34 3 3 3s3-1.34 3-3H9z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;
const homecareSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
const locksmithSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
const securitySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`;
const shopfittingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>`;

const dbPath = path.resolve(process.cwd(), 'mazdor.db');
const db = new Database(dbPath);

// Services to add
const services = [
  { name: "Plumber", svg: plumbingSVG, view_box: "0 0 24 24" },
  { name: "Electrician", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Carpenter", svg: carpentrySVG, view_box: "0 0 24 24" },
  { name: "Mason", svg: masonrySVG, view_box: "0 0 24 24" },
  { name: "Painter", svg: paintingSVG, view_box: "0 0 24 24" },
  { name: "Tile Fixer", svg: tileSVG, view_box: "0 0 24 24" },
  { name: "Marble Fixer", svg: marbleSVG, view_box: "0 0 24 24" },
  { name: "Concrete Worker", svg: concreteSVG, view_box: "0 0 24 24" },
  { name: "Shuttering Carpenter", svg: carpentrySVG, view_box: "0 0 24 24" },
  { name: "Steel Fixer", svg: weldingSVG, view_box: "0 0 24 24" },
  { name: "Ceiling Installer", svg: ceilingSVG, view_box: "0 0 24 24" },
  { name: "Gypsum Board Installer", svg: ceilingSVG, view_box: "0 0 24 24" },
  { name: "POP Ceiling Worker", svg: ceilingSVG, view_box: "0 0 24 24" },
  { name: "Aluminum Fabricator", svg: aluminumSVG, view_box: "0 0 24 24" },
  { name: "Glass Installer", svg: glassSVG, view_box: "0 0 24 24" },
  { name: "Iron", svg: weldingSVG, view_box: "0 0 24 24" },
  { name: "Welder", svg: weldingSVG, view_box: "0 0 24 24" },
  { name: "Gate Maker", svg: weldingSVG, view_box: "0 0 24 24" },
  { name: "Grill Maker", svg: weldingSVG, view_box: "0 0 24 24" },
  { name: "Rooftop Waterproofing Technician", svg: concreteSVG, view_box: "0 0 24 24" },
  { name: "AC Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Refrigerator Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Washing Machine Repair Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Microwave Oven Repair Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Water Pump / Motor Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Generator Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "UPS Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Inverter Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Solar Panel Installer", svg: acSVG, view_box: "0 0 24 24" },
  { name: "CCTV Camera Installer", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Network Cabling Technician", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Electric Meter Installer", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Transformer Helper", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Lift / Elevator Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Escalator Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Bore / Tubewell Technician", svg: plumberSVG, view_box: "0 0 24 24" },
  { name: "Gas Geyser Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Gas Line Fitter", svg: plumberSVG, view_box: "0 0 24 24" },
  { name: "Fire Alarm Technician", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Access Control System Installer", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Water Tank Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Septic Tank Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Drainage Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Sewerage Worker", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Pest Control Technician", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Termite Control Specialist", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Home Deep Cleaning Worker", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Sofa & Carpet Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Curtain & Blind Installer", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Wallpaper Installer", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Furniture Polisher", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Furniture Repair Technician", svg: carpentrySVG, view_box: "0 0 24 24" },
  { name: "Mattress Cleaning Service", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Chimney / Exhaust Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Roof Cleaning Worker", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Car Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Bike Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Auto Electrician", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Denting & Painting Technician", svg: paintingSVG, view_box: "0 0 24 24" },
  { name: "Car AC Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Tyre Puncture Repairer", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Wheel Alignment Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Car Washer / Detailer", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Auto Spare Parts Fitter", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Battery Replacement Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Car Tuning Specialist", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Rickshaw Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Truck Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Bus Mechanic", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Mobile Car Service Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Handyman / Multi-Skill Worker", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Gardener / Mali", svg: gardenerSVG, view_box: "0 0 24 24" },
  { name: "Lawn Cutter", svg: gardenerSVG, view_box: "0 0 24 24" },
  { name: "Tree Cutter", svg: gardenerSVG, view_box: "0 0 24 24" },
  { name: "Home Cook", svg: homecareSVG, view_box: "0 0 24 24" },
  { name: "Maid / House Cleaner", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Babysitter / Nanny", svg: homecareSVG, view_box: "0 0 24 24" },
  { name: "Elder Care Attendant", svg: homecareSVG, view_box: "0 0 24 24" },
  { name: "Home Nurse", svg: homecareSVG, view_box: "0 0 24 24" },
  { name: "Patient Care Assistant", svg: homecareSVG, view_box: "0 0 24 24" },
  { name: "Laundry / Ironing Worker", svg: cleaningSVG, view_box: "0 0 24 24" },
  { name: "Tailor", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Curtain Stitching Service", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Shoe Repairer (Mochi)", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Cobbler", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Locksmith", svg: locksmithSVG, view_box: "0 0 24 24" },
  { name: "Door Lock Installer", svg: locksmithSVG, view_box: "0 0 24 24" },
  { name: "Safe Locker Technician", svg: locksmithSVG, view_box: "0 0 24 24" },
  { name: "Security Guard", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Fire Extinguisher Technician", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Emergency Exit Installer", svg: securitySVG, view_box: "0 0 24 24" },
  { name: "Shutter Repair Technician", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Rolling Shutter Installer", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Intercom Installer", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Door Bell / Smart Bell Installer", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Shop Fitter", svg: shopfittingSVG, view_box: "0 0 24 24" },
  { name: "Sign Board Installer", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Flex Banner Installer", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "LED Screen Installer", svg: electricianSVG, view_box: "0 0 24 24" },
  { name: "Display Rack Fabricator", svg: carpentrySVG, view_box: "0 0 24 24" },
  { name: "Cold Storage Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Ice Plant Technician", svg: acSVG, view_box: "0 0 24 24" },
  { name: "Commercial Kitchen Equipment Technician", svg: mechanicSVG, view_box: "0 0 24 24" },
  { name: "Tandoor Maker", svg: handymanSVG, view_box: "0 0 24 24" },
  { name: "Bakery Oven Technician", svg: mechanicSVG, view_box: "0 0 24 24" }
];

try {
  console.log("Inserting services into the database...");
  
  // Insert each service into the database
  for (const service of services) {
    const existing = db.prepare('SELECT id FROM services WHERE name = ?').get(service.name);
    if (!existing) {
      const stmt = db.prepare('INSERT INTO services (name, svg, view_box) VALUES (?, ?, ?)');
      stmt.run(service.name, service.svg, service.view_box);
      console.log(`Added service: ${service.name}`);
    } else {
      console.log(`Service already exists: ${service.name}`);
    }
  }

  console.log("All services have been added to the database.");
} catch (error) {
  console.error("Error adding services:", error);
} finally {
  db.close();
}