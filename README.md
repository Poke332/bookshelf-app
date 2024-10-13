# Bookshelf App

Ini adalah tugas akhir dalam kelas Dicoding mengenai "Belajar Membuat Front-End Web untuk Pemula" yang menguji penggunaan JavaScript untuk memanipulasi Document-Object-Model(DOM)
disertai penggunaan Local/Session Web Storage.

## Hasil Pengerjaan Saya

Penggunaan `main.js`  untuk mengatur interaksi antara user dan aplikasi, serta penggunaan `index.html` web bookshelf
 - `main.js` bekerja sebagai script paling utama mengatur penggunaan `Web Events` dan `Custom Events`
 - `main.js` mengatur apa saja yang akan dilakukan web ketika dimulai dan digunakan. Dimulai dari loading data jika ada sampai kepada pembuatan elemen HTML menggunakan functions

 Penggunaan modul `button.js` untuk menyimpan semua fungsin yang akan digunakan dalam fitur berbentuk button
 - Function `changeCompleteStatus` untuk fitur memindahkan buku antara bagian "Belum Selesai" dan "Selesai"
 - Function `removeBookItem` untuk menghapus buku dari bookshelf yang ada
 - Function `makeEditMenu` dipanggil setiap digunakan tombol edit, membuat template HTML Edit Menu secara dinamis
   - Function `addExistingBook` dipanggil setiap ditekannya tombol "Save Changes" yang terbuat oleh Function `makeEditMenu`

Penggunaan `renderer.js` untuk menyimpan function yang tugasnya mengambil input user and memunculkan inputnya dalam website
 - Function `generateId` dan `generateBookObject` sebagai pembuat Objek Book berdasarkan input user
 - Function `makeBook` membuat template HTML untuk menyimpan setiap buku yang diinput user sesuai template berikut:
  - ### Template HTML yang digunakan untuk membuat setiap bar buku:
      ```html
      <div data-bookid="{{ ID_buku }}" data-testid="bookItem">
        <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
        <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
        <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">{{ tombol_untuk_ubah_kondisi }}</button>
          <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
          <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
        </div>
      </div>
      ```
Penggunaan `storage.js` sebagai penyimpan semua function and variabel lainnya yang tugas utamanya dalam penyimpanan kepada `Local Storage`
 - `isStorageExist` mengecek apakah browser support penggunaan storage
 - `saveData` dipanggil setiap diperlukan penyimpanan data ke `Local Storage` dalam bentuk konversi `Array` ke `JSON`
 - `loadDataStorage` dipanggil setiap kali browser di launch/reload, bekerja mengambil data (jika ada) dari Web Server