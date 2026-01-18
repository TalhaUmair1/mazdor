import { db } from '../server/utils/db.js';
import { services } from '../server/database/schema.js';
import { eq } from 'drizzle-orm';

const serviceList = [
  'Plumber', 'Electrician', 'Carpenter', 'Mason', 'Painter (Whitewash / Spray)',
  'Tile Fixer', 'Marble Fixer', 'Concrete Worker', 'Shuttering Carpenter', 'Steel Fixer (Sariya Bandhny Wala)',
  'False Ceiling Installer', 'Gypsum Board Installer', 'POP Ceiling Worker', 'Aluminum Fabricator', 'Glass Installer',
  'Iron / Steel Fabricator', 'Welder', 'Gate Maker', 'Grill Maker', 'Rooftop Waterproofing Technician',
  'AC Technician', 'Refrigerator Technician', 'Washing Machine Repair Technician', 'Microwave Oven Repair Technician',
  'Water Pump / Motor Technician', 'Generator Mechanic', 'UPS Technician', 'Inverter Technician', 'Solar Panel Installer',
  'CCTV Camera Installer', 'Network Cabling Technician', 'Electric Meter Installer', 'Transformer Helper',
  'Lift / Elevator Technician', 'Escalator Technician', 'Bore / Tubewell Technician', 'Gas Geyser Technician',
  'Gas Line Fitter', 'Fire Alarm Technician', 'Access Control System Installer', 'Water Tank Cleaner',
  'Septic Tank Cleaner', 'Drainage Cleaner', 'Sewerage Worker', 'Pest Control Technician', 'Termite Control Specialist',
  'Home Deep Cleaning Worker', 'Sofa & Carpet Cleaner', 'Curtain & Blind Installer', 'Wallpaper Installer',
  'Furniture Polisher', 'Furniture Repair Technician', 'Mattress Cleaning Service', 'Chimney / Exhaust Cleaner',
  'Roof Cleaning Worker', 'Car Mechanic', 'Bike Mechanic', 'Auto Electrician', 'Denting & Painting Technician',
  'Car AC Technician', 'Tyre Puncture Repairer', 'Wheel Alignment Technician', 'Car Washer / Detailer',
  'Auto Spare Parts Fitter', 'Battery Replacement Technician', 'Car Tuning Specialist', 'Rickshaw Mechanic',
  'Truck Mechanic', 'Bus Mechanic', 'Mobile Car Service Technician', 'Handyman / Multi-Skill Worker',
  'Gardener / Mali', 'Lawn Cutter', 'Tree Cutter', 'Home Cook', 'Maid / House Cleaner', 'Babysitter / Nanny',
  'Elder Care Attendant', 'Home Nurse', 'Patient Care Assistant', 'Laundry / Ironing Worker', 'Tailor',
  'Curtain Stitching Service', 'Shoe Repairer (Mochi)', 'Cobbler', 'Locksmith', 'Door Lock Installer',
  'Safe Locker Technician', 'Security Guard', 'Fire Extinguisher Technician', 'Emergency Exit Installer',
  'Shutter Repair Technician', 'Rolling Shutter Installer', 'Intercom Installer', 'Door Bell / Smart Bell Installer',
  'Shop Fitter', 'Sign Board Installer', 'Flex Banner Installer', 'LED Screen Installer', 'Display Rack Fabricator',
  'Cold Storage Technician', 'Ice Plant Technician', 'Commercial Kitchen Equipment Technician', 'Tandoor Maker',
  'Bakery Oven Technician'
];

const defaultSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>';

async function addServices() {
  for (const serviceName of serviceList) {
    try {
      const existing = await db.select().from(services).where(eq(services.name, serviceName));
      if (existing.length === 0) {
        await db.insert(services).values({
          name: serviceName,
          svg: defaultSVG,
          view_box: '0 0 24 24'
        });
        console.log('Added service:', serviceName);
      } else {
        console.log('Service already exists:', serviceName);
      }
    } catch (error) {
      console.error('Error adding service:', serviceName, error);
    }
  }
  console.log('All services processed.');
}

addServices().then(() => {
  console.log('Successfully added services to the database!');
}).catch(error => {
  console.error('Error processing services:', error);
});