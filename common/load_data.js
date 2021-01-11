exports.insertClientRecord = () => {
  const query = [
    `INSERT INTO client
    (lname, fname, phone, address, email)
    SELECT 'Mary', 'Cahill', '(808) 176-8945', 'Kaimuki, Honolulu, Hawaii, 96816', 'marycahill@email.com'
    WHERE
    NOT EXISTS (
        SELECT id FROM client WHERE id = 1
    )`,
    `INSERT INTO client
    (lname, fname, phone, address, email)
    SELECT 'George', 'Peterson', '(808) 256-5142', 'Ewa Beach, Honolulu, Hawaii, 96706', 'petersongeorge1@email.com'
    WHERE
    NOT EXISTS (
        SELECT id FROM client WHERE id = 2
    )`,
    `INSERT INTO client
    (lname, fname, phone, address, email)
    SELECT 'Maria', 'Valdez', '(808) 482-8254', 'Kapahulu, Honolulu, Hawaii, 96816', 'valdezmaria@email.com'
    WHERE
    NOT EXISTS (
        SELECT id FROM client WHERE id = 3
    )`,
    `INSERT INTO client
    (lname, fname, phone, address, email)
    SELECT 'Isaac', 'Maddison', '(808) 825-7457', 'Waikiki, Honolulu, Hawaii, 96815', 'maddisonisaac@email.com'
    WHERE
    NOT EXISTS (
        SELECT id FROM client WHERE id = 4
    )`,
    `INSERT INTO client
    (lname, fname, phone, address, email)
    SELECT 'Jeffrey', 'Smith', '(808) 481-5452', 'Manoa, Honolulu, Hawaii, 96822', 'smithjeffrey@email.com'
    WHERE
    NOT EXISTS (
        SELECT id FROM client WHERE id = 5
    )`
  ]

  return query
}

exports.insertVisitRecord = () => {
  const query = [
    {
      query: [`INSERT INTO appointment
      (client, details, date)
      SELECT 1, 'consulting, problem definition', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 1
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 1, 'introduction to treatment methods', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 2
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 1, 'determination of treatment options', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 3
      )`]
    },
    {
      query: [`INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'consulting, problem definition', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 4
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'introduction to treatment methods', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 5
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'determination of treatment options', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 6
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'first check up on progress', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 7
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'change of treatment method', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 8
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'second check on progress', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 9
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 2, 'check up and update on well being', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 10
      )`]
    },
    {
      query: [`INSERT INTO appointment
      (client, details, date)
      SELECT 3, ' consulting, problem definition', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 11
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 3, 'introduction to treatment methods', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 12
      )`]
    },
    {
      query: [`INSERT INTO appointment
      (client, details, date)
      SELECT 4, 'consulting, problem definition ', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 13
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 4, 'introduction to treatment methods', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 14
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 4, 'determination of treatment options', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 15
      )`,
      `INSERT INTO appointment
      (client, details, date)
      SELECT 4, 'first check up on progress', '2020-01-01'
      WHERE
      NOT EXISTS (
          SELECT id FROM appointment WHERE id = 16
      )`]
    },
    {
      query: [`INSERT INTO appointment
        (client, details, date)
        SELECT 5, 'consulting, problem definition ', '2020-01-01'
        WHERE
        NOT EXISTS (
            SELECT id FROM appointment WHERE id = 17
        )`]
    }
  ]

  return query
}
