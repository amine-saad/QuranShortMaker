// Quran Data Service (Mocked)
import { Surah, Ayah, Reciter } from '@/types';

// Complete data for all 114 Surahs
export const SURAHS: Surah[] = [
  { id: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', nameTransliteration: 'The Opening', revelationPlace: 'makkah', totalAyahs: 7 },
  { id: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', nameTransliteration: 'The Cow', revelationPlace: 'madinah', totalAyahs: 286 },
  { id: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali Imran', nameTransliteration: 'Family of Imran', revelationPlace: 'madinah', totalAyahs: 200 },
  { id: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', nameTransliteration: 'The Women', revelationPlace: 'madinah', totalAyahs: 176 },
  { id: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Maidah', nameTransliteration: 'The Table Spread', revelationPlace: 'madinah', totalAyahs: 120 },
  { id: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-Anam', nameTransliteration: 'The Cattle', revelationPlace: 'makkah', totalAyahs: 165 },
  { id: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-Araf', nameTransliteration: 'The Heights', revelationPlace: 'makkah', totalAyahs: 206 },
  { id: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', nameTransliteration: 'The Spoils of War', revelationPlace: 'madinah', totalAyahs: 75 },
  { id: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', nameTransliteration: 'The Repentance', revelationPlace: 'madinah', totalAyahs: 129 },
  { id: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', nameTransliteration: 'Jonah', revelationPlace: 'makkah', totalAyahs: 109 },
  { id: 11, nameArabic: 'هود', nameEnglish: 'Hud', nameTransliteration: 'Hud', revelationPlace: 'makkah', totalAyahs: 123 },
  { id: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', nameTransliteration: 'Joseph', revelationPlace: 'makkah', totalAyahs: 111 },
  { id: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Rad', nameTransliteration: 'The Thunder', revelationPlace: 'madinah', totalAyahs: 43 },
  { id: 14, nameArabic: 'إبراهيم', nameEnglish: 'Ibrahim', nameTransliteration: 'Abraham', revelationPlace: 'makkah', totalAyahs: 52 },
  { id: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', nameTransliteration: 'The Rocky Tract', revelationPlace: 'makkah', totalAyahs: 99 },
  { id: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', nameTransliteration: 'The Bee', revelationPlace: 'makkah', totalAyahs: 128 },
  { id: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', nameTransliteration: 'The Night Journey', revelationPlace: 'makkah', totalAyahs: 111 },
  { id: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', nameTransliteration: 'The Cave', revelationPlace: 'makkah', totalAyahs: 110 },
  { id: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', nameTransliteration: 'Mary', revelationPlace: 'makkah', totalAyahs: 98 },
  { id: 20, nameArabic: 'طه', nameEnglish: 'Taha', nameTransliteration: 'Ta-Ha', revelationPlace: 'makkah', totalAyahs: 135 },
  { id: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', nameTransliteration: 'The Prophets', revelationPlace: 'makkah', totalAyahs: 112 },
  { id: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', nameTransliteration: 'The Pilgrimage', revelationPlace: 'madinah', totalAyahs: 78 },
  { id: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Muminun', nameTransliteration: 'The Believers', revelationPlace: 'makkah', totalAyahs: 118 },
  { id: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', nameTransliteration: 'The Light', revelationPlace: 'madinah', totalAyahs: 64 },
  { id: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', nameTransliteration: 'The Criterion', revelationPlace: 'makkah', totalAyahs: 77 },
  { id: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shuara', nameTransliteration: 'The Poets', revelationPlace: 'makkah', totalAyahs: 227 },
  { id: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', nameTransliteration: 'The Ant', revelationPlace: 'makkah', totalAyahs: 93 },
  { id: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', nameTransliteration: 'The Stories', revelationPlace: 'makkah', totalAyahs: 88 },
  { id: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-Ankabut', nameTransliteration: 'The Spider', revelationPlace: 'makkah', totalAyahs: 69 },
  { id: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', nameTransliteration: 'The Romans', revelationPlace: 'makkah', totalAyahs: 60 },
  { id: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', nameTransliteration: 'Luqman', revelationPlace: 'makkah', totalAyahs: 34 },
  { id: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajda', nameTransliteration: 'The Prostration', revelationPlace: 'makkah', totalAyahs: 30 },
  { id: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', nameTransliteration: 'The Combined Forces', revelationPlace: 'madinah', totalAyahs: 73 },
  { id: 34, nameArabic: 'سبأ', nameEnglish: 'Saba', nameTransliteration: 'Sheba', revelationPlace: 'makkah', totalAyahs: 54 },
  { id: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', nameTransliteration: 'Originator', revelationPlace: 'makkah', totalAyahs: 45 },
  { id: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', nameTransliteration: 'Ya Sin', revelationPlace: 'makkah', totalAyahs: 83 },
  { id: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', nameTransliteration: 'Those Who Set The Ranks', revelationPlace: 'makkah', totalAyahs: 182 },
  { id: 38, nameArabic: 'ص', nameEnglish: 'Sad', nameTransliteration: 'The Letter Saad', revelationPlace: 'makkah', totalAyahs: 88 },
  { id: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', nameTransliteration: 'The Troops', revelationPlace: 'makkah', totalAyahs: 75 },
  { id: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', nameTransliteration: 'The Forgiver', revelationPlace: 'makkah', totalAyahs: 85 },
  { id: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', nameTransliteration: 'Explained In Detail', revelationPlace: 'makkah', totalAyahs: 54 },
  { id: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shura', nameTransliteration: 'The Consultation', revelationPlace: 'makkah', totalAyahs: 53 },
  { id: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', nameTransliteration: 'The Ornaments of Gold', revelationPlace: 'makkah', totalAyahs: 89 },
  { id: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', nameTransliteration: 'The Smoke', revelationPlace: 'makkah', totalAyahs: 59 },
  { id: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiya', nameTransliteration: 'The Crouching', revelationPlace: 'makkah', totalAyahs: 37 },
  { id: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', nameTransliteration: 'The Wind-Curved Sandhills', revelationPlace: 'makkah', totalAyahs: 35 },
  { id: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', nameTransliteration: 'Muhammad', revelationPlace: 'madinah', totalAyahs: 38 },
  { id: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', nameTransliteration: 'The Victory', revelationPlace: 'madinah', totalAyahs: 29 },
  { id: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', nameTransliteration: 'The Rooms', revelationPlace: 'madinah', totalAyahs: 18 },
  { id: 50, nameArabic: 'ق', nameEnglish: 'Qaf', nameTransliteration: 'The Letter Qaf', revelationPlace: 'makkah', totalAyahs: 45 },
  { id: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', nameTransliteration: 'The Winnowing Winds', revelationPlace: 'makkah', totalAyahs: 60 },
  { id: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', nameTransliteration: 'The Mount', revelationPlace: 'makkah', totalAyahs: 49 },
  { id: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', nameTransliteration: 'The Star', revelationPlace: 'makkah', totalAyahs: 62 },
  { id: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', nameTransliteration: 'The Moon', revelationPlace: 'makkah', totalAyahs: 55 },
  { id: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', nameTransliteration: 'The Beneficent', revelationPlace: 'madinah', totalAyahs: 78 },
  { id: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqia', nameTransliteration: 'The Inevitable', revelationPlace: 'makkah', totalAyahs: 96 },
  { id: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', nameTransliteration: 'The Iron', revelationPlace: 'madinah', totalAyahs: 29 },
  { id: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', nameTransliteration: 'The Pleading Woman', revelationPlace: 'madinah', totalAyahs: 22 },
  { id: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', nameTransliteration: 'The Exile', revelationPlace: 'madinah', totalAyahs: 24 },
  { id: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahana', nameTransliteration: 'She That Is To Be Examined', revelationPlace: 'madinah', totalAyahs: 13 },
  { id: 61, nameArabic: 'الصف', nameEnglish: 'As-Saf', nameTransliteration: 'The Ranks', revelationPlace: 'madinah', totalAyahs: 14 },
  { id: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumua', nameTransliteration: 'The Congregation', revelationPlace: 'madinah', totalAyahs: 11 },
  { id: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', nameTransliteration: 'The Hypocrites', revelationPlace: 'madinah', totalAyahs: 11 },
  { id: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', nameTransliteration: 'The Mutual Disillusion', revelationPlace: 'madinah', totalAyahs: 18 },
  { id: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', nameTransliteration: 'The Divorce', revelationPlace: 'madinah', totalAyahs: 12 },
  { id: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', nameTransliteration: 'The Prohibition', revelationPlace: 'madinah', totalAyahs: 12 },
  { id: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', nameTransliteration: 'The Sovereignty', revelationPlace: 'makkah', totalAyahs: 30 },
  { id: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', nameTransliteration: 'The Pen', revelationPlace: 'makkah', totalAyahs: 52 },
  { id: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', nameTransliteration: 'The Reality', revelationPlace: 'makkah', totalAyahs: 52 },
  { id: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Maarij', nameTransliteration: 'The Ascending Stairways', revelationPlace: 'makkah', totalAyahs: 44 },
  { id: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', nameTransliteration: 'Noah', revelationPlace: 'makkah', totalAyahs: 28 },
  { id: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', nameTransliteration: 'The Jinn', revelationPlace: 'makkah', totalAyahs: 28 },
  { id: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', nameTransliteration: 'The Enshrouded One', revelationPlace: 'makkah', totalAyahs: 20 },
  { id: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', nameTransliteration: 'The Cloaked One', revelationPlace: 'makkah', totalAyahs: 56 },
  { id: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', nameTransliteration: 'The Resurrection', revelationPlace: 'makkah', totalAyahs: 40 },
  { id: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', nameTransliteration: 'The Man', revelationPlace: 'madinah', totalAyahs: 31 },
  { id: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', nameTransliteration: 'The Emissaries', revelationPlace: 'makkah', totalAyahs: 50 },
  { id: 78, nameArabic: 'النبأ', nameEnglish: 'An-Naba', nameTransliteration: 'The Tidings', revelationPlace: 'makkah', totalAyahs: 40 },
  { id: 79, nameArabic: 'النازعات', nameEnglish: 'An-Naziat', nameTransliteration: 'Those Who Drag Forth', revelationPlace: 'makkah', totalAyahs: 46 },
  { id: 80, nameArabic: 'عبس', nameEnglish: 'Abasa', nameTransliteration: 'He Frowned', revelationPlace: 'makkah', totalAyahs: 42 },
  { id: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', nameTransliteration: 'The Overthrowing', revelationPlace: 'makkah', totalAyahs: 29 },
  { id: 82, nameArabic: 'الإنفطار', nameEnglish: 'Al-Infitar', nameTransliteration: 'The Cleaving', revelationPlace: 'makkah', totalAyahs: 19 },
  { id: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', nameTransliteration: 'The Defrauding', revelationPlace: 'makkah', totalAyahs: 36 },
  { id: 84, nameArabic: 'الإنشقاق', nameEnglish: 'Al-Inshiqaq', nameTransliteration: 'The Sundering', revelationPlace: 'makkah', totalAyahs: 25 },
  { id: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', nameTransliteration: 'The Mansions of the Stars', revelationPlace: 'makkah', totalAyahs: 22 },
  { id: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', nameTransliteration: 'The Nightcomer', revelationPlace: 'makkah', totalAyahs: 17 },
  { id: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-Ala', nameTransliteration: 'The Most High', revelationPlace: 'makkah', totalAyahs: 19 },
  { id: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', nameTransliteration: 'The Overwhelming', revelationPlace: 'makkah', totalAyahs: 26 },
  { id: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', nameTransliteration: 'The Dawn', revelationPlace: 'makkah', totalAyahs: 30 },
  { id: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', nameTransliteration: 'The City', revelationPlace: 'makkah', totalAyahs: 20 },
  { id: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', nameTransliteration: 'The Sun', revelationPlace: 'makkah', totalAyahs: 15 },
  { id: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', nameTransliteration: 'The Night', revelationPlace: 'makkah', totalAyahs: 21 },
  { id: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duhaa', nameTransliteration: 'The Morning Hours', revelationPlace: 'makkah', totalAyahs: 11 },
  { id: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', nameTransliteration: 'The Relief', revelationPlace: 'makkah', totalAyahs: 8 },
  { id: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', nameTransliteration: 'The Fig', revelationPlace: 'makkah', totalAyahs: 8 },
  { id: 96, nameArabic: 'العلق', nameEnglish: 'Al-Alaq', nameTransliteration: 'The Clot', revelationPlace: 'makkah', totalAyahs: 19 },
  { id: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', nameTransliteration: 'The Power', revelationPlace: 'makkah', totalAyahs: 5 },
  { id: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyina', nameTransliteration: 'The Clear Proof', revelationPlace: 'madinah', totalAyahs: 8 },
  { id: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', nameTransliteration: 'The Earthquake', revelationPlace: 'madinah', totalAyahs: 8 },
  { id: 100, nameArabic: 'العاديات', nameEnglish: 'Al-Adiyat', nameTransliteration: 'The Courser', revelationPlace: 'makkah', totalAyahs: 11 },
  { id: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qariah', nameTransliteration: 'The Calamity', revelationPlace: 'makkah', totalAyahs: 11 },
  { id: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', nameTransliteration: 'The Rivalry in World Increase', revelationPlace: 'makkah', totalAyahs: 8 },
  { id: 103, nameArabic: 'العصر', nameEnglish: 'Al-Asr', nameTransliteration: 'The Declining Day', revelationPlace: 'makkah', totalAyahs: 3 },
  { id: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', nameTransliteration: 'The Traducer', revelationPlace: 'makkah', totalAyahs: 9 },
  { id: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', nameTransliteration: 'The Elephant', revelationPlace: 'makkah', totalAyahs: 5 },
  { id: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', nameTransliteration: 'Quraysh', revelationPlace: 'makkah', totalAyahs: 4 },
  { id: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Maun', nameTransliteration: 'The Small Kindnesses', revelationPlace: 'makkah', totalAyahs: 7 },
  { id: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', nameTransliteration: 'The Abundance', revelationPlace: 'makkah', totalAyahs: 3 },
  { id: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', nameTransliteration: 'The Disbelievers', revelationPlace: 'makkah', totalAyahs: 6 },
  { id: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', nameTransliteration: 'The Divine Support', revelationPlace: 'madinah', totalAyahs: 3 },
  { id: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', nameTransliteration: 'The Palm Fiber', revelationPlace: 'makkah', totalAyahs: 5 },
  { id: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', nameTransliteration: 'The Sincerity', revelationPlace: 'makkah', totalAyahs: 4 },
  { id: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', nameTransliteration: 'The Daybreak', revelationPlace: 'makkah', totalAyahs: 5 },
  { id: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', nameTransliteration: 'Mankind', revelationPlace: 'makkah', totalAyahs: 6 },
];

export const RECITERS: Reciter[] = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', style: 'Clear and melodious', audioFormat: 'mp3' },
  { id: 'sudais', name: 'Abdul Rahman Al-Sudais', style: 'Emotional and powerful', audioFormat: 'mp3' },
  { id: 'husary', name: 'Mahmoud Khalil Al-Husary', style: 'Classical and precise', audioFormat: 'mp3' },
  { id: 'minshawi', name: 'Mohamed Siddiq El-Minshawi', style: 'Mujawwad (melodic)', audioFormat: 'mp3' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', style: 'Warm and clear', audioFormat: 'mp3' },
  { id: 'shuraim', name: 'Saud Al-Shuraim', style: 'Deep and resonant', audioFormat: 'mp3' },
  { id: 'ajmi', name: 'Ahmed Al-Ajmi', style: 'Hadr (fast-paced)', audioFormat: 'mp3' },
  { id: 'basfar', name: 'Abdullah Basfar', style: 'Smooth and tranquil', audioFormat: 'mp3' },
];

export async function searchSurahs(query: string): Promise<Surah[]> {
  const lowerQuery = query.toLowerCase();
  return SURAHS.filter(s => 
    s.nameEnglish.toLowerCase().includes(lowerQuery) ||
    s.nameTransliteration.toLowerCase().includes(lowerQuery) ||
    s.nameArabic.includes(query)
  );
}

export async function getSurahById(id: number): Promise<Surah | null> {
  return SURAHS.find(s => s.id === id) || null;
}

export async function getAyahs(surahId: number, start: number, end: number): Promise<Ayah[]> {
  // Mock Ayah data
  const ayahs: Ayah[] = [];
  for (let i = start; i <= end; i++) {
    ayahs.push({
      number: i,
      textArabic: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (${i})`,
      textEnglish: `In the name of Allah, the Entirely Merciful, the Especially Merciful. (${i})`,
    });
  }
  return ayahs;
}
