// Script to add services with appropriate SVG icons to the database
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'mazdor.db');
const db = new Database(dbPath);

// Service categories with appropriate SVG icons
const servicesData = [
  // Plumbing & Water Services
  { 
    name: "Plumber", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Electrician", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 5.96-4.7 7.14-.27.11-.32-.27-.09-.42 1.46-.95 2.45-2.46 2.45-4.24 0-2.65-2.15-4.8-4.8-4.8-.75 0-1.47.17-2.11.48L12 9l-1.89-3.48A4.96 4.96 0 0 1 5.2 7.2c0 2.05 1.34 3.79 3.2 4.52.27.1.27.5 0 .6-.96.36-1.6.86-1.6 1.4 0 .88.72 1.6 1.6 1.6.28 0 .53-.07.77-.18.24.11.49.18.77.18.88 0 1.6-.72 1.6-1.6 0-.54-.64-1.04-1.6-1.4-.27-.1-.27-.5 0-.6.38-.14.73-.3 1.05-.48L13 11l.61 1.13c.32.18.67.34 1.05.48.27.1.27.5 0 .6-.96.36-1.6.86-1.6 1.4 0 .88.72 1.6 1.6 1.6.28 0 .53-.07.77-.18.24.11.49.18.77.18.88 0 1.6-.72 1.6-1.6 0-.54-.64-1.04-1.6-1.4-.27-.1-.27-.5 0-.6.95-.35 1.59-.85 1.59-1.39 0-.88-.72-1.6-1.6-1.6-.28 0-.53.07-.77.18-.24-.11-.49-.18-.77-.18z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Carpenter", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Mason (Raaj Mistri)", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/><rect x="6" y="6" width="4" height="4"/><rect x="10" y="6" width="4" height="4"/><rect x="14" y="6" width="4" height="4"/><rect x="6" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="14" y="10" width="4" height="4"/><rect x="6" y="14" width="4" height="4"/><rect x="10" y="14" width="4" height="4"/><rect x="14" y="14" width="4" height="4"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Painter (Whitewash / Spray)", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.37 16.56l-2.9-2.9c.54-1.09.87-2.33.87-3.64 0-3.31-2.69-6-6-6-.35 0-.69.04-1 .12-1.54-.76-3.32-1.12-5.2-1.12-1.1 0-2 .9-2 2 0 .28.06.55.16.8-1.2.48-2.13 1.47-2.13 2.7 0 .5.13 1 .37 1.45l-1.7 1.7c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l1.7-1.7c.45.24.95.37 1.45.37 1.23 0 2.22-1.08 2.7-2.13.25.1.52.16.8.16 1.1 0 2-.9 2-2 0-1.88-.36-3.66-1.12-5.2.08-.31.12-.65.12-1 0-3.31-2.69-6-6-6-3.31 0-6 2.69-6 6 0 1.27.42 2.46 1.15 3.44l-1.7 1.7c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0l1.7-1.7c.98.73 2.17 1.15 3.44 1.15 3.31 0 6-2.69 6-6 0-.35.04-.69.12-1 1.54.76 3.32 1.12 5.2 1.12 1.1 0 2-.9 2-2 0-.28-.06-.55-.16-.8 1.2-.48 2.13-1.47 2.13-2.7 0-.5-.13-1-.37-1.45l1.7-1.7c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0l-1.7 1.7c-.45-.24-.95-.37-1.45-.37-1.23 0-2.22 1.08-2.7 2.13-.25-.1-.52-.16-.8-.16-1.1 0-2 .9-2 2 0 1.88.36 3.66 1.12 5.2-.08.31-.12.65-.12 1 0 3.31 2.69 6 6 6 1.27 0 2.46-.42 3.44-1.15l1.7 1.7c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83l-1.7-1.7z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "AC Technician", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-10 8c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Car Mechanic", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Handyman / Multi-Skill Worker", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Gardener / Mali", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 16c0 2.21-1.79 4-4 4s-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2zm-8-10c0-.55-.45-1-1-1s-1 .45-1 1H5c0 1.66 1.34 3 3 3s3-1.34 3-3H9zm10 0c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1h2zM9 8c0 1.66 1.34 3 3 3s3-1.34 3-3H9z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
    view_box: "0 0 24 24" 
  },
  { 
    name: "Home Cook", 
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    view_box: "0 0 24 24" 
  }
];

try {
  console.log("Inserting services with appropriate SVG icons into the database...");
  
  // Insert each service into the database
  for (const service of servicesData) {
    const existing = db.prepare('SELECT id FROM services WHERE name = ?').get(service.name);
    if (!existing) {
      const stmt = db.prepare('INSERT INTO services (name, svg, view_box) VALUES (?, ?, ?)');
      stmt.run(service.name, service.svg, service.view_box);
      console.log(`Added service with icon: ${service.name}`);
    } else {
      console.log(`Service already exists: ${service.name}`);
    }
  }

  console.log("All services have been added to the database with appropriate icons.");
} catch (error) {
  console.error("Error adding services:", error);
} finally {
  db.close();
}