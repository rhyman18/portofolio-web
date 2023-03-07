// deklarasi DOM & variabel yg dibutuhkan
const msgArea = document.getElementById('komentar');
const msgKosong = document.getElementById('empty');
const msgNama = document.getElementById('nama');
const msgSosmed = document.getElementById('callback');
const msgLink = document.getElementById('link');
const msgIsi = document.getElementById('msg');
const msgSubmit = document.getElementById('ok');
const msgNotes = document.getElementById('validate');
const specialCase = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
const scSosmed = /[!"#$%&'()*+,\-./:;<=>? [\\\]^_`{|}~]/;
const good = 'rgba(0, 255, 0, 0.2)';
const goodText = '#75b798';
const goodBorder = '#198754';
const goodShadow = '0 2px 20px 1px rgba(25, 135, 84, .4)';
const bad = 'rgba(255, 0, 0, 0.2)';
const badText = '#ea868f';
const badBorder = '#dc3545';
const badShadow = '0 2px 20px 1px rgba(220, 53, 69, .4)';
let validasiNama = null;
let validasiLink = null;
let validasiIsi = null;

// fungsi style validasi
function validasi(e, v) {
    if (!v) {
        // manipulasi validasi gagal
        e.style.background = bad;
        e.style.borderColor = badBorder;
        e.style.boxShadow = badShadow;
        e.style.color = badText;
    } else {
        // manipulasi validasi benar
        e.style.background = good;
        e.style.borderColor = goodBorder;
        e.style.boxShadow = goodShadow;
        e.style.color = goodText;
    }
}

// cek pesan di local storage untuk pertama kali
const msgCek = localStorage.getItem('data');
if (msgCek) {
    // sembunyikan pesan kosong
    msgKosong.style.display = 'none';

    // convert string to json
    const msgConvert = JSON.parse(msgCek);

    for (data of msgConvert) {
        createPesan(data);
    }
}

// validasi form pesan
msgNama.addEventListener('input', () => {
    // validasi enable
    msgNotes.style.display = 'flex';

    if (!msgNama.value.match(specialCase)
        && msgNama.value.length >= 2
        && msgNama.value.length <= 30) {
        // manipulasi form nama
        validasi(msgNama, true);

        // manipulasi pesan
        msgNotes.textContent = 'Nama sudah sesuai, silahkan lanjut kalau sudah benar.';
        validasi(msgNotes, true);

        // form nama sudah tervalidasi
        return validasiNama = true;

    } else {
        // manipulasi form nama
        validasi(msgNama, false);

        // manipulasi pesan validasi
        msgNotes.textContent = 'Nama tidak sesuai, pastikan Nama minimal 2 dan maksimal 30 karakter, tidak mengandung simbol/emoji.';
        validasi(msgNotes, false);

        // form nama belum tervalidasi
        return validasiNama = false;

    }
});

// validasi form sosmed
msgLink.addEventListener('input', () => {
    // validasi enable
    msgNotes.style.display = 'flex';

    if (!msgLink.value.match(scSosmed)
        && msgLink.value.charAt(0) === '@'
        && msgLink.value.length >= 2 &&
        msgLink.value.length <= 30) {
        // manipulasi form sosmed
        validasi(msgLink, true);

        // manipulasi pesan
        msgNotes.textContent = 'Username sudah sesuai, silahkan lanjut kalau sudah benar.';
        validasi(msgNotes, true);

        // form nama sudah tervalidasi
        return validasiLink = true;

    } else {
        // manipulasi form sosmed
        validasi(msgLink, false);

        // manipulasi pesan validasi
        msgNotes.textContent = 'Username tidak sesuai, pastikan Username mengandung @ di awal, tidak mengandung simbol/emoji/spasi.';
        validasi(msgNotes, false);

        // form nama belum tervalidasi
        return validasiLink = false;
    }
});

// validasi form isi pesan
msgIsi.addEventListener('input', () => {
    // validasi enable
    msgNotes.style.display = 'flex';

    if (msgIsi.value.length >= 5
        && msgIsi.value.length <= 500) {
        // manipulasi form isi pesan
        validasi(msgIsi, true);

        // manipulasi pesan
        msgNotes.textContent = 'Pesan sudah sesuai, silahkan klik tinggalkan pesan kalau sudah yakin.';
        validasi(msgNotes, true);

        // form nama sudah tervalidasi
        return validasiIsi = true;

    } else {
        // manipulasi form isi pesan
        validasi(msgIsi, false);

        // manipulasi pesan validasi
        msgNotes.textContent = 'Pesan tidak sesuai, pastikan Pesan yang anda ketik minimal 5 dan maksimal 500 karakter.';
        validasi(msgNotes, false);

        // form nama belum tervalidasi
        return validasiIsi = false;

    }
});

// ketika user submit input
msgSubmit.addEventListener('click', () => {
    // prevent load behavior
    event.preventDefault();

    // format waktu
    const waktu = new Date();
    const nowDate = waktu.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const nowTime = waktu.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    const sekarang = nowDate + ' ' + nowTime;

    // load data local
    const msgLocal = localStorage.getItem('data');

    if (validasiNama === true
        && validasiLink === true
        && validasiIsi === true) {
        const msgAdd = {
            nama: msgNama.value,
            sosmed: msgSosmed.value,
            link: msgLink.value,
            pesan: msgIsi.value,
            waktu: sekarang
        };

        // load data local
        if (msgLocal) {
            const msgTemp = JSON.parse(msgLocal);

            msgTemp.push(msgAdd);
            const msgCommit = JSON.stringify(msgTemp);

            localStorage.setItem('data', msgCommit);

        } else {
            const msgData = [];

            msgData.push(msgAdd);
            const msgCommit = JSON.stringify(msgData);

            localStorage.setItem('data', msgCommit);
        }

        // posting pesan langsung
        createPesan(msgAdd);

        // pesan berhasil login
        msgNotes.textContent = 'Berhasil Menyimpan! Silahkan tunggu...';
        validasi(msgNotes, true);

        // scroll otomatis ke tamu set. 3 det
        setTimeout(() => {
            // validasi disable
            msgNotes.style.display = 'none';

            meluncur('tamu');
        }, 2000);

        // sembunyikan pesan kosong
        msgKosong.style.display = 'none';

    } else {
        // peringatan isi form
        msgNotes.style.display = 'flex';
        msgNotes.textContent = 'Harap lengkapi form terlebih dahulu!';
        validasi(msgNotes, false);
    }
});

// pesan card
function createPesan(d) {
    // buat element container
    const buatPesan = document.createElement('div');
    buatPesan.className = 'list-pesan';
    msgArea.appendChild(buatPesan);

    // buat element judul
    const buatJudul = document.createElement('div');
    buatJudul.className = 'list-judul';
    buatPesan.appendChild(buatJudul);

    // larik sosmed
    const sosmed = [
        'Buatan Sendiri',
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'tiktok',
        'github'
    ];
    // buat element icon
    const buatIcon = document.createElement('i');
    buatIcon.className = `fa-brands fa-${sosmed[d.sosmed]} fa-3x list-icon`;
    buatJudul.appendChild(buatIcon);

    // buat elemen nama
    const buatNama = document.createElement('h5');
    buatNama.className = 'list-nama';
    buatNama.textContent = d.nama;
    buatJudul.appendChild(buatNama);

    // buat element pesan
    const buatIsi = document.createElement('div');
    buatIsi.className = 'list-isi';
    buatIsi.innerHTML = '<q>' + d.pesan + '</q>';
    buatPesan.appendChild(buatIsi);

    // buat element username
    const buatSosmed = document.createElement('a');
    buatSosmed.className = 'list-username';
    let link = d.link;
    link = link.substring(1);
    // larik link sosmed
    const sosmedLink = [
        '#',
        'https://web.facebook.com/',
        'https://www.instagram.com/',
        'https://twitter.com/',
        'https://www.linkedin.com/in/',
        'https://www.tiktok.com/@',
        'https://github.com/'
    ];
    buatSosmed.href = sosmedLink[d.sosmed] + link;
    buatSosmed.innerText = d.link;
    buatPesan.appendChild(buatSosmed);

    // buat element jam
    const buatWaktu = document.createElement('div');
    buatWaktu.classList = 'list-date';
    buatWaktu.textContent = d.waktu;
    buatPesan.appendChild(buatWaktu);
}

// fungsi ketika klik link
function meluncur(e) {
    const ele = document.getElementById(e);
    ele.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

}