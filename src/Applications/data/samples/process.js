const fs = require('fs');

function process(filename) {
  fs.readFile(filename, (err, data) => {
    const prefix = filename.split('.')[0];
    const raw = JSON.parse(data.toString());
    if (prefix !== 'ibadah') {
      let kelompok = raw.map((r) => r.kelompok);
      kelompok = new Set(kelompok);
      fs.writeFile(
        `${prefix}_categories.json`,
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
          `${prefix}_${k.toLowerCase().replace(' ', '_')}.json`,
          JSON.stringify(filteredKelompok),
          () => true,
        );
      });
    } else {
      const filteredKelompok = raw.filter(
        (r) => r.longitude !== null
          && r.latitude !== null
          && r.latitude !== '-'
          && r.longitude !== '-',
      );
      fs.writeFile(
        `${prefix}_data.json`,
        JSON.stringify(filteredKelompok),
        () => true,
      );
    }
  });
}

Promise.all([process('pariwisata.json'), process('ibadah.json')]);
