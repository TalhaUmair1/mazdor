import { db } from '~~/server/utils/db'
import { services } from '~~/server/database/schema'
import { defineEventHandler, createError } from 'h3'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  try {
    // Comprehensive list of all services with appropriate SVG icons
    const allServicesWithIcons = [
      {
        name: "Plumber",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M8 10h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Electrician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 6-4.72 7.28l-8.75-16.2C9.25 2.97 11.07 2.05 13 2.05zM12 19c-3.87 0-7-3.13-7-7 0-2.85 1.72-5.31 4.26-6.39L19.6 17.86C17.44 19.04 14.92 20 12 20c-.18 0-.35-.01-.53-.02L12 19zm-4.74-1.53l-1.42-2.63 2.62 1.43c.6.33 1.28.52 2 .52.17 0 .34-.02.5-.05l1.81 1.81C9.22 17.91 7.7 17.97 6.26 18.47zM15.3 13c-.17 0-.34.02-.5.05l-2.64-1.43 1.42 2.63c.98-.22 1.9-.68 2.66-1.33l-1.82-1.82c-.18.01-.36.03-.54.03zm-4.3-3c.17 0 .34-.02.5-.05l2.64 1.43-1.42-2.63c-.98.22-1.9.68-2.66 1.33l1.82 1.82c.18-.01.36-.03.54-.03z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Carpenter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/><path d="M15 13h2v2h-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Mason (Raaj Mistri)",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.01L3 11v2h18v-2zM3 16h18v-2H3v2zm0-7v2h18V9H3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Painter (Whitewash / Spray)",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 2c-.31 0-.61.08-.87.22l-4.5 2.25c-.3.15-.54.37-.7.66L12 8l1.43 2.78c.16.31.42.56.75.72L18 13.5l1.5-6.75c.16-.31.16-.68 0-1L19.5 2zM3 22c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm3-5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1zm-3-5c0 .55.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tile Fixer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/><path d="M8 6h8v8H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Marble Fixer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/><path d="M8 6h8v8H8z"/><path d="M10 8h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Concrete Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 7h10v2H7z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Shuttering Carpenter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6V6h12v12z"/><path d="M8 8h8v8H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Steel Fixer (Sariya Bandhny Wala)",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "False Ceiling Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M6 8h12v4H6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Gypsum Board Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M6 8h12v4H6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "POP Ceiling Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M6 8h12v4H6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Aluminum Fabricator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 7h10v10H7z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Glass Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/><path d="M6 6h12v12H6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Iron / Steel Fabricator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 7h10v10H7z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Welder",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Gate Maker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6V4h12v16z"/><path d="M8 6h8v12H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Grill Maker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6V4h12v16z"/><path d="M8 6h8v2H8z"/><path d="M8 10h8v2H8z"/><path d="M8 14h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Rooftop Waterproofing Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "AC Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7h-4V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM12 5c.55 0 1 .45 1 1v2H9V6c0-.55.45-1 1-1s1 .45 1 1z"/><path d="M10 15h4v2h-4z"/><path d="M8 11h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Refrigerator Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-8-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-1-5H8V9h3V7h2v2h3v2h-3v2h-2v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Washing Machine Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3-4h6v2h-6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Microwave Oven Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3-4h6v2h-6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Water Pump / Motor Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Generator Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "UPS Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Inverter Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Solar Panel Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "CCTV Camera Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V17H9v-1.5l-3-3V9l3-3V7.5h6V6l3 3v6l-3 3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Network Cabling Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Electric Meter Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Transformer Helper",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Lift / Elevator Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Escalator Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bore / Tubewell Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Gas Geyser Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Gas Line Fitter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Fire Alarm Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Access Control System Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Water Tank Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Septic Tank Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Drainage Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Sewerage Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Pest Control Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Termite Control Specialist",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Home Deep Cleaning Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8H3v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8zm0 12H5v-2h8v2zm0-4H5v-2h8v2zm0-4H5V8h8v4zM21 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Sofa & Carpet Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8H3v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8zm0 12H5v-2h8v2zm0-4H5v-2h8v2zm0-4H5V8h8v4zM21 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Curtain & Blind Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Wallpaper Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Furniture Polisher",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Furniture Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Mattress Cleaning Service",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 10V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h16v-5c0-1.1-.9-2-2-2zm-9 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7-6H6V7h12v3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Chimney / Exhaust Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Roof Cleaning Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Car Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bike Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Auto Electrician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M13 10h2v2h-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Denting & Painting Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 2c-.31 0-.61.08-.87.22l-4.5 2.25c-.3.15-.54.37-.7.66L12 8l1.43 2.78c.16.31.42.56.75.72L18 13.5l1.5-6.75c.16-.31.16-.68 0-1L19.5 2zM3 22c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm3-5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1zm-3-5c0 .55.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Car AC Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M10 15h4v2h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tyre Puncture Repairer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Wheel Alignment Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Car Washer / Detailer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Auto Spare Parts Fitter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Battery Replacement Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 11.75v-1.5h-1.5v-1.5h1.5v-1.5h1.5v1.5h1.5v1.5h-1.5v1.5h-1.5zm-7 0v-1.5h-1.5v-1.5h1.5v-1.5h1.5v1.5h1.5v1.5h-1.5v1.5h-1.5zm3.5 7c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Car Tuning Specialist",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Rickshaw Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M10 15h4v2h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Truck Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3v3h-2V8h-3l-2 6v4h2v-2h8v2h2v-4l-2-6zm-8 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bus Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4S4 2.5 4 6v10zm8-10c3.5 0 5 .5 5 4v6H7V6c0-3.5 1.5-4 5-4zm-1 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Excavator Operator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bulldozer Operator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Crane Operator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Forklift Operator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3v3h-2V8h-3l-2 6v4h2v-2h8v2h2v-4l-2-6zm-8 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Heavy Machinery Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Mobile Phone Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 20H7V5h10v16z"/><path d="M9 17h6v2H9z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Computer Hardware Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/><path d="M8 10h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Laptop Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/><path d="M8 10h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Printer Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v2h12V3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Data Recovery Specialist",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Mobile Charger Point",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2c0-.55-.45-1-1-1s-1 .45-1 1v2H9.33C7.6 4 7 4.9 7 6.33v7.17c0 2.11 1.69 3.5 3.5 3.5s3.5-1.39 3.5-3.5V6.33C14 4.9 13.4 4 11.67 4zM13 13.5c0 .83-.67 1.5-1.5 1.5S10 14.33 10 13.5V7.67c0-.83.67-1.5 1.5-1.5S13 6.84 13 7.67V13.5z"/><path d="M16 12h-2v2h2v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tablet Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/><path d="M16 16h-4v2h4v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Smart Watch Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.96 5.73C5.19 7.19 4 9.46 4 12s1.19 4.81 3.04 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12zM12 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Camera Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Home Appliance Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3-4h6v2h-6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Cook",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Chef",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Food Delivery Driver",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Restaurant Owner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Catering Service Provider",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Baker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Pastry Chef",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Butcher",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm0 2h12v16H6V4z"/><path d="M8 6h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Grocery Store Owner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm20 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM5 6h14v2H5V6zm0 4h14v2H5v-2zm0 4h14v2H5v-2z"/><path d="M5 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Vegetable Vendor",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Fruit Vendor",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Fish Seller",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 12c0-1.1-.9-2-2-2-.74 0-1.39.41-1.73 1.05L12 5.28 7.73 10.05C7.39 9.41 6.74 9 6 9c-1.1 0-2 .9-2 2s.9 2 2 2c.74 0 1.39-.41 1.73-1.05L12 18.72l4.27-4.77c.34.64.99 1.05 1.73 1.05 1.1 0 2-.9 2-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Milkman",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z"/><path d="M8 10h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Ice Cream Vendor",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Sweet Shop Owner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bakery Oven Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/><path d="M10 10h4v4h-4z"/></svg>',
        view_box: "0 0 24 24"
      }
    ];

    // Update existing services with unique icons
    for (let i = 0; i < allServicesWithIcons.length; i++) {
      const service = allServicesWithIcons[i];
      
      // Check if service already exists, if so update it, otherwise insert
      await db.insert(services).values({
        id: i + 1, // Use sequential IDs
        name: service.name,
        svg: service.svg,
        view_box: service.view_box
      }).onConflictDoUpdate({
        target: services.id,
        set: {
          name: service.name,
          svg: service.svg,
          view_box: service.view_box
        }
      });
    }
    
    // If there are more existing services than our predefined list, update them too
    // with generic icons to avoid leaving services without proper icons
    const maxId = allServicesWithIcons.length;
    const allCurrentServices = await db.select().from(services);
    
    for (const currentService of allCurrentServices) {
      if (currentService.id > maxId) {
        // Update any extra services with a generic icon
        await db.update(services).set({
          name: currentService.name,
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`,
          view_box: "0 0 24 24"
        }).where(eq(services.id, currentService.id));
      }
    }

    return {
      success: true,
      message: `Successfully updated ${allServicesWithIcons.length} services with unique icons`,
      count: allServicesWithIcons.length
    };
  } catch (error: unknown) {
    console.error('Error updating service icons:', error);
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update service icons: ${errorMessage}`
    });
  }
});
