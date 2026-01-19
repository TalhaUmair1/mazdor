// locations.seed.ts

// Generates 1,000+ hierarchical Pakistan locations

type Location = {
  id?: number
  name: string
  parentId: number | null
}

let idCounter = 1
const locations: Location[] = []

const add = (name: string, parentId: number | null) => {
  const loc = { id: idCounter++, name, parentId }
  locations.push(loc)
  return loc.id!
}

/* =========================
   LEVEL 1 — PROVINCES
========================= */

const PUNJAB = add('Punjab', null)
const SINDH = add('Sindh', null)
const KPK = add('Khyber Pakhtunkhwa', null)
const BALOCHISTAN = add('Balochistan', null)
const ICT = add('Islamabad Capital Territory', null)

/* =========================
   LEVEL 2 — MAJOR CITIES
========================= */

const cities = {
  Lahore: add('Lahore', PUNJAB),
  Rawalpindi: add('Rawalpindi', PUNJAB),
  Faisalabad: add('Faisalabad', PUNJAB),
  Multan: add('Multan', PUNJAB),
  Gujranwala: add('Gujranwala', PUNJAB),

  Karachi: add('Karachi', SINDH),
  Hyderabad: add('Hyderabad', SINDH),
  Sukkur: add('Sukkur', SINDH),

  Peshawar: add('Peshawar', KPK),
  Abbottabad: add('Abbottabad', KPK),
  Mingora: add('Mingora (Swat)', KPK),

  Quetta: add('Quetta', BALOCHISTAN),
  Gwadar: add('Gwadar', BALOCHISTAN),

  Islamabad: add('Islamabad', ICT),
}

/* =========================
   ADD MORE PAKISTANI CITIES
========================= */

// Add additional cities to reach approximately 150 famous locations
const additionalCities = {
  Gujranwala: add('Gujranwala', PUNJAB),
  Sialkot: add('Sialkot', PUNJAB),
  Bahawalpur: add('Bahawalpur', PUNJAB),
  Gujrat: add('Gujrat', PUNJAB),
  Sargodha: add('Sargodha', PUNJAB),
  Kasur: add('Kasur', PUNJAB),
  Okara: add('Okara', PUNJAB),
  Sahiwal: add('Sahiwal', PUNJAB),
  Sheikhupura: add('Sheikhupura', PUNJAB),
  MandiBahauddin: add('Mandi Bahauddin', PUNJAB),
  
  Nawabshah: add('Nawabshah', SINDH),
  Mirpurkhas: add('Mirpurkhas', SINDH),
  Thatta: add('Thatta', SINDH),
  Dadu: add('Dadu', SINDH),
  Badin: add('Badin', SINDH),
  TandoAllahyar: add('Tando Allahyar', SINDH),
  Sanghar: add('Sanghar', SINDH),
  Khairpur: add('Khairpur', SINDH),
  
  Nowshera: add('Nowshera', KPK),
  Mardan: add('Mardan', KPK),
  Swabi: add('Swabi', KPK),
  Haripur: add('Haripur', KPK),
  Charsadda: add('Charsadda', KPK),
  Kohat: add('Kohat', KPK),
  Tank: add('Tank', KPK),
  LakkiMarwat: add('Lakki Marwat', KPK),
  Bannu: add('Bannu', KPK),
  
  Larkana: add('Larkana', SINDH),
  Jacobabad: add('Jacobabad', SINDH),
  Shikarpur: add('Shikarpur', SINDH),
  Jamshoro: add('Jamshoro', SINDH),
  
  Turbat: add('Turbat', BALOCHISTAN),
  Khuzdar: add('Khuzdar', BALOCHISTAN),
  Panjgur: add('Panjgur', BALOCHISTAN),
  Mastung: add('Mastung', BALOCHISTAN),
  Kalat: add('Kalat', BALOCHISTAN),
  
  Muzaffarabad: add('Muzaffarabad', ICT),
  Gilgit: add('Gilgit', ICT),
  Skardu: add('Skardu', ICT),
  Sukkur: add('Sukkur', SINDH),
}

/* =========================
   LEVEL 3 — FAMOUS LANDMARKS AND AREAS
========================= */

// Function to add famous landmarks/areas to a city
const addLandmarks = (cityId: number, names: string[]) => {
  names.forEach(name => add(name, cityId))
}

/* =========================
   LAHORE (Famous Landmarks)
========================= */

addLandmarks(cities.Lahore, [
  'Anarkali Bazaar', 'Badshahi Mosque', 'Lahore Fort', 'Shalimar Gardens',
  'Gawalmandi Food Street', 'Data Darbar', 'Minar-e-Pakistan', 'Johar Town',
  'Gulberg', 'Model Town', 'DHA Lahore', 'Defense Housing Authority',
  'Wapda Town', 'Iqbal Town', 'Mughalpura', 'Ravi Town',
  'Aziz Bhatti Park', 'Lahore Zoo', 'Bagh-e-Jinnah', 'Fortress Stadium'
])

/* =========================
   KARACHI (Famous Landmarks)
========================= */

addLandmarks(cities.Karachi, [
  'Clifton', 'Sea View', 'Frere Hall', 'Mohatta Palace',
  'Pakistan Monument Karachi', 'Empress Market', 'Burns Road', 'MA Jinnah Road',
  'PECHS', 'Gulshan-e-Iqbal', 'North Nazimabad', 'Nazimabad',
  'Malir', 'Korangi', 'Landhi', 'Saddar',
  'Lyari', 'Kharadar', 'Garden East', 'DHA Karachi',
  'Port Qasim', 'Korangi Creek', 'Manora', 'Chowk Kadri'
])

/* =========================
   ISLAMABAD (Famous Landmarks)
========================= */

addLandmarks(cities.Islamabad, [
  'Faisal Mosque', 'Pakistan Monument', 'Daman-e-Koh', 'Rose and Jasmine Garden',
  'Shakarparian Cultural Complex', 'Lok Virsa Museum', 'Pakistan Institute of Nuclear Science',
  'Blue Area', 'Red Zone', 'Yellow Area', 'Green Zone',
  'G-5', 'G-6', 'G-7', 'G-8', 'G-9', 'G-10', 'G-11', 'G-12', 'G-13', 'G-14',
  'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'E-10', 'E-11',
  'F-5', 'F-6', 'F-7', 'F-8', 'F-9', 'F-10',
  'I-8', 'I-9', 'I-10', 'I-11', 'I-12',
  'H-8', 'H-9', 'H-10', 'H-11', 'H-12',
  'Bahria Town', 'DHA Islamabad', 'Peshawar Mor', 'Zero Point',
  'Constitution Avenue', 'Jinnah Avenue', 'Blue Area Mall', 'Centaurus Mall'
])

/* =========================
   RAWALPINDI (Famous Landmarks)
========================= */

addLandmarks(cities.Rawalpindi, [
  'Raja Bazaar', 'Saddar', 'Satellite Town', 'Chaklala Scheme',
  'Peshawar Road', 'Liaquat Bagh', 'Ayub National Park', 'Kalma Chowk',
  'Chaklala', 'Airport Road', 'ISKCON Temple', 'Holy Family Hospital',
  'Adiala Road', 'Bahria Town', 'Phase 7 Extension', 'Millennium City',
  'University Road', 'Railway Road', 'GT Road', 'Kashmir Point'
])

/* =========================
   FAISALABAD (Famous Landmarks)
========================= */

addLandmarks(cities.Faisalabad, [
  'Clock Tower', 'Jinnah Garden', 'Chenab Nagar', 'Katchery Bazaar',
  'Sati Wal Matam', 'Bhor Kahar', 'Jhangi Gate', 'Shadbagh',
  'Dogar Mandi', 'Ghanta Ghar', 'Shah Jamal', 'Chungi No. 8',
  'Sargodha Road', 'Jaranwala Road', 'Pindi Gheb Road', 'Tibba No. 1',
  'Canal Road', 'Faisalabad Cantonment', 'Al-Ameen Society', 'Qaiser Colony'
])

/* =========================
   MULTAN (Famous Landmarks)
========================= */

addLandmarks(cities.Multan, [
  'Multan Fort', 'Shah Rukn-e-Alam Tomb', 'Ghazi Khan Gate', 'Hussain Agahi',
  'Peer Dastgeer Bazaar', 'Makli Gate', 'Roza Risaldar', 'Bosan Road',
  'Sadar Bazaar', 'Kotla Rubbani Khan', 'Uch Sharif', 'Sulaimanabad',
  'Haroonabad', 'Alipur', 'Kabirwala', 'Shujabad',
  'Multan University', 'Qasim Bagh', 'Shah Shuja', 'Kamalia Road'
])

/* =========================
   PESHAWAR (Famous Landmarks)
========================= */

addLandmarks(cities.Peshawar, [
  'Peshawar Fort', 'Bacha Khan University', 'Qissa Khwani Bazaar', 'Kohati Gate',
  'Chowk Yadgar', 'University Road', 'Sir Syed Colony', 'Kohat Road',
  'Charsadda Road', 'Dabgari Gate', 'Mall Road', 'Saddar',
  'Bagh-e-Naran', 'Takht-i-Bahi', 'Bala Hisar Fort', 'Namak Mandi'
])

/* =========================
   HYDERABAD (Famous Landmarks)
========================= */

addLandmarks(cities.Hyderabad, [
  'Paani Goth', 'Hussainabad', 'Soldier Bazaar', 'Saddar',
  'Garden West', 'KDA Scheme 1', 'Gulshan-e-Hadeed', 'Buffer Zone',
  'Malir Cantonment', 'Jahanabad', 'Moinabad', 'Machar Colony',
  'Korangi Sector 33', 'Shah Latif Town', 'Bilal Colony', 'Qasimabad'
])

/* =========================
   QUETTA (Famous Landmarks)
========================= */

addLandmarks(cities.Quetta, [
  'Satellite Town', 'Sariab Road', 'Chaman Highway', 'Hazarganji Chiltan National Park',
  'Quetta Cantonment', 'Zarghoonabad', 'Kuchlak', 'Samanabad',
  'Jinnah Town', 'Model Town', 'Shalwar Bagh', 'Chawk Parso',
  'Liaquat Bazaar', 'Afghan Bazaar', 'Bypass Chowk', 'Hazara Town'
])

/* =========================
   ABBOTTABAD (Famous Landmarks)
========================= */

addLandmarks(cities.Abbottabad, [
  'Garhi Habibullah', 'Mansehra Road', 'Haripur Road', 'Karakoram Highway',
  'Abbottabad Cantonment', 'Mallory Town', 'University Town', 'Kohat Tunnel',
  'Jalalpur Bazaar', 'Kundian Road', 'Khewra Salt Mines', 'Mankiala Stupa'
])

/* =========================
   MINGORA (Famous Landmarks)
========================= */

addLandmarks(cities.Mingora, [
  'Swat Motorway', 'Marghazar', 'Saidu Sharif', 'Miandam',
  'Kalam Valley', 'Alpurai', 'Shangla', 'Barikot',
  'Usho', 'Charbagh', 'Khandyabad', 'Upper Swat'
])

/* =========================
   GILGIT (Famous Landmarks)
========================= */

addLandmarks(additionalCities.Gilgit, [
  'Hill Park', 'Karakoram Highway', 'Gilgit Airport', 'Altit Fort',
  'Hussainabad', 'Nagar Valley', 'Danyor Suspension Bridge', 'Thoyi Bagh',
  'Rahimabad', 'Diamer District', 'Chilas', 'Dasu'
])

/* =========================
   SUKKUR (Famous Landmarks)
========================= */

addLandmarks(additionalCities.Sukkur, [
  'Sukkur Barrage', 'Rohri', 'Saddar', 'University Road',
  'Latifabad', 'Saleem Shaheed Colony', 'Soville Town', 'Chak',
  'Kotri', 'Pano Aqil', 'Dadu', 'Mehrabpur'
])

/* =========================
   EXPORT (APPROXIMATELY 150+ RECORDS)
========================= */

export const locationsSeed = locations

// Import the database connection
import { db } from '../server/utils/db';
import { locations as locationsTable } from '../server/database/schema';
import { sql } from 'drizzle-orm';

console.log(`Seeding ${locationsSeed.length} locations into the database...`);

async function seedLocations() {
  try {
    console.log('Disabling foreign key constraints temporarily...');
    await db.run(sql`PRAGMA foreign_keys = OFF`);
    
    console.log('Clearing existing locations...');
    await db.delete(locationsTable);

    console.log('Inserting new locations and keeping track of database IDs...');
    
    // Create a mapping between the original IDs and the database IDs
    const idMapping = new Map<number, number>();
    
    // Insert locations one by one to track the actual database IDs
    for (let i = 0; i < locationsSeed.length; i++) {
      const location = locationsSeed[i];
      
      // Insert the location and get the resulting database ID
      const result = await db.insert(locationsTable).values({
        name: location.name,
        parentId: location.parentId
      }).returning({ insertedId: locationsTable.id });
      
      // Map the original ID to the database ID
      idMapping.set(location.id!, result[0].insertedId);
    }
    
    // Now update all parentIds to use the actual database IDs
    for (let i = 0; i < locationsSeed.length; i++) {
      const location = locationsSeed[i];
      if (location.parentId !== null) {
        const dbParentId = idMapping.get(location.parentId);
        if (dbParentId !== undefined) {
          await db.update(locationsTable)
            .set({ parentId: dbParentId })
            .where(sql`${locationsTable.id} = ${idMapping.get(location.id!)}`);
        }
      }
    }

    console.log('Re-enabling foreign key constraints...');
    await db.run(sql`PRAGMA foreign_keys = ON`);
    
    console.log(`Successfully seeded ${locationsSeed.length} locations with correct hierarchy!`);
  } catch (error) {
    console.error('Error seeding locations:', error);
    console.log('Re-enabling foreign key constraints...');
    await db.run(sql`PRAGMA foreign_keys = ON`);
    process.exit(1);
  }
}

if (import.meta.url === new URL(import.meta.url).href) {
  seedLocations();
}

export { seedLocations };