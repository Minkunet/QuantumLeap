// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDH_ycKl1pB1BSzqYdn8IDhDp53U45GwZ8",
  authDomain: "tugas-c05d3.firebaseapp.com",
  projectId: "tugas-c05d3",
  storageBucket: "tugas-c05d3.firebasestorage.app",
  messagingSenderId: "229292384295",
  appId: "1:229292384295:web:f8d7210aaa846a73302e02",
  measurementId: "G-W7CM32HDP4"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const ADMIN_CODES = ["KT-01", "SR-01", "BR-01", "KT-02", "SR-02", "BR-02"];
let maxTugas = 7;

function addTugas() {
  const tugasContainer = document.getElementById('tugas-container');
  const tugasGroups = tugasContainer.getElementsByClassName('input-group');
  
  if (tugasGroups.length < maxTugas) {
    const newGroup = document.createElement('div');
    newGroup.classList.add('input-group');
    newGroup.innerHTML = `
      <input type="text" placeholder="Mapel" class="mapel">
      <input type="text" placeholder="Tugas" class="tugas">
      <button onclick="addTugas()">+</button>
      <button onclick="removeTugas(this)">-</button>
    `;
    tugasContainer.appendChild(newGroup);
  }
}

function removeTugas(button) {
  const tugasContainer = document.getElementById('tugas-container');
  const tugasGroups = tugasContainer.getElementsByClassName('input-group');

  if (tugasGroups.length > 1) {
    button.parentElement.remove();
  }
}

function simpanData() {
  const tanggal = document.getElementById('tanggal').value;
  const kodeAdmin = document.getElementById('kode-admin').value;
  const tugasContainer = document.getElementById('tugas-container');
  const mapelInputs = tugasContainer.getElementsByClassName('mapel');
  const tugasInputs = tugasContainer.getElementsByClassName('tugas');
  const tugasData = [];

  // Validasi kode administrasi
  if (!ADMIN_CODES.includes(kodeAdmin)) {
    alert("Kode Administrasi salah! Data tidak disimpan.");
    return;
  }

  // Mengumpulkan data tugas dalam format JSON yang benar untuk Firestore
  for (let i = 0; i < mapelInputs.length; i++) {
    const mapel = mapelInputs[i].value;
    const tugas = tugasInputs[i].value;
    if (mapel && tugas) {
      tugasData.push({
        mapel: mapel,
        tugas: tugas
      });
    }
  }

  const tugasRef = db.collection("tugas").doc(tanggal);

  // Simpan data baru dengan format string JSON
  tugasRef.set({
    tanggal: tanggal,
    detail: JSON.stringify(tugasData) // Mengubah array tugas menjadi string JSON
  })
  .then(() => {
    alert("Data berhasil disimpan!");
  })
  .catch((error) => {
    console.error("Error dalam proses penyimpanan data: ", error);
  });
}
