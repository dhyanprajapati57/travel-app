import { openDB } from "idb";  //library
//setup db
const DB_NAME = "travelDB";
const DB_VERSION = 3;

// Init DB
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("searchHistory")) {
        // changes table serch history store
        db.createObjectStore("searchHistory", {
          keyPath: "id",
          autoIncrement: true,
          
        });
      }

      if (!db.objectStoreNames.contains("recentFlights")) {
        db.createObjectStore("recentFlights", {
          keyPath: "id",    
          autoIncrement: true,
        });
      }
    },
  });
};

//
// 
//

// Add Search
export const addSearchHistory = async (data: {
  from: string;
  to: string;
  date: string;
}) => {
  const db = await initDB();

  await db.add("searchHistory", {
    ...data,
    createdAt: new Date().toISOString(),
  });
};

// Get Limited Search History (last 5)
export const getSearchHistory = async () => {
  const db = await initDB();
  const all = await db.getAll("searchHistory");

  return all
    .sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);                        //Start from index 0
 };                                      //Stop BEFORE index 5


// Clear Search History
export const clearSearchHistory = async () => {
  const db = await initDB();
  await db.clear("searchHistory");
};


// Add Recent Flight
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addRecentFlight = async (flight: any) => {
  const db = await initDB();

  await db.add("recentFlights", {
    ...flight,
    viewedAt: new Date().toISOString(),
  });
};

// Get Recent Flights
export const getRecentFlights = async () => {
  const db = await initDB();
  const all = await db.getAll("recentFlights");

  return all
    .sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) =>
        new Date(b.viewedAt).getTime() -
        new Date(a.viewedAt).getTime()
    )
    .slice(0, 5);
};