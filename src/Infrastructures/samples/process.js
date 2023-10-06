const fs = require('fs');

function process(filename) {
  fs.readFile(filename, (err, data) => {
    const suffix = filename.split('.')[0];
    const raw = JSON.parse(data.toString());
    let kelompok = raw.map((r) => r.kelompok);
    kelompok = new Set(kelompok);
    fs.writeFile(
      `${suffix}_categories.json`,
      JSON.stringify([...kelompok].sort()),
      () => true,
    );
    kelompok.forEach((k) => {
      const filteredKelompok = raw.filter(
        (r) => r.kelompok === k
          && r.longitude !== null
          && r.latitude !== null
          && r.latitude !== '-'
          && r.longitude !== '-',
      );
      fs.writeFile(
        `${suffix}_${k.toLowerCase().replace(' ', '_')}.json`,
        JSON.stringify(filteredKelompok),
        () => true,
      );
    });
  });
}

Promise.all([process('pariwisata.json'), process('religious_places.json')]);
