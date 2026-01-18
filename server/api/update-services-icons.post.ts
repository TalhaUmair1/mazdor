import { db } from '~~/server/utils/db'
import { services } from '~~/server/database/schema'
import { defineEventHandler, createError } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  try {
    // Remaining services with appropriate SVG icons
    const remainingServices = [
      {
        name: "Rickshaw Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2V4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v2H5c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-8-2h4v2h-4V4zm7 14H6V8h12v10z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Truck Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h10v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM7 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm2-9H8v3h11V6z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bus Mechanic",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h10v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v9zm3-5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-5H6v3h15V6z"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Mobile Car Service Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Handyman / Multi-Skill Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Gardener / Mali",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 16c0 2.21-1.79 4-4 4s-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2zm-8-10c0-.55-.45-1-1-1s-1 .45-1 1H5c0 1.66 1.34 3 3 3s3-1.34 3-3H9zm10 0c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1h2zM9 8c0 1.66 1.34 3 3 3s3-1.34 3-3H9z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Lawn Cutter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 16c0 2.21-1.79 4-4 4s-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2zm-8-10c0-.55-.45-1-1-1s-1 .45-1 1H5c0 1.66 1.34 3 3 3s3-1.34 3-3H9zm10 0c0-1.66-1.34-3-3-3s-3 1.34-3 3h2c0-.55.45-1 1-1s1 .45 1 1h2zM9 8c0 1.66 1.34 3 3 3s3-1.34 3-3H9z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tree Cutter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Home Cook",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Maid / House Cleaner",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8H3v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8zm0 12H5v-2h8v2zm0-4H5v-2h8v2zm0-4H5V8h8v4zM21 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Babysitter / Nanny",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Elder Care Attendant",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Home Nurse",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Patient Care Assistant",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Laundry / Ironing Worker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8H3v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8zm0 12H5v-2h8v2zm0-4H5v-2h8v2zm0-4H5V8h8v4zM21 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tailor",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Curtain Stitching Service",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Shoe Repairer (Mochi)",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Cobbler",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2h-1V1h-2v2H9V1H7v2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zM4 9v6h2v-2h2v2h2v-6H8v2H6V9H4zm16 6h-2v2H6v-2H4v-2h2v-2h2v2h2v-2h4v2h2v-2h2v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Locksmith",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Door Lock Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Safe Locker Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Security Guard",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Fire Extinguisher Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Emergency Exit Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Shutter Repair Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 16H8V6h8v12z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Rolling Shutter Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 16H6V6h12v12z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Intercom Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Door Bell / Smart Bell Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Shop Fitter",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Sign Board Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Flex Banner Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "LED Screen Installer",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/><path d="M6 6h12v12H6z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Display Rack Fabricator",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6H2v12h20V6zm-2 4H4v8h16v-8z"/><path d="M8 8h8v4H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Cold Storage Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/><path d="M8 6h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Ice Plant Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h12v16z"/><path d="M8 6h8v2H8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Commercial Kitchen Equipment Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Tandoor Maker",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        view_box: "0 0 24 24"
      },
      {
        name: "Bakery Oven Technician",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
        view_box: "0 0 24 24"
      }
    ];

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const service of remainingServices) {
      try {
        const result = await db.update(services).set({
          svg: service.svg,
          view_box: service.view_box
        }).where(eq(services.name, service.name));

        if (result.rowsAffected > 0) {
          updatedCount++;
          console.log(`Updated service: ${service.name}`);
        } else {
          // If no rows were updated, try inserting the service
          try {
            await db.insert(services).values({
              name: service.name,
              svg: service.svg,
              view_box: service.view_box
            });
            console.log(`Inserted service: ${service.name}`);
            updatedCount++;
          } catch (insertError) {
            console.log(`Service already exists or error inserting: ${service.name}`);
            notFoundCount++;
          }
        }
      } catch (error) {
        console.error(`Error updating service ${service.name}:`, error);
        notFoundCount++;
      }
    }

    return {
      success: true,
      message: `Updated ${updatedCount} services with appropriate icons, ${notFoundCount} services not found`,
      updatedCount,
      notFoundCount
    };
  } catch (error) {
    console.error('Error in update-services endpoint:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to update services'
    });
  }
});