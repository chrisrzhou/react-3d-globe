import shortid from 'shortid';

const getId = () => shortid.generate();

const MOCK_DATA = {
  adak: {
    lat: 51.883,
    long: -176.633,
    city: 'Adak',
  },
  'nuku%ca%bbalofa': {
    lat: -21.133,
    long: -175.2,
    city: 'Nuku%CA%BBalofa',
  },
  apia: {
    lat: -13.833,
    long: -171.833,
    city: 'Apia',
  },
  pagopago: {
    lat: -14.267,
    long: -170.7,
    city: 'Pago Pago',
  },
  alofi: {
    lat: -19.05,
    long: -169.917,
    city: 'Alofi',
  },
  avarua: {
    lat: -21.2,
    long: -159.767,
    city: 'Avarua',
  },
  honolulu: {
    lat: 21.3,
    long: -157.817,
    city: 'Honolulu',
  },
  hilo: {
    lat: 19.7,
    long: -155.1,
    city: 'Hilo',
  },
  anchorage: {
    lat: 61.217,
    long: -149.883,
    city: 'Anchorage',
  },
  papeete: {
    lat: -17.533,
    long: -149.567,
    city: 'Papeete',
  },
  fairbanks: {
    lat: 64.833,
    long: -147.7,
    city: 'Fairbanks',
  },
  sitka: {
    lat: 57.05,
    long: -135.317,
    city: 'Sitka',
  },
  whitehorse: {
    lat: 60.717,
    long: -135.05,
    city: 'Whitehorse',
  },
  juneau: {
    lat: 58.35,
    long: -134.5,
    city: 'Juneau',
  },
  adamstown: {
    lat: -25.067,
    long: -130.1,
    city: 'Adamstown',
  },
  vancouver: {
    lat: 49.25,
    long: -123.1,
    city: 'Vancouver',
  },
  rabiisland: {
    lat: 3.133,
    long: -12.05,
    city: 'Rabi Island',
  },
  portland: {
    lat: 45.517,
    long: -122.667,
    city: 'Portland',
  },
  sanfrancisco: {
    lat: 37.767,
    long: -122.417,
    city: 'San Francisco',
  },
  seattle: {
    lat: 47.6,
    long: -122.317,
    city: 'Seattle',
  },
  sacramento: {
    lat: 38.55,
    long: -121.467,
    city: 'Sacramento',
  },
  losangeles: {
    lat: 34.05,
    long: -118.25,
    city: 'Los Angeles',
  },
  riverside: {
    lat: 33.933,
    long: -117.383,
    city: 'Riverside',
  },
  sandiego: {
    lat: 32.767,
    long: -117.15,
    city: 'San Diego',
  },
  tijuana: {
    lat: 32.517,
    long: -117.033,
    city: 'Tijuana',
  },
  mexicali: {
    lat: 32.667,
    long: -115.467,
    city: 'Mexicali',
  },
  lasvegas: {
    lat: 36.167,
    long: -115.133,
    city: 'Las Vegas',
  },
  yellowknife: {
    lat: 62.45,
    long: -114.4,
    city: 'Yellowknife',
  },
  calgary: {
    lat: 51.033,
    long: -114.05,
    city: 'Calgary',
  },
  edmonton: {
    lat: 53.567,
    long: -113.517,
    city: 'Edmonton',
  },
  phoenix: {
    lat: 33.433,
    long: -112.067,
    city: 'Phoenix',
  },
  saltlakecity: {
    lat: 40.75,
    long: -111.883,
    city: 'Salt Lake City',
  },
  tucson: {
    lat: 32.2,
    long: -110.917,
    city: 'Tucson',
  },
  hangaroa: {
    lat: 27.15,
    long: -109.433,
    city: 'Hanga Roa',
  },
  saskatoon: {
    lat: 52.117,
    long: -106.65,
    city: 'Saskatoon',
  },
  albuquerque: {
    lat: 35.1,
    long: -106.6,
    city: 'Albuquerque',
  },
  elpaso: {
    lat: 31.783,
    long: -106.417,
    city: 'El Paso',
  },
  chihuahua: {
    lat: 28.1,
    long: -106.0,
    city: 'Chihuahua',
  },
  denver: {
    lat: 39.733,
    long: -104.983,
    city: 'Denver',
  },
  durango: {
    lat: 24.017,
    long: -104.667,
    city: 'Durango',
  },
  regina: {
    lat: 50.433,
    long: -104.617,
    city: 'Regina',
  },
  zapopan: {
    lat: 20.767,
    long: -103.4,
    city: 'Zapopan',
  },
  guadalajara: {
    lat: 20.667,
    long: -103.35,
    city: 'Guadalajara',
  },
  monterrey: {
    lat: 25.667,
    long: -100.3,
    city: 'Monterrey',
  },
  mexicocity: {
    lat: 19.4,
    long: -99.117,
    city: 'Mexico City',
  },
  sanantonio: {
    lat: 29.533,
    long: -98.467,
    city: 'San Antonio',
  },
  puebla: {
    lat: 19.05,
    long: -98.2,
    city: 'Puebla',
  },
  austin: {
    lat: 30.267,
    long: -97.767,
    city: 'Austin',
  },
  oklahomacity: {
    lat: 35.467,
    long: -97.533,
    city: 'Oklahoma City',
  },
  wichita: {
    lat: 37.683,
    long: -97.333,
    city: 'Wichita',
  },
  winnipeg: {
    lat: 49.9,
    long: -97.133,
    city: 'Winnipeg',
  },
  dallas: {
    lat: 32.767,
    long: -96.8,
    city: 'Dallas',
  },
  veracruz: {
    lat: 19.183,
    long: -96.133,
    city: 'Veracruz',
  },
  houston: {
    lat: 29.75,
    long: -95.367,
    city: 'Houston',
  },
  kansascity: {
    lat: 39.1,
    long: -94.567,
    city: 'Kansas City',
  },
  minneapolis: {
    lat: 44.967,
    long: -93.25,
    city: 'Minneapolis',
  },
  quetzaltenango: {
    lat: 14.833,
    long: -91.517,
    city: 'Quetzaltenango',
  },
  guatemalacity: {
    lat: 14.633,
    long: -90.55,
    city: 'Guatemala City',
  },
  'st.louis': {
    lat: 38.617,
    long: -90.183,
    city: 'St. Louis',
  },
  neworleans: {
    lat: 29.967,
    long: -90.067,
    city: 'New Orleans',
  },
  memphis: {
    lat: 35.117,
    long: -89.967,
    city: 'Memphis',
  },
  'm%c3%a9rida': {
    lat: 20.967,
    long: -89.617,
    city: 'M%C3%A9rida',
  },
  sansalvador: {
    lat: 13.683,
    long: -89.183,
    city: 'San Salvador',
  },
  belmopan: {
    lat: 17.25,
    long: -88.767,
    city: 'Belmopan',
  },
  belizecity: {
    lat: 17.483,
    long: -88.183,
    city: 'Belize City',
  },
  milwaukee: {
    lat: 47.05,
    long: -87.95,
    city: 'Milwaukee',
  },
  chicago: {
    lat: 41.867,
    long: -87.617,
    city: 'Chicago',
  },
  tegucigalpa: {
    lat: 14.083,
    long: -87.217,
    city: 'Tegucigalpa',
  },
  nashville: {
    lat: 36.167,
    long: -86.783,
    city: 'Nashville',
  },
  managua: {
    lat: 12.133,
    long: -86.25,
    city: 'Managua',
  },
  indianapolis: {
    lat: 39.783,
    long: -86.15,
    city: 'Indianapolis',
  },
  louisville: {
    lat: 38.25,
    long: -85.75,
    city: 'Louisville',
  },
  cincinnati: {
    lat: 39.133,
    long: -84.5,
    city: 'Cincinnati',
  },
  atlanta: {
    lat: 33.75,
    long: -84.383,
    city: 'Atlanta',
  },
  'sanjos%c3%a9': {
    lat: 9.933,
    long: -84.083,
    city: 'San Jos%C3%A9',
  },
  detroit: {
    lat: 42.333,
    long: -83.05,
    city: 'Detroit',
  },
  columbus: {
    lat: 39.983,
    long: -82.983,
    city: 'Columbus',
  },
  tampa: {
    lat: 27.967,
    long: -82.467,
    city: 'Tampa',
  },
  havana: {
    lat: 23.133,
    long: -82.383,
    city: 'Havana',
  },
  cleveland: {
    lat: 41.483,
    long: -81.667,
    city: 'Cleveland',
  },
  jacksonville: {
    lat: 30.317,
    long: -81.65,
    city: 'Jacksonville',
  },
  georgetown: {
    lat: 5.417,
    long: 100.317,
    city: 'George Town',
  },
  charlotte: {
    lat: 35.2,
    long: -80.817,
    city: 'Charlotte',
  },
  miami: {
    lat: 25.783,
    long: -80.217,
    city: 'Miami',
  },
  pittsburgh: {
    lat: 40.433,
    long: -79.967,
    city: 'Pittsburgh',
  },
  guayaquil: {
    lat: 2.183,
    long: -79.883,
    city: 'Guayaquil',
  },
  panamacity: {
    lat: 8.983,
    long: -79.517,
    city: 'Panama City',
  },
  toronto: {
    lat: 43.65,
    long: -79.383,
    city: 'Toronto',
  },
  buffalo: {
    lat: 42.9,
    long: -78.85,
    city: 'Buffalo',
  },
  raleigh: {
    lat: 35.817,
    long: -78.633,
    city: 'Raleigh',
  },
  quito: {
    lat: 0.25,
    long: -78.583,
    city: 'Quito',
  },
  rochester: {
    lat: 43.15,
    long: -77.6,
    city: 'Rochester',
  },
  nassau: {
    lat: 25.05,
    long: -77.333,
    city: 'Nassau',
  },
  washington: {
    lat: 38.883,
    long: -77.033,
    city: 'Washington',
  },
  lima: {
    lat: -12.033,
    long: -77.017,
    city: 'Lima',
  },
  kingston: {
    lat: -29.067,
    long: 167.967,
    city: 'Kingston',
  },
  baltimore: {
    lat: 39.283,
    long: -76.617,
    city: 'Baltimore',
  },
  cali: {
    lat: 3.417,
    long: -76.517,
    city: 'Cali',
  },
  virginiabeach: {
    lat: 36.85,
    long: -75.983,
    city: 'Virginia Beach',
  },
  santiagodecuba: {
    lat: 20.017,
    long: -75.8,
    city: 'Santiago de Cuba',
  },
  ottawa: {
    lat: 45.417,
    long: -75.683,
    city: 'Ottawa',
  },
  'medell%c3%adn': {
    lat: 6.233,
    long: -75.567,
    city: 'Medell%C3%ADn',
  },
  cartagena: {
    lat: 10.4,
    long: -75.5,
    city: 'Cartagena',
  },
  philadelphia: {
    lat: 39.95,
    long: -75.167,
    city: 'Philadelphia',
  },
  barranquilla: {
    lat: 10.95,
    long: -74.783,
    city: 'Barranquilla',
  },
  forkedriver: {
    lat: 39.817,
    long: -74.183,
    city: 'Forked River',
  },
  jerseycity: {
    lat: 41.433,
    long: -74.133,
    city: 'Jersey City',
  },
  'bogot%c3%a1': {
    lat: 4.6,
    long: -74.067,
    city: 'Bogot%C3%A1',
  },
  newyorkcity: {
    lat: 40.717,
    long: -74.0,
    city: 'New York City',
  },
  montreal: {
    lat: 45.5,
    long: -73.55,
    city: 'Montreal',
  },
  iquitos: {
    lat: -3.733,
    long: -73.25,
    city: 'Iquitos',
  },
  valdivia: {
    lat: -39.817,
    long: -73.233,
    city: 'Valdivia',
  },
  'concepci%c3%b3n': {
    lat: -36.833,
    long: -73.05,
    city: 'Concepci%C3%B3n',
  },
  portauprince: {
    lat: 18.533,
    long: -72.333,
    city: 'Port-au-Prince',
  },
  cusco: {
    lat: -13.5,
    long: -71.967,
    city: 'Cusco',
  },
  maracaibo: {
    lat: -10.65,
    long: -71.633,
    city: 'Maracaibo',
  },
  'valpara%c3%adso': {
    lat: -33.05,
    long: -71.617,
    city: 'Valpara%C3%ADso',
  },
  arequipa: {
    lat: -16.4,
    long: -71.533,
    city: 'Arequipa',
  },
  providence: {
    lat: 41.817,
    long: -71.417,
    city: 'Providence',
  },
  sancarlosdebariloche: {
    lat: -41.15,
    long: -71.3,
    city: 'San Carlos de Bariloche',
  },
  laserena: {
    lat: -29.9,
    long: -71.25,
    city: 'La Serena',
  },
  quebeccity: {
    lat: 46.8,
    long: -71.217,
    city: 'Quebec City',
  },
  cockburntown: {
    lat: 21.45,
    long: -71.133,
    city: 'Cockburn Town',
  },
  boston: {
    lat: 42.35,
    long: -71.05,
    city: 'Boston',
  },
  puntaarenas: {
    lat: -53.167,
    long: -70.933,
    city: 'Punta Arenas',
  },
  santiago: {
    lat: -33.45,
    long: -70.667,
    city: 'Santiago',
  },
  antofagasta: {
    lat: -23.65,
    long: -70.4,
    city: 'Antofagasta',
  },
  iquique: {
    lat: -20.217,
    long: -70.15,
    city: 'Iquique',
  },
  oranjestad: {
    lat: 12.517,
    long: -70.033,
    city: 'Oranjestad',
  },
  santodomingo: {
    lat: 18.483,
    long: -69.917,
    city: 'Santo Domingo',
  },
  riobranco: {
    lat: -10.117,
    long: -69.35,
    city: 'Rio Branco',
  },
  willemstad: {
    lat: 12.117,
    long: -68.933,
    city: 'Willemstad',
  },
  calama: {
    lat: -22.467,
    long: -68.933,
    city: 'Calama',
  },
  mendoza: {
    lat: -32.883,
    long: -68.817,
    city: 'Mendoza',
  },
  iqaluit: {
    lat: 63.75,
    long: -68.517,
    city: 'Iqaluit',
  },
  ushuaia: {
    lat: -54.8,
    long: -68.3,
    city: 'Ushuaia',
  },
  lapaz: {
    lat: -16.5,
    long: -68.15,
    city: 'La Paz',
  },
  puertowilliams: {
    lat: 54.933,
    long: -67.617,
    city: 'Puerto Williams',
  },
  caracas: {
    lat: 10.5,
    long: -66.917,
    city: 'Caracas',
  },
  fredericton: {
    lat: 45.95,
    long: -66.667,
    city: 'Fredericton',
  },
  sanjuan: {
    lat: 18.45,
    long: -66.067,
    city: 'San Juan',
  },
  saintjohn: {
    lat: 45.267,
    long: -66.05,
    city: 'Saint John',
  },
  sucre: {
    lat: -19.033,
    long: -65.25,
    city: 'Sucre',
  },
  charlotteamalie: {
    lat: -18.35,
    long: -64.95,
    city: 'Charlotte Amalie',
  },
  hamilton: {
    lat: -37.783,
    long: 175.283,
    city: 'Hamilton',
  },
  roadtown: {
    lat: 18.433,
    long: -64.617,
    city: 'Road Town',
  },
  'c%c3%b3rdoba': {
    lat: -31.4,
    long: -64.183,
    city: 'C%C3%B3rdoba',
  },
  portovelho: {
    lat: -8.75,
    long: -63.9,
    city: 'Porto Velho',
  },
  cityofhalifax: {
    lat: 44.667,
    long: -63.6,
    city: 'City of Halifax',
  },
  santacruzdelasierra: {
    lat: -17.8,
    long: -63.167,
    city: 'Santa Cruz de la Sierra',
  },
  charlottetown: {
    lat: 46.233,
    long: -63.133,
    city: 'Charlottetown',
  },
  thevalley: {
    lat: 18.217,
    long: -63.05,
    city: 'The Valley',
  },
  basseterre: {
    lat: 15.983,
    long: -61.717,
    city: 'Basse-Terre',
  },
  'bah%c3%adablanca': {
    lat: -38.717,
    long: -62.267,
    city: 'Bah%C3%ADa Blanca',
  },
  'st.john%27s': {
    lat: 47.55,
    long: -52.7,
    city: 'St. John%27s',
  },
  'st.george%27s': {
    lat: 12.05,
    long: -61.75,
    city: 'St. George%27s',
  },
  portofspain: {
    lat: 10.667,
    long: -61.517,
    city: 'Port of Spain',
  },
  sanfernando: {
    lat: 10.283,
    long: -61.467,
    city: 'San Fernando',
  },
  roseau: {
    lat: 15.3,
    long: -61.383,
    city: 'Roseau',
  },
  chaguanas: {
    lat: 10.5,
    long: -61.383,
    city: 'Chaguanas',
  },
  kingstown: {
    lat: 13.167,
    long: -61.233,
    city: 'Kingstown',
  },
  fortdefrance: {
    lat: 14.6,
    long: -61.083,
    city: 'Fort-de-France',
  },
  castries: {
    lat: 14.017,
    long: -60.983,
    city: 'Castries',
  },
  rosario: {
    lat: -32.95,
    long: -60.667,
    city: 'Rosario',
  },
  boavista: {
    lat: 2.817,
    long: -60.65,
    city: 'Boa Vista',
  },
  manaus: {
    lat: -3.1,
    long: -60.017,
    city: 'Manaus',
  },
  bridgetown: {
    lat: 13.083,
    long: -59.617,
    city: 'Bridgetown',
  },
  buenosaires: {
    lat: -34.6,
    long: -58.367,
    city: 'Buenos Aires',
  },
  stanley: {
    lat: 51.683,
    long: -57.85,
    city: 'Stanley',
  },
  'asunci%c3%b3n': {
    lat: -25.267,
    long: -57.667,
    city: 'Asunci%C3%B3n',
  },
  saintpierre: {
    lat: 46.767,
    long: -56.167,
    city: 'Saint-Pierre',
  },
  montevideo: {
    lat: -34.917,
    long: -56.167,
    city: 'Montevideo',
  },
  'cuiab%c3%a1': {
    lat: -15.583,
    long: -56.083,
    city: 'Cuiab%C3%A1',
  },
  paramaribo: {
    lat: 5.867,
    long: -55.167,
    city: 'Paramaribo',
  },
  campogrande: {
    lat: -20.433,
    long: -54.633,
    city: 'Campo Grande',
  },
  ciudaddeleste: {
    lat: -25.417,
    long: -54.617,
    city: 'Ciudad del Este',
  },
  'chu%c3%ad': {
    lat: -33.683,
    long: -53.45,
    city: 'Chu%C3%AD',
  },
  pelotas: {
    lat: -31.767,
    long: -52.333,
    city: 'Pelotas',
  },
  cayenne: {
    lat: 4.917,
    long: -52.317,
    city: 'Cayenne',
  },
  nuuk: {
    lat: 64.167,
    long: -51.75,
    city: 'Nuuk',
  },
  portoalegre: {
    lat: 30.033,
    long: -51.217,
    city: 'Porto Alegre',
  },
  'macap%c3%a1': {
    lat: 0.033,
    long: -51.05,
    city: 'Macap%C3%A1',
  },
  assis: {
    lat: -22.65,
    long: -50.4,
    city: 'Assis',
  },
  curitiba: {
    lat: -25.417,
    long: -49.25,
    city: 'Curitiba',
  },
  'bel%c3%a9m': {
    lat: 1.467,
    long: -48.483,
    city: 'Bel%C3%A9m',
  },
  'bras%c3%adlia': {
    lat: -15.8,
    long: -47.9,
    city: 'Bras%C3%ADlia',
  },
  campinas: {
    lat: -22.9,
    long: -47.05,
    city: 'Campinas',
  },
  's%c3%a3opaulo': {
    lat: -23.55,
    long: -46.633,
    city: 'S%C3%A3o Paulo',
  },
  's%c3%a3ojos%c3%a9doscampos': {
    lat: -23.183,
    long: -45.867,
    city: 'S%C3%A3o Jos%C3%A9 dos Campos',
  },
  riodejaneiro: {
    lat: -22.9,
    long: -43.233,
    city: 'Rio de Janeiro',
  },
  'vit%c3%b3ria': {
    lat: -20.317,
    long: -40.333,
    city: 'Vit%C3%B3ria',
  },
  'ilh%c3%a9us': {
    lat: -14.783,
    long: -39.05,
    city: 'Ilh%C3%A9us',
  },
  fortaleza: {
    lat: -3.767,
    long: -38.567,
    city: 'Fortaleza',
  },
  'macei%c3%b3': {
    lat: -9.65,
    long: -35.717,
    city: 'Macei%C3%B3',
  },
  recife: {
    lat: -8.067,
    long: -34.867,
    city: 'Recife',
  },
  horta: {
    lat: 38.533,
    long: -28.633,
    city: 'Horta (Azores)',
  },
  'angradohero%c3%adsmo': {
    lat: 38.65,
    long: -27.217,
    city: 'Angra do Hero%C3%ADsmo',
  },
  pontadelgada: {
    lat: 37.733,
    long: -25.667,
    city: 'Ponta Delgada',
  },
  praia: {
    lat: 14.917,
    long: -23.517,
    city: 'Praia',
  },
  'reykjav%c3%adk': {
    lat: 64.133,
    long: -21.933,
    city: 'Reykjav%C3%ADk',
  },
  dakar: {
    lat: 14.683,
    long: -17.433,
    city: 'Dakar',
  },
  'thi%c3%a8s': {
    lat: 14.833,
    long: -17.1,
    city: 'Thi%C3%A8s',
  },
  serekunda: {
    lat: 13.433,
    long: -16.667,
    city: 'Serekunda',
  },
  brikama: {
    lat: 13.267,
    long: -16.65,
    city: 'Brikama',
  },
  banjul: {
    lat: 13.45,
    long: -16.567,
    city: 'Banjul',
  },
  santacruzdetenerife: {
    lat: 28.467,
    long: -16.25,
    city: 'Santa Cruz de Tenerife',
  },
  nouakchott: {
    lat: 18.1,
    long: -15.95,
    city: 'Nouakchott',
  },
  bissau: {
    lat: 11.85,
    long: -15.583,
    city: 'Bissau',
  },
  laspalmasdegrancanaria: {
    lat: 28.133,
    long: -15.433,
    city: 'Las Palmas de Gran Canaria',
  },
  conakry: {
    lat: 9.517,
    long: -13.7,
    city: 'Conakry',
  },
  freetown: {
    lat: 8.467,
    long: -13.267,
    city: 'Freetown',
  },
  'elaai%c3%ban': {
    lat: 27.15,
    long: -13.2,
    city: 'El Aai%C3%BAn',
  },
  monrovia: {
    lat: 6.317,
    long: -10.767,
    city: 'Monrovia',
  },
  lisbon: {
    lat: 38.7,
    long: -9.183,
    city: 'Lisbon',
  },
  porto: {
    lat: 41.15,
    long: -8.633,
    city: 'Porto',
  },
  cork: {
    lat: 51.883,
    long: -8.467,
    city: 'Cork (city)',
  },
  marrakech: {
    lat: 31.633,
    long: -8.0,
    city: 'Marrakech',
  },
  bamako: {
    lat: 12.65,
    long: -8.0,
    city: 'Bamako',
  },
  casablanca: {
    lat: 33.533,
    long: -7.583,
    city: 'Casablanca',
  },
  koulikoro: {
    lat: 12.983,
    long: -7.567,
    city: 'Koulikoro',
  },
  rabat: {
    lat: 34.033,
    long: -6.833,
    city: 'Rabat',
  },
  't%c3%b3rshavn': {
    lat: 62.0,
    long: -6.783,
    city: 'T%C3%B3rshavn',
  },
  dublin: {
    lat: 53.333,
    long: -6.267,
    city: 'Dublin',
  },
  seville: {
    lat: 37.367,
    long: -5.983,
    city: 'Seville',
  },
  belfast: {
    lat: 54.6,
    long: -5.917,
    city: 'Belfast',
  },
  jamestown: {
    lat: -15.917,
    long: -5.733,
    city: 'Jamestown',
  },
  gibraltar: {
    lat: 36.133,
    long: -5.35,
    city: 'Gibraltar',
  },
  yamoussoukro: {
    lat: 6.817,
    long: -5.283,
    city: 'Yamoussoukro',
  },
  douglas: {
    lat: 54.133,
    long: -4.483,
    city: 'Douglas',
  },
  'm%c3%a1laga': {
    lat: 36.717,
    long: -4.417,
    city: 'M%C3%A1laga',
  },
  glasgow: {
    lat: 55.85,
    long: -4.25,
    city: 'Glasgow',
  },
  abidjan: {
    lat: 5.333,
    long: -4.017,
    city: 'Abidjan',
  },
  madrid: {
    lat: 40.4,
    long: -3.683,
    city: 'Madrid',
  },
  cardiff: {
    lat: 51.483,
    long: -3.183,
    city: 'Cardiff',
  },
  edinburgh: {
    lat: 55.95,
    long: -3.15,
    city: 'Edinburgh',
  },
  timbuktu: {
    lat: 16.767,
    long: -3.0,
    city: 'Timbuktu',
  },
  liverpool: {
    lat: 53.4,
    long: -2.983,
    city: 'Liverpool',
  },
  bilbao: {
    lat: 43.25,
    long: -2.917,
    city: 'Bilbao',
  },
  manchester: {
    lat: 53.467,
    long: -2.233,
    city: 'Manchester',
  },
  aberdeen: {
    lat: 57.15,
    long: -2.1,
    city: 'Aberdeen',
  },
  birmingham: {
    lat: 52.483,
    long: -1.883,
    city: 'Birmingham',
  },
  leeds: {
    lat: 53.8,
    long: -1.55,
    city: 'Leeds',
  },
  nantes: {
    lat: 47.217,
    long: -1.55,
    city: 'Nantes',
  },
  ouagadougou: {
    lat: 12.35,
    long: -1.533,
    city: 'Ouagadougou',
  },
  tamale: {
    lat: 9.4,
    long: -0.85,
    city: 'Tamale',
  },
  valencia: {
    lat: 39.483,
    long: -0.367,
    city: 'Valencia',
  },
  accra: {
    lat: 5.55,
    long: -0.2,
    city: 'Accra',
  },
  london: {
    lat: 51.5,
    long: -0.117,
    city: 'London',
  },
  greenwich: {
    lat: 51.467,
    long: -0.0,
    city: 'Greenwich',
  },
  'lom%c3%a9': {
    lat: 6.133,
    long: 1.2,
    city: 'Lom%C3%A9',
  },
  toulouse: {
    lat: 43.6,
    long: 1.433,
    city: 'Toulouse',
  },
  andorralavella: {
    lat: 42.5,
    long: 1.5,
    city: 'Andorra la Vella',
  },
  ibiza: {
    lat: 39.633,
    long: 1.717,
    city: 'Ibiza',
  },
  niamey: {
    lat: 13.517,
    long: 2.1,
    city: 'Niamey',
  },
  barcelona: {
    lat: 41.383,
    long: 2.183,
    city: 'Barcelona',
  },
  paris: {
    lat: 48.867,
    long: 2.333,
    city: 'Paris',
  },
  cotonou: {
    lat: 6.35,
    long: 2.417,
    city: 'Cotonou',
  },
  portonovo: {
    lat: 6.5,
    long: 2.6,
    city: 'Porto-Novo',
  },
  palma: {
    lat: 39.567,
    long: 2.65,
    city: 'Palma',
  },
  algiers: {
    lat: 36.7,
    long: 3.217,
    city: 'Algiers',
  },
  lagos: {
    lat: 6.45,
    long: 3.383,
    city: 'Lagos',
  },
  ibadan: {
    lat: 7.367,
    long: 3.883,
    city: 'Ibadan',
  },
  thehague: {
    lat: 52.067,
    long: 4.3,
    city: 'The Hague',
  },
  brussels: {
    lat: 50.833,
    long: 4.35,
    city: 'Brussels',
  },
  antwerp: {
    lat: 51.217,
    long: 4.4,
    city: 'Antwerp',
  },
  rotterdam: {
    lat: 51.933,
    long: 4.467,
    city: 'Rotterdam',
  },
  lyon: {
    lat: 45.767,
    long: 4.833,
    city: 'Lyon',
  },
  amsterdam: {
    lat: 52.367,
    long: 4.883,
    city: 'Amsterdam',
  },
  marseille: {
    lat: 43.3,
    long: 5.367,
    city: 'Marseille',
  },
  bergen: {
    lat: 60.367,
    long: 5.4,
    city: 'Bergen',
  },
  luxembourg: {
    lat: 49.6,
    long: 6.117,
    city: 'Luxembourg (city)',
  },
  geneva: {
    lat: 46.2,
    long: 6.15,
    city: 'Geneva',
  },
  's%c3%a3otom%c3%a9': {
    lat: 0.333,
    long: 6.683,
    city: 'S%C3%A3o Tom%C3%A9',
  },
  'd%c3%bcsseldorf': {
    lat: 51.233,
    long: 6.783,
    city: 'D%C3%BCsseldorf',
  },
  cologne: {
    lat: 50.95,
    long: 6.967,
    city: 'Cologne',
  },
  cannes: {
    lat: 43.55,
    long: 7.0,
    city: 'Cannes',
  },
  nice: {
    lat: 43.7,
    long: 7.267,
    city: 'Nice',
  },
  monaco: {
    lat: 43.733,
    long: 7.4,
    city: 'Monaco',
  },
  bern: {
    lat: 46.95,
    long: 7.45,
    city: 'Bern',
  },
  abuja: {
    lat: 9.067,
    long: 7.483,
    city: 'Abuja',
  },
  enugu: {
    lat: 6.45,
    long: 7.5,
    city: 'Enugu',
  },
  turin: {
    lat: 45.067,
    long: 7.7,
    city: 'Turin',
  },
  strasbourg: {
    lat: 48.583,
    long: 7.75,
    city: 'Strasbourg',
  },
  kano: {
    lat: 12.0,
    long: 8.517,
    city: 'Kano',
  },
  'z%c3%bcrich': {
    lat: 47.367,
    long: 8.55,
    city: 'Z%C3%BCrich',
  },
  frankfurt: {
    lat: 50.1,
    long: 8.683,
    city: 'Frankfurt',
  },
  malabo: {
    lat: 3.75,
    long: 8.767,
    city: 'Malabo',
  },
  stuttgart: {
    lat: 48.767,
    long: 9.167,
    city: 'Stuttgart',
  },
  milan: {
    lat: 45.467,
    long: 9.183,
    city: 'Milan',
  },
  libreville: {
    lat: 0.383,
    long: 9.45,
    city: 'Libreville',
  },
  vaduz: {
    lat: 47.133,
    long: 9.517,
    city: 'Vaduz',
  },
  douala: {
    lat: 4.05,
    long: 9.7,
    city: 'Douala',
  },
  hanover: {
    lat: 52.367,
    long: 9.717,
    city: 'Hanover',
  },
  hamburg: {
    lat: 53.583,
    long: 9.983,
    city: 'Hamburg',
  },
  tunis: {
    lat: 36.8,
    long: 10.167,
    city: 'Tunis',
  },
  aarhus: {
    lat: 56.15,
    long: 10.2,
    city: 'Aarhus',
  },
  oslo: {
    lat: 59.95,
    long: 10.75,
    city: 'Oslo',
  },
  innsbruck: {
    lat: 47.267,
    long: 11.383,
    city: 'Innsbruck',
  },
  'yaound%c3%a9': {
    lat: 3.867,
    long: 11.517,
    city: 'Yaound%C3%A9',
  },
  munich: {
    lat: 48.133,
    long: 11.567,
    city: 'Munich',
  },
  gothenburg: {
    lat: 57.7,
    long: 11.967,
    city: 'Gothenburg',
  },
  leipzig: {
    lat: 51.333,
    long: 12.383,
    city: 'Leipzig',
  },
  cityofsanmarino: {
    lat: 43.933,
    long: 12.433,
    city: 'City of San Marino',
  },
  vaticancity: {
    lat: 41.9,
    long: 12.45,
    city: 'Vatican City',
  },
  rome: {
    lat: 41.9,
    long: 12.5,
    city: 'Rome',
  },
  copenhagen: {
    lat: 55.667,
    long: 12.567,
    city: 'Copenhagen',
  },
  'malm%c3%b6': {
    lat: 55.583,
    long: 13.033,
    city: 'Malm%C3%B6',
  },
  salzburg: {
    lat: 47.8,
    long: 13.033,
    city: 'Salzburg',
  },
  tripoli: {
    lat: 32.9,
    long: 13.183,
    city: 'Tripoli',
  },
  luanda: {
    lat: -8.833,
    long: 13.233,
    city: 'Luanda',
  },
  berlin: {
    lat: 52.517,
    long: 13.417,
    city: 'Berlin',
  },
  dresden: {
    lat: 51.05,
    long: 13.733,
    city: 'Dresden',
  },
  naples: {
    lat: 40.833,
    long: 14.25,
    city: 'Naples',
  },
  linz: {
    lat: 48.3,
    long: 14.283,
    city: 'Linz',
  },
  prague: {
    lat: 50.083,
    long: 14.417,
    city: 'Prague',
  },
  sabha: {
    lat: 27.033,
    long: 14.433,
    city: 'Sabha',
  },
  birkirkara: {
    lat: 35.883,
    long: 14.45,
    city: 'Birkirkara',
  },
  ljubljana: {
    lat: 46.067,
    long: 14.5,
    city: 'Ljubljana',
  },
  valletta: {
    lat: 35.9,
    long: 14.5,
    city: 'Valletta',
  },
  'n%27djamena': {
    lat: 12.1,
    long: 15.05,
    city: 'N%27Djamena',
  },
  brazzaville: {
    lat: -4.267,
    long: 15.283,
    city: 'Brazzaville',
  },
  kinshasa: {
    lat: -4.317,
    long: 15.317,
    city: 'Kinshasa',
  },
  graz: {
    lat: 47.067,
    long: 15.433,
    city: 'Graz',
  },
  longyearbyen: {
    lat: 78.217,
    long: 15.55,
    city: 'Longyearbyen',
  },
  zagreb: {
    lat: 45.817,
    long: 15.983,
    city: 'Zagreb',
  },
  vienna: {
    lat: 48.2,
    long: 16.367,
    city: 'Vienna',
  },
  split: {
    lat: 43.5,
    long: 16.433,
    city: 'Split (city)',
  },
  bratislava: {
    lat: 48.133,
    long: 17.1,
    city: 'Bratislava',
  },
  stockholm: {
    lat: 59.35,
    long: 18.067,
    city: 'Stockholm',
  },
  sarajevo: {
    lat: 43.85,
    long: 18.35,
    city: 'Sarajevo',
  },
  capetown: {
    lat: -33.917,
    long: 18.417,
    city: 'Cape Town',
  },
  bangui: {
    lat: 4.35,
    long: 18.583,
    city: 'Bangui',
  },
  'gda%c5%84sk': {
    lat: 54.35,
    long: 18.667,
    city: 'Gda%C5%84sk',
  },
  budapest: {
    lat: 47.467,
    long: 19.05,
    city: 'Budapest',
  },
  podgorica: {
    lat: 42.467,
    long: 19.267,
    city: 'Podgorica',
  },
  tirana: {
    lat: 41.317,
    long: 19.817,
    city: 'Tirana',
  },
  'krak%c3%b3w': {
    lat: 50.05,
    long: 19.933,
    city: 'Krak%C3%B3w',
  },
  belgrade: {
    lat: 44.817,
    long: 20.45,
    city: 'Belgrade',
  },
  kaliningrad: {
    lat: 54.717,
    long: 20.517,
    city: 'Kaliningrad',
  },
  warsaw: {
    lat: 52.233,
    long: 21.0,
    city: 'Warsaw',
  },
  pristina: {
    lat: 42.667,
    long: 21.167,
    city: 'Pristina',
  },
  skopje: {
    lat: 42.0,
    long: 21.433,
    city: 'Skopje',
  },
  thessaloniki: {
    lat: 40.633,
    long: 22.95,
    city: 'Thessaloniki',
  },
  sofia: {
    lat: 42.7,
    long: 23.333,
    city: 'Sofia',
  },
  athens: {
    lat: 37.967,
    long: 23.717,
    city: 'Athens',
  },
  tampere: {
    lat: 61.5,
    long: 23.75,
    city: 'Tampere',
  },
  lviv: {
    lat: 49.85,
    long: 24.017,
    city: 'Lviv',
  },
  riga: {
    lat: 56.967,
    long: 24.133,
    city: 'Riga',
  },
  espoo: {
    lat: 60.2,
    long: 24.65,
    city: 'Espoo',
  },
  tallinn: {
    lat: 59.433,
    long: 24.75,
    city: 'Tallinn',
  },
  helsinki: {
    lat: 60.167,
    long: 24.933,
    city: 'Helsinki',
  },
  vilnius: {
    lat: 54.683,
    long: 25.283,
    city: 'Vilnius',
  },
  portelizabeth: {
    lat: -33.95,
    long: 25.6,
    city: 'Port Elizabeth',
  },
  livingstone: {
    lat: -17.85,
    long: 25.867,
    city: 'Livingstone',
  },
  gaborone: {
    lat: -24.65,
    long: 25.9,
    city: 'Gaborone',
  },
  bucharest: {
    lat: 44.433,
    long: 26.1,
    city: 'Bucharest',
  },
  bloemfontein: {
    lat: -29.1,
    long: 26.217,
    city: 'Bloemfontein',
  },
  tartu: {
    lat: 58.383,
    long: 26.717,
    city: 'Tartu',
  },
  '%c4%b0zmir': {
    lat: 38.433,
    long: 27.15,
    city: '%C4%B0zmir',
  },
  lubumbashi: {
    lat: -11.667,
    long: 27.467,
    city: 'Lubumbashi',
  },
  maseru: {
    lat: -29.3,
    long: 27.467,
    city: 'Maseru',
  },
  francistown: {
    lat: -21.167,
    long: 27.5,
    city: 'Francistown',
  },
  minsk: {
    lat: 53.9,
    long: 27.567,
    city: 'Minsk',
  },
  johannesburg: {
    lat: -26.2,
    long: 28.033,
    city: 'Johannesburg',
  },
  pretoria: {
    lat: -25.733,
    long: 28.183,
    city: 'Pretoria',
  },
  lusaka: {
    lat: -15.417,
    long: 28.283,
    city: 'Lusaka',
  },
  ndola: {
    lat: -12.967,
    long: 28.633,
    city: 'Ndola',
  },
  bulawayo: {
    lat: -20.167,
    long: 28.567,
    city: 'Bulawayo',
  },
  'chi%c5%9fin%c4%83u': {
    lat: 47.0,
    long: 28.867,
    city: 'Chi%C5%9Fin%C4%83u',
  },
  istanbul: {
    lat: 41.0,
    long: 28.967,
    city: 'Istanbul',
  },
  bursa: {
    lat: 40.183,
    long: 29.067,
    city: 'Bursa',
  },
  bujumbura: {
    lat: -3.383,
    long: 29.367,
    city: 'Bujumbura',
  },
  tiraspol: {
    lat: 46.85,
    long: 29.633,
    city: 'Tiraspol',
  },
  alexandria: {
    lat: 31.2,
    long: 29.917,
    city: 'Alexandria',
  },
  kigali: {
    lat: -1.933,
    long: 30.05,
    city: 'Kigali',
  },
  saintpetersburg: {
    lat: 59.933,
    long: 30.333,
    city: 'Saint Petersburg',
  },
  kiev: {
    lat: 50.45,
    long: 30.517,
    city: 'Kiev',
  },
  odessa: {
    lat: 46.467,
    long: 30.733,
    city: 'Odessa',
  },
  harare: {
    lat: -17.817,
    long: 31.05,
    city: 'Harare',
  },
  durban: {
    lat: -29.883,
    long: 31.05,
    city: 'Durban',
  },
  mbabane: {
    lat: -26.317,
    long: 31.133,
    city: 'Mbabane',
  },
  lobamba: {
    lat: -26.467,
    long: 31.2,
    city: 'Lobamba',
  },
  cairo: {
    lat: 30.05,
    long: 31.217,
    city: 'Cairo',
  },
  manzini: {
    lat: -26.483,
    long: 31.367,
    city: 'Manzini',
  },
  portsaid: {
    lat: 31.25,
    long: 32.283,
    city: 'Port Said',
  },
  konya: {
    lat: 37.867,
    long: 32.483,
    city: 'Konya',
  },
  omdurman: {
    lat: 15.65,
    long: 32.483,
    city: 'Omdurman',
  },
  khartoum: {
    lat: 15.633,
    long: 32.533,
    city: 'Khartoum',
  },
  suez: {
    lat: 29.967,
    long: 32.55,
    city: 'Suez',
  },
  maputo: {
    lat: -25.967,
    long: 32.583,
    city: 'Maputo',
  },
  luxor: {
    lat: 25.683,
    long: 32.65,
    city: 'Luxor',
  },
  ankara: {
    lat: 39.867,
    long: 32.833,
    city: 'Ankara',
  },
  mwanza: {
    lat: -2.517,
    long: 32.9,
    city: 'Mwanza',
  },
  murmansk: {
    lat: 68.967,
    long: 33.083,
    city: 'Murmansk',
  },
  nicosia: {
    lat: 35.167,
    long: 33.35,
    city: 'Nicosia',
  },
  lilongwe: {
    lat: -13.983,
    long: 33.783,
    city: 'Lilongwe',
  },
  simferopol: {
    lat: 44.95,
    long: 34.1,
    city: 'Simferopol',
  },
  gaza: {
    lat: 31.517,
    long: 34.45,
    city: 'Gaza',
  },
  mersin: {
    lat: 36.8,
    long: 34.633,
    city: 'Mersin',
  },
  telaviv: {
    lat: 32.083,
    long: 34.8,
    city: 'Tel Aviv',
  },
  blantyre: {
    lat: -15.783,
    long: 35.0,
    city: 'Blantyre',
  },
  jerusalem: {
    lat: 31.783,
    long: 35.217,
    city: 'Jerusalem',
  },
  adana: {
    lat: 37.0,
    long: 35.317,
    city: 'Adana',
  },
  beirut: {
    lat: 33.883,
    long: 35.5,
    city: 'Beirut',
  },
  dodoma: {
    lat: -6.167,
    long: 35.733,
    city: 'Dodoma',
  },
  amman: {
    lat: 31.95,
    long: 35.933,
    city: 'Amman',
  },
  damascus: {
    lat: 33.5,
    long: 36.283,
    city: 'Damascus',
  },
  kharkiv: {
    lat: 49.917,
    long: 36.317,
    city: 'Kharkiv',
  },
  nairobi: {
    lat: -1.283,
    long: 36.817,
    city: 'Nairobi',
  },
  gaziantep: {
    lat: 37.067,
    long: 37.383,
    city: 'Gaziantep',
  },
  moscow: {
    lat: 55.75,
    long: 37.6,
    city: 'Moscow',
  },
  addisababa: {
    lat: 9.017,
    long: 38.733,
    city: 'Addis Ababa',
  },
  asmara: {
    lat: 15.333,
    long: 38.933,
    city: 'Asmara',
  },
  jeddah: {
    lat: 21.533,
    long: 39.167,
    city: 'Jeddah',
  },
  zanzibarcity: {
    lat: -6.167,
    long: 39.2,
    city: 'Zanzibar City',
  },
  daressalaam: {
    lat: -6.817,
    long: 39.267,
    city: 'Dar es Salaam',
  },
  medina: {
    lat: 24.467,
    long: 39.6,
    city: 'Medina',
  },
  mecca: {
    lat: 21.417,
    long: 39.817,
    city: 'Mecca',
  },
  sukhumi: {
    lat: 43.0,
    long: 41.017,
    city: 'Sukhumi',
  },
  djibouti: {
    lat: 11.583,
    long: 43.133,
    city: 'Djibouti (city)',
  },
  moroni: {
    lat: -11.75,
    long: 43.2,
    city: 'Moroni',
  },
  tskhinvali: {
    lat: 42.233,
    long: 43.967,
    city: 'Tskhinvali',
  },
  'sana%27a': {
    lat: 15.35,
    long: 44.2,
    city: 'Sana%27a',
  },
  baghdad: {
    lat: 33.317,
    long: 44.417,
    city: 'Baghdad',
  },
  nizhnynovgorod: {
    lat: 56.333,
    long: 44.0,
    city: 'Nizhny Novgorod',
  },
  hargeisa: {
    lat: 9.5,
    long: 44.0,
    city: 'Hargeisa',
  },
  arbil: {
    lat: 36.333,
    long: 44.017,
    city: 'Arbil',
  },
  yerevan: {
    lat: 40.183,
    long: 44.517,
    city: 'Yerevan',
  },
  tbilisi: {
    lat: 41.717,
    long: 44.783,
    city: 'Tbilisi',
  },
  mamoudzou: {
    lat: -12.783,
    long: 45.217,
    city: 'Mamoudzou',
  },
  mogadishu: {
    lat: 2.033,
    long: 45.35,
    city: 'Mogadishu',
  },
  tabriz: {
    lat: 38.083,
    long: 46.283,
    city: 'Tabriz',
  },
  riyadh: {
    lat: 24.7,
    long: 46.717,
    city: 'Riyadh',
  },
  stepanakert: {
    lat: 39.817,
    long: 46.75,
    city: 'Stepanakert',
  },
  antananarivo: {
    lat: -18.933,
    long: 47.517,
    city: 'Antananarivo',
  },
  basra: {
    lat: 30.5,
    long: 47.817,
    city: 'Basra',
  },
  kuwaitcity: {
    lat: 29.367,
    long: 47.967,
    city: 'Kuwait City',
  },
  baku: {
    lat: 40.367,
    long: 49.883,
    city: 'Baku',
  },
  dammam: {
    lat: 26.433,
    long: 50.117,
    city: 'Dammam',
  },
  samara: {
    lat: 53.233,
    long: 50.167,
    city: 'Samara',
  },
  manama: {
    lat: 26.217,
    long: 50.583,
    city: 'Manama',
  },
  tehran: {
    lat: 35.683,
    long: 51.417,
    city: 'Tehran',
  },
  doha: {
    lat: 25.283,
    long: 51.533,
    city: 'Doha',
  },
  abudhabi: {
    lat: 24.467,
    long: 54.367,
    city: 'Abu Dhabi',
  },
  dubai: {
    lat: 25.267,
    long: 55.3,
    city: 'Dubai',
  },
  victoria: {
    lat: -4.617,
    long: 55.45,
    city: 'Victoria',
  },
  saintdenis: {
    lat: -20.867,
    long: 55.45,
    city: 'Saint-Denis',
  },
  perm: {
    lat: 58.0,
    long: 56.317,
    city: 'Perm',
  },
  portlouis: {
    lat: -20.167,
    long: 57.5,
    city: 'Port Louis',
  },
  ashgabat: {
    lat: 37.967,
    long: 58.333,
    city: 'Ashgabat',
  },
  muscat: {
    lat: 23.6,
    long: 58.533,
    city: 'Muscat',
  },
  nukus: {
    lat: 42.467,
    long: 59.6,
    city: 'Nukus',
  },
  mashhad: {
    lat: 36.3,
    long: 59.6,
    city: 'Mashhad',
  },
  yekaterinburg: {
    lat: 56.833,
    long: 60.583,
    city: 'Yekaterinburg',
  },
  kandahar: {
    lat: 31.617,
    long: 65.717,
    city: 'Kandahar',
  },
  karachi: {
    lat: 24.85,
    long: 67.0,
    city: 'Karachi',
  },
  hyderabad: {
    lat: 17.367,
    long: 78.467,
    city: 'Hyderabad',
  },
  dushanbe: {
    lat: 38.533,
    long: 68.767,
    city: 'Dushanbe',
  },
  kabul: {
    lat: 34.533,
    long: 69.167,
    city: 'Kabul',
  },
  tashkent: {
    lat: 41.267,
    long: 69.217,
    city: 'Tashkent',
  },
  astana: {
    lat: 51.183,
    long: 71.45,
    city: 'Astana',
  },
  multan: {
    lat: 30.2,
    long: 71.45,
    city: 'Multan',
  },
  peshawar: {
    lat: 34.0,
    long: 71.5,
    city: 'Peshawar',
  },
  namangan: {
    lat: 41.633,
    long: 71.967,
    city: 'Namangan',
  },
  ahmedabad: {
    lat: 23.017,
    long: 72.567,
    city: 'Ahmedabad',
  },
  mumbai: {
    lat: 18.95,
    long: 72.817,
    city: 'Mumbai',
  },
  surat: {
    lat: 21.167,
    long: 72.817,
    city: 'Surat',
  },
  faisalabad: {
    lat: 31.367,
    long: 72.983,
    city: 'Faisalabad',
  },
  rawalpindi: {
    lat: 33.6,
    long: 73.033,
    city: 'Rawalpindi',
  },
  islamabad: {
    lat: 33.717,
    long: 73.067,
    city: 'Islamabad',
  },
  omsk: {
    lat: 54.983,
    long: 73.367,
    city: 'Omsk',
  },
  'mal%c3%a9': {
    lat: 4.167,
    long: 73.5,
    city: 'Mal%C3%A9',
  },
  pune: {
    lat: 18.517,
    long: 73.85,
    city: 'Pune',
  },
  lahore: {
    lat: 31.55,
    long: 74.333,
    city: 'Lahore',
  },
  bishkek: {
    lat: 42.867,
    long: 74.6,
    city: 'Bishkek',
  },
  srinagar: {
    lat: 34.083,
    long: 74.783,
    city: 'Srinagar',
  },
  amritsar: {
    lat: 31.633,
    long: 74.85,
    city: 'Amritsar',
  },
  jaipur: {
    lat: 26.917,
    long: 75.817,
    city: 'Jaipur',
  },
  ludhiana: {
    lat: 30.9,
    long: 75.85,
    city: 'Ludhiana',
  },
  almaty: {
    lat: 43.267,
    long: 76.883,
    city: 'Almaty',
  },
  newdelhi: {
    lat: 28.617,
    long: 77.2,
    city: 'New Delhi',
  },
  bangalore: {
    lat: 12.967,
    long: 77.567,
    city: 'Bangalore',
  },
  nagpur: {
    lat: 21.067,
    long: 79.017,
    city: 'Nagpur',
  },
  colombo: {
    lat: 6.883,
    long: 79.867,
    city: 'Colombo',
  },
  srijayawardenapurakotte: {
    lat: 6.9,
    long: 79.883,
    city: 'Sri Jayawardenapura-Kotte',
  },
  chennai: {
    lat: 13.083,
    long: 80.267,
    city: 'Chennai',
  },
  kanpur: {
    lat: 26.45,
    long: 80.333,
    city: 'Kanpur',
  },
  kandy: {
    lat: 7.283,
    long: 80.633,
    city: 'Kandy',
  },
  lucknow: {
    lat: 26.85,
    long: 80.917,
    city: 'Lucknow',
  },
  batticaloa: {
    lat: 7.717,
    long: 81.7,
    city: 'Batticaloa',
  },
  novosibirsk: {
    lat: 55.017,
    long: 82.933,
    city: 'Novosibirsk',
  },
  patna: {
    lat: 25.6,
    long: 85.133,
    city: 'Patna',
  },
  kathmandu: {
    lat: 27.7,
    long: 85.333,
    city: 'Kathmandu',
  },
  '%c3%9cr%c3%bcmqi': {
    lat: 43.8,
    long: 87.583,
    city: '%C3%9Cr%C3%BCmqi',
  },
  norilsk: {
    lat: 69.35,
    long: 88.2,
    city: 'Norilsk',
  },
  kolkata: {
    lat: 22.567,
    long: 88.367,
    city: 'Kolkata',
  },
  gangtok: {
    lat: 27.317,
    long: 88.617,
    city: 'Gangtok',
  },
  shigatse: {
    lat: 29.267,
    long: 88.867,
    city: 'Shigatse',
  },
  thimphu: {
    lat: 27.467,
    long: 89.633,
    city: 'Thimphu',
  },
  dhaka: {
    lat: 23.7,
    long: 90.367,
    city: 'Dhaka',
  },
  lhasa: {
    lat: 29.65,
    long: 91.117,
    city: 'Lhasa',
  },
  agartala: {
    lat: 23.5,
    long: 91.2,
    city: 'Agartala',
  },
  guwahati: {
    lat: 26.167,
    long: 91.767,
    city: 'Guwahati',
  },
  chittagong: {
    lat: 22.367,
    long: 91.8,
    city: 'Chittagong',
  },
  shillong: {
    lat: 25.567,
    long: 91.883,
    city: 'Shillong',
  },
  portblair: {
    lat: 11.667,
    long: 92.75,
    city: 'Port Blair',
  },
  dibrugarh: {
    lat: 27.467,
    long: 94.9,
    city: 'Dibrugarh',
  },
  bandaaceh: {
    lat: 5.55,
    long: 95.317,
    city: 'Banda Aceh',
  },
  naypyidaw: {
    lat: 19.75,
    long: 96.1,
    city: 'Naypyidaw',
  },
  yangon: {
    lat: 16.8,
    long: 96.167,
    city: 'Yangon',
  },
  medan: {
    lat: 3.583,
    long: 98.667,
    city: 'Medan',
  },
  phuket: {
    lat: 7.883,
    long: 98.4,
    city: 'Phuket (city)',
  },
  chiangmai: {
    lat: 18.783,
    long: 98.983,
    city: 'Chiang Mai',
  },
  suratthani: {
    lat: 9.133,
    long: 99.333,
    city: 'Surat Thani',
  },
  padang: {
    lat: -0.95,
    long: 100.35,
    city: 'Padang',
  },
  alorstar: {
    lat: 6.117,
    long: 100.367,
    city: 'Alor Star',
  },
  hatyai: {
    lat: 7.017,
    long: 100.467,
    city: 'Hat Yai',
  },
  bangkok: {
    lat: 13.75,
    long: 100.483,
    city: 'Bangkok',
  },
  pattaya: {
    lat: 12.917,
    long: 100.867,
    city: 'Pattaya',
  },
  ipoh: {
    lat: 4.6,
    long: 101.067,
    city: 'Ipoh',
  },
  pekanbaru: {
    lat: 0.533,
    long: 101.45,
    city: 'Pekanbaru',
  },
  bratsk: {
    lat: 56.167,
    long: 101.617,
    city: 'Bratsk',
  },
  kualalumpur: {
    lat: 3.133,
    long: 101.683,
    city: 'Kuala Lumpur',
  },
  xining: {
    lat: 36.633,
    long: 101.767,
    city: 'Xining',
  },
  nakhonratchasima: {
    lat: 14.967,
    long: 102.1,
    city: 'Nakhon Ratchasima',
  },
  kotabharu: {
    lat: 6.133,
    long: 102.25,
    city: 'Kota Bharu',
  },
  malaccatown: {
    lat: 2.183,
    long: 102.383,
    city: 'Malacca Town',
  },
  vientiane: {
    lat: 17.95,
    long: 102.617,
    city: 'Vientiane',
  },
  kunming: {
    lat: 25.067,
    long: 102.683,
    city: 'Kunming',
  },
  udonthani: {
    lat: 17.417,
    long: 102.75,
    city: 'Udon Thani',
  },
  johorbahru: {
    lat: 1.483,
    long: 103.733,
    city: 'Johor Bahru',
  },
  lanzhou: {
    lat: 36.033,
    long: 103.8,
    city: 'Lanzhou',
  },
  singapore: {
    lat: 1.367,
    long: 103.8,
    city: 'Singapore',
  },
  siemreap: {
    lat: 13.35,
    long: 103.85,
    city: 'Siem Reap',
  },
  chengdu: {
    lat: 30.65,
    long: 104.067,
    city: 'Chengdu',
  },
  palembang: {
    lat: -2.983,
    long: 104.75,
    city: 'Palembang',
  },
  phnompenh: {
    lat: 11.55,
    long: 104.917,
    city: 'Phnom Penh',
  },
  hanoi: {
    lat: 21.033,
    long: 105.85,
    city: 'Hanoi',
  },
  chongqing: {
    lat: 29.55,
    long: 106.5,
    city: 'Chongqing',
  },
  haiphong: {
    lat: 20.85,
    long: 106.683,
    city: 'Hai Phong',
  },
  hochiminhcity: {
    lat: 10.767,
    long: 106.683,
    city: 'Ho Chi Minh City',
  },
  jakarta: {
    lat: -6.133,
    long: 106.75,
    city: 'Jakarta',
  },
  bogor: {
    lat: -6.6,
    long: 106.8,
    city: 'Bogor',
  },
  ulanbator: {
    lat: 47.917,
    long: 106.917,
    city: 'Ulan Bator',
  },
  bandung: {
    lat: -6.95,
    long: 107.567,
    city: 'Bandung',
  },
  'hu%e1%ba%bf': {
    lat: 16.467,
    long: 107.6,
    city: 'Hu%E1%BA%BF',
  },
  danang: {
    lat: 16.067,
    long: 108.233,
    city: 'Da Nang',
  },
  nanning: {
    lat: 22.817,
    long: 108.317,
    city: 'Nanning',
  },
  'xi%27an': {
    lat: 34.267,
    long: 108.9,
    city: 'Xi%27an',
  },
  pontianak: {
    lat: 0.0,
    long: 109.333,
    city: 'Pontianak',
  },
  kuching: {
    lat: 1.55,
    long: 110.35,
    city: 'Kuching',
  },
  yogyakarta: {
    lat: -7.8,
    long: 110.367,
    city: 'Yogyakarta (city)',
  },
  semarang: {
    lat: -6.967,
    long: 110.417,
    city: 'Semarang',
  },
  taiyuan: {
    lat: 37.867,
    long: 112.55,
    city: 'Taiyuan',
  },
  malang: {
    lat: -7.967,
    long: 112.617,
    city: 'Malang',
  },
  surabaya: {
    lat: -7.233,
    long: 112.733,
    city: 'Surabaya',
  },
  guangzhou: {
    lat: 23.1,
    long: 113.267,
    city: 'Guangzhou',
  },
  macau: {
    lat: 22.167,
    long: 113.55,
    city: 'Macau',
  },
  zhengzhou: {
    lat: 34.75,
    long: 113.633,
    city: 'Zhengzhou',
  },
  dongguan: {
    lat: 23.033,
    long: 113.717,
    city: 'Dongguan',
  },
  miri: {
    lat: 4.383,
    long: 113.967,
    city: 'Miri',
  },
  shenzhen: {
    lat: 22.55,
    long: 114.1,
    city: 'Shenzhen',
  },
  hongkong: {
    lat: 22.3,
    long: 114.2,
    city: 'Hong Kong',
  },
  wuhan: {
    lat: 30.567,
    long: 114.267,
    city: 'Wuhan',
  },
  handan: {
    lat: 36.6,
    long: 114.483,
    city: 'Handan',
  },
  shijiazhuang: {
    lat: 38.033,
    long: 114.5,
    city: 'Shijiazhuang',
  },
  bandarseribegawan: {
    lat: 4.883,
    long: 114.933,
    city: 'Bandar Seri Begawan',
  },
  denpasar: {
    lat: -8.65,
    long: 115.217,
    city: 'Denpasar',
  },
  mandurah: {
    lat: -32.517,
    long: 115.717,
    city: 'Mandurah',
  },
  perth: {
    lat: -31.95,
    long: 115.85,
    city: 'Perth',
  },
  kotakinabalu: {
    lat: 5.967,
    long: 116.083,
    city: 'Kota Kinabalu',
  },
  beijing: {
    lat: 39.9,
    long: 116.4,
    city: 'Beijing',
  },
  balikpapan: {
    lat: -1.25,
    long: 116.817,
    city: 'Balikpapan',
  },
  jinan: {
    lat: 36.667,
    long: 116.983,
    city: 'Jinan',
  },
  tianjin: {
    lat: 39.133,
    long: 117.183,
    city: 'Tianjin',
  },
  porthedland: {
    lat: -20.3,
    long: 118.6,
    city: 'Port Hedland',
  },
  nanjing: {
    lat: 32.05,
    long: 118.767,
    city: 'Nanjing',
  },
  makassar: {
    lat: -5.133,
    long: 119.417,
    city: 'Makassar',
  },
  hangzhou: {
    lat: 30.25,
    long: 120.167,
    city: 'Hangzhou',
  },
  kaohsiung: {
    lat: 22.633,
    long: 120.267,
    city: 'Kaohsiung',
  },
  qingdao: {
    lat: 36.083,
    long: 120.333,
    city: 'Qingdao',
  },
  taichung: {
    lat: 24.15,
    long: 120.667,
    city: 'Taichung',
  },
  manila: {
    lat: 14.583,
    long: 120.967,
    city: 'Manila',
  },
  quezoncity: {
    lat: 14.633,
    long: 121.033,
    city: 'Quezon City',
  },
  makaticity: {
    lat: 14.55,
    long: 121.033,
    city: 'Makati City',
  },
  shanghai: {
    lat: 31.2,
    long: 121.5,
    city: 'Shanghai',
  },
  taipei: {
    lat: 25.033,
    long: 121.633,
    city: 'Taipei',
  },
  dalian: {
    lat: 39.033,
    long: 121.767,
    city: 'Dalian',
  },
  iloilocity: {
    lat: 10.683,
    long: 122.55,
    city: 'Iloilo City',
  },
  zamboangacity: {
    lat: 6.9,
    long: 122.067,
    city: 'Zamboanga City',
  },
  shenyang: {
    lat: 41.783,
    long: 123.45,
    city: 'Shenyang',
  },
  tagbilaran: {
    lat: 9.65,
    long: 123.85,
    city: 'Tagbilaran',
  },
  cebucity: {
    lat: 10.283,
    long: 123.9,
    city: 'Cebu City',
  },
  changchun: {
    lat: 43.883,
    long: 125.317,
    city: 'Changchun',
  },
  dili: {
    lat: -8.55,
    long: 125.583,
    city: 'Dili',
  },
  pyongyang: {
    lat: 39.033,
    long: 125.75,
    city: 'Pyongyang',
  },
  davaocity: {
    lat: 7.5,
    long: 126.0,
    city: 'Davao City',
  },
  kaesong: {
    lat: 37.967,
    long: 126.55,
    city: 'Kaesong',
  },
  harbin: {
    lat: 45.75,
    long: 126.633,
    city: 'Harbin',
  },
  incheon: {
    lat: 37.483,
    long: 126.633,
    city: 'Incheon',
  },
  seoul: {
    lat: 37.55,
    long: 126.983,
    city: 'Seoul',
  },
  wonsan: {
    lat: 39.15,
    long: 127.433,
    city: 'Wonsan',
  },
  okinawa: {
    lat: 26.333,
    long: 127.8,
    city: 'Okinawa',
  },
  ambon: {
    lat: -3.7,
    long: 128.167,
    city: 'Ambon',
  },
  daegu: {
    lat: 35.867,
    long: 128.6,
    city: 'Daegu',
  },
  busan: {
    lat: 35.1,
    long: 129.033,
    city: 'Busan',
  },
  yakutsk: {
    lat: 62.033,
    long: 129.733,
    city: 'Yakutsk',
  },
  chongjin: {
    lat: 41.8,
    long: 129.783,
    city: 'Chongjin',
  },
  fukuoka: {
    lat: 33.583,
    long: 130.4,
    city: 'Fukuoka',
  },
  darwin: {
    lat: -12.45,
    long: 130.833,
    city: 'Darwin',
  },
  vladivostok: {
    lat: 43.133,
    long: 131.9,
    city: 'Vladivostok',
  },
  hiroshima: {
    lat: 34.383,
    long: 132.45,
    city: 'Hiroshima',
  },
  koror: {
    lat: 7.35,
    long: 134.467,
    city: 'Koror',
  },
  melekeok: {
    lat: 7.5,
    long: 134.617,
    city: 'Melekeok',
  },
  kobe: {
    lat: 34.683,
    long: 135.2,
    city: 'Kobe',
  },
  osaka: {
    lat: 34.683,
    long: 135.5,
    city: 'Osaka',
  },
  kyoto: {
    lat: 35.017,
    long: 135.767,
    city: 'Kyoto',
  },
  nagoya: {
    lat: 35.183,
    long: 136.9,
    city: 'Nagoya',
  },
  adelaide: {
    lat: -34.917,
    long: 138.6,
    city: 'Adelaide',
  },
  yokohama: {
    lat: 35.45,
    long: 139.633,
    city: 'Yokohama',
  },
  kawasaki: {
    lat: 35.517,
    long: 139.7,
    city: 'Kawasaki',
  },
  tokyo: {
    lat: 35.683,
    long: 139.767,
    city: 'Tokyo',
  },
  jayapura: {
    lat: -2.533,
    long: 140.717,
    city: 'Jayapura',
  },
  sapporo: {
    lat: 43.067,
    long: 141.35,
    city: 'Sapporo',
  },
  geelong: {
    lat: -38.15,
    long: 144.35,
    city: 'Geelong',
  },
  'hag%c3%a5t%c3%b1a': {
    lat: 13.483,
    long: 144.75,
    city: 'Hag%C3%A5t%C3%B1a',
  },
  dededo: {
    lat: 13.517,
    long: 144.833,
    city: 'Dededo',
  },
  melbourne: {
    lat: -37.8,
    long: 144.95,
    city: 'Melbourne',
  },
  saipan: {
    lat: 15.183,
    long: 145.75,
    city: 'Saipan',
  },
  cairns: {
    lat: -16.917,
    long: 145.767,
    city: 'Cairns',
  },
  townsville: {
    lat: -19.25,
    long: 146.817,
    city: 'Townsville',
  },
  portmoresby: {
    lat: -9.467,
    long: 147.167,
    city: 'Port Moresby',
  },
  hobart: {
    lat: -42.883,
    long: 147.317,
    city: 'Hobart',
  },
  canberra: {
    lat: -35.3,
    long: 149.117,
    city: 'Canberra',
  },
  rockhampton: {
    lat: -23.367,
    long: 150.5,
    city: 'Rockhampton',
  },
  magadan: {
    lat: 59.567,
    long: 150.8,
    city: 'Magadan',
  },
  wollongong: {
    lat: -34.433,
    long: 150.883,
    city: 'Wollongong',
  },
  sydney: {
    lat: -33.85,
    long: 151.2,
    city: 'Sydney',
  },
  newcastle: {
    lat: -32.917,
    long: 151.75,
    city: 'Newcastle',
  },
  weno: {
    lat: 7.45,
    long: 151.85,
    city: 'Weno',
  },
  brisbane: {
    lat: -27.467,
    long: 153.017,
    city: 'Brisbane',
  },
  goldcoast: {
    lat: -28.167,
    long: 153.55,
    city: 'Gold Coast',
  },
  palikir: {
    lat: 6.917,
    long: 158.183,
    city: 'Palikir',
  },
  petropavlovskkamchatsky: {
    lat: 53.017,
    long: 158.65,
    city: 'Petropavlovsk-Kamchatsky',
  },
  honiara: {
    lat: -9.433,
    long: 159.95,
    city: 'Honiara',
  },
  'noum%c3%a9a': {
    lat: -22.267,
    long: 166.45,
    city: 'Noum%C3%A9a',
  },
  yarendistrict: {
    lat: -0.55,
    long: 166.917,
    city: 'Yaren District',
  },
  portvila: {
    lat: -17.75,
    long: 168.3,
    city: 'Port Vila',
  },
  invercargill: {
    lat: -46.417,
    long: 168.3,
    city: 'Invercargill',
  },
  dunedin: {
    lat: -45.867,
    long: 170.5,
    city: 'Dunedin',
  },
  majuro: {
    lat: 7.067,
    long: 171.267,
    city: 'Majuro',
  },
  christchurch: {
    lat: -43.533,
    long: 172.617,
    city: 'Christchurch',
  },
  southtarawa: {
    lat: 1.317,
    long: 172.983,
    city: 'South Tarawa',
  },
  wellington: {
    lat: -41.283,
    long: 174.767,
    city: 'Wellington',
  },
  auckland: {
    lat: -36.85,
    long: 174.783,
    city: 'Auckland',
  },
  matautu: {
    lat: -13.283,
    long: 176.183,
    city: 'Mata-Utu',
  },
  anadyr: {
    lat: 64.733,
    long: 177.5,
    city: 'Anadyr (town)',
  },
  suva: {
    lat: -18.133,
    long: 178.433,
    city: 'Suva',
  },
  funafuti: {
    lat: -8.517,
    long: 179.217,
    city: 'Funafuti',
  },
  labasa: {
    lat: -16.433,
    long: 179.367,
    city: 'Labasa',
  },
  nukulaelae: {
    lat: -9.383,
    long: 179.85,
    city: 'Nukulaelae',
  },
};

const getRandomValue = (low, high) => {
  // favor lower values
  return Math.random() > 0.8
    ? Math.floor(Math.random() * high)
    : Math.floor(Math.random() * low);
};

export const getMockData = (color, type) => {
  return Object.values(MOCK_DATA)
    .map(d => ({
      ...d,
      id: getId(),
      color,
      type,
      value: getRandomValue(200, 1000),
      size: getRandomValue(10, 15),
    }))
    .filter(d => Math.random() > 0.7);
};
