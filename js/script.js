// ===== DATA HADIS =====
const hadisIqomah = [
    { arti: "Kebersihan sebagian dari iman", source: "(HR. Muslim)" },
    { arti: "Senyum adalah sedekah", source: "(HR. Tirmidzi)" },
    { arti: "Orang kuat adalah yang mampu menahan amarah", source: "(HR. Bukhari & Muslim)" },
    { arti: "Sesungguhnya amal itu tergantung pada niat", source: "(HR. Bukhari & Muslim)" },
    { arti: "Orang yang menunjukkan kepada kebaikan mendapat pahala seperti pelakunya", source: "(HR. Muslim)" },
    { arti: "Mudahkah urusan orang lain, Allah mudahkan urusannya", source: "(HR. Muslim)" },
    { arti: "Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain", source: "(HR. Ahmad)" },
    { arti: "Barang siapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam", source: "(HR. Bukhari & Muslim)" },
    { arti: "Jangan marah, maka surga bagimu", source: "(HR. Thabrani)" },
    { arti: "Shalat adalah tiang agama", source: "(HR. Baihaqi)" },
    { arti: "Dunia adalah penjara bagi orang beriman dan surga bagi orang kafir", source: "(HR. Muslim)" },
    { arti: "Barangsiapa menempuh jalan untuk mencari ilmu, Allah mudahkan jalannya ke surga", source: "(HR. Muslim)" },
    { arti: "Seorang muslim adalah saudara bagi muslim lainnya", source: "(HR. Bukhari & Muslim)" },
    { arti: "Tidak beriman salah seorang dari kalian hingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri", source: "(HR. Bukhari & Muslim)" },
    { arti: "Barangsiapa diam, ia selamat", source: "(HR. Tirmidzi)" },
    { arti: "Surga berada di bawah telapak kaki ibu", source: "(HR. Nasa’i)" },
    { arti: "Barangsiapa menipu kami maka ia bukan dari golongan kami", source: "(HR. Muslim)" },
    { arti: "Tangan di atas lebih baik daripada tangan di bawah", source: "(HR. Bukhari & Muslim)" },
    { arti: "Siapa yang tidak menyayangi, tidak akan disayangi", source: "(HR. Bukhari & Muslim)" },
    { arti: "Seseorang akan bersama dengan yang ia cintai", source: "(HR. Bukhari & Muslim)" },
    { arti: "Jika engkau mencintai saudaramu, maka beritahukanlah kepadanya", source: "(HR. Ahmad)" },
    { arti: "Surga lebih dekat kepada salah seorang dari kalian daripada tali sandalnya", source: "(HR. Bukhari)" },
    { arti: "Sebarkanlah salam di antara kalian", source: "(HR. Muslim)" },
    { arti: "Jika perkataan itu perak, maka diam itu emas", source: "(HR. Baihaqi)" },
    { arti: "Menuntut ilmu itu wajib bagi setiap muslim", source: "(HR. Ibnu Majah)" },
    { arti: "Seorang hamba paling dekat dengan Rabb-nya adalah ketika sujud", source: "(HR. Muslim)" },
    { arti: "Doa adalah ibadah", source: "(HR. Tirmidzi)" },
    { arti: "Malu adalah bagian dari iman", source: "(HR. Bukhari & Muslim)" },
    { arti: "Tetangga itu ada tiga golongan", source: "(HR. Bukhari)" },
    { arti: "Bertakwalah kepada Allah di manapun kamu berada", source: "(HR. Tirmidzi)" },
    { arti: "Tidak akan masuk surga orang yang di dalam hatinya ada kesombongan meskipun sebesar biji zarrah", source: "(HR. Muslim)" },
    { arti: "Barangsiapa berpuasa Ramadhan dengan iman dan mengharap pahala, maka diampuni dosanya yang telah lalu", source: "(HR. Bukhari & Muslim)" }
];

// ===== VARIABEL GLOBAL =====
let currentCity = "Bogor";
let jadwal = {};
let cityHistory = ["Bogor"];
let currentBgIndex = 0;
let hadisInterval;
const bgImages = document.querySelectorAll('.bg-image');

// ===== KONVERSI HIJRIAH =====
function gregorianToHijri(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
        Math.floor((367 * (month - 2 - 12 * (Math.floor((month - 14) / 12)))) / 12) -
        Math.floor((3 * (Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100))) / 4) + day - 32075;

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) +
            (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
        (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let m = Math.floor((24 * l) / 709);
    let d = l - Math.floor((709 * m) / 24);
    let y = 30 * n + j - 30;

    return { hDay: d, hMonth: m, hYear: y };
}

// ===== UPDATE TANGGAL DENGAN NAMA KOTA =====
function updateTanggal() {
    const now = new Date();
    const masehi = now.toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const hijri = gregorianToHijri(now);
    hijri.hDay -= 2;
    const bulanHijriah = [
        "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir",
        "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban",
        "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah"
    ];
    const hijriahText = `${hijri.hDay} ${bulanHijriah[hijri.hMonth - 1]} ${hijri.hYear} H`;
    document.getElementById("tanggal-box").textContent = `${currentCity}, ${masehi} | ${hijriahText} 🔍`;
}

// ===== AMBIL JADWAL SHOLAT DARI API ALADHAN (METODE KEMENAG = method=5) =====
async function fetchPrayerTimes(cityName) {
    try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=Indonesia&method=5`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.code === 200 && data.data && data.data.timings) {
            const timings = data.data.timings;
            jadwal = {
                subuh: timings.Fajr,
                syuruq: timings.Sunrise,
                zuhur: timings.Dhuhr,
                ashar: timings.Asr,
                maghrib: timings.Maghrib,
                isya: timings.Isha
            };

            // Update UI
            document.getElementById('subuh').textContent = jadwal.subuh.split(':')[0] + ':' + jadwal.subuh.split(':')[1];
            document.getElementById('syuruq').textContent = jadwal.syuruq.split(':')[0] + ':' + jadwal.syuruq.split(':')[1];
            document.getElementById('zuhur').textContent = jadwal.zuhur.split(':')[0] + ':' + jadwal.zuhur.split(':')[1];
            document.getElementById('ashar').textContent = jadwal.ashar.split(':')[0] + ':' + jadwal.ashar.split(':')[1];
            document.getElementById('maghrib').textContent = jadwal.maghrib.split(':')[0] + ':' + jadwal.maghrib.split(':')[1];
            document.getElementById('isya').textContent = jadwal.isya.split(':')[0] + ':' + jadwal.isya.split(':')[1];

            // Update footer address (opsional)
            const footerMarquee = document.getElementById('marquee');
            footerMarquee.querySelector('marquee').textContent = `BQ City: Jl. Pinus, RT.01/RW.09, Situgede, Kec. Bogor Bar., Kota ${currentCity}, Jawa Barat 16115`;

            console.log(`Jadwal sholat untuk ${cityName} berhasil diambil.`);
        } else {
            throw new Error("Data tidak ditemukan");
        }
    } catch (err) {
        console.error("Error fetching prayer times:", err);
        alert("Gagal memuat jadwal sholat. Silakan coba lagi.");
    }
}

// ===== PILIH KOTA =====
function selectCity(cityName) {
    currentCity = cityName;
    if (!cityHistory.includes(cityName)) {
        cityHistory.unshift(cityName);
        if (cityHistory.length > 5) cityHistory.pop();
    }
    updateTanggal();
    fetchPrayerTimes(cityName);
    hideSearchModal();
}

// ===== MODAL PENCARIAN =====
function showSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 9999; display: flex;
        justify-content: center; align-items: center;
    `;
    
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-header">
                <input type="text" id="search-input" placeholder="Cari kota..." style="flex:1; padding:10px; border:2px solid #ddd; border-radius:8px;">
                <button id="search-btn" style="padding:10px 15px; background:#1e3a8a; color:white; border:none; border-radius:8px; cursor:pointer;">🔍</button>
            </div>
            <div class="search-results" id="search-results">
                <!-- Daftar kota akan diisi oleh JS -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Tutup modal saat klik di luar konten
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSearchModal();
        }
    });

    // Daftar kota Indonesia (semua kota besar)
    const allCities = [
        "Jakarta", "Bandung", "Surabaya", "Medan", "Bogor", "Yogyakarta", "Semarang", "Makassar", 
        "Palembang", "Denpasar", "Banjarmasin", "Pekanbaru", "Malang", "Padang", "Manado", 
        "Jayapura", "Balikpapan", "Samarinda", "Tangerang", "Depok", "Bekasi", "Cirebon", 
        "Pontianak", "Ambon", "Kupang", "Mataram", "Palu", "Samarinda", "Serang", "Tasikmalaya", 
        "Cimahi", "Banda Aceh", "Lhokseumawe", "Pematangsiantar", "Binjai", "Batam", "Tegal", 
        "Kediri", "Probolinggo", "Jambi", "Sorong", "Manokwari", "Fakfak", "Bengkulu", "Tarakan", 
        "Palangkaraya", "Sibolga", "Gunungsitoli", "Singkawang", "Pangkal Pinang", "Sawahlunto", 
        "Payakumbuh", "Solok", "Bukittinggi", "Padang Panjang", "Pariaman", "Metro", "Prabumulih", 
        "Lubuklinggau", "Pagar Alam", "Mojokerto", "Pasuruan", "Gresik", "Sidoarjo", "Madiun", 
        "Blitar", "Kediri", "Tulungagung", "Nganjuk", "Bojonegoro", "Lamongan", "Jombang", "Trenggalek"
    ];

    // Tampilkan semua kota di daftar
    const resultsDiv = document.getElementById('search-results');
    allCities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.textContent = city;
        div.addEventListener('click', () => selectCity(city));
        resultsDiv.appendChild(div);
    });

    // Filter pencarian (hanya aktif saat tombol 🔍 diklik)
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = '';

        if (query.length < 2) {
            // Tampilkan semua kota jika input kosong atau kurang dari 2 huruf
            allCities.forEach(city => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.textContent = city;
                div.addEventListener('click', () => selectCity(city));
                resultsDiv.appendChild(div);
            });
        } else {
            // Filter berdasarkan input
            const filtered = allCities.filter(city => city.toLowerCase().includes(query));
            if (filtered.length === 0) {
                resultsDiv.innerHTML = '<div class="search-result-item" style="color:#888;">Kota tidak ditemukan</div>';
            } else {
                filtered.forEach(city => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.textContent = city;
                    div.addEventListener('click', () => selectCity(city));
                    resultsDiv.appendChild(div);
                });
            }
        }
    });

    // Tombol search — HANYA AKTIF SAAT DIKLIK!
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (query) {
            selectCity(query);
        }
    });
}

function hideSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.remove();
}

// ===== DETEKSI LOKASI OTOMATIS =====
function detectLocation() {
    if (!navigator.geolocation) {
        selectCity("Bogor");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Step 1: Reverse geocoding to get city name
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const geoData = await geoRes.json();
                
                let city = "Bogor";
                if (geoData.address) {
                    city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || "Bogor";
                }

                // Step 2: Validate city with Aladhan API
                const validateRes = await fetch(`https://api.aladhan.com/v1/city?city=${encodeURIComponent(city)}&country=Indonesia`);
                const validateData = await validateRes.json();
                if (validateData.data && validateData.data.length > 0) {
                    city = validateData.data[0].name;
                }

                selectCity(city);
            } catch (err) {
                console.log("Error detecting location:", err);
                selectCity("Bogor");
            }
        },
        () => selectCity("Bogor")
    );
}

// ===== IQOMAH & LAINNYA =====
function addMinutes(timeStr, minutes) {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return date.toTimeString().slice(0, 5);
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('current-time').textContent = timeString;
    checkIqomahTime(now);
}

function checkIqomahTime(now) {
    if (!jadwal.subuh) return;

    const currentTime = now.toTimeString().slice(0, 5);
    const iqomahTimes = {
        subuh: addMinutes(jadwal.subuh, 15),
        dzuhur: addMinutes(jadwal.zuhur, 15),
        ashar: addMinutes(jadwal.ashar, 15),
        maghrib: addMinutes(jadwal.maghrib, 15),
        isya: addMinutes(jadwal.isya, 15)
    };

    for (const iqomahTime of Object.values(iqomahTimes)) {
        if (currentTime === iqomahTime) {
            startIqomahMode();
            return;
        }
    }
}

function startIqomahMode() {
    document.getElementById('normal-mode').classList.add('hidden');
    document.getElementById('iqomah-mode').classList.remove('hidden');
    displayRandomHadis();
    startCountdown(15);
}

function displayRandomHadis() {
    const hadis = hadisIqomah[Math.floor(Math.random() * hadisIqomah.length)];
    document.getElementById('hadis-meaning').textContent = hadis.arti;
    document.querySelector('.hadis-source').textContent = hadis.source;

    clearInterval(hadisInterval);
    hadisInterval = setInterval(() => {
        const randomHadis = hadisIqomah[Math.floor(Math.random() * hadisIqomah.length)];
        document.getElementById('hadis-meaning').textContent = randomHadis.arti;
        document.querySelector('.hadis-source').textContent = randomHadis.source;
    }, 7500);
}

function startCountdown(minutes) {
    let time = minutes * 60;
    const countdownEl = document.getElementById('countdown');
    const timer = setInterval(() => {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        countdownEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (time <= 0) {
            clearInterval(timer);
            endIqomahMode();
        }
        time--;
    }, 1000);
}

function endIqomahMode() {
    clearInterval(hadisInterval);
    document.getElementById('iqomah-mode').classList.add('hidden');
    document.getElementById('normal-mode').classList.remove('hidden');
}

function changeBackground() {
    bgImages.forEach(img => img.classList.remove('active'));
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    bgImages[currentBgIndex].classList.add('active');
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', () => {
    // Event listener untuk tanggal box (ikon 🔍)
    document.getElementById('tanggal-box').addEventListener('click', showSearchModal);

    // Pastikan currentCity sudah punya nilai default
    currentCity = "Bogor";

    // Update tanggal segera setelah DOM siap
    updateTanggal();

    // Ambil jadwal sholat untuk Bogor secara langsung
    fetchPrayerTimes(currentCity);

    // Deteksi lokasi (opsional, akan mengganti jika sukses)
    detectLocation();

    // Timer
    setInterval(updateTime, 1000);
    setInterval(changeBackground, 5000);
    setInterval(() => updateTanggal(), 60000);
});